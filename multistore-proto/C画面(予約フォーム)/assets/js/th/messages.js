// メッセージ定義
var Messages = {
    // カレンダー関連
    calendar: {
        days7: '7 วัน',
        days14: '14 วัน',
        prev: 'ก่อนหน้า',
        next: 'ถัดไป',
        year: 'ปี',
        month: 'เดือน',
        weekdays: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
        holiday: 'หยุด',
        weekdays_long: ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'],
        holiday_long: 'วันหยุดนักขัตฤกษ์',
        noAvailableSlots: 'ไม่มีช่วงเวลาว่าง',
        loading: 'กำลังโหลด...',
        error: 'ข้อผิดพลาด: ',
        fetchFailed: 'ไม่สามารถดึงช่วงเวลาว่างได้'
    },
    // textエレメントのプレースホルダ
    textPlaceholder: {
        sei: 'นามสกุล',
        mei: 'ชื่อ',
        seikana: 'ヤマダ',
        meikana: 'タロウ',
        tel01: '03',
        tel02: '1111',
        tel03: '1111',
        email: 'example@example.com',
    },
    // バリデーションエラー
    validation: {
        selectMenu: 'กรุณาเลือกเมนู',
        selectDateTime: 'กรุณาเลือกวันที่และเวลา',
        enterSei: 'กรุณากรอกนามสกุล',
        enterMei: 'กรุณากรอกชื่อ',
        enterSeikana: 'กรุณากรอกนามสกุล (ฟูริงานะ)',
        enterMeikana: 'กรุณากรอกชื่อ (ฟูริงานะ)',
        enterAllPhone: 'กรุณากรอกหมายเลขโทรศัพท์',
        enterEmail: 'กรุณากรอกที่อยู่อีเมล',
        enterKanjiCorrectly: 'กรุณากรอกให้ถูกต้อง',
        enterFuriganaCorrectly: 'กรุณากรอกเป็นคาตาคานะแบบเต็มความกว้าง',
        enterPhoneCorrectly: 'กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง',
        enterEmailCorrectly: 'กรุณากรอกที่อยู่อีเมลให้ถูกต้อง',
        // サーバーサイドバリデーションエラーキーとメッセージのマッピング
        errorKeys: {
            selectedDateTimeRequired: 'กรุณาเลือกวันที่และเวลา',
            selectedDateTimeInvalid: 'รูปแบบวันที่และเวลาไม่ถูกต้อง',
            menuIdRequired: 'กรุณาเลือกเมนู',
            menuIdNotANumber: 'รหัสเมนูไม่ถูกต้อง',
            seiRequired: 'กรุณากรอกนามสกุล',
            seiTooLong: 'กรุณากรอกนามสกุลไม่เกิน 32 ตัวอักษร',
            seiInvalid: 'นามสกุลไม่ถูกต้อง',
            meiRequired: 'กรุณากรอกชื่อ',
            meiTooLong: 'กรุณากรอกชื่อไม่เกิน 32 ตัวอักษร',
            meiInvalid: 'ชื่อไม่ถูกต้อง',
            seikanaRequired: 'กรุณากรอกนามสกุล (ฟูริงานะ)',
            seikanaTooLong: 'กรุณากรอกนามสกุล (ฟูริงานะ) ไม่เกิน 32 ตัวอักษร',
            seikanaInvalid: 'นามสกุล (ฟูริงานะ) ไม่ถูกต้อง',
            meikanaRequired: 'กรุณากรอกชื่อ (ฟูริงานะ)',
            meikanaTooLong: 'กรุณากรอกชื่อ (ฟูริงานะ) ไม่เกิน 32 ตัวอักษร',
            meikanaInvalid: 'ชื่อ (ฟูริงานะ) ไม่ถูกต้อง',
            emailRequired: 'กรุณากรอกที่อยู่อีเมล',
            emailInvalid: 'กรุณากรอกที่อยู่อีเมลที่ถูกต้อง',
            emailTooLong: 'กรุณากรอกที่อยู่อีเมลไม่เกิน 255 ตัวอักษร',
            telNoRequired: 'กรุณากรอกหมายเลขโทรศัพท์',
            telNoInvalid: 'รูปแบบหมายเลขโทรศัพท์ไม่ถูกต้อง',
            telNoTooLong: 'กรุณากรอกหมายเลขโทรศัพท์ไม่เกิน 13 ตัวอักษร',
            telNoTooShort: 'กรุณากรอกหมายเลขโทรศัพท์อย่างน้อย 12 ตัวอักษร',
            commentTooLong: 'กรุณากรอกความคิดเห็นไม่เกิน 1000 ตัวอักษร',
            commentInvalid: 'ความคิดเห็นไม่ถูกต้อง',
            seiIncludeEmoji: 'ไม่อนุญาตให้ใช้อีโมจิ',
            meiIncludeEmoji: 'ไม่อนุญาตให้ใช้อีโมจิ',
            commentIncludeEmoji: 'ไม่อนุญาตให้ใช้อีโมจิในความคิดเห็น'
        }
    },

    // フォーム送信関連
    form: {
        sending: 'กำลังส่ง...',
        sendFailed: 'ส่งไม่สำเร็จ',
        unexpectedข้อผิดพลาด: 'เกิดข้อผิดพลาดที่ไม่คาดคิด'
    },

    // html内の記述 ラベルなど
    htmlText: {
        resendLink: 'ส่งรหัส PIN อีกครั้ง',
    },

    // PINコード関連
    pin: {
        enterCode: 'กรุณากรอกรหัส PIN',
        codeInvalid: 'รหัส PIN ไม่ถูกต้อง กรุณาลองอีกครั้ง',
        codeRetryLimit: 'ถึงขีดจำกัดการลองรหัส PIN แล้ว กรุณารับรหัส PIN อีกครั้ง',
        codeExpired: 'รหัส PIN หมดอายุแล้ว กรุณารับรหัส PIN อีกครั้ง',
        resending: 'กำลังส่งอีกครั้ง...',
        resendSuccess: 'ส่งรหัส PIN อีกครั้งแล้ว',
        resendFailed: 'ส่งรหัส PIN อีกครั้งไม่สำเร็จ',
        verifying: 'กำลังตรวจสอบ...',
        verifySuccess: 'กรอกรหัส PIN ถูกต้องแล้ว',
        registering: 'กำลังลงทะเบียน...',
        registerSuccess: 'ลงทะเบียนการจองแล้ว',
        registerFailed: 'ลงทะเบียนการจองไม่สำเร็จ'
    },

    // 致命的エラー
    fatalข้อผิดพลาด: {
        sessionExpired: 'เซสชันหมดอายุแล้ว กรุณาเริ่มการจองใหม่',
        serverข้อผิดพลาด: 'เกิดข้อผิดพลาดของเซิร์ฟเวอร์',
    }
};
