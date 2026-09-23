<?php
declare(strict_types=1);

require __DIR__ . '/lang_translations_bundle.php';

if (!isset($TRANSLATIONS) || !is_array($TRANSLATIONS)) {
    fwrite(STDERR, "TRANSLATIONS not built\n");
    exit(1);
}

$header = <<<'PHP'
<?php
/**
 * Translation map for tools/generate_new_langs.php (str_replace on EN HTML/JS sources).
 * UTF-8. Weekday abbrevs Mon–Sun and PH in HTML/calendar.weekdays stay English per project rules.
 *
 * @var array<string, array{current_lang:string, rtl:bool, html:array<string,string>, messages:array<string,string>}> $TRANSLATIONS
 */
declare(strict_types=1);

$TRANSLATIONS = 

PHP;

$exported = var_export($TRANSLATIONS, true);

file_put_contents(
    __DIR__ . '/lang_translations.php',
    $header . $exported . ";\n",
    LOCK_EX
);

echo 'Wrote lang_translations.php (' . count($TRANSLATIONS) . " languages)\n";
