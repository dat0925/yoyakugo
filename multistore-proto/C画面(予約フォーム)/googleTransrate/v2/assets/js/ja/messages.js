// メッセージ定義
var Messages = {
    // カレンダー関連
    calendar: {
        days7: '7日',
        days14: '14日',
        prev: '前の',
        next: '次の',
        year: '年',
        month: '月',
        weekdays: ['日', '月', '火', '水', '木', '金', '土'],
        noAvailableSlots: '予約可能な日時がありません。',
        loading: '読み込み中...',
        error: 'エラー: ',
        fetchFailed: '空き状況の取得に失敗しました。'
    },
    // textエレメントのプレースホルダ
    textPlaceholder: {
        sei: '山田',
        mei: '太郎',
        seikana: 'ヤマダ',
        meikana: 'タロウ',
        tel: '03-0000-0000',
        email: 'test@iflag.co.jp',
    },
    // バリデーションエラー
    validation: {
        selectMenu: 'メニューを選択してください。',
        selectDateTime: '日時を選択してください。',
        enterSei: 'お名前（漢字）の姓を入力してください。',
        enterMei: 'お名前（漢字）の名を入力してください。',
        enterSeikana: 'お名前（フリガナ）の姓を入力してください。',
        enterMeikana: 'お名前（フリガナ）の名を入力してください。',
        enterAllPhone: '電話番号をすべて入力してください。',
        enterEmail: 'メールアドレスを入力してください。',
        enterKanjiCorrectly: '正しく入力してください。',
        enterFuriganaCorrectly: '全角カタカナで入力してください。',
        enterPhoneCorrectly: '電話番号を正しく入力してください。',
        enterEmailCorrectly: '正しいメールアドレス形式で入力してください。',
        // サーバーサイドバリデーションエラーキーとメッセージのマッピング
        errorKeys: {
            selectedDateTimeRequired: '日時を選択してください。',
            selectedDateTimeInvalid: '日時の形式が正しくありません。',
            menuIdRequired: 'メニューを選択してください。',
            menuIdNotANumber: 'メニューIDが正しくありません。',
            seiRequired: 'お名前（漢字）の姓を入力してください。',
            seiTooLong: 'お名前（漢字）の姓は32文字以内で入力してください。',
            seiInvalid: 'お名前（漢字）の姓が正しくありません。',
            meiRequired: 'お名前（漢字）の名を入力してください。',
            meiTooLong: 'お名前（漢字）の名は32文字以内で入力してください。',
            meiInvalid: 'お名前（漢字）の名が正しくありません。',
            seikanaRequired: 'お名前（フリガナ）の姓を入力してください。',
            seikanaTooLong: 'お名前（フリガナ）の姓は32文字以内で入力してください。',
            seikanaInvalid: 'お名前（フリガナ）の姓は全角カタカナで入力してください。',
            meikanaRequired: 'お名前（フリガナ）の名を入力してください。',
            meikanaTooLong: 'お名前（フリガナ）の名は32文字以内で入力してください。',
            meikanaInvalid: 'お名前（フリガナ）の名は全角カタカナで入力してください。',
            emailRequired: 'メールアドレスを入力してください。',
            emailInvalid: '正しいメールアドレス形式で入力してください。',
            emailTooLong: 'メールアドレスは255文字以内で入力してください。',
            telNoRequired: '電話番号を入力してください。',
            telNoInvalid: '電話番号の形式が正しくありません。',
            telNoTooLong: '電話番号は13文字以内で入力してください。',
            telNoTooShort: '電話番号は12文字以上で入力してください。',
            commentTooLong: 'コメントは1000文字以内で入力してください。',
            commentInvalid: 'コメントが正しくありません。',
            seiIncludeEmoji: '絵文字は使用できません。',
            meiIncludeEmoji: '絵文字は使用できません。',
            commentIncludeEmoji: 'コメントに絵文字は使用できません。'
        }
    },

    // フォーム送信関連
    form: {
        sending: '送信中...',
        sendFailed: '送信に失敗しました。',
        unexpectedError: '予期しないエラーが発生しました。'
    },

    // html内の記述 ラベルなど
    htmlText: {
        resendLink: 'PINコードを再送する',
    },

    // PINコード関連
    pin: {
        enterCode: 'PINコードを入力してください。',
        codeInvalid: 'PINコードが不正です。再度入力してください。',
        codeRetryLimit: 'PINコードのリトライ制限に達しました。再度PINコードを受信してください。',
        codeExpired: 'PINコードの有効期限が切れました。再度PINコードを受信してください。',
        resending: '再送信中...',
        resendSuccess: 'PINコードが再送信されました。',
        resendFailed: 'PINコードの再送信に失敗しました。',
        verifying: '確認中...',
        verifySuccess: 'PINコードが正しく入力されました。',
        registering: '予約登録中...',
        registerSuccess: '予約が登録されました。',
        registerFailed: '予約登録に失敗しました。'
    },

    // 致命的エラー
    fatalError: {
        sessionExpired: 'セッションが切れました。再度予約を開始してください。',
        serverError: 'サーバーエラーが発生しました。',
    }
};
