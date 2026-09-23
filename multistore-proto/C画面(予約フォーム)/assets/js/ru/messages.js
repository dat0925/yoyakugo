// メッセージ定義
var Messages = {
    // カレンダー関連
    calendar: {
        days7: '7 дней',
        days14: '14 дней',
        prev: 'Назад',
        next: 'Далее',
        year: 'Год',
        month: 'Месяц',
        weekdays: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
        holiday: 'празд.',
        weekdays_long: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        holiday_long: 'Государственный праздник',
        noAvailableSlots: 'Нет доступных слотов.',
        loading: 'Загрузка...',
        error: 'Ошибка: ',
        fetchFailed: 'Не удалось получить доступные слоты.'
    },
    // textエレメントのプレースホルダ
    textPlaceholder: {
        sei: 'Фамилия',
        mei: 'Имя',
        seikana: 'ヤマダ',
        meikana: 'タロウ',
        tel01: '03',
        tel02: '1111',
        tel03: '1111',
        email: 'example@example.com',
    },
    // バリデーションエラー
    validation: {
        selectMenu: 'Выберите меню.',
        selectDateTime: 'Выберите дату и время.',
        enterSei: 'Введите фамилию.',
        enterMei: 'Введите имя.',
        enterSeikana: 'Введите фамилию (фуригана).',
        enterMeikana: 'Введите имя (фуригана).',
        enterAllPhone: 'Введите номер телефона.',
        enterEmail: 'Введите адрес электронной почты.',
        enterKanjiCorrectly: 'Введите корректно.',
        enterFuriganaCorrectly: 'Введите полноширинной катаканой.',
        enterPhoneCorrectly: 'Введите номер телефона корректно.',
        enterEmailCorrectly: 'Введите адрес электронной почты корректно.',
        // サーバーサイドバリデーションエラーキーとメッセージのマッピング
        errorKeys: {
            selectedDateTimeRequired: 'Выберите дату и время.',
            selectedDateTimeInvalid: 'Неверный формат даты и времени.',
            menuIdRequired: 'Выберите меню.',
            menuIdNotANumber: 'Неверный ID меню.',
            seiRequired: 'Введите фамилию.',
            seiTooLong: 'Введите фамилию не более 32 символов.',
            seiInvalid: 'Фамилия неверна.',
            meiRequired: 'Введите имя.',
            meiTooLong: 'Введите имя не более 32 символов.',
            meiInvalid: 'Имя неверно.',
            seikanaRequired: 'Введите фамилию (фуригана).',
            seikanaTooLong: 'Введите фамилию (фуригана) не более 32 символов.',
            seikanaInvalid: 'Фамилия (фуригана) неверна.',
            meikanaRequired: 'Введите имя (фуригана).',
            meikanaTooLong: 'Введите имя (фуригана) не более 32 символов.',
            meikanaInvalid: 'Имя (фуригана) неверно.',
            emailRequired: 'Введите адрес электронной почты.',
            emailInvalid: 'Введите действительный адрес электронной почты.',
            emailTooLong: 'Введите e-mail не более 255 символов.',
            telNoRequired: 'Введите номер телефона.',
            telNoInvalid: 'Неверный формат номера телефона.',
            telNoTooLong: 'Введите телефон не более 13 символов.',
            telNoTooShort: 'Введите телефон не менее 12 символов.',
            commentTooLong: 'Введите комментарий не более 1000 символов.',
            commentInvalid: 'Комментарий неверен.',
            seiIncludeEmoji: 'Эмодзи не допускаются.',
            meiIncludeEmoji: 'Эмодзи не допускаются.',
            commentIncludeEmoji: 'Эмодзи в комментарии не допускаются.'
        }
    },

    // フォーム送信関連
    form: {
        sending: 'Отправка...',
        sendFailed: 'Не удалось отправить.',
        unexpectedОшибка: 'Произошла непредвиденная ошибка.'
    },

    // html内の記述 ラベルなど
    htmlText: {
        resendLink: 'Отправить PIN-код повторно',
    },

    // PINコード関連
    pin: {
        enterCode: 'Введите PIN-код.',
        codeInvalid: 'PIN-код неверен. Попробуйте снова.',
        codeRetryLimit: 'Достигнут лимит попыток PIN-кода. Получите PIN-код снова.',
        codeExpired: 'Срок действия PIN-кода истёк. Получите PIN-код снова.',
        resending: 'Повторная отправка...',
        resendSuccess: 'PIN-код отправлен повторно.',
        resendFailed: 'Не удалось отправить PIN-код повторно.',
        verifying: 'Проверка...',
        verifySuccess: 'PIN-код введён верно.',
        registering: 'Регистрация...',
        registerSuccess: 'Бронирование зарегистрировано.',
        registerFailed: 'Не удалось зарегистрировать бронирование.'
    },

    // 致命的エラー
    fatalОшибка: {
        sessionExpired: 'Сеанс истёк. Начните бронирование заново.',
        serverОшибка: 'Произошла ошибка сервера.',
    }
};
