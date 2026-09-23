// メッセージ定義
var Messages = {
    // カレンダー関連
    calendar: {
        days7: '7 ngày',
        days14: '14 ngày',
        prev: 'Trước',
        next: 'Sau',
        year: 'Năm',
        month: 'Tháng',
        weekdays: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        holiday: 'Lễ',
        weekdays_long: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
        holiday_long: 'Ngày lễ',
        noAvailableSlots: 'Không có khung giờ trống.',
        loading: 'Đang tải...',
        error: 'Lỗi: ',
        fetchFailed: 'Không tải được khung giờ trống.'
    },
    // textエレメントのプレースホルダ
    textPlaceholder: {
        sei: 'Họ',
        mei: 'Tên',
        seikana: 'ヤマダ',
        meikana: 'タロウ',
        tel01: '03',
        tel02: '1111',
        tel03: '1111',
        email: 'example@example.com',
    },
    // バリデーションエラー
    validation: {
        selectMenu: 'Vui lòng chọn thực đơn.',
        selectDateTime: 'Vui lòng chọn ngày và giờ.',
        enterSei: 'Vui lòng nhập họ.',
        enterMei: 'Vui lòng nhập tên.',
        enterSeikana: 'Vui lòng nhập họ (Furigana).',
        enterMeikana: 'Vui lòng nhập tên (Furigana).',
        enterAllPhone: 'Vui lòng nhập số điện thoại.',
        enterEmail: 'Vui lòng nhập địa chỉ email.',
        enterKanjiCorrectly: 'Vui lòng nhập đúng.',
        enterFuriganaCorrectly: 'Vui lòng nhập bằng katakana toàn chiều rộng.',
        enterPhoneCorrectly: 'Vui lòng nhập đúng số điện thoại.',
        enterEmailCorrectly: 'Vui lòng nhập đúng địa chỉ email.',
        // サーバーサイドバリデーションエラーキーとメッセージのマッピング
        errorKeys: {
            selectedDateTimeRequired: 'Vui lòng chọn ngày và giờ.',
            selectedDateTimeInvalid: 'Định dạng ngày giờ không đúng.',
            menuIdRequired: 'Vui lòng chọn thực đơn.',
            menuIdNotANumber: 'Mã thực đơn không đúng.',
            seiRequired: 'Vui lòng nhập họ.',
            seiTooLong: 'Vui lòng nhập họ trong 32 ký tự.',
            seiInvalid: 'Họ không đúng.',
            meiRequired: 'Vui lòng nhập tên.',
            meiTooLong: 'Vui lòng nhập tên trong 32 ký tự.',
            meiInvalid: 'Tên không đúng.',
            seikanaRequired: 'Vui lòng nhập họ (Furigana).',
            seikanaTooLong: 'Vui lòng nhập họ (Furigana) trong 32 ký tự.',
            seikanaInvalid: 'Họ (Furigana) không đúng.',
            meikanaRequired: 'Vui lòng nhập tên (Furigana).',
            meikanaTooLong: 'Vui lòng nhập tên (Furigana) trong 32 ký tự.',
            meikanaInvalid: 'Tên (Furigana) không đúng.',
            emailRequired: 'Vui lòng nhập địa chỉ email.',
            emailInvalid: 'Vui lòng nhập địa chỉ email hợp lệ.',
            emailTooLong: 'Vui lòng nhập email trong 255 ký tự.',
            telNoRequired: 'Vui lòng nhập số điện thoại.',
            telNoInvalid: 'Định dạng số điện thoại không đúng.',
            telNoTooLong: 'Vui lòng nhập số điện thoại trong 13 ký tự.',
            telNoTooShort: 'Vui lòng nhập số điện thoại ít nhất 12 ký tự.',
            commentTooLong: 'Vui lòng nhập ghi chú trong 1000 ký tự.',
            commentInvalid: 'Ghi chú không đúng.',
            seiIncludeEmoji: 'Không cho phép emoji.',
            meiIncludeEmoji: 'Không cho phép emoji.',
            commentIncludeEmoji: 'Không cho phép emoji trong ghi chú.'
        }
    },

    // フォーム送信関連
    form: {
        sending: 'Đang gửi...',
        sendFailed: 'Gửi thất bại.',
        unexpectedLỗi: 'Đã xảy ra lỗi không mong đợi.'
    },

    // html内の記述 ラベルなど
    htmlText: {
        resendLink: 'Gửi lại mã PIN',
    },

    // PINコード関連
    pin: {
        enterCode: 'Vui lòng nhập mã PIN.',
        codeInvalid: 'Mã PIN không đúng. Vui lòng thử lại.',
        codeRetryLimit: 'Đã đạt giới hạn thử lại mã PIN. Vui lòng nhận mã PIN lại.',
        codeExpired: 'Mã PIN đã hết hạn. Vui lòng nhận mã PIN lại.',
        resending: 'Đang gửi lại...',
        resendSuccess: 'Đã gửi lại mã PIN.',
        resendFailed: 'Gửi lại mã PIN thất bại.',
        verifying: 'Đang xác minh...',
        verifySuccess: 'Mã PIN đã nhập đúng.',
        registering: 'Đang đăng ký...',
        registerSuccess: 'Đã đăng ký đặt chỗ.',
        registerFailed: 'Đăng ký đặt chỗ thất bại.'
    },

    // 致命的エラー
    fatalLỗi: {
        sessionExpired: 'Phiên đã hết hạn. Vui lòng bắt đầu đặt chỗ lại.',
        serverLỗi: 'Đã xảy ra lỗi máy chủ.',
    }
};
