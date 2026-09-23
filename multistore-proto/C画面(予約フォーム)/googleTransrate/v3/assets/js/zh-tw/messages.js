// 訊息定義（繁體中文）
var Messages = {
    // 日曆相關
    calendar: {
        days7: '7天',
        days14: '14天',
        prev: '上一頁',
        next: '下一頁',
        year: '年',
        month: '月',
        weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        noAvailableSlots: '暫無可用時段。',
        loading: '載入中...',
        error: '錯誤：',
        fetchFailed: '取得可用時段失敗。'
    },
    // 輸入框佔位符
    textPlaceholder: {
        sei: '姓',
        mei: '名',
        seikana: 'ヤマダ',
        meikana: 'タロウ',
        tel01: '03',
        tel02: '1111',
        tel03: '1111',
        email: 'example@example.com',
    },
    // 驗證錯誤
    validation: {
        selectMenu: '請選擇項目。',
        selectDateTime: '請選擇日期與時間。',
        enterSei: '請輸入姓。',
        enterMei: '請輸入名。',
        enterSeikana: '請輸入姓（假名）。',
        enterMeikana: '請輸入名（假名）。',
        enterAllPhone: '請輸入電話號碼。',
        enterEmail: '請輸入電子郵件。',
        enterKanjiCorrectly: '請正確輸入。',
        enterFuriganaCorrectly: '請使用全形片假名輸入。',
        enterPhoneCorrectly: '請正確輸入電話號碼。',
        enterEmailCorrectly: '請正確輸入電子郵件。',
        errorKeys: {
            selectedDateTimeRequired: '請選擇日期與時間。',
            selectedDateTimeInvalid: '日期時間格式不正確。',
            menuIdRequired: '請選擇項目。',
            menuIdNotANumber: '項目ID不正確。',
            seiRequired: '請輸入姓。',
            seiTooLong: '姓請在32字以內輸入。',
            seiInvalid: '姓輸入不正確。',
            meiRequired: '請輸入名。',
            meiTooLong: '名請在32字以內輸入。',
            meiInvalid: '名輸入不正確。',
            seikanaRequired: '請輸入姓（假名）。',
            seikanaTooLong: '姓（假名）請在32字以內輸入。',
            seikanaInvalid: '姓（假名）輸入不正確。',
            meikanaRequired: '請輸入名（假名）。',
            meikanaTooLong: '名（假名）請在32字以內輸入。',
            meikanaInvalid: '名（假名）輸入不正確。',
            emailRequired: '請輸入電子郵件。',
            emailInvalid: '請輸入有效的電子郵件。',
            emailTooLong: '電子郵件請在255字以內輸入。',
            telNoRequired: '請輸入電話號碼。',
            telNoInvalid: '電話號碼格式不正確。',
            telNoTooLong: '電話號碼請在13字以內輸入。',
            telNoTooShort: '電話號碼請至少輸入12位。',
            commentTooLong: '備註請在1000字以內輸入。',
            commentInvalid: '備註內容不正確。',
            seiIncludeEmoji: '不可使用表情符號。',
            meiIncludeEmoji: '不可使用表情符號。',
            commentIncludeEmoji: '備註中不可使用表情符號。'
        }
    },

    // 表單送出相關
    form: {
        sending: '送出中...',
        sendFailed: '送出失敗。',
        unexpectedError: '發生未預期的錯誤。'
    },

    // HTML內標籤等
    htmlText: {
        resendLink: '重新發送驗證碼',
    },

    // PIN碼相關
    pin: {
        enterCode: '請輸入驗證碼。',
        codeInvalid: '驗證碼錯誤，請重新輸入。',
        codeRetryLimit: '驗證碼重試次數已達上限，請重新取得驗證碼。',
        codeExpired: '驗證碼已過期，請重新取得驗證碼。',
        resending: '重新發送中...',
        resendSuccess: '驗證碼已重新發送。',
        resendFailed: '驗證碼重新發送失敗。',
        verifying: '驗證中...',
        verifySuccess: '驗證碼輸入正確。',
        registering: '預約登記中...',
        registerSuccess: '預約已登記。',
        registerFailed: '預約登記失敗。'
    },

    // 嚴重錯誤
    fatalError: {
        sessionExpired: '工作階段已過期，請重新開始預約。',
        serverError: '伺服器發生錯誤。',
    }
};
