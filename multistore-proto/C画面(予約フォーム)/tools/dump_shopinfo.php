<?php
$base = dirname(__DIR__);
$files = ['index_ko.html','index_zh-cn.html','index_th.html','index_ar.html','index.html','index_en.html'];
foreach ($files as $f) {
    echo "=== $f ===\n";
    $lines = file($base . DIRECTORY_SEPARATOR . $f);
    for ($i = 87; $i <= 91 && $i < count($lines); $i++) {
        echo ($i + 1) . ': ' . rtrim($lines[$i], "\r\n") . "\n";
    }
}
