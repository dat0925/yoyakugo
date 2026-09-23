<?php
declare(strict_types=1);

/**
 * index*.html の shopinfo 住所を各言語の現地自然表記に置換する。
 * Usage: php tools/apply_address_locale.php
 */

$baseDir = dirname(__DIR__);
$addresses = require __DIR__ . '/address_locale.php';

function detectIndexLang(string $basename): ?string
{
    if ($basename === 'index') {
        return 'ja';
    }
    if (preg_match('/^index_(.+)$/', $basename, $m)) {
        return $m[1];
    }
    return null;
}

function applyAddress(string $content, string $address): string
{
    $replaced = preg_replace(
        '/(<div class="container shopinfo">\s*<div>)[^<]+(<\/div>)/',
        '$1' . $address . '$2',
        $content,
        1,
        $count
    );
    return ($count > 0 && $replaced !== null) ? $replaced : $content;
}

$files = glob($baseDir . DIRECTORY_SEPARATOR . 'index*.html') ?: [];
foreach ($files as $path) {
    $basename = basename($path, '.html');
    if ($basename === 'index_main') {
        continue;
    }
    $lang = detectIndexLang($basename);
    if ($lang === null || !isset($addresses[$lang])) {
        fwrite(STDERR, "Skip {$basename}.html (unknown lang)\n");
        continue;
    }
    $content = file_get_contents($path);
    $updated = applyAddress($content, $addresses[$lang]);
    if ($updated !== $content) {
        file_put_contents($path, $updated);
        echo "Updated {$basename}.html [{$lang}]\n";
    } else {
        fwrite(STDERR, "No shopinfo match in {$basename}.html\n");
    }
}

echo "Done.\n";
