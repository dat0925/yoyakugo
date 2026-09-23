<?php
// test_glossary.php
// usage: php test_glossary.php PROJECT_ID LOCATION GLOSSARY_ID
if ($argc < 4) { echo "usage: php {$argv[0]} PROJECT_ID LOCATION GLOSSARY_ID\n"; exit(1); }
$project = $argv[1];
$location = $argv[2];
$glossaryId = $argv[3];

function getAccessToken() {
    $sa = getenv('GOOGLE_APPLICATION_CREDENTIALS');
    if ($sa && file_exists($sa)) {
        $j = json_decode(file_get_contents($sa), true);
        $clientEmail = $j['client_email']; $privateKey = $j['private_key'];
        $now = time();
        $header = ['alg'=>'RS256','typ'=>'JWT'];
        $payload = ['iss'=>$clientEmail,'scope'=>'https://www.googleapis.com/auth/cloud-translation','aud'=>'https://oauth2.googleapis.com/token','iat'=>$now,'exp'=>$now+3600];
        $b64 = function($d){ return rtrim(strtr(base64_encode($d), '+/', '-_'), '='); };
        $unsigned = $b64(json_encode($header)).'.'.$b64(json_encode($payload));
        openssl_sign($unsigned, $sig, $privateKey, OPENSSL_ALGO_SHA256);
        $jwt = $unsigned.'.'.$b64($sig);
        $post = http_build_query(['grant_type'=>'urn:ietf:params:oauth:grant-type:jwt-bearer','assertion'=>$jwt]);
        $ch = curl_init('https://oauth2.googleapis.com/token');
        curl_setopt_array($ch,[CURLOPT_POST=>true,CURLOPT_POSTFIELDS=>$post,CURLOPT_RETURNTRANSFER=>true,CURLOPT_HTTPHEADER=>['Content-Type: application/x-www-form-urlencoded']]);
        $r = curl_exec($ch); curl_close($ch);
        $j = json_decode($r,true);
        return $j['access_token'] ?? null;
    }
    return trim(shell_exec('gcloud auth application-default print-access-token 2>/dev/null'));
}

$token = getAccessToken();
if (!$token) { fwrite(STDERR,"Cannot get token\n"); exit(1); }

$endpoint = "https://translation.googleapis.com/v3/projects/{$project}/locations/$location:translateText";
$glossaryResource = "projects/{$project}/locations/{$location}/glossaries/{$glossaryId}";

// Test sentences
$tests = [
    "今日は月です",
    "今日は月曜日です",
    "サービス名の紹介",
    "サービス名プロは優れています",
    "今月の売上",
    "月額料金について"
];

function translate($texts, $token, $endpoint, $project, $glossary = null) {
    $payload = [
        'contents' => $texts,
        'sourceLanguageCode' => 'ja',
        'targetLanguageCode' => 'en',
        'mimeType' => 'text/plain',
        //'model' => 'projects/project-ab359153-73f6-48d2-8fb/locations/us-central1/models/general/translation-llm'
    ];
    if ($glossary) {
        $payload['glossaryConfig'] = [
            'glossary' => $glossary,
            'ignoreCase' => true,
            //'contextual_translation_enabled' => true
        ];
    }
    $ch = curl_init($endpoint);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => [
            "Authorization: Bearer {$token}",
            "Content-Type: application/json; charset=utf-8",
            "x-goog-user-project: {$project}"
        ]
    ]);
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    unset($ch);
    if ($code !== 200) {
        echo "HTTP {$code} : $res\n";
        return null;
    }
    $j = json_decode($res, true);
    if ($glossary) {
        //print_r($j);
    }
    $out = [];
    if (isset($j['glossaryTranslations'])) {
        foreach ($j['glossaryTranslations'] as $t) $out[] = $t['translatedText'] ?? '';
    } else {
        foreach ($j['translations'] as $t) $out[] = $t['translatedText'] ?? '';
    }
    return $out;
}

// run without glossary
$res0 = translate($tests, $token, $endpoint, $project, null);
echo "=== Without Glossary ===\n";
foreach ($tests as $i => $txt) {
    echo "[J] {$txt}\n[EN] " . ($res0[$i] ?? '[error]') . "\n\n";
}

// run with glossary
$res1 = translate($tests, $token, $endpoint, $project, $glossaryResource);
echo "=== With Glossary ({$glossaryResource}) ===\n";
foreach ($tests as $i => $txt) {
    echo "[J] {$txt}\n[EN] " . ($res1[$i] ?? '[error]') . "\n\n";
}
