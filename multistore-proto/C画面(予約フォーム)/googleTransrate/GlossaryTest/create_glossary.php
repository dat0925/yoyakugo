<?php
// GCSバケットに用語集がアップロードずみであること
// create_glossary.php
// usage: php create_glossary.php PROJECT_ID LOCATION GLOSSARY_ID gs://bucket/file.csv
// e.g. php create_glossary.php project-ab359153-73f6-48d2-8fb us-central1 weekdays_ja_en gs://your-glossary-bucket/glossary_ja_en.csv

if ($argc < 5) { echo "usage: php {$argv[0]} PROJECT_ID LOCATION GLOSSARY_ID GCS_URI\n"; exit(1); }
$project = $argv[1];
$location = $argv[2];
$glossaryId = $argv[3];
$gcsUri = $argv[4];

function getAccessToken() {
    $sa = getenv('GOOGLE_APPLICATION_CREDENTIALS');
    if ($sa && file_exists($sa)) {
        $j = json_decode(file_get_contents($sa), true);
        $clientEmail = $j['client_email'] ?? null;
        $privateKey = $j['private_key'] ?? null;
        if (!$clientEmail || !$privateKey) { fwrite(STDERR,"Invalid SA JSON\n"); return null; }
        $now = time();
        $header = ['alg'=>'RS256','typ'=>'JWT'];
        $payload = [
            'iss'=>$clientEmail,
            'scope'=>'https://www.googleapis.com/auth/cloud-translation',
            'aud'=>'https://oauth2.googleapis.com/token',
            'iat'=>$now,'exp'=>$now+3600
        ];
        $b64 = function($d){ return rtrim(strtr(base64_encode($d), '+/', '-_'), '='); };
        $unsigned = $b64(json_encode($header)).'.'.$b64(json_encode($payload));
        $sigOk = openssl_sign($unsigned, $sig, $privateKey, OPENSSL_ALGO_SHA256);
        if (!$sigOk) { fwrite(STDERR,"OpenSSL sign failed\n"); return null; }
        $jwt = $unsigned.'.'.$b64($sig);
        $post = http_build_query(['grant_type'=>'urn:ietf:params:oauth:grant-type:jwt-bearer','assertion'=>$jwt]);
        $ch = curl_init('https://oauth2.googleapis.com/token');
        curl_setopt_array($ch,[CURLOPT_POST=>true,CURLOPT_POSTFIELDS=>$post,CURLOPT_RETURNTRANSFER=>true,CURLOPT_HTTPHEADER=>['Content-Type: application/x-www-form-urlencoded']]);
        $r = curl_exec($ch); curl_close($ch);
        $j = json_decode($r,true);
        return $j['access_token'] ?? null;
    }
    // fallback to gcloud ADC
    $t = trim(shell_exec('gcloud auth application-default print-access-token 2>/dev/null'));
    return $t ?: null;
}

$token = getAccessToken();
if (!$token) { fwrite(STDERR,"Cannot get token\n"); exit(1); }

$body = [
  'name' => "projects/{$project}/locations/{$location}/glossaries/{$glossaryId}",
  'languagePair' => ['sourceLanguageCode'=>'ja','targetLanguageCode'=>'en'],
  'inputConfig' => ['gcsSource' => ['inputUri' => $gcsUri]]
];

$url = "https://translation.googleapis.com/v3/projects/{$project}/locations/{$location}/glossaries";
$ch = curl_init($url);
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => json_encode($body),
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer {$token}",
    "Content-Type: application/json; charset=utf-8"
  ]
]);
$res = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
echo "HTTP {$code}\n";
echo $res . "\n";
