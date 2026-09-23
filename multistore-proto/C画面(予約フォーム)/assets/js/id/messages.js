// メッセージ定義
var Messages = {
    // カレンダー関連
    calendar: {
        days7: '7 hari',
        days14: '14 hari',
        prev: 'Sebelumnya',
        next: 'Berikutnya',
        year: 'Tahun',
        month: 'Bulan',
        weekdays: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        holiday: 'Lib',
        weekdays_long: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
        holiday_long: 'Hari Libur Nasional',
        noAvailableSlots: 'Tidak ada slot tersedia.',
        loading: 'Memuat...',
        error: 'Kesalahan: ',
        fetchFailed: 'Gagal mengambil slot tersedia.'
    },
    // textエレメントのプレースホルダ
    textPlaceholder: {
        sei: 'Nama Belakang',
        mei: 'Nama Depan',
        seikana: 'ヤマダ',
        meikana: 'タロウ',
        tel01: '03',
        tel02: '1111',
        tel03: '1111',
        email: 'example@example.com',
    },
    // バリデーションエラー
    validation: {
        selectMenu: 'Harap pilih menu.',
        selectDateTime: 'Harap pilih tanggal dan waktu.',
        enterSei: 'Harap masukkan nama belakang.',
        enterMei: 'Harap masukkan nama depan.',
        enterSeikana: 'Harap masukkan nama belakang (Furigana).',
        enterMeikana: 'Harap masukkan nama depan (Furigana).',
        enterAllPhone: 'Harap masukkan nomor telepon.',
        enterEmail: 'Harap masukkan alamat email.',
        enterKanjiCorrectly: 'Harap masukkan dengan benar.',
        enterFuriganaCorrectly: 'Harap masukkan dalam katakana lebar penuh.',
        enterPhoneCorrectly: 'Harap masukkan nomor telepon dengan benar.',
        enterEmailCorrectly: 'Harap masukkan alamat email dengan benar.',
        // サーバーサイドバリデーションエラーキーとメッセージのマッピング
        errorKeys: {
            selectedDateTimeRequired: 'Harap pilih tanggal dan waktu.',
            selectedDateTimeInvalid: 'Format tanggal dan waktu tidak benar.',
            menuIdRequired: 'Harap pilih menu.',
            menuIdNotANumber: 'ID menu tidak benar.',
            seiRequired: 'Harap masukkan nama belakang.',
            seiTooLong: 'Harap masukkan nama belakang dalam 32 karakter.',
            seiInvalid: 'Nama belakang tidak benar.',
            meiRequired: 'Harap masukkan nama depan.',
            meiTooLong: 'Harap masukkan nama depan dalam 32 karakter.',
            meiInvalid: 'Nama depan tidak benar.',
            seikanaRequired: 'Harap masukkan nama belakang (Furigana).',
            seikanaTooLong: 'Harap masukkan nama belakang (Furigana) dalam 32 karakter.',
            seikanaInvalid: 'Nama belakang (Furigana) tidak benar.',
            meikanaRequired: 'Harap masukkan nama depan (Furigana).',
            meikanaTooLong: 'Harap masukkan nama depan (Furigana) dalam 32 karakter.',
            meikanaInvalid: 'Nama depan (Furigana) tidak benar.',
            emailRequired: 'Harap masukkan alamat email.',
            emailInvalid: 'Harap masukkan alamat email yang valid.',
            emailTooLong: 'Harap masukkan email dalam 255 karakter.',
            telNoRequired: 'Harap masukkan nomor telepon.',
            telNoInvalid: 'Format nomor telepon tidak benar.',
            telNoTooLong: 'Harap masukkan telepon dalam 13 karakter.',
            telNoTooShort: 'Harap masukkan telepon minimal 12 karakter.',
            commentTooLong: 'Harap masukkan komentar dalam 1000 karakter.',
            commentInvalid: 'Komentar tidak benar.',
            seiIncludeEmoji: 'Emoji tidak diizinkan.',
            meiIncludeEmoji: 'Emoji tidak diizinkan.',
            commentIncludeEmoji: 'Emoji tidak diizinkan dalam komentar.'
        }
    },

    // フォーム送信関連
    form: {
        sending: 'Mengirim...',
        sendFailed: 'Gagal mengirim.',
        unexpectedKesalahan: 'Terjadi kesalahan tak terduga.'
    },

    // html内の記述 ラベルなど
    htmlText: {
        resendLink: 'Kirim ulang kode PIN',
    },

    // PINコード関連
    pin: {
        enterCode: 'Harap masukkan kode PIN.',
        codeInvalid: 'Kode PIN tidak benar. Silakan coba lagi.',
        codeRetryLimit: 'Batas percobaan ulang kode PIN tercapai. Terima kode PIN lagi.',
        codeExpired: 'Kode PIN kedaluwarsa. Terima kode PIN lagi.',
        resending: 'Mengirim ulang...',
        resendSuccess: 'Kode PIN telah dikirim ulang.',
        resendFailed: 'Gagal mengirim ulang kode PIN.',
        verifying: 'Memverifikasi...',
        verifySuccess: 'Kode PIN dimasukkan dengan benar.',
        registering: 'Mendaftarkan...',
        registerSuccess: 'Reservasi telah didaftarkan.',
        registerFailed: 'Gagal mendaftarkan reservasi.'
    },

    // 致命的エラー
    fatalKesalahan: {
        sessionExpired: 'Sesi telah berakhir. Harap mulai reservasi lagi.',
        serverKesalahan: 'Terjadi kesalahan server.',
    }
};
