// メッセージ定義
var Messages = {
    // カレンダー関連
    calendar: {
        days7: '7 Tage',
        days14: '14 Tage',
        prev: 'Zurück',
        next: 'Weiter',
        year: 'Jahr',
        month: 'Monat',
        weekdays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        holiday: 'Fei',
        weekdays_long: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        holiday_long: 'Feiertag',
        noAvailableSlots: 'Keine verfügbaren Termine.',
        loading: 'Wird geladen...',
        error: 'Fehler: ',
        fetchFailed: 'Verfügbare Termine konnten nicht abgerufen werden.'
    },
    // textエレメントのプレースホルダ
    textPlaceholder: {
        sei: 'Nachname',
        mei: 'Vorname',
        seikana: 'ヤマダ',
        meikana: 'タロウ',
        tel01: '03',
        tel02: '1111',
        tel03: '1111',
        email: 'example@example.com',
    },
    // バリデーションエラー
    validation: {
        selectMenu: 'Bitte wählen Sie ein Menü.',
        selectDateTime: 'Bitte wählen Sie Datum und Uhrzeit.',
        enterSei: 'Bitte geben Sie Ihren Nachnamen ein.',
        enterMei: 'Bitte geben Sie Ihren Vornamen ein.',
        enterSeikana: 'Bitte geben Sie Ihren Nachnamen (Furigana) ein.',
        enterMeikana: 'Bitte geben Sie Ihren Vornamen (Furigana) ein.',
        enterAllPhone: 'Bitte geben Sie Ihre Telefonnummer ein.',
        enterEmail: 'Bitte geben Sie Ihre E-Mail-Adresse ein.',
        enterKanjiCorrectly: 'Bitte geben Sie korrekt ein.',
        enterFuriganaCorrectly: 'Bitte in vollbreiter Katakana eingeben.',
        enterPhoneCorrectly: 'Bitte geben Sie Ihre Telefonnummer korrekt ein.',
        enterEmailCorrectly: 'Bitte geben Sie Ihre E-Mail-Adresse korrekt ein.',
        // サーバーサイドバリデーションエラーキーとメッセージのマッピング
        errorKeys: {
            selectedDateTimeRequired: 'Bitte wählen Sie Datum und Uhrzeit.',
            selectedDateTimeInvalid: 'Das Datums- und Zeitformat ist falsch.',
            menuIdRequired: 'Bitte wählen Sie ein Menü.',
            menuIdNotANumber: 'Die Menü-ID ist falsch.',
            seiRequired: 'Bitte geben Sie Ihren Nachnamen ein.',
            seiTooLong: 'Bitte geben Sie Ihren Nachnamen in maximal 32 Zeichen ein.',
            seiInvalid: 'Der Nachname ist falsch.',
            meiRequired: 'Bitte geben Sie Ihren Vornamen ein.',
            meiTooLong: 'Bitte geben Sie Ihren Vornamen in maximal 32 Zeichen ein.',
            meiInvalid: 'Der Vorname ist falsch.',
            seikanaRequired: 'Bitte geben Sie Ihren Nachnamen (Furigana) ein.',
            seikanaTooLong: 'Bitte geben Sie Ihren Nachnamen (Furigana) in maximal 32 Zeichen ein.',
            seikanaInvalid: 'Der Nachname (Furigana) ist falsch.',
            meikanaRequired: 'Bitte geben Sie Ihren Vornamen (Furigana) ein.',
            meikanaTooLong: 'Bitte geben Sie Ihren Vornamen (Furigana) in maximal 32 Zeichen ein.',
            meikanaInvalid: 'Der Vorname (Furigana) ist falsch.',
            emailRequired: 'Bitte geben Sie Ihre E-Mail-Adresse ein.',
            emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
            emailTooLong: 'Bitte geben Sie Ihre E-Mail in maximal 255 Zeichen ein.',
            telNoRequired: 'Bitte geben Sie Ihre Telefonnummer ein.',
            telNoInvalid: 'Das Telefonnummernformat ist falsch.',
            telNoTooLong: 'Bitte geben Sie Ihre Telefonnummer in maximal 13 Zeichen ein.',
            telNoTooShort: 'Bitte geben Sie Ihre Telefonnummer in mindestens 12 Zeichen ein.',
            commentTooLong: 'Bitte geben Sie Ihren Kommentar in maximal 1000 Zeichen ein.',
            commentInvalid: 'Der Kommentar ist falsch.',
            seiIncludeEmoji: 'Emoji sind nicht erlaubt.',
            meiIncludeEmoji: 'Emoji sind nicht erlaubt.',
            commentIncludeEmoji: 'Emoji sind im Kommentar nicht erlaubt.'
        }
    },

    // フォーム送信関連
    form: {
        sending: 'Wird gesendet...',
        sendFailed: 'Senden fehlgeschlagen.',
        unexpectedFehler: 'Ein unerwarteter Fehler ist aufgetreten.'
    },

    // html内の記述 ラベルなど
    htmlText: {
        resendLink: 'PIN-Code erneut senden',
    },

    // PINコード関連
    pin: {
        enterCode: 'Bitte geben Sie den PIN-Code ein.',
        codeInvalid: 'Der PIN-Code ist falsch. Bitte versuchen Sie es erneut.',
        codeRetryLimit: 'Das Wiederholungslimit für den PIN-Code wurde erreicht. Bitte erhalten Sie den PIN-Code erneut.',
        codeExpired: 'Der PIN-Code ist abgelaufen. Bitte erhalten Sie den PIN-Code erneut.',
        resending: 'Wird erneut gesendet...',
        resendSuccess: 'Der PIN-Code wurde erneut gesendet.',
        resendFailed: 'Erneutes Senden des PIN-Codes fehlgeschlagen.',
        verifying: 'Wird überprüft...',
        verifySuccess: 'Der PIN-Code wurde korrekt eingegeben.',
        registering: 'Wird registriert...',
        registerSuccess: 'Die Reservierung wurde registriert.',
        registerFailed: 'Registrierung der Reservierung fehlgeschlagen.'
    },

    // 致命的エラー
    fatalFehler: {
        sessionExpired: 'Die Sitzung ist abgelaufen. Bitte starten Sie die Reservierung erneut.',
        serverFehler: 'Ein Serverfehler ist aufgetreten.',
    }
};
