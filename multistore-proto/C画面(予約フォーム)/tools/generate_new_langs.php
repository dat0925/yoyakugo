<?php
/**
 * Generate index/confirm/complete/privacy/terms HTML + messages.js for new languages.
 * Usage: php tools/generate_new_langs.php
 */
$baseDir = dirname(__DIR__);
$langs = ['th','tl','vi','id','ms','fr','de','hi','ru','ar','pt'];

require __DIR__ . '/lang_translations.php';

$sources = [
    'index' => 'index_en.html',
    'confirm' => 'confirm_en.html',
    'complete' => 'complete_en.html',
    'privacy' => 'privacy_en.html',
    'terms' => 'terms_en.html',
];

foreach ($langs as $code) {
    if (!isset($TRANSLATIONS[$code])) {
        fwrite(STDERR, "Missing translations for $code\n");
        exit(1);
    }
    $t = $TRANSLATIONS[$code];
    $replacements = buildReplacements($code, $t);

    foreach ($sources as $prefix => $srcFile) {
        $srcPath = $baseDir . DIRECTORY_SEPARATOR . $srcFile;
        if (!is_readable($srcPath)) {
            fwrite(STDERR, "Cannot read $srcPath\n");
            exit(1);
        }
        $content = file_get_contents($srcPath);
        $content = applyReplacements($content, $replacements);
        $content = applyMechanical($content, $code, $t);
        $outFile = $baseDir . DIRECTORY_SEPARATOR . "{$prefix}_{$code}.html";
        file_put_contents($outFile, $content);
        echo "Wrote $outFile\n";
    }

    $msgDir = $baseDir . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'js' . DIRECTORY_SEPARATOR . $code;
    if (!is_dir($msgDir)) {
        mkdir($msgDir, 0777, true);
    }
    $msgEn = file_get_contents($baseDir . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'js' . DIRECTORY_SEPARATOR . 'en' . DIRECTORY_SEPARATOR . 'messages.js');
    $msgOut = applyMapReplacements($msgEn, $t['messages'] ?? []);
    $msgOut = str_replace('./en/', "./{$code}/", $msgOut);
    file_put_contents($msgDir . DIRECTORY_SEPARATOR . 'messages.js', $msgOut);
    echo "Wrote assets/js/{$code}/messages.js\n";
}

function buildReplacements(string $code, array $t): array
{
    $pairs = [];
    foreach ($t['html'] as $en => $tr) {
        $pairs[] = [$en, $tr];
    }
    usort($pairs, fn($a, $b) => strlen($b[0]) - strlen($a[0]));
    return $pairs;
}

function applyReplacements(string $content, array $replacements): string
{
    foreach ($replacements as [$from, $to]) {
        $content = str_replace($from, $to, $content);
    }
    return $content;
}

function applyMapReplacements(string $content, array $map): string
{
    if ($map === []) {
        return $content;
    }
    uksort($map, fn($a, $b) => strlen($b) - strlen($a));
    foreach ($map as $from => $to) {
        $content = str_replace($from, $to, $content);
    }
    return $content;
}

function applyMechanical(string $content, string $code, array $t): string
{
    $content = preg_replace(
        '#\./(index|confirm|complete)_en\.html#',
        './$1_' . $code . '.html',
        $content
    );
    $content = str_replace('./assets/js/en/messages.js', "./assets/js/{$code}/messages.js", $content);

    if (!empty($t['rtl'])) {
        $content = preg_replace(
            '/<html class="no-js" lang="en">/',
            '<html class="no-js" lang="ar" dir="rtl">',
            $content,
            1
        );
    } else {
        $content = preg_replace(
            '/<html class="no-js" lang="en">/',
            '<html class="no-js" lang="' . $code . '">',
            $content,
            1
        );
    }

    // Restore English entry in language switcher
    $content = preg_replace(
        '/data-lang="' . preg_quote($code, '/') . '" data-file="index_' . preg_quote($code, '/') . '\.html">English/',
        'data-lang="en" data-file="index_en.html">English',
        $content
    );

    if (isset($t['current_lang'])) {
        $content = preg_replace(
            '/<span class="language-current" id="currentLang">[^<]*<\/span>/',
            '<span class="language-current" id="currentLang">' . htmlspecialchars($t['current_lang'], ENT_NOQUOTES, 'UTF-8') . '</span>',
            $content,
            1
        );
    }

    return $content;
}

echo "Applying weekday locales...\n";
passthru('php ' . escapeshellarg(__DIR__ . DIRECTORY_SEPARATOR . 'apply_weekday_locale.php'), $weekdayExit);
if ($weekdayExit !== 0) {
    exit($weekdayExit);
}

echo "Applying address locales...\n";
passthru('php ' . escapeshellarg(__DIR__ . DIRECTORY_SEPARATOR . 'apply_address_locale.php'), $addressExit);
if ($addressExit !== 0) {
    exit($addressExit);
}

echo "Done.\n";
