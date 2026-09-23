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
            'zh-cn': '中文（简体）',
            'zh-tw': '中文（繁體）',
            'ko': '한국어'
        };

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
    // 日本語以外の表示調整（現時点enのみ）
    if ($('html').attr('lang') !== 'ja') {
        if ($('.step01').length) {
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
        if ($('.step02 .calendar_wrap .calendar').length) {
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

    // プログレスバー
    $(document).on("click", ".step01 input[type=\"radio\"]", function () {
        if ($(this).is(':checked')) {
            $(".flow li").removeClass("active");
            $(".flow li:nth-child(2)").addClass("active");
            $(".step02").addClass("open");
            $('html, body').animate({
                scrollTop: $('#a01').offset().top
            }, 500);
        }
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
});
