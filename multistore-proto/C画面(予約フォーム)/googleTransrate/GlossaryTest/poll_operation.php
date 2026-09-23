<?php
// poll_operation.php
// usage: php poll_operation.php OP_NAME
if ($argc < 2) { echo "usage: php {$argv[0]} OP_NAME\n"; exit(1); }
$op = $argv[1];

function getAccessToken() { /* 同 getAccessToken() を上と同様に貼る */
    $sa = getenv('GOOGLE_APPLICATION_CREDENTIALS');
    if ($sa && file_exists($sa)) {
        $j = json_decode(file_get_contents($sa), true);
        $clientEmail = $j['client_email'] ?? null;
        $privateKey = $j['private_key'] ?? null;
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

$opName = $op; // format from create response, e.g. projects/.../locations/.../operations/...
while (true) {
    $url = "https://translation.googleapis.com/v3/{$opName}";
    $ch = curl_init($url);
    curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER=>true, CURLOPT_HTTPHEADER=>["Authorization: Bearer {$token}"]]);
    $res = curl_exec($ch);
    curl_close($ch);
    $j = json_decode($res,true);
    if (isset($j['done']) && $j['done']) {
        echo "Operation done\n";
        echo $res."\n";
        break;
    } else {
        echo "Not done yet; sleeping 3s\n";
        sleep(3);
    }
}
