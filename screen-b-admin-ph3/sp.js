/* ==========================================================================
   予約GO 管理画面 / スマートフォン対応スクリプト
   --------------------------------------------------------------------------
   既存のHTMLを書き換えずにスマホ対応を成立させるための補助スクリプトです。
   やっていることは次のとおりです。

     (1) 上部バー（ハンバーガー）・暗幕・下部タブを生成して差し込む
     (2) サイドメニューの開閉（ハンバーガー／暗幕タップ／Escキー）
     (3) 一覧テーブルの各セルに data-label（＝見出しのテキスト）を付ける
         → カード表示にしたときの項目名として CSS 側で表示します
     (4) 受付・予約画面はスマホ幅のとき初期表示を「1日」に切り替える
     (5) スマホ幅では DnD を無効化し、並び替えは PC 向けにする

   本番実装では (1) と (3) はサーバー側テンプレートに直接書いてしまうのが
   望ましい形です（詳細は「スマホ対応_調整内容.md」を参照）。
   ========================================================================== */

(function () {
  'use strict';

  var NAV_BP = 1024;   // これ以下でサイドメニューを引き出しにする
  var CARD_BP = 768;   // これ以下でテーブルをカード表示にする

  window.tryServIsSpContent = function () {
    return window.innerWidth <= CARD_BP;
  };
  window.tryServIsSpNav = function () {
    return window.innerWidth <= NAV_BP;
  };

  /* ------------------------------------------------------------------
     下部タブの項目（サイドメニューと同じ絵文字アイコン）
     ------------------------------------------------------------------ */
  var BOTTOM_NAV = [
    { label: 'ダッシュボード', href: 'admin_index.html',        emoji: '📊' },
    { label: '受付・予約管理', href: 'admin_reservations.html', emoji: '📅' },
    { label: '顧客管理',       href: 'admin_customers.html',    emoji: '👥' },
    { label: 'メニュー管理',   href: 'admin_menus.html',        emoji: '🛠' }
  ];

  /* 詳細・サブ画面 → サイドメニュー上の親画面 */
  var APPBAR_PARENT = {
    'admin_reservation_list.html': 'admin_reservations.html',
    'admin_reservation_form.html': 'admin_reservations.html',
    'admin_reservation_detail.html': 'admin_reservations.html',
    'admin_resourceGroup.html': 'admin_resources.html',
    'admin_resourceSort.html': 'admin_resources.html',
    'admin_menuSort.html': 'admin_menus.html',
    'admin_shift.html': 'admin_resources.html',
    'admin_setting_google_feed.html': 'admin_setting.html',
    'admin_notice.html': 'admin_index.html'
  };

  function currentFile() {
    var p = location.pathname.split('/').pop();
    return p || 'admin_index.html';
  }

  function isSpContent() {
    return window.tryServIsSpContent();
  }

  /** サイドメニューの表示名（絵文字込み）を取得 */
  function resolveAppbarTitle(sidebar) {
    var here = currentFile();
    var target = APPBAR_PARENT.hasOwnProperty(here) ? APPBAR_PARENT[here] : here;
    if (target) {
      var links = sidebar.querySelectorAll('.nav a[href]');
      for (var i = 0; i < links.length; i++) {
        var href = (links[i].getAttribute('href') || '').split('?')[0].split('/').pop();
        if (href === target) {
          var clone = links[i].cloneNode(true);
          var dots = clone.querySelectorAll('.nav-indicator-dot');
          for (var d = 0; d < dots.length; d++) {
            if (dots[d].parentNode) dots[d].parentNode.removeChild(dots[d]);
          }
          return clone.textContent.replace(/\s+/g, ' ').trim();
        }
      }
    }
    return (document.title || '').split('｜')[0].trim() || '管理画面';
  }

  /* ==================================================================
     (1)(2) ナビゲーション
     ================================================================== */
  function buildNavigation() {
    var app = document.querySelector('.app');
    var sidebar = document.querySelector('.sidebar');
    // ログイン画面など、サイドメニューを持たない画面では何もしない
    if (!app || !sidebar) return;

    if (!sidebar.id) sidebar.id = 'spSidebar';

    /* --- 上部バー --------------------------------------------------- */
    var title = resolveAppbarTitle(sidebar);

    var appbar = document.createElement('header');
    appbar.className = 'sp-appbar';
    appbar.innerHTML =
      '<button type="button" class="sp-appbar-btn" id="spNavToggle" ' +
        'aria-label="メニューを開く" aria-expanded="false" aria-controls="' + sidebar.id + '">' +
        '<span class="sp-burger-icon"><span></span><span></span><span></span></span>' +
      '</button>' +
      '<span class="sp-appbar-title">' + title + '</span>';
    app.insertBefore(appbar, sidebar.nextSibling);

    /* --- 暗幕 ------------------------------------------------------- */
    var scrim = document.createElement('div');
    scrim.className = 'sp-scrim';
    scrim.id = 'spScrim';
    document.body.appendChild(scrim);

    /* --- 引き出し内：閉じるボタン ------------------------------------ */
    var head = document.createElement('div');
    head.className = 'sp-drawer-head';
    head.innerHTML = '<button type="button" class="sp-drawer-close" aria-label="メニューを閉じる">×</button>';
    sidebar.insertBefore(head, sidebar.firstChild);

    /* --- 引き出し内：アカウント操作（PCでは topbar にあるもの） -------- */
    var nav = sidebar.querySelector('.nav');
    var account = document.createElement('div');
    account.className = 'sp-drawer-account';
    account.innerHTML =
      '<a href="./admin_password.html">🔑 パスワード変更</a>' +
      '<a href="./admin_login.html">↩ ログアウト</a>';
    if (nav && nav.parentNode) {
      nav.parentNode.insertBefore(account, nav.nextSibling);
    } else {
      sidebar.appendChild(account);
    }

    /* --- 下部タブ ---------------------------------------------------- */
    var here = currentFile();
    var bottom = document.createElement('nav');
    bottom.className = 'sp-bottomnav';
    bottom.setAttribute('aria-label', 'よく使う画面');
    bottom.innerHTML = BOTTOM_NAV.map(function (item) {
      var active = (item.href === here || APPBAR_PARENT[here] === item.href) ? ' is-active' : '';
      return '<a class="' + active.trim() + '" href="./' + item.href + '"' +
             (active ? ' aria-current="page"' : '') + '>' +
             '<span class="sp-bottomnav-icon" aria-hidden="true">' + item.emoji + '</span>' +
             '<span class="sp-bottomnav-label">' + item.label + '</span></a>';
    }).join('') +
      '<button type="button" id="spNavToggleBottom" aria-controls="' + sidebar.id + '" aria-expanded="false">' +
      '<span class="sp-bottomnav-icon" aria-hidden="true">☰</span>' +
      '<span class="sp-bottomnav-label">すべて</span></button>';
    document.body.appendChild(bottom);

    /* --- 開閉 -------------------------------------------------------- */
    var toggles = [document.getElementById('spNavToggle'), document.getElementById('spNavToggleBottom')];
    var closeBtn = head.querySelector('.sp-drawer-close');

    function setOpen(open) {
      document.body.classList.toggle('sp-nav-open', open);
      toggles.forEach(function (b) {
        if (b) b.setAttribute('aria-expanded', String(open));
      });
      var top = toggles[0];
      if (top) top.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      if (open) {
        var first = sidebar.querySelector('.nav a');
        if (first) first.focus();
      } else if (top && document.activeElement && sidebar.contains(document.activeElement)) {
        top.focus();
      }
    }
    function isOpen() { return document.body.classList.contains('sp-nav-open'); }

    toggles.forEach(function (b) {
      if (b) b.addEventListener('click', function () { setOpen(!isOpen()); });
    });
    closeBtn.addEventListener('click', function () { setOpen(false); });
    scrim.addEventListener('click', function () { setOpen(false); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) setOpen(false);
    });

    // 引き出し内のリンクを押したら閉じる（同一ページ内リンク対策）
    sidebar.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    // PC幅に戻したら開閉状態をリセットする
    var mq = window.matchMedia('(min-width: ' + (NAV_BP + 1) + 'px)');
    var onChange = function (ev) { if (ev.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
  }

  /* ==================================================================
     (3) 一覧テーブルのカード化用ラベル付与
     ================================================================== */
  var TITLE_RE = /(名|件名|タイトル|内容|項目)/;
  var ID_RE = /^(ID|Ｉ?Ｄ|No\.?|番号)$/i;

  function labelOneTable(table) {
    var thead = table.tHead;
    if (!thead || !thead.rows.length) return;

    var headRow = thead.rows[thead.rows.length - 1];
    var ths = Array.prototype.slice.call(headRow.cells);

    // 結合セルがある表はカード化に向かないため対象外（横スクロールのまま）
    var merged = ths.some(function (th) { return th.colSpan > 1; });
    if (merged) {
      table.classList.add('sp-no-card');
      return;
    }

    var labels = ths.map(function (th) {
      return th.textContent.replace(/\s+/g, ' ').trim();
    });

    var idIdx = ID_RE.test(labels[0]) ? 0 : -1;
    var titleIdx = -1;
    for (var i = 0; i < labels.length; i++) {
      if (i === idIdx) continue;
      if (/操作/.test(labels[i])) continue;
      if (TITLE_RE.test(labels[i])) { titleIdx = i; break; }
    }

    Array.prototype.forEach.call(table.tBodies, function (tbody) {
      Array.prototype.forEach.call(tbody.rows, function (row) {
        if (row.cells.length !== labels.length) return;   // 「データなし」行などは触らない
        Array.prototype.forEach.call(row.cells, function (td, idx) {
          if (td.colSpan > 1) return;
          var label = labels[idx];

          if (idx === titleIdx) {
            td.classList.add('sp-card-title');
            td.removeAttribute('data-label');
            return;
          }
          if (idx === idIdx) {
            td.classList.add('sp-card-id');
            td.setAttribute('data-label', label);
            return;
          }
          if (/操作/.test(label)) {
            td.classList.add('action-cell');
            td.removeAttribute('data-label');
            return;
          }
          if (label) td.setAttribute('data-label', label);
        });
      });
    });
  }

  function labelTables() {
    Array.prototype.forEach.call(document.querySelectorAll('table.results-table'), labelOneTable);
  }

  // JavaScript で描画される一覧（検索結果など）にも追従させる
  function watchTables() {
    if (!('MutationObserver' in window)) return;
    var timer = null;
    var mo = new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(labelTables, 60);
    });
    Array.prototype.forEach.call(document.querySelectorAll('table.results-table tbody'), function (tbody) {
      mo.observe(tbody, { childList: true });
    });
  }

  /* ==================================================================
     (4) 受付・予約画面：1024px 以下では「1日」、それ以上では「1週間」
     ================================================================== */
  var weekViewBlocked = false;

  function isScheduleNarrowView() {
    return window.tryServIsSpNav();
  }

  function syncScheduleViewMode() {
    var weekBtn = document.getElementById('view1Week');
    var dayBtn = document.getElementById('view1Day');
    if (!weekBtn || !dayBtn) return;

    if (isScheduleNarrowView()) {
      if (weekBtn.classList.contains('active')) {
        dayBtn.click();
      }

      if (!weekViewBlocked) {
        weekViewBlocked = true;
        weekBtn.addEventListener('click', function (e) {
          if (!isScheduleNarrowView()) return;
          e.preventDefault();
          e.stopPropagation();
          if (weekBtn.classList.contains('active')) dayBtn.click();
        }, true);
      }
      return;
    }

    if (dayBtn.classList.contains('active')) {
      weekBtn.click();
    }
  }

  /* 後方互換 */
  function preferOneDayView() {
    syncScheduleViewMode();
  }

  /* ==================================================================
     (5) DnD 無効化（コンテンツ幅 ≤ 768）
     ================================================================== */
  function disableDraggableInDom() {
    var sp = isSpContent();
    document.body.classList.toggle('sp-no-dnd', sp);

    var nodes = document.querySelectorAll('[draggable="true"], .rg-item--drag-disabled');
    Array.prototype.forEach.call(nodes, function (el) {
      if (sp) {
        if (el.getAttribute('draggable') === 'true') {
          el.setAttribute('draggable', 'false');
          el.classList.add('rg-item--drag-disabled');
          el.setAttribute('data-sp-was-draggable', '1');
        }
      } else if (el.getAttribute('data-sp-was-draggable') === '1') {
        el.setAttribute('draggable', 'true');
        el.classList.remove('rg-item--drag-disabled');
        el.removeAttribute('data-sp-was-draggable');
      }
    });

    // 並び替え専用ページ：SP 向け案内
    ensureSortPageNotice(sp);
  }

  function ensureSortPageNotice(sp) {
    var file = currentFile();
    if (file !== 'admin_resourceSort.html' && file !== 'admin_menuSort.html') return;

    var info = document.querySelector('.sort-info');
    if (!info) return;

    var notice = document.getElementById('spSortPcOnlyNotice');
    if (sp) {
      if (!notice) {
        notice = document.createElement('p');
        notice.id = 'spSortPcOnlyNotice';
        notice.className = 'sp-sort-pc-only-notice';
        notice.textContent = '並び替えはPCで行ってください';
        info.appendChild(notice);
      }
      notice.style.display = '';
    } else if (notice) {
      notice.style.display = 'none';
    }
  }

  function watchDraggable() {
    if (!('MutationObserver' in window)) return;
    var timer = null;
    var mo = new MutationObserver(function () {
      if (!isSpContent()) return;
      clearTimeout(timer);
      timer = setTimeout(disableDraggableInDom, 60);
    });
    mo.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['draggable']
    });
  }

  // SP ではあらゆる dragstart をキャプチャで止める
  document.addEventListener('dragstart', function (e) {
    if (!isSpContent() && !document.body.classList.contains('sp-no-dnd')) return;
    e.preventDefault();
  }, true);

  function onSpLayoutChange() {
    disableDraggableInDom();
    syncScheduleViewMode();
    if (typeof window.tryServOnSpLayoutChange === 'function') {
      window.tryServOnSpLayoutChange(isSpContent());
    }
  }

  /* ------------------------------------------------------------------ */
  function init() {
    buildNavigation();
    labelTables();
    watchTables();
    disableDraggableInDom();
    syncScheduleViewMode();
    watchDraggable();

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(onSpLayoutChange, 150);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  window.addEventListener('load', syncScheduleViewMode);
})();
