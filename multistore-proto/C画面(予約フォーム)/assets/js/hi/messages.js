// メッセージ定義
var Messages = {
    // カレンダー関連
    calendar: {
        days7: '7 दिन',
        days14: '14 दिन',
        prev: 'पिछला',
        next: 'अगला',
        year: 'वर्ष',
        month: 'महीना',
        weekdays: ['र.', 'सो.', 'मं.', 'बु.', 'गु.', 'शु.', 'श.'],
        holiday: 'छु.',
        weekdays_long: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
        holiday_long: 'सार्वजनिक अवकाश',
        noAvailableSlots: 'कोई उपलब्ध स्लॉट नहीं।',
        loading: 'लोड हो रहा है...',
        error: 'त्रुटि: ',
        fetchFailed: 'उपलब्ध स्लॉट प्राप्त करने में विफल।'
    },
    // textエレメントのプレースホルダ
    textPlaceholder: {
        sei: 'उपनाम',
        mei: 'नाम',
        seikana: 'ヤマダ',
        meikana: 'タロウ',
        tel01: '03',
        tel02: '1111',
        tel03: '1111',
        email: 'example@example.com',
    },
    // バリデーションエラー
    validation: {
        selectMenu: 'कृपया मेनू चुनें।',
        selectDateTime: 'कृपया दिनांक और समय चुनें।',
        enterSei: 'कृपया उपनाम दर्ज करें।',
        enterMei: 'कृपया नाम दर्ज करें।',
        enterSeikana: 'कृपया उपनाम (फुरिगाना) दर्ज करें।',
        enterMeikana: 'कृपया नाम (फुरिगाना) दर्ज करें।',
        enterAllPhone: 'कृपया फ़ोन नंबर दर्ज करें।',
        enterEmail: 'कृपया ईमेल पता दर्ज करें।',
        enterKanjiCorrectly: 'कृपया सही दर्ज करें।',
        enterFuriganaCorrectly: 'कृपया पूर्ण-चौड़ाई कटाकाना में दर्ज करें।',
        enterPhoneCorrectly: 'कृपया फ़ोन नंबर सही दर्ज करें।',
        enterEmailCorrectly: 'कृपया ईमेल पता सही दर्ज करें।',
        // サーバーサイドバリデーションエラーキーとメッセージのマッピング
        errorKeys: {
            selectedDateTimeRequired: 'कृपया दिनांक और समय चुनें।',
            selectedDateTimeInvalid: 'दिनांक और समय प्रारूप गलत है।',
            menuIdRequired: 'कृपया मेनू चुनें।',
            menuIdNotANumber: 'मेनू ID गलत है।',
            seiRequired: 'कृपया उपनाम दर्ज करें।',
            seiTooLong: 'कृपया उपनाम 32 वर्णों में दर्ज करें।',
            seiInvalid: 'उपनाम गलत है।',
            meiRequired: 'कृपया नाम दर्ज करें।',
            meiTooLong: 'कृपया नाम 32 वर्णों में दर्ज करें।',
            meiInvalid: 'नाम गलत है।',
            seikanaRequired: 'कृपया उपनाम (फुरिगाना) दर्ज करें।',
            seikanaTooLong: 'कृपया उपनाम (फुरिगाना) 32 वर्णों में दर्ज करें।',
            seikanaInvalid: 'उपनाम (फुरिगाना) गलत है।',
            meikanaRequired: 'कृपया नाम (फुरिगाना) दर्ज करें।',
            meikanaTooLong: 'कृपया नाम (फुरिगाना) 32 वर्णों में दर्ज करें।',
            meikanaInvalid: 'नाम (फुरिगाना) गलत है।',
            emailRequired: 'कृपया ईमेल पता दर्ज करें।',
            emailInvalid: 'कृपया मान्य ईमेल पता दर्ज करें।',
            emailTooLong: 'कृपया ईमेल 255 वर्णों में दर्ज करें।',
            telNoRequired: 'कृपया फ़ोन नंबर दर्ज करें।',
            telNoInvalid: 'फ़ोन नंबर प्रारूप गलत है।',
            telNoTooLong: 'कृपया फ़ोन नंबर 13 वर्णों में दर्ज करें।',
            telNoTooShort: 'कृपया फ़ोन नंबर कम से कम 12 वर्णों में दर्ज करें।',
            commentTooLong: 'कृपया टिप्पणी 1000 वर्णों में दर्ज करें।',
            commentInvalid: 'टिप्पणी गलत है।',
            seiIncludeEmoji: 'इमोजी अनुमत नहीं।',
            meiIncludeEmoji: 'इमोजी अनुमत नहीं।',
            commentIncludeEmoji: 'टिप्पणी में इमोजी अनुमत नहीं।'
        }
    },

    // フォーム送信関連
    form: {
        sending: 'भेजा जा रहा है...',
        sendFailed: 'भेजने में विफल।',
        unexpectedत्रुटि: 'अप्रत्याशित त्रुटि हुई।'
    },

    // html内の記述 ラベルなど
    htmlText: {
        resendLink: 'PIN कोड पुनः भेजें',
    },

    // PINコード関連
    pin: {
        enterCode: 'कृपया PIN कोड दर्ज करें।',
        codeInvalid: 'PIN कोड गलत है। पुनः प्रयास करें।',
        codeRetryLimit: 'PIN कोड पुनः प्रयास सीमा पूरी। कृपया PIN कोड पुनः प्राप्त करें।',
        codeExpired: 'PIN कोड समाप्त। कृपया PIN कोड पुनः प्राप्त करें।',
        resending: 'पुनः भेजा जा रहा है...',
        resendSuccess: 'PIN कोड पुनः भेजा गया।',
        resendFailed: 'PIN कोड पुनः भेजने में विफल।',
        verifying: 'सत्यापित हो रहा है...',
        verifySuccess: 'PIN कोड सही दर्ज किया गया।',
        registering: 'पंजीकरण हो रहा है...',
        registerSuccess: 'आरक्षण पंजीकृत हुआ।',
        registerFailed: 'आरक्षण पंजीकरण विफल।'
    },

    // 致命的エラー
    fatalत्रुटि: {
        sessionExpired: 'सत्र समाप्त। कृपया आरक्षण पुनः शुरू करें।',
        serverत्रुटि: 'सर्वर त्रुटि हुई।',
    }
};
