// メッセージ定義
var Messages = {
    // カレンダー関連
    calendar: {
        days7: '7 jours',
        days14: '14 jours',
        prev: 'Précédent',
        next: 'Suivant',
        year: 'Année',
        month: 'Mois',
        weekdays: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
        holiday: 'férié',
        weekdays_long: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        holiday_long: 'Jour férié',
        noAvailableSlots: 'Aucun créneau disponible.',
        loading: 'Chargement...',
        error: 'Erreur : ',
        fetchFailed: 'Échec de la récupération des créneaux disponibles.'
    },
    // textエレメントのプレースホルダ
    textPlaceholder: {
        sei: 'Nom de famille',
        mei: 'Prénom',
        seikana: 'ヤマダ',
        meikana: 'タロウ',
        tel01: '03',
        tel02: '1111',
        tel03: '1111',
        email: 'example@example.com',
    },
    // バリデーションエラー
    validation: {
        selectMenu: 'Veuillez sélectionner un menu.',
        selectDateTime: 'Veuillez sélectionner une date et une heure.',
        enterSei: 'Veuillez saisir votre nom de famille.',
        enterMei: 'Veuillez saisir votre prénom.',
        enterSeikana: 'Veuillez saisir votre nom de famille (Furigana).',
        enterMeikana: 'Veuillez saisir votre prénom (Furigana).',
        enterAllPhone: 'Veuillez saisir votre numéro de téléphone.',
        enterEmail: 'Veuillez saisir votre adresse e-mail.',
        enterKanjiCorrectly: 'Veuillez saisir correctement.',
        enterFuriganaCorrectly: 'Veuillez saisir en katakana pleine chasse.',
        enterPhoneCorrectly: 'Veuillez saisir correctement votre numéro de téléphone.',
        enterEmailCorrectly: 'Veuillez saisir correctement votre adresse e-mail.',
        // サーバーサイドバリデーションエラーキーとメッセージのマッピング
        errorKeys: {
            selectedDateTimeRequired: 'Veuillez sélectionner une date et une heure.',
            selectedDateTimeInvalid: 'Le format de la date et de l'heure est incorrect.',
            menuIdRequired: 'Veuillez sélectionner un menu.',
            menuIdNotANumber: 'L'identifiant du menu est incorrect.',
            seiRequired: 'Veuillez saisir votre nom de famille.',
            seiTooLong: 'Veuillez saisir votre nom de famille en 32 caractères maximum.',
            seiInvalid: 'Le nom de famille est incorrect.',
            meiRequired: 'Veuillez saisir votre prénom.',
            meiTooLong: 'Veuillez saisir votre prénom en 32 caractères maximum.',
            meiInvalid: 'Le prénom est incorrect.',
            seikanaRequired: 'Veuillez saisir votre nom de famille (Furigana).',
            seikanaTooLong: 'Veuillez saisir votre nom de famille (Furigana) en 32 caractères maximum.',
            seikanaInvalid: 'Le nom de famille (Furigana) est incorrect.',
            meikanaRequired: 'Veuillez saisir votre prénom (Furigana).',
            meikanaTooLong: 'Veuillez saisir votre prénom (Furigana) en 32 caractères maximum.',
            meikanaInvalid: 'Le prénom (Furigana) est incorrect.',
            emailRequired: 'Veuillez saisir votre adresse e-mail.',
            emailInvalid: 'Veuillez saisir une adresse e-mail valide.',
            emailTooLong: 'Veuillez saisir votre adresse e-mail en 255 caractères maximum.',
            telNoRequired: 'Veuillez saisir votre numéro de téléphone.',
            telNoInvalid: 'Le format du numéro de téléphone est incorrect.',
            telNoTooLong: 'Veuillez saisir votre numéro de téléphone en 13 caractères maximum.',
            telNoTooShort: 'Veuillez saisir votre numéro de téléphone en au moins 12 caractères.',
            commentTooLong: 'Veuillez saisir votre commentaire en 1000 caractères maximum.',
            commentInvalid: 'Le commentaire est incorrect.',
            seiIncludeEmoji: 'Les emoji ne sont pas autorisés.',
            meiIncludeEmoji: 'Les emoji ne sont pas autorisés.',
            commentIncludeEmoji: 'Les emoji ne sont pas autorisés dans le commentaire.'
        }
    },

    // フォーム送信関連
    form: {
        sending: 'Envoi...',
        sendFailed: 'Échec de l'envoi.',
        unexpectedErreur : 'Une erreur inattendue s'est produite.'
    },

    // html内の記述 ラベルなど
    htmlText: {
        resendLink: 'Renvoyer le code PIN',
    },

    // PINコード関連
    pin: {
        enterCode: 'Veuillez saisir le code PIN.',
        codeInvalid: 'Le code PIN est incorrect. Veuillez réessayer.',
        codeRetryLimit: 'La limite de tentatives du code PIN est atteinte. Veuillez recevoir à nouveau le code PIN.',
        codeExpired: 'Le code PIN a expiré. Veuillez recevoir à nouveau le code PIN.',
        resending: 'Renvoi...',
        resendSuccess: 'Le code PIN a été renvoyé.',
        resendFailed: 'Échec du renvoi du code PIN.',
        verifying: 'Vérification...',
        verifySuccess: 'Le code PIN a été saisi correctement.',
        registering: 'Enregistrement...',
        registerSuccess: 'La réservation a été enregistrée.',
        registerFailed: 'Échec de l'enregistrement de la réservation.'
    },

    // 致命的エラー
    fatalErreur : {
        sessionExpired: 'La session a expiré. Veuillez recommencer la réservation.',
        serverErreur : 'Une erreur serveur s'est produite.',
    }
};
