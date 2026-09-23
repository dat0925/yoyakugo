// 消息定义（简体中文）
var Messages = {
    // 日历相关
    calendar: {
        days7: '7天',
        days14: '14天',
        prev: '上一页',
        next: '下一页',
        year: '年',
        month: '月',
        weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        noAvailableSlots: '暂无可用时段。',
        loading: '加载中...',
        error: '错误：',
        fetchFailed: '获取可用时段失败。'
    },
    // 输入框占位符
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
    // 验证错误
    validation: {
        selectMenu: '请选择项目。',
        selectDateTime: '请选择日期和时间。',
        enterSei: '请输入姓。',
        enterMei: '请输入名。',
        enterSeikana: '请输入姓（假名）。',
        enterMeikana: '请输入名（假名）。',
        enterAllPhone: '请输入电话号码。',
        enterEmail: '请输入电子邮箱。',
        enterKanjiCorrectly: '请正确输入。',
        enterFuriganaCorrectly: '请使用全角片假名输入。',
        enterPhoneCorrectly: '请正确输入电话号码。',
        enterEmailCorrectly: '请正确输入电子邮箱。',
        errorKeys: {
            selectedDateTimeRequired: '请选择日期和时间。',
            selectedDateTimeInvalid: '日期时间格式不正确。',
            menuIdRequired: '请选择项目。',
            menuIdNotANumber: '项目ID不正确。',
            seiRequired: '请输入姓。',
            seiTooLong: '姓请在32字以内输入。',
            seiInvalid: '姓输入不正确。',
            meiRequired: '请输入名。',
            meiTooLong: '名请在32字以内输入。',
            meiInvalid: '名输入不正确。',
            seikanaRequired: '请输入姓（假名）。',
            seikanaTooLong: '姓（假名）请在32字以内输入。',
            seikanaInvalid: '姓（假名）输入不正确。',
            meikanaRequired: '请输入名（假名）。',
            meikanaTooLong: '名（假名）请在32字以内输入。',
            meikanaInvalid: '名（假名）输入不正确。',
            emailRequired: '请输入电子邮箱。',
            emailInvalid: '请输入有效的电子邮箱。',
            emailTooLong: '电子邮箱请在255字以内输入。',
            telNoRequired: '请输入电话号码。',
            telNoInvalid: '电话号码格式不正确。',
            telNoTooLong: '电话号码请在13字以内输入。',
            telNoTooShort: '电话号码请至少输入12位。',
            commentTooLong: '备注请在1000字以内输入。',
            commentInvalid: '备注内容不正确。',
            seiIncludeEmoji: '不可使用表情符号。',
            meiIncludeEmoji: '不可使用表情符号。',
            commentIncludeEmoji: '备注中不可使用表情符号。'
        }
    },

    // 表单提交相关
    form: {
        sending: '提交中...',
        sendFailed: '提交失败。',
        unexpectedError: '发生意外错误。'
    },

    // HTML内标签等
    htmlText: {
        resendLink: '重新发送验证码',
    },

    // PIN码相关
    pin: {
        enterCode: '请输入验证码。',
        codeInvalid: '验证码错误，请重新输入。',
        codeRetryLimit: '验证码重试次数已达上限，请重新获取验证码。',
        codeExpired: '验证码已过期，请重新获取验证码。',
        resending: '重新发送中...',
        resendSuccess: '验证码已重新发送。',
        resendFailed: '验证码重新发送失败。',
        verifying: '验证中...',
        verifySuccess: '验证码输入正确。',
        registering: '预约登记中...',
        registerSuccess: '预约已登记。',
        registerFailed: '预约登记失败。'
    },

    // 严重错误
    fatalError: {
        sessionExpired: '会话已过期，请重新开始预约。',
        serverError: '服务器发生错误。',
    }
};
