<?php
// Google Cloud Translation API(v3)を使用して、HTMLファイルを翻訳するスクリプト
// 翻訳対象は、テキストノードと属性ノードを対象とする。
// 注意: wslでphp8が必要
// $ sudo apt install php php-dom php-mbstring php-curl
// translate_dom_full.php
// usage: php translate_dom_full.php input.html output.html src tgt
// Env:
//  - If GOOGLE_APPLICATION_CREDENTIALS is set to SA JSON path, JWT flow will be used.
//  - Optionally set QUOTA_PROJECT env var for x-goog-user-project header.
//  - Else script will try `gcloud auth application-default print-access-token` (gcloud must exist).

if ($argc < 5) {
    echo "usage: php {$argv[0]} input.html output.html src tgt\n";
    exit(1);
}

$input  = $argv[1];
$output = $argv[2];
$src    = $argv[3];
$tgt    = $argv[4];

// Project id to use for quota/billing (set here or via env QUOTA_PROJECT)
$projectId = getenv('QUOTA_PROJECT') ?: 'project-ab359153-73f6-48d2-8fb';

// Max characters per batch (safety margin for codepoints limit)
$MAX_CHARS = 20000;

// Attributes to translate
$transAttrs = ['value','placeholder','title','alt','aria-label'];

// Local replacement map (className => [ "src-tgt" => [srcText => targetText, ...] ])
$localReplaceMap = [
    'weekday' => [
        'ja-en' => [
            '月' => 'Mon','火' => 'Tue','水' => 'Wed','木' => 'Thu','金' => 'Fri','土' => 'Sat','日' => 'Sun',
            '(月)' => '(Mon)','(火)' => '(Tue)','(水)' => '(Wed)','(木)' => '(Thu)','(金)' => '(Fri)','(土)' => '(Sat)','(日)' => '(Sun)',
        ],
    ],
    // Add more mappings by class name as needed
    'holiday' => [
        'ja-en' => [
            '祝' => 'Hol',
        ],
    ],
];
// 日本語以外は英語のマッピングを使用する
$localReplaceMap['weekday']['ja-ko'] = $localReplaceMap['weekday']['ja-en'];
$localReplaceMap['holiday']['ja-ko'] = $localReplaceMap['holiday']['ja-en'];
$localReplaceMap['weekday']['ja-zh-cn'] = $localReplaceMap['weekday']['ja-en'];
$localReplaceMap['holiday']['ja-zh-cn'] = $localReplaceMap['holiday']['ja-en'];
$localReplaceMap['weekday']['ja-zh-tw'] = $localReplaceMap['weekday']['ja-en'];
$localReplaceMap['holiday']['ja-zh-tw'] = $localReplaceMap['holiday']['ja-en'];

libxml_use_internal_errors(true);
$doc = new DOMDocument();
$doc->loadHTML(file_get_contents($input), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
$xpath = new DOMXPath($doc);

// --------------- helper: get access token ---------------
function getAccessToken(&$projectId) {
    // 1) If GOOGLE_APPLICATION_CREDENTIALS env is set, use SA JSON JWT flow
    $saPath = getenv('GOOGLE_APPLICATION_CREDENTIALS');
    if ($saPath && file_exists($saPath)) {
        $sa = json_decode(file_get_contents($saPath), true);
        if (!$sa || empty($sa['client_email']) || empty($sa['private_key'])) {
            fwrite(STDERR, "Invalid service account JSON\n");
            return null;
        }
        $projectId = $sa['project_id'];
        $clientEmail = $sa['client_email'];
        $privateKey = $sa['private_key'];
        $now = time();
        $header = ['alg' => 'RS256', 'typ' => 'JWT'];
        $payload = [
            'iss' => $clientEmail,
            'scope' => 'https://www.googleapis.com/auth/cloud-translation',
            'aud' => 'https://oauth2.googleapis.com/token',
            'iat' => $now,
            'exp' => $now + 3600
        ];
        $b64 = function($d){ return rtrim(strtr(base64_encode($d), '+/', '-_'), '='); };
        $unsigned = $b64(json_encode($header)) . '.' . $b64(json_encode($payload));
        $sigOk = openssl_sign($unsigned, $signature, $privateKey, OPENSSL_ALGO_SHA256);
        if (!$sigOk) { fwrite(STDERR, "OpenSSL sign failed\n"); return null; }
        $jwt = $unsigned . '.' . $b64($signature);
        $post = http_build_query(['grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer','assertion'=>$jwt]);
        $ch = curl_init('https://oauth2.googleapis.com/token');
        curl_setopt_array($ch, [CURLOPT_POST=>true,CURLOPT_POSTFIELDS=>$post,CURLOPT_RETURNTRANSFER=>true,CURLOPT_HTTPHEADER=>['Content-Type: application/x-www-form-urlencoded']]);
        $res = curl_exec($ch);
        curl_close($ch);
        $j = json_decode($res, true);
        if (isset($j['access_token'])) return $j['access_token'];
        fwrite(STDERR, "SA token exchange failed: " . $res . "\n");
        return null;
    }
    // 2) fallback to gcloud ADC token
    $token = trim(shell_exec('gcloud auth application-default print-access-token 2>/dev/null'));
    if ($token) return $token;
    fwrite(STDERR, "No access token (set GOOGLE_APPLICATION_CREDENTIALS or have gcloud ADC available)\n");
    return null;
}

// --------------- 1) apply local replacements for mapped classes ---------------
$langKey = $src . '-' . $tgt;
foreach ($localReplaceMap as $className => $langMap) {
    if (!isset($langMap[$langKey])) continue;
    $replaceMap = $langMap[$langKey];
    $nodes = $xpath->query('//*[contains(concat(" ", normalize-space(@class), " "), " ' . $className . ' ")]');
    foreach ($nodes as $node) {
        $text = trim($node->textContent);
        if ($text !== '' && isset($replaceMap[$text])) {
            $node->nodeValue = $replaceMap[$text];
        }
    }
}

// --------------- 2) collect translatable items (text nodes + attributes), excluding localReplace classes ---------------
$classConditions = [];
foreach (array_keys($localReplaceMap) as $className) {
    $classConditions[] = 'not(ancestor::*[contains(concat(" ", normalize-space(@class), " "), " ' . $className . ' ")])';
}
// Exclude nodes that are inside any element with class "notranslate"
$classConditions[] = 'not(ancestor::*[contains(concat(" ", normalize-space(@class), " "), " notranslate ")])';
$excludeCondition = implode(' and ', $classConditions);

// build xpath for text nodes
$textQuery = '//text()[not(ancestor::script) and not(ancestor::style)';
if ($excludeCondition) $textQuery .= ' and ' . $excludeCondition;
$textQuery .= ']';
$textNodes = $xpath->query($textQuery);

// collect nodes (DOMText)
$items = []; // each item: ['type'=>'text'|'attr','node'=>DOMNode,'attr'=>name,'text'=>string]
foreach ($textNodes as $node) {
    $val = $node->nodeValue;
    if (trim($val) !== '') $items[] = ['type'=>'text','node'=>$node,'text'=>$val];
}

// attributes: traverse elements and collect attributes to translate
$elems = $xpath->query('//*');
foreach ($elems as $el) {
    // skip elements inside localReplace classes
    $insideLocal = false;
    foreach (array_keys($localReplaceMap) as $className) {
        if ($el->hasAttributes()) {
            $cls = $el->getAttribute('class');
            if (preg_match('/\b' . preg_quote($className,'/') . '\b/', $cls)) { $insideLocal = true; break; }
        }
    }
    if ($insideLocal) continue;
    if ($el->hasAttributes()) {
        foreach ($el->attributes as $attr) {
            $aname = strtolower($attr->name);
            if (in_array($aname, $transAttrs)) {
                $val = $attr->value;
                if (trim($val) !== '') {
                    $items[] = ['type'=>'attr','node'=>$el,'attr'=>$aname,'text'=>$val];
                }
            }
        }
    }
}

echo "Collected " . count($items) . " translatable items (text nodes + attributes)\n";

if (count($items) === 0) {
    file_put_contents($output, $doc->saveHTML());
    echo "Nothing to translate. Wrote $output\n";
    exit;
}

// --------------- 3) batch and translate ---------------
$token = getAccessToken($projectId);
if (!$token) exit(1);

$translateEndpoint = "https://translation.googleapis.com/v3/projects/{$projectId}/locations/global:translateText";

function callTranslateAPI($texts, $src, $tgt, $token, $projectId, $endpoint) {
    $payload = [
        'contents' => array_values($texts),
        'sourceLanguageCode' => $src,
        'targetLanguageCode' => $tgt,
        'mimeType' => 'text/plain'
    ];
    $ch = curl_init($endpoint);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => [
            "Authorization: Bearer {$token}",
            "Content-Type: application/json; charset=utf-8",
            "x-goog-user-project: {$projectId}"
        ]
    ]);
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($res === false) return ['error'=>"curl failed"];
    $j = json_decode($res, true);
    if ($code !== 200) return ['error'=>$j?:$res];
    $out = [];
    if (isset($j['translations']) && is_array($j['translations'])) {
        foreach ($j['translations'] as $t) $out[] = $t['translatedText'] ?? '';
    }
    return ['translations'=>$out];
}

// batching
$currentTexts = [];
$currentItems = [];
$currentLen = 0;
$allCount = count($items);
$processed = 0;
for ($i=0;$i<$allCount;$i++) {
    $it = $items[$i];
    $tlen = mb_strlen($it['text']);
    if ($currentLen + $tlen > $MAX_CHARS && count($currentTexts) > 0) {
        // flush
        $res = callTranslateAPI($currentTexts, $src, $tgt, $token, $projectId, $translateEndpoint);
        if (isset($res['error'])) { echo "Translate API error: "; print_r($res['error']); exit(1); }
        $translated = $res['translations'];
        // apply
        foreach ($currentItems as $idx => $citem) {
            $tr = $translated[$idx] ?? '';
            if ($citem['type'] === 'text') {
                $citem['node']->nodeValue = $tr;
            } else {
                // attribute
                $el = $citem['node'];
                $el->setAttribute($citem['attr'], $tr);
            }
            $processed++;
        }
        // reset
        $currentTexts = [];
        $currentItems = [];
        $currentLen = 0;
    }
    // accumulate
    $currentTexts[] = $it['text'];
    $currentItems[] = $it;
    $currentLen += $tlen;
}

// final flush
if (count($currentTexts) > 0) {
    $res = callTranslateAPI($currentTexts, $src, $tgt, $token, $projectId, $translateEndpoint);
    if (isset($res['error'])) { echo "Translate API error: "; print_r($res['error']); exit(1); }
    $translated = $res['translations'];
    foreach ($currentItems as $idx => $citem) {
        $tr = $translated[$idx] ?? '';
        if ($citem['type'] === 'text') {
            $citem['node']->nodeValue = $tr;
        } else {
            $el = $citem['node'];
            $el->setAttribute($citem['attr'], $tr);
        }
        $processed++;
    }
}
// <html>のlang属性を追加
$doc->documentElement->setAttribute('lang', $tgt);
echo "Translated items: $processed\n";
file_put_contents($output, $doc->saveHTML());
echo "Wrote translated file to $output\n";
