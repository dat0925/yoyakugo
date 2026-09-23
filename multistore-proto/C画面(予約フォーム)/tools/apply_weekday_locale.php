<?php
declare(strict_types=1);

/**
 * 全言語HTML・messages.js に曜日・祝日の現地表記を適用する。
 * Usage: php tools/apply_weekday_locale.php
 */

$baseDir = dirname(__DIR__);
$locales = require __DIR__ . '/weekday_locale.php';

$enWeekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
$datePatterns = [
    'December 1 (Mon) 10:30',
    '12月1日（月）10:30',
    '12月1日（一）10:30',
    '12월 1일 (월) 10:30',
];

function detectLangFromBasename(string $basename): ?string
{
    if ($basename === 'index') {
        return 'ja';
    }
    if (preg_match('/^(?:index|confirm|complete|privacy|terms)_(.+)$/', $basename, $m)) {
        return $m[1];
    }
    if (in_array($basename, ['confirm', 'complete', 'privacy', 'terms'], true)) {
        return 'ja';
    }
    return null;
}

function applyWeekdaysToHtml(string $content, array $locale, array $enWeekdays): string
{
    foreach ($enWeekdays as $i => $en) {
        $content = str_replace('<th>' . $en . '</th>', '<th>' . $locale['hours'][$i] . '</th>', $content);
        $content = str_replace('(' . $en . ')', '(' . $locale['cal'][$i] . ')', $content);
    }
    $content = str_replace('<th>PH</th>', '<th>' . $locale['holiday'] . '</th>', $content);

    return $content;
}

function applyConfirmDate(string $content, array $locale, array $datePatterns): string
{
    foreach ($datePatterns as $pattern) {
        $content = str_replace($pattern, $locale['date_confirm'], $content);
    }
    return $content;
}

function applyMessagesJs(string $content, array $locale): string
{
    $wd = "['" . implode("', '", array_map('addslashes', $locale['msg_weekdays'])) . "']";
    $content = preg_replace('/weekdays:\s*\[[^\]]+\]/', 'weekdays: ' . $wd, $content, 1);
    $holiday = addslashes($locale['msg_holiday']);
    $content = preg_replace("/holiday:\s*'[^']*'/", "holiday: '" . $holiday . "'", $content, 1);
    return $content;
}

// --- index / confirm / complete HTML ---
$htmlNames = array_merge(
    ['index', 'confirm', 'complete'],
    array_map(fn($c) => 'index_' . $c, array_keys($locales)),
    array_map(fn($c) => 'confirm_' . $c, array_keys($locales)),
    array_map(fn($c) => 'complete_' . $c, array_keys($locales))
);
$htmlNames = array_unique($htmlNames);

foreach ($htmlNames as $name) {
    $lang = detectLangFromBasename($name);
    if ($lang === null || !isset($locales[$lang])) {
        continue;
    }
    $path = $baseDir . DIRECTORY_SEPARATOR . $name . '.html';
    if (!is_readable($path)) {
        continue;
    }
    $locale = $locales[$lang];
    $content = file_get_contents($path);

    if (str_starts_with($name, 'index')) {
        $content = applyWeekdaysToHtml($content, $locale, $enWeekdays);
    }
    if (str_starts_with($name, 'confirm') || str_starts_with($name, 'complete')) {
        $content = applyConfirmDate($content, $locale, $datePatterns);
    }

    file_put_contents($path, $content);
    echo "Updated {$name}.html [{$lang}]\n";
}

// --- messages.js ---
foreach ($locales as $code => $locale) {
    $msgPath = $baseDir . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'js'
        . DIRECTORY_SEPARATOR . $code . DIRECTORY_SEPARATOR . 'messages.js';
    if (!is_readable($msgPath)) {
        continue;
    }
    $content = applyMessagesJs(file_get_contents($msgPath), $locale);
    file_put_contents($msgPath, $content);
    echo "Updated assets/js/{$code}/messages.js\n";
}

echo "Done.\n";
