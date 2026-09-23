// メッセージ定義
var Messages = {
    // カレンダー関連
    calendar: {
        days7: '7 hari',
        days14: '14 hari',
        prev: 'Sebelumnya',
        next: 'Seterusnya',
        year: 'Tahun',
        month: 'Bulan',
        weekdays: ['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'],
        holiday: 'Cuti',
        weekdays_long: ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'],
        holiday_long: 'Cuti Umum',
        noAvailableSlots: 'Tiada slot tersedia.',
        loading: 'Memuatkan...',
        error: 'Ralat: ',
        fetchFailed: 'Gagal mendapatkan slot tersedia.'
    },
    // textエレメントのプレースホルダ
    textPlaceholder: {
        sei: 'Nama Keluarga',
        mei: 'Nama Pertama',
        seikana: 'ヤマダ',
        meikana: 'タロウ',
        tel01: '03',
        tel02: '1111',
        tel03: '1111',
        email: 'example@example.com',
    },
    // バリデーションエラー
    validation: {
        selectMenu: 'Sila pilih menu.',
        selectDateTime: 'Sila pilih tarikh dan masa.',
        enterSei: 'Sila masukkan nama keluarga.',
        enterMei: 'Sila masukkan nama pertama.',
        enterSeikana: 'Sila masukkan nama keluarga (Furigana).',
        enterMeikana: 'Sila masukkan nama pertama (Furigana).',
        enterAllPhone: 'Sila masukkan nombor telefon.',
        enterEmail: 'Sila masukkan alamat e-mel.',
        enterKanjiCorrectly: 'Sila masukkan dengan betul.',
        enterFuriganaCorrectly: 'Sila masukkan dalam katakana lebar penuh.',
        enterPhoneCorrectly: 'Sila masukkan nombor telefon dengan betul.',
        enterEmailCorrectly: 'Sila masukkan alamat e-mel dengan betul.',
        // サーバーサイドバリデーションエラーキーとメッセージのマッピング
        errorKeys: {
            selectedDateTimeRequired: 'Sila pilih tarikh dan masa.',
            selectedDateTimeInvalid: 'Format tarikh dan masa tidak betul.',
            menuIdRequired: 'Sila pilih menu.',
            menuIdNotANumber: 'ID menu tidak betul.',
            seiRequired: 'Sila masukkan nama keluarga.',
            seiTooLong: 'Sila masukkan nama keluarga dalam 32 aksara.',
            seiInvalid: 'Nama keluarga tidak betul.',
            meiRequired: 'Sila masukkan nama pertama.',
            meiTooLong: 'Sila masukkan nama pertama dalam 32 aksara.',
            meiInvalid: 'Nama pertama tidak betul.',
            seikanaRequired: 'Sila masukkan nama keluarga (Furigana).',
            seikanaTooLong: 'Sila masukkan nama keluarga (Furigana) dalam 32 aksara.',
            seikanaInvalid: 'Nama keluarga (Furigana) tidak betul.',
            meikanaRequired: 'Sila masukkan nama pertama (Furigana).',
            meikanaTooLong: 'Sila masukkan nama pertama (Furigana) dalam 32 aksara.',
            meikanaInvalid: 'Nama pertama (Furigana) tidak betul.',
            emailRequired: 'Sila masukkan alamat e-mel.',
            emailInvalid: 'Sila masukkan alamat e-mel yang sah.',
            emailTooLong: 'Sila masukkan e-mel dalam 255 aksara.',
            telNoRequired: 'Sila masukkan nombor telefon.',
            telNoInvalid: 'Format nombor telefon tidak betul.',
            telNoTooLong: 'Sila masukkan telefon dalam 13 aksara.',
            telNoTooShort: 'Sila masukkan telefon sekurang-kurangnya 12 aksara.',
            commentTooLong: 'Sila masukkan komen dalam 1000 aksara.',
            commentInvalid: 'Komen tidak betul.',
            seiIncludeEmoji: 'Emoji tidak dibenarkan.',
            meiIncludeEmoji: 'Emoji tidak dibenarkan.',
            commentIncludeEmoji: 'Emoji tidak dibenarkan dalam komen.'
        }
    },

    // フォーム送信関連
    form: {
        sending: 'Menghantar...',
        sendFailed: 'Gagal menghantar.',
        unexpectedRalat: 'Ralat tidak dijangka berlaku.'
    },

    // html内の記述 ラベルなど
    htmlText: {
        resendLink: 'Hantar semula kod PIN',
    },

    // PINコード関連
    pin: {
        enterCode: 'Sila masukkan kod PIN.',
        codeInvalid: 'Kod PIN tidak betul. Sila cuba lagi.',
        codeRetryLimit: 'Had percubaan semula kod PIN dicapai. Terima kod PIN semula.',
        codeExpired: 'Kod PIN tamat tempoh. Terima kod PIN semula.',
        resending: 'Menghantar semula...',
        resendSuccess: 'Kod PIN telah dihantar semula.',
        resendFailed: 'Gagal menghantar semula kod PIN.',
        verifying: 'Mengesahkan...',
        verifySuccess: 'Kod PIN dimasukkan dengan betul.',
        registering: 'Mendaftar...',
        registerSuccess: 'Tempahan telah didaftarkan.',
        registerFailed: 'Gagal mendaftarkan tempahan.'
    },

    // 致命的エラー
    fatalRalat: {
        sessionExpired: 'Sesi telah tamat. Sila mulakan tempahan semula.',
        serverRalat: 'Ralat pelayan berlaku.',
    }
};
