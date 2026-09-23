$(function () {
    // 言語切替機能
    const initLanguageSwitcher = () => {
        const languageBtn = $('#languageBtn');
        const languageDropdown = $('#languageDropdown');
        const currentLang = $('#currentLang');
        if (languageBtn.length === 0) return;

        // 現在の言語を取得（HTMLのlang属性から）
        const getCurrentLanguage = () => {
            const htmlLang = $('html').attr('lang');
            // lang属性から言語コードを取得（'ja', 'en'など）
            return htmlLang || 'ja';
        };

        // 言語名のマッピング
        // keyはlang属性の値、valueは言語名
        const languageNames = {
            'ja': '日本語',
            'en': 'English',
            'zh-cn': '中文-简体',
            'zh-tw': '中文-繁體',
            'ko': '한국어',
            'th': 'ไทย',
            'tl': 'Filipino',
            'vi': 'Tiếng Việt',
            'id': 'Bahasa Indonesia',
            'ms': 'Bahasa Melayu',
            'fr': 'Français',
            'de': 'Deutsch',
            'hi': 'हिन्दी',
            'ru': 'Русский',
            'ar': 'العربية',
            'pt': 'Português'
        };
        // data-langに対応するlanguageNamesのvalueに変更
        languageDropdown.find('.language-option').each(function () {
            const langCode = $(this).data('lang');
            if (languageNames[langCode]) {
                $(this).text(languageNames[langCode]);
            }
        });
        // 現在の言語を表示
        const currentLangCode = getCurrentLanguage();
        if (languageNames[currentLangCode]) {
            currentLang.text(languageNames[currentLangCode]);
        }

        // アクティブな言語オプションをマーク
        languageDropdown.find('.language-option').each(function () {
            const langCode = $(this).data('lang');
            if (langCode === currentLangCode) {
                $(this).addClass('active');
            }
        });

        // ドロップダウンの開閉
        languageBtn.on('click', function (e) {
            e.stopPropagation();
            $('.language-switcher').toggleClass('active');
        });

        // 言語オプションのクリック処理
        languageDropdown.find('.language-option').on('click', function (e) {
            e.preventDefault();
            const langCode = $(this).data('lang');
            const fileName = $(this).data('file');

            // 現在のファイル名を取得
            const currentFile = window.location.pathname.split('/').pop();

            // 同じファイルの場合は言語パラメータを追加、異なるファイルの場合は遷移
            if (fileName === currentFile || currentFile === 'index.html' && fileName === 'index.html') {
                // 同じページの場合はURLパラメータで言語を変更
                const url = new URL(window.location.href);
                window.location.href = url.toString();
            } else {
                // 異なるファイルの場合はそのファイルに遷移
                const url = new URL(fileName, window.location.href.replace(currentFile, ''));
                window.location.href = url.toString();
            }
        });

        // ドロップダウン外をクリックしたら閉じる
        $(document).on('click', function (e) {
            if (!$(e.target).closest('.language-switcher').length) {
                $('.language-switcher').removeClass('active');
            }
        });
    };

    // 言語切替を初期化
    initLanguageSwitcher();
    // 日本語以外の表示調整
    const shopName_ja = '●●接骨院';
    const currentLangCode = $('html').attr('lang');
    if (currentLangCode !== 'ja') {
        // h1 class="title"を検索しvalueをshopName_ja<br>元タイトルに変更する
        if ($('header h1.title').length) {
            //$('header h1.title').html('<span style="font-size: 1.2em">'+shopName_ja+'</span><br/><span style="font-size: 0.6em;font-weight: normal;"> '+$('header h1.title').html()+'</span>');
            //$('header h1.title').css('line-height', '1.2');
            $('header h1.title').html(shopName_ja+'<br/><span style="font-size: 0.6em;font-weight: normal;"> '+$('header h1.title').html()+'</span>');
        }
        if (currentLangCode === 'en' && $('.step01').length) {
            // 営業時間表のthのpadding-leftとrightを8pxにする
            $('.hours-table th').css('padding-left', '6px');
            $('.hours-table th').css('padding-right', '6px');
        }
        if ($('.step03').length) {
            // 'Name (Kanji)'表記の(Kanji)削除（必須スペーサーは保持）
            //$('.step03 tbody tr:nth-child(1) th').html($('.step03 tbody tr:nth-child(1) th').html().replace('(Kanji)', ''));
            // 入力フィールドのプレースホルダを設定
            $('#sei').attr('placeholder', Messages.textPlaceholder.sei);
            $('#mei').attr('placeholder', Messages.textPlaceholder.mei);
            /*
            $('#seikana').attr('placeholder', Messages.textPlaceholder.seikana);
            $('#meikana').attr('placeholder', Messages.textPlaceholder.meikana);
            $('.step03 tbody tr:nth-child(3) td .input_tel01').attr('placeholder', Messages.textPlaceholder.tel01);
            $('.step03 tbody tr:nth-child(3) td .input_tel02').attr('placeholder', Messages.textPlaceholder.tel02);
            $('.step03 tbody tr:nth-child(3) td .input_tel02:last').attr('placeholder', Messages.textPlaceholder.tel03);
            $('.step03 tbody tr:nth-child(4) td .input_email').attr('placeholder', Messages.textPlaceholder.email);
            */
            // フリガナRequired表示を除去
            //$('.step03 tbody tr:nth-child(2) th').find('.required').remove();
            //$('.step03 tbody tr:nth-child(2) td').find('.required').remove();
        }
        if (currentLangCode === 'en' && $('.step02 .calendar_wrap .calendar').length) {
            // カレンダーのthのpadding-leftとrightを0.4emにする
            $('.step02 .calendar_wrap .calendar table.calendar_table tr th').css('padding-left', '0.4em');
            $('.step02 .calendar_wrap .calendar table.calendar_table tr th').css('padding-right', '0.4em');
        }
        if ($('#furigana_row').length) {
            $('#furigana_row').hide();
        }
    }
    // 自動カナ入力の設定（要素が存在する場合のみ）
    if ($('html').attr('lang') === 'ja' && $('#sei').length && $('#seikana').length && typeof $.fn.autoKana === 'function') {
        // お名前（漢字）姓 → お名前（フリガナ）姓
        $.fn.autoKana('#sei', '#seikana', {
            katakana: true  // カタカナで出力
        });

        // お名前（漢字）名 → お名前（フリガナ）名
        $.fn.autoKana('#mei', '#meikana', {
            katakana: true  // カタカナで出力
        });
    }

    // 日時選択カレンダーのクリック処理
    $(".calendar_table .accepting").on("click", function () {
        $(".calendar_table .accepting").removeClass("selected");
        $(this).find("input[type=\"radio\"]").prop("checked", true);
        $(this).addClass("selected");
    });

    // メニュー／オプション選択と合計計算
    const pageLang = $('html').attr('lang') || 'ja';
    const durationSuffixMap = {
        'ja': '分',
        'en': ' minutes',
        'ko': '분',
        'zh-cn': '分钟',
        'zh-tw': '分鐘',
        'th': ' นาที',
        'tl': ' minuto',
        'vi': ' phút',
        'id': ' menit',
        'ms': ' minit',
        'fr': ' minutes',
        'de': ' Minuten',
        'hi': ' मिनट',
        'ru': ' минут',
        'ar': ' دقيقة',
        'pt': ' minutos'
    };
    const formatYen = (value) => {
        const amount = Number(value || 0).toLocaleString('ja-JP');
        return pageLang === 'ja' ? amount + '円' : amount + ' JPY';
    };
    const formatMinutes = (value) => {
        const minutes = Number(value || 0);
        const suffix = durationSuffixMap[pageLang] || durationSuffixMap.en;
        return minutes + suffix;
    };

    const updateMenuTotals = () => {
        const selectedMenu = $('.step01 input[name="menu"]:checked');
        const $totalPriceItem = $('.step01 .total_price_item');
        if (!selectedMenu.length) {
            $('#option_wrap').prop('hidden', true);
            $('#total_wrap').prop('hidden', true);
            $('#total_notice').prop('hidden', true);
            $totalPriceItem.prop('hidden', false);
            return;
        }

        const hideMenuPrice = String(selectedMenu.attr('data-hide-price') || '') === '1';
        const menuPrice = hideMenuPrice ? 0 : (Number(selectedMenu.data('price')) || 0);
        let optionPrice = 0;
        let totalDuration = Number(selectedMenu.data('duration')) || 0;

        $('.step01 .option_list input[type="checkbox"]:checked').each(function () {
            optionPrice += Number($(this).data('price')) || 0;
            totalDuration += Number($(this).data('duration')) || 0;
        });

        const totalPrice = menuPrice + optionPrice;
        const showTotalPrice = !hideMenuPrice || optionPrice > 0;

        $('#total_price').text(formatYen(totalPrice));
        $('#total_duration').text(formatMinutes(totalDuration));
        $totalPriceItem.prop('hidden', !showTotalPrice);
        $('#option_wrap').prop('hidden', false);
        $('#total_wrap').prop('hidden', false);
        $('#total_notice').prop('hidden', false);
    };

    // プログレスバー（メニュー選択時はオプション表示後に日時選択へ）
    $(document).on("change", ".step01 input[name=\"menu\"]", function () {
        if (!$(this).is(':checked')) return;

        $('.step01 .option_list input[type="checkbox"]').prop('checked', false);
        updateMenuTotals();

        $(".flow li").removeClass("active");
        $(".flow li:nth-child(2)").addClass("active");
        $(".step02").addClass("open");

        const $scrollTarget = $('#option_wrap');
        if ($scrollTarget.length) {
            // 固定ヘッダー分を差し引いてオプション先頭が見える位置へスクロール
            const headerHeight = $('header').outerHeight() || 0;
            const scrollOffset = headerHeight + 16;
            // 表示切替後のレイアウト確定を待ってからスクロール
            requestAnimationFrame(function () {
                $('html, body').animate({
                    scrollTop: $scrollTarget.offset().top - scrollOffset
                }, 400);
            });
        }
    });

    $(document).on("change", ".step01 .option_list input[type=\"checkbox\"]", function () {
        updateMenuTotals();
    });

    $(document).on("click", ".step02 .accepting", function () {
        $(".flow li").removeClass("active");
        $(".flow li:nth-child(3)").addClass("active");
        $(".step03").addClass("open");
        $('html, body').animate({
            scrollTop: $('#a02').offset().top
        }, 500);
    });

    // リアルタイムのフリガナ入力チェック
    const checkFuriganaRealtime = () => {
        if ($('html').attr('lang') !== 'ja') return;
        // お名前（フリガナ）の入力フィールドを特定
        const furiganaInputs = [
            $('.step03 tbody tr:nth-child(2) .input_name01'), // 姓のフリガナ
            $('.step03 tbody tr:nth-child(2) .input_name02')  // 名のフリガナ
        ];

        // 全角カタカナと長音符「ー」以外の文字をチェックする正規表現
        const zenkakuKanaPattern = /^[\u30a0-\u30ff\u30fc]*$/;

        // 入力欄を囲む親の<td>要素を特定
        const tdElement = $('.step03 tbody tr:nth-child(2) td');

        // 共通のエラーメッセージ要素を特定
        let errorMessageElement = tdElement.find('.error-message');

        // すべてのフリガナ入力欄にイベントを設定
        furiganaInputs.forEach(function (input) {
            input.on('input', function () {
                let hasError = false;

                // 姓と名、両方の入力内容をチェック
                furiganaInputs.forEach(function (checkInput) {
                    const value = checkInput.val();

                    // 1つでもエラーがあればフラグを立てる (空欄はエラーとしない)
                    if (value !== "" && !zenkakuKanaPattern.test(value)) {
                        hasError = true;
                    }

                    // 入力欄自体の視覚的なエラー表示を更新
                    if (value !== "" && !zenkakuKanaPattern.test(value)) {
                        checkInput.addClass('is-error');
                    } else {
                        checkInput.removeClass('is-error');
                    }
                });

                // hasErrorに基づき、<td>の下にメッセージを1つだけ表示・非表示する
                if (hasError) {
                    if (tdElement.find('.error-message').length === 0) {
                        // エラーメッセージがなければ追加（入力欄のブロック全体の下に）
                        tdElement.append('<p class="error-message">全角カタカナで入力してください。</p>');
                    }
                } else {
                    // エラーがなければメッセージを削除
                    tdElement.find('.error-message').remove();
                }
            });
        });
    };

    // 電話番号のリアルタイム入力チェック
    const checkPhoneRealtime = () => {
        // 電話番号の入力フィールドを特定
        const phoneInputs = [
            $('.step03 tbody tr:nth-child(3) .input_tel01'), // 市外局番
            $('.step03 tbody tr:nth-child(3) .input_tel02'), // 市内局番1
            $('.step03 tbody tr:nth-child(3) .input_tel02:last') // 市内局番2
        ];

        // 半角数字のみをチェックする正規表現
        const phonePattern = /^[0-9]*$/;

        // 入力欄を囲む親の<td>要素を特定
        const tdElement = $('.step03 tbody tr:nth-child(3) td');

        // すべての電話番号入力欄にイベントを設定
        phoneInputs.forEach(function (input) {
            input.on('input', function () {
                let hasError = false;

                // すべての電話番号入力内容をチェック
                phoneInputs.forEach(function (checkInput) {
                    const value = checkInput.val();

                    // 1つでもエラーがあればフラグを立てる (空欄はエラーとしない)
                    if (value !== "" && !phonePattern.test(value)) {
                        hasError = true;
                    }

                    // 入力欄自体の視覚的なエラー表示を更新
                    if (value !== "" && !phonePattern.test(value)) {
                        checkInput.addClass('is-error');
                    } else {
                        checkInput.removeClass('is-error');
                    }
                });

                // hasErrorに基づき、<td>の下にメッセージを1つだけ表示・非表示する
                if (hasError) {
                    if (tdElement.find('.error-message').length === 0) {
                        // エラーメッセージがなければ追加
                        tdElement.append('<p class="error-message">' + Messages.validation.enterPhoneCorrectly + '</p>');
                    }
                } else {
                    // エラーがなければメッセージを削除
                    tdElement.find('.error-message').remove();
                }
            });
        });
    };

    // お名前（漢字）のリアルタイム入力チェック
    const checkKanjiRealtime = () => {
        // お名前（漢字）の入力フィールドを特定
        const kanjiInputs = [
            $('.step03 tbody tr:nth-child(1) .input_name01'), // 姓の漢字
            $('.step03 tbody tr:nth-child(1) .input_name02')  // 名の漢字
        ];

        // 入力欄を囲む親の<td>要素を特定
        const tdElement = $('.step03 tbody tr:nth-child(1) td');

        // すべての漢字入力欄にイベントを設定
        kanjiInputs.forEach(function (input) {
            input.on('input', function () {
                let hasError = false;

                // 姓と名、両方の入力内容をチェック
                kanjiInputs.forEach(function (checkInput) {
                    const value = checkInput.val().trim();

                    // 空欄の場合はエラー
                    if (value === "") {
                        hasError = true;
                    }

                    // 入力欄自体の視覚的なエラー表示を更新
                    if (value === "") {
                        checkInput.addClass('is-error');
                    } else {
                        checkInput.removeClass('is-error');
                    }
                });

                // hasErrorに基づき、<td>の下にメッセージを1つだけ表示・非表示する
                if (hasError) {
                    if (tdElement.find('.error-message').length === 0) {
                        // エラーメッセージがなければ追加
                        tdElement.append('<p class="error-message">' + Messages.validation.enterKanjiCorrectly + '</p>');
                    }
                } else {
                    // エラーがなければメッセージを削除
                    tdElement.find('.error-message').remove();
                }
            });
        });
    };

    // メールアドレスのリアルタイム入力チェック
    const checkEmailRealtime = () => {
        // メールアドレスの入力フィールドを特定
        const emailInput = $('.step03 tbody tr:nth-child(4) .input_email');

        // メールアドレス形式をチェックする正規表現
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // 入力欄を囲む親の<td>要素を特定
        const tdElement = $('.step03 tbody tr:nth-child(4) td');

        // メールアドレス入力欄にイベントを設定
        emailInput.on('input', function () {
            const value = emailInput.val();

            // 空欄でない場合のみチェック
            if (value !== "" && !emailPattern.test(value)) {
                emailInput.addClass('is-error');

                // エラーメッセージがなければ追加
                if (tdElement.find('.error-message').length === 0) {
                    tdElement.append('<p class="error-message">' + Messages.validation.enterEmailCorrectly + '</p>');
                }
            } else {
                emailInput.removeClass('is-error');
                // エラーがなければメッセージを削除
                tdElement.find('.error-message').remove();
            }
        });
    };

    // PINコードプログレスバー機能
    const startPinProgress = () => {
        let timeLeft = 300; // 300秒 = 5分
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const resendLink = document.getElementById('resendLink');

        if (!progressFill || !progressText || !resendLink) return;

        const updateProgress = () => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            // プログレスバーの幅を計算（残り時間の割合）
            const progressPercentage = (timeLeft / 60) * 100;
            progressFill.style.width = `${progressPercentage}%`;

            // 時間表示を更新
            progressText.textContent = timeString;

            // 色の変化（緑→黄→赤）
            if (progressPercentage > 50) {
                progressFill.style.background = 'linear-gradient(90deg, #28a745, #28a745)';
            } else if (progressPercentage > 20) {
                progressFill.style.background = 'linear-gradient(90deg, #ffc107, #ffc107)';
            } else {
                progressFill.style.background = 'linear-gradient(90deg, #dc3545, #dc3545)';
            }

            if (timeLeft <= 0) {
                progressFill.style.width = '0%';
                progressText.textContent = '00:00';
                progressFill.style.background = '#dc3545';
                resendLink.style.display = 'block';
                clearInterval(progressInterval);
                return;
            }

            timeLeft--;
        };

        // 初回表示
        updateProgress();

        // 1秒ごとに更新
        const progressInterval = setInterval(updateProgress, 1000);

        // ページがアンロードされる際にタイマーをクリア
        window.addEventListener('beforeunload', () => {
            clearInterval(progressInterval);
        });
    };

    // ページロード時にリアルタイムチェック機能を呼び出す
    checkKanjiRealtime();
    checkFuriganaRealtime();
    checkPhoneRealtime();
    checkEmailRealtime();

    // confirm.htmlページでPINプログレスバーを開始
    if (document.getElementById('pinTimer')) {
        startPinProgress();
    }

    initStaffAvatars();
    initCommentCharCount();
});

const STAFF_AVATAR_COLORS = [
    '#E3008C', '#881798', '#4F6BED', '#038387', '#0078D4',
    '#018574', '#498205', '#CA5010', '#8764B8', '#69797E'
];
const STAFF_AVATAR_NEUTRAL_COLOR = '#8A8886';

const getStaffAvatarColor = (seed) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    return STAFF_AVATAR_COLORS[Math.abs(hash) % STAFF_AVATAR_COLORS.length];
};

const extractStaffInitials = (name) => {
    const trimmed = (name || '').trim();
    if (!trimmed) {
        return '—';
    }

    const withoutPrefix = trimmed.replace(/^担当者/, '').trim();
    const source = withoutPrefix || trimmed;
    const parts = source.split(/[\s\u3000・]+/).filter(Boolean);

    if (parts.length >= 2) {
        return parts.slice(0, 2).map((part) => part.charAt(0)).join('');
    }

    if (/^[A-Za-z0-9]+$/.test(source)) {
        return source.charAt(0).toUpperCase();
    }

    return source.slice(0, 2);
};

const createStaffAvatarSvg = (initials, seed, isNeutral) => {
    const svgNs = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNs, 'svg');
    const fontSize = initials.length > 1 ? '16' : '20';
    const fillColor = isNeutral ? STAFF_AVATAR_NEUTRAL_COLOR : getStaffAvatarColor(seed);

    svg.setAttribute('viewBox', '0 0 40 40');
    svg.setAttribute('width', '40');
    svg.setAttribute('height', '40');
    svg.setAttribute('class', 'staff_avatar_svg');
    svg.setAttribute('aria-hidden', 'true');

    const circle = document.createElementNS(svgNs, 'circle');
    circle.setAttribute('cx', '20');
    circle.setAttribute('cy', '20');
    circle.setAttribute('r', '20');
    circle.setAttribute('fill', fillColor);

    const text = document.createElementNS(svgNs, 'text');
    text.setAttribute('x', '20');
    text.setAttribute('y', '20');
    text.setAttribute('dy', '0.35em');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', '#fff');
    text.setAttribute('font-size', fontSize);
    text.setAttribute('font-family', 'sans-serif');
    text.setAttribute('font-weight', '600');
    text.textContent = initials;

    svg.appendChild(circle);
    svg.appendChild(text);
    return svg;
};

const initStaffAvatars = () => {
    document.querySelectorAll('.staff_list .title_txt').forEach((titleTxt) => {
        const nameSpan = titleTxt.querySelector('.staff_name');
        const avatarSpan = titleTxt.querySelector('.staff_avatar');
        if (!nameSpan || !avatarSpan) return;

        const name = nameSpan.textContent.trim();
        const avatarSrc = avatarSpan.getAttribute('data-avatar-src');
        if (avatarSrc) {
            const img = document.createElement('img');
            img.src = avatarSrc;
            img.alt = '';
            img.className = 'staff_avatar_img';
            img.setAttribute('aria-hidden', 'true');
            avatarSpan.replaceChildren(img);
            return;
        }

        const isNeutral = titleTxt.classList.contains('title_txt_simple') || !name;
        const initials = isNeutral ? '—' : extractStaffInitials(name);

        avatarSpan.replaceChildren(createStaffAvatarSvg(initials, name, isNeutral));
    });
};

const COMMENT_MAX_LENGTH = 1000;

const initCommentCharCount = () => {
    const textarea = document.getElementById('comment');
    const counter = document.getElementById('commentCount');
    if (!textarea || !counter || textarea.dataset.charCountBound) return;

    const suffix = counter.dataset.suffix || '文字';

    const update = () => {
        const length = textarea.value.length;
        counter.textContent = `${length}/${COMMENT_MAX_LENGTH}${suffix}`;
        counter.classList.toggle('is-limit', length >= COMMENT_MAX_LENGTH);
    };

    textarea.addEventListener('input', update);
    textarea.dataset.charCountBound = '1';
    update();
};
