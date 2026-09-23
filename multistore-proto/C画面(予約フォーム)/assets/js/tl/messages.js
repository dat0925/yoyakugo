// メッセージ定義
var Messages = {
    // カレンダー関連
    calendar: {
        days7: '7 araw',
        days14: '14 araw',
        prev: 'Nakaraan',
        next: 'Susunod',
        year: 'Taon',
        month: 'Buwan',
        weekdays: ['Lin', 'Lun', 'Mar', 'Miy', 'Huw', 'Biy', 'Sab'],
        holiday: 'Hol',
        weekdays_long: ['Linggo', 'Lunes', 'Martes', 'Miyerkules', 'Huwebes', 'Biyernes', 'Sabado'],
        holiday_long: 'Pampublikong Holiday',
        noAvailableSlots: 'Walang available na slot.',
        loading: 'Naglo-load...',
        error: 'Error: ',
        fetchFailed: 'Hindi makuha ang available na slot.'
    },
    // textエレメントのプレースホルダ
    textPlaceholder: {
        sei: 'Apelyido',
        mei: 'Pangalan',
        seikana: 'ヤマダ',
        meikana: 'タロウ',
        tel01: '03',
        tel02: '1111',
        tel03: '1111',
        email: 'example@example.com',
    },
    // バリデーションエラー
    validation: {
        selectMenu: 'Mangyaring pumili ng menu.',
        selectDateTime: 'Mangyaring pumili ng petsa at oras.',
        enterSei: 'Ilagay ang inyong apelyido.',
        enterMei: 'Ilagay ang inyong pangalan.',
        enterSeikana: 'Ilagay ang inyong apelyido (Furigana).',
        enterMeikana: 'Ilagay ang inyong pangalan (Furigana).',
        enterAllPhone: 'Ilagay ang numero ng telepono.',
        enterEmail: 'Ilagay ang email address.',
        enterKanjiCorrectly: 'Ilagay nang tama.',
        enterFuriganaCorrectly: 'Ilagay sa full-width katakana.',
        enterPhoneCorrectly: 'Ilagay nang tama ang numero ng telepono.',
        enterEmailCorrectly: 'Ilagay nang tama ang email address.',
        // サーバーサイドバリデーションエラーキーとメッセージのマッピング
        errorKeys: {
            selectedDateTimeRequired: 'Mangyaring pumili ng petsa at oras.',
            selectedDateTimeInvalid: 'Hindi tama ang format ng petsa at oras.',
            menuIdRequired: 'Mangyaring pumili ng menu.',
            menuIdNotANumber: 'Hindi tama ang menu ID.',
            seiRequired: 'Ilagay ang inyong apelyido.',
            seiTooLong: 'Ilagay ang apelyido sa loob ng 32 character.',
            seiInvalid: 'Hindi tama ang apelyido.',
            meiRequired: 'Ilagay ang inyong pangalan.',
            meiTooLong: 'Ilagay ang pangalan sa loob ng 32 character.',
            meiInvalid: 'Hindi tama ang pangalan.',
            seikanaRequired: 'Ilagay ang inyong apelyido (Furigana).',
            seikanaTooLong: 'Ilagay ang apelyido (Furigana) sa loob ng 32 character.',
            seikanaInvalid: 'Hindi tama ang apelyido (Furigana).',
            meikanaRequired: 'Ilagay ang inyong pangalan (Furigana).',
            meikanaTooLong: 'Ilagay ang pangalan (Furigana) sa loob ng 32 character.',
            meikanaInvalid: 'Hindi tama ang pangalan (Furigana).',
            emailRequired: 'Ilagay ang email address.',
            emailInvalid: 'Maglagay ng valid na email address.',
            emailTooLong: 'Ilagay ang email sa loob ng 255 character.',
            telNoRequired: 'Ilagay ang numero ng telepono.',
            telNoInvalid: 'Hindi tama ang format ng numero ng telepono.',
            telNoTooLong: 'Ilagay ang telepono sa loob ng 13 character.',
            telNoTooShort: 'Ilagay ang telepono nang hindi bababa sa 12 character.',
            commentTooLong: 'Ilagay ang komento sa loob ng 1000 character.',
            commentInvalid: 'Hindi tama ang komento.',
            seiIncludeEmoji: 'Hindi pinapayagan ang emoji.',
            meiIncludeEmoji: 'Hindi pinapayagan ang emoji.',
            commentIncludeEmoji: 'Hindi pinapayagan ang emoji sa komento.'
        }
    },

    // フォーム送信関連
    form: {
        sending: 'Nagpapadala...',
        sendFailed: 'Hindi naipadala.',
        unexpectedError: 'May hindi inaasahang error.'
    },

    // html内の記述 ラベルなど
    htmlText: {
        resendLink: 'Ipadala muli ang PIN code',
    },

    // PINコード関連
    pin: {
        enterCode: 'Ilagay ang PIN code.',
        codeInvalid: 'Hindi tama ang PIN code. Subukan muli.',
        codeRetryLimit: 'Naabot na ang limit ng muling pag-subok ng PIN. Kunin muli ang PIN code.',
        codeExpired: 'Nag-expire na ang PIN code. Kunin muli ang PIN code.',
        resending: 'Nagpapadala muli...',
        resendSuccess: 'Naipadala muli ang PIN code.',
        resendFailed: 'Hindi naipadala muli ang PIN code.',
        verifying: 'Bine-verify...',
        verifySuccess: 'Tama ang PIN code.',
        registering: 'Nagrerehistro...',
        registerSuccess: 'Narehistro ang reserbasyon.',
        registerFailed: 'Hindi narehistro ang reserbasyon.'
    },

    // 致命的エラー
    fatalError: {
        sessionExpired: 'Nag-expire ang session. Simulan muli ang reserbasyon.',
        serverError: 'May server error.',
    }
};
