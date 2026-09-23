// メッセージ定義
var Messages = {
    // カレンダー関連
    calendar: {
        days7: '7 dias',
        days14: '14 dias',
        prev: 'Anterior',
        next: 'Seguinte',
        year: 'Ano',
        month: 'Mês',
        weekdays: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
        holiday: 'fer.',
        weekdays_long: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
        holiday_long: 'Feriado',
        noAvailableSlots: 'Não há horários disponíveis.',
        loading: 'A carregar...',
        error: 'Erro: ',
        fetchFailed: 'Falha ao obter horários disponíveis.'
    },
    // textエレメントのプレースホルダ
    textPlaceholder: {
        sei: 'Apelido',
        mei: 'Nome',
        seikana: 'ヤマダ',
        meikana: 'タロウ',
        tel01: '03',
        tel02: '1111',
        tel03: '1111',
        email: 'example@example.com',
    },
    // バリデーションエラー
    validation: {
        selectMenu: 'Selecione um menu.',
        selectDateTime: 'Selecione data e hora.',
        enterSei: 'Introduza o apelido.',
        enterMei: 'Introduza o nome.',
        enterSeikana: 'Introduza o apelido (Furigana).',
        enterMeikana: 'Introduza o nome (Furigana).',
        enterAllPhone: 'Introduza o número de telefone.',
        enterEmail: 'Introduza o endereço de e-mail.',
        enterKanjiCorrectly: 'Introduza corretamente.',
        enterFuriganaCorrectly: 'Introduza em katakana de largura total.',
        enterPhoneCorrectly: 'Introduza o número de telefone corretamente.',
        enterEmailCorrectly: 'Introduza o e-mail corretamente.',
        // サーバーサイドバリデーションエラーキーとメッセージのマッピング
        errorKeys: {
            selectedDateTimeRequired: 'Selecione data e hora.',
            selectedDateTimeInvalid: 'O formato de data e hora está incorreto.',
            menuIdRequired: 'Selecione um menu.',
            menuIdNotANumber: 'O ID do menu está incorreto.',
            seiRequired: 'Introduza o apelido.',
            seiTooLong: 'Introduza o apelido em até 32 caracteres.',
            seiInvalid: 'O apelido está incorreto.',
            meiRequired: 'Introduza o nome.',
            meiTooLong: 'Introduza o nome em até 32 caracteres.',
            meiInvalid: 'O nome está incorreto.',
            seikanaRequired: 'Introduza o apelido (Furigana).',
            seikanaTooLong: 'Introduza o apelido (Furigana) em até 32 caracteres.',
            seikanaInvalid: 'O apelido (Furigana) está incorreto.',
            meikanaRequired: 'Introduza o nome (Furigana).',
            meikanaTooLong: 'Introduza o nome (Furigana) em até 32 caracteres.',
            meikanaInvalid: 'O nome (Furigana) está incorreto.',
            emailRequired: 'Introduza o endereço de e-mail.',
            emailInvalid: 'Introduza um endereço de e-mail válido.',
            emailTooLong: 'Introduza o e-mail em até 255 caracteres.',
            telNoRequired: 'Introduza o número de telefone.',
            telNoInvalid: 'O formato do número de telefone está incorreto.',
            telNoTooLong: 'Introduza o telefone em até 13 caracteres.',
            telNoTooShort: 'Introduza o telefone com pelo menos 12 caracteres.',
            commentTooLong: 'Introduza o comentário em até 1000 caracteres.',
            commentInvalid: 'O comentário está incorreto.',
            seiIncludeEmoji: 'Emoji não são permitidos.',
            meiIncludeEmoji: 'Emoji não são permitidos.',
            commentIncludeEmoji: 'Emoji não são permitidos no comentário.'
        }
    },

    // フォーム送信関連
    form: {
        sending: 'A enviar...',
        sendFailed: 'Falha no envio.',
        unexpectedErro: 'Ocorreu um erro inesperado.'
    },

    // html内の記述 ラベルなど
    htmlText: {
        resendLink: 'Reenviar código PIN',
    },

    // PINコード関連
    pin: {
        enterCode: 'Introduza o código PIN.',
        codeInvalid: 'O código PIN está incorreto. Tente novamente.',
        codeRetryLimit: 'Limite de tentativas do PIN atingido. Receba o código PIN novamente.',
        codeExpired: 'O código PIN expirou. Receba o código PIN novamente.',
        resending: 'A reenviar...',
        resendSuccess: 'O código PIN foi reenviado.',
        resendFailed: 'Falha ao reenviar o código PIN.',
        verifying: 'A verificar...',
        verifySuccess: 'O código PIN foi introduzido corretamente.',
        registering: 'A registar...',
        registerSuccess: 'A reserva foi registada.',
        registerFailed: 'Falha ao registar a reserva.'
    },

    // 致命的エラー
    fatalErro: {
        sessionExpired: 'A sessão expirou. Inicie a reserva novamente.',
        serverErro: 'Ocorreu um erro no servidor.',
    }
};
