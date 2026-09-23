// 메시지 정의（한국어）
var Messages = {
    // 캘린더 관련
    calendar: {
        days7: '7일',
        days14: '14일',
        prev: '이전',
        next: '다음',
        year: '년',
        month: '월',
        weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        noAvailableSlots: '예약 가능한 시간이 없습니다.',
        loading: '로딩 중...',
        error: '오류: ',
        fetchFailed: '예약 가능 시간을 불러오지 못했습니다.'
    },
    // 입력 필드 플레이스홀더
    textPlaceholder: {
        sei: '성',
        mei: '이름',
        seikana: 'ヤマダ',
        meikana: 'タロウ',
        tel01: '03',
        tel02: '1111',
        tel03: '1111',
        email: 'example@example.com',
    },
    // 유효성 검사 오류
    validation: {
        selectMenu: '메뉴를 선택해 주세요.',
        selectDateTime: '날짜와 시간을 선택해 주세요.',
        enterSei: '성을 입력해 주세요.',
        enterMei: '이름을 입력해 주세요.',
        enterSeikana: '성(가나)을 입력해 주세요.',
        enterMeikana: '이름(가나)을 입력해 주세요.',
        enterAllPhone: '전화번호를 입력해 주세요.',
        enterEmail: '이메일 주소를 입력해 주세요.',
        enterKanjiCorrectly: '올바르게 입력해 주세요.',
        enterFuriganaCorrectly: '전각 가타카나로 입력해 주세요.',
        enterPhoneCorrectly: '전화번호를 올바르게 입력해 주세요.',
        enterEmailCorrectly: '이메일 주소를 올바르게 입력해 주세요.',
        errorKeys: {
            selectedDateTimeRequired: '날짜와 시간을 선택해 주세요.',
            selectedDateTimeInvalid: '날짜·시간 형식이 올바르지 않습니다.',
            menuIdRequired: '메뉴를 선택해 주세요.',
            menuIdNotANumber: '메뉴 ID가 올바르지 않습니다.',
            seiRequired: '성을 입력해 주세요.',
            seiTooLong: '성은 32자 이내로 입력해 주세요.',
            seiInvalid: '성 입력이 올바르지 않습니다.',
            meiRequired: '이름을 입력해 주세요.',
            meiTooLong: '이름은 32자 이내로 입력해 주세요.',
            meiInvalid: '이름 입력이 올바르지 않습니다.',
            seikanaRequired: '성(가나)을 입력해 주세요.',
            seikanaTooLong: '성(가나)은 32자 이내로 입력해 주세요.',
            seikanaInvalid: '성(가나) 입력이 올바르지 않습니다.',
            meikanaRequired: '이름(가나)을 입력해 주세요.',
            meikanaTooLong: '이름(가나)은 32자 이내로 입력해 주세요.',
            meikanaInvalid: '이름(가나) 입력이 올바르지 않습니다.',
            emailRequired: '이메일 주소를 입력해 주세요.',
            emailInvalid: '올바른 이메일 주소를 입력해 주세요.',
            emailTooLong: '이메일 주소는 255자 이내로 입력해 주세요.',
            telNoRequired: '전화번호를 입력해 주세요.',
            telNoInvalid: '전화번호 형식이 올바르지 않습니다.',
            telNoTooLong: '전화번호는 13자 이내로 입력해 주세요.',
            telNoTooShort: '전화번호는 12자 이상 입력해 주세요.',
            commentTooLong: '코멘트는 1000자 이내로 입력해 주세요.',
            commentInvalid: '코멘트가 올바르지 않습니다.',
            seiIncludeEmoji: '이모지는 사용할 수 없습니다.',
            meiIncludeEmoji: '이모지는 사용할 수 없습니다.',
            commentIncludeEmoji: '코멘트에는 이모지를 사용할 수 없습니다.'
        }
    },

    // 폼 제출 관련
    form: {
        sending: '전송 중...',
        sendFailed: '전송에 실패했습니다.',
        unexpectedError: '예기치 않은 오류가 발생했습니다.'
    },

    // HTML 내 라벨 등
    htmlText: {
        resendLink: '인증 코드 재전송',
    },

    // PIN 코드 관련
    pin: {
        enterCode: '인증 코드를 입력해 주세요.',
        codeInvalid: '인증 코드가 올바르지 않습니다. 다시 입력해 주세요.',
        codeRetryLimit: '인증 코드 재시도 한도에 도달했습니다. 인증 코드를 다시 받아 주세요.',
        codeExpired: '인증 코드가 만료되었습니다. 인증 코드를 다시 받아 주세요.',
        resending: '재전송 중...',
        resendSuccess: '인증 코드가 재전송되었습니다.',
        resendFailed: '인증 코드 재전송에 실패했습니다.',
        verifying: '확인 중...',
        verifySuccess: '인증 코드가 올바르게 입력되었습니다.',
        registering: '예약 등록 중...',
        registerSuccess: '예약이 등록되었습니다.',
        registerFailed: '예약 등록에 실패했습니다.'
    },

    // 치명적 오류
    fatalError: {
        sessionExpired: '세션이 만료되었습니다. 예약을 다시 시작해 주세요.',
        serverError: '서버 오류가 발생했습니다.',
    }
};
