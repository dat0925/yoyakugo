// メッセージ定義
var Messages = {
    // カレンダー関連
    calendar: {
        days7: '7 days',
        days14: '14 days',
        prev: 'Previous',
        next: 'Next',
        year: 'Year',
        month: 'Month',
        weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        noAvailableSlots: 'No available slots.',
        loading: 'Loading...',
        error: 'Error: ',
        fetchFailed: 'Failed to fetch available slots.'
    },
    // textエレメントのプレースホルダ
    textPlaceholder: {
        sei: 'Last Name',
        mei: 'First Name',
        seikana: 'ヤマダ',
        meikana: 'タロウ',
        tel01: '03',
        tel02: '1111',
        tel03: '1111',
        email: 'example@example.com',
    },
    // バリデーションエラー
    validation: {
        selectMenu: 'Please select a menu.',
        selectDateTime: 'Please select a date and time.',
        enterSei: 'Please enter your last name.',
        enterMei: 'Please enter your first name.',
        enterSeikana: 'Please enter your last name (Furigana).',
        enterMeikana: 'Please enter your first name (Furigana).',
        enterAllPhone: 'Please enter your phone number.',
        enterEmail: 'Please enter your email address.',
        enterKanjiCorrectly: 'Please enter correctly.',
        enterFuriganaCorrectly: 'Please enter in full-width katakana.',
        enterPhoneCorrectly: 'Please enter your phone number correctly.',
        enterEmailCorrectly: 'Please enter your email address correctly.',
        // サーバーサイドバリデーションエラーキーとメッセージのマッピング
        errorKeys: {
            selectedDateTimeRequired: 'Please select a date and time.',
            selectedDateTimeInvalid: 'The date and time format is incorrect.',
            menuIdRequired: 'Please select a menu.',
            menuIdNotANumber: 'The menu ID is incorrect.',
            seiRequired: 'Please enter your last name.',
            seiTooLong: 'Please enter your last name within 32 characters.',
            seiInvalid: 'The last name is incorrect.',
            meiRequired: 'Please enter your first name.',
            meiTooLong: 'Please enter your first name within 32 characters.',
            meiInvalid: 'The first name is incorrect.',
            seikanaRequired: 'Please enter your last name (Furigana).',
            seikanaTooLong: 'Please enter your last name (Furigana) within 32 characters.',
            seikanaInvalid: 'The last name (Furigana) is incorrect.',
            meikanaRequired: 'Please enter your first name (Furigana).',
            meikanaTooLong: 'Please enter your first name (Furigana) within 32 characters.',
            meikanaInvalid: 'The first name (Furigana) is incorrect.',
            emailRequired: 'Please enter your email address.',
            emailInvalid: 'Please enter a valid email address.',
            emailTooLong: 'Please enter your email address within 255 characters.',
            telNoRequired: 'Please enter your phone number.',
            telNoInvalid: 'The phone number format is incorrect.',
            telNoTooLong: 'Please enter your phone number within 13 characters.',
            telNoTooShort: 'Please enter your phone number at least 12 characters.',
            commentTooLong: 'Please enter your comment within 1000 characters.',
            commentInvalid: 'The comment is incorrect.',
            seiIncludeEmoji: 'Emoji is not allowed.',
            meiIncludeEmoji: 'Emoji is not allowed.',
            commentIncludeEmoji: 'Emoji is not allowed in the comment.'
        }
    },

    // フォーム送信関連
    form: {
        sending: 'Sending...',
        sendFailed: 'Failed to send.',
        unexpectedError: 'An unexpected error occurred.'
    },

    // html内の記述 ラベルなど
    htmlText: {
        resendLink: 'Resend PIN code',
    },

    // PINコード関連
    pin: {
        enterCode: 'Please enter the PIN code.',
        codeInvalid: 'The PIN code is incorrect. Please try again.',
        codeRetryLimit: 'The PIN code retry limit has been reached. Please receive the PIN code again.',
        codeExpired: 'The PIN code has expired. Please receive the PIN code again.',
        resending: 'Resending...',
        resendSuccess: 'The PIN code has been resent.',
        resendFailed: 'Failed to resend the PIN code.',
        verifying: 'Verifying...',
        verifySuccess: 'The PIN code has been entered correctly.',
        registering: 'Registering...',
        registerSuccess: 'The reservation has been registered.',
        registerFailed: 'Failed to register the reservation.'
    },

    // 致命的エラー
    fatalError: {
        sessionExpired: 'The session has expired. Please start the reservation again.',
        serverError: 'A server error occurred.',
    }
};
