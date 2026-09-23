// メッセージ定義
var Messages = {
    // カレンダー関連
    calendar: {
        days7: '7 أيام',
        days14: '14 يوماً',
        prev: 'السابق',
        next: 'التالي',
        year: 'السنة',
        month: 'الشهر',
        weekdays: ['أح', 'اث', 'ثل', 'أر', 'خم', 'جم', 'سب'],
        holiday: 'عطلة',
        weekdays_long: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        holiday_long: 'عطلة رسمية',
        noAvailableSlots: 'لا توجد مواعيد متاحة.',
        loading: 'جارٍ التحميل...',
        error: 'خطأ: ',
        fetchFailed: 'تعذّر جلب المواعيد المتاحة.'
    },
    // textエレメントのプレースホルダ
    textPlaceholder: {
        sei: 'اسم العائلة',
        mei: 'الاسم الأول',
        seikana: 'ヤマダ',
        meikana: 'タロウ',
        tel01: '03',
        tel02: '1111',
        tel03: '1111',
        email: 'example@example.com',
    },
    // バリデーションエラー
    validation: {
        selectMenu: 'يرجى اختيار قائمة.',
        selectDateTime: 'يرجى اختيار التاريخ والوقت.',
        enterSei: 'يرجى إدخال اسم العائلة.',
        enterMei: 'يرجى إدخال الاسم الأول.',
        enterSeikana: 'يرجى إدخال اسم العائلة (فوريغانا).',
        enterMeikana: 'يرجى إدخال الاسم الأول (فوريغانا).',
        enterAllPhone: 'يرجى إدخال رقم الهاتف.',
        enterEmail: 'يرجى إدخال البريد الإلكتروني.',
        enterKanjiCorrectly: 'يرجى الإدخال بشكل صحيح.',
        enterFuriganaCorrectly: 'يرجى الإدخال بكاتاكانا بعرض كامل.',
        enterPhoneCorrectly: 'يرجى إدخال رقم الهاتف بشكل صحيح.',
        enterEmailCorrectly: 'يرجى إدخال البريد بشكل صحيح.',
        // サーバーサイドバリデーションエラーキーとメッセージのマッピング
        errorKeys: {
            selectedDateTimeRequired: 'يرجى اختيار التاريخ والوقت.',
            selectedDateTimeInvalid: 'تنسيق التاريخ والوقت غير صحيح.',
            menuIdRequired: 'يرجى اختيار قائمة.',
            menuIdNotANumber: 'معرّف القائمة غير صحيح.',
            seiRequired: 'يرجى إدخال اسم العائلة.',
            seiTooLong: 'يرجى إدخال اسم العائلة في 32 حرفاً كحد أقصى.',
            seiInvalid: 'اسم العائلة غير صحيح.',
            meiRequired: 'يرجى إدخال الاسم الأول.',
            meiTooLong: 'يرجى إدخال الاسم الأول في 32 حرفاً كحد أقصى.',
            meiInvalid: 'الاسم الأول غير صحيح.',
            seikanaRequired: 'يرجى إدخال اسم العائلة (فوريغانا).',
            seikanaTooLong: 'يرجى إدخال اسم العائلة (فوريغانا) في 32 حرفاً.',
            seikanaInvalid: 'اسم العائلة (فوريغانا) غير صحيح.',
            meikanaRequired: 'يرجى إدخال الاسم الأول (فوريغانا).',
            meikanaTooLong: 'يرجى إدخال الاسم الأول (فوريغانا) في 32 حرفاً.',
            meikanaInvalid: 'الاسم الأول (فوريغانا) غير صحيح.',
            emailRequired: 'يرجى إدخال البريد الإلكتروني.',
            emailInvalid: 'يرجى إدخال بريد إلكتروني صالح.',
            emailTooLong: 'يرجى إدخال البريد في 255 حرفاً كحد أقصى.',
            telNoRequired: 'يرجى إدخال رقم الهاتف.',
            telNoInvalid: 'تنسيق رقم الهاتف غير صحيح.',
            telNoTooLong: 'يرجى إدخال الهاتف في 13 رقماً كحد أقصى.',
            telNoTooShort: 'يرجى إدخال الهاتف في 12 رقماً على الأقل.',
            commentTooLong: 'يرجى إدخال الملاحظة في 1000 حرف.',
            commentInvalid: 'الملاحظة غير صحيحة.',
            seiIncludeEmoji: 'الرموز التعبيرية غير مسموحة.',
            meiIncludeEmoji: 'الرموز التعبيرية غير مسموحة.',
            commentIncludeEmoji: 'الرموز التعبيرية غير مسموحة في الملاحظة.'
        }
    },

    // フォーム送信関連
    form: {
        sending: 'جارٍ الإرسال...',
        sendFailed: 'فشل الإرسال.',
        unexpectedخطأ: 'حدث خطأ غير متوقع.'
    },

    // html内の記述 ラベルなど
    htmlText: {
        resendLink: 'إعادة إرسال رمز PIN',
    },

    // PINコード関連
    pin: {
        enterCode: 'يرجى إدخال رمز PIN.',
        codeInvalid: 'رمز PIN غير صحيح. حاول مرة أخرى.',
        codeRetryLimit: 'تم بلوغ حد إعادة محاولة رمز PIN. احصل على الرمز مرة أخرى.',
        codeExpired: 'انتهت صلاحية رمز PIN. احصل على الرمز مرة أخرى.',
        resending: 'جارٍ إعادة الإرسال...',
        resendSuccess: 'أُعيد إرسال رمز PIN.',
        resendFailed: 'فشل إعادة إرسال رمز PIN.',
        verifying: 'جارٍ التحقق...',
        verifySuccess: 'تم إدخال رمز PIN بشكل صحيح.',
        registering: 'جارٍ التسجيل...',
        registerSuccess: 'تم تسجيل الحجز.',
        registerFailed: 'فشل تسجيل الحجز.'
    },

    // 致命的エラー
    fatalخطأ: {
        sessionExpired: 'انتهت الجلسة. يرجى بدء الحجز من جديد.',
        serverخطأ: 'حدث خطأ في الخادم.',
    }
};
