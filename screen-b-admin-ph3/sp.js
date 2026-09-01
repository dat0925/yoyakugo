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
     (5) スマホ幅では DnD を無効化（PC はドラッグ＋▲▼の両方）
     (6) 全画面シート：背面スクロールロックと端末「戻る」で閉じる

   本番実装では (1) と (3) はサーバー側テンプレートに直接書いてしまうのが
   望ましい形です（詳細は「スマホ対応_調整内容.md」を参照）。
   ========================================================================== */

(function () {
  'use strict';

  var SP_BP = 1024;   // 1024px未満でSP表示（レイアウト・ナビ・コンテンツ）

  window.tryServIsSpContent = function () {
    return window.innerWidth < SP_BP;
  };
  window.tryServIsSpNav = function () {
    return window.innerWidth < SP_BP;
  };

  /* ------------------------------------------------------------------
     下部タブの項目（サイドメニューと同じ絵文字アイコン）
     ------------------------------------------------------------------ */
  var BOTTOM_NAV = [
    { label: 'ホーム',       href: 'admin_index.html',        emoji: '📊' },
    { label: '受付・予約',   href: 'admin_reservations.html', emoji: '📅' },
    { label: '顧客',         href: 'admin_customers.html',    emoji: '👥' },
    { label: 'メニュー',     href: 'admin_menus.html',        emoji: '🛠' }
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

  function normalizeNavHref(href) {
    if (!href) return '';
    var name = href.split('/').pop().split('?')[0];
    return name || '';
  }

  function getNavLinkLabel(link) {
    var clone = link.cloneNode(true);
    var dots = clone.querySelectorAll('.nav-indicator-dot');
    for (var i = 0; i < dots.length; i++) {
      dots[i].parentNode.removeChild(dots[i]);
    }
    return clone.textContent.replace(/\s+/g, ' ').trim();
  }

  /** サイドメニューに対応する項目があれば、そのラベル（絵文字付き）を返す */
  function resolveSidebarNavTitle(filename) {
    var nav = document.querySelector('.sidebar .nav');
    if (!nav) return null;
    var links = nav.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      if (normalizeNavHref(links[i].getAttribute('href')) === filename) {
        return getNavLinkLabel(links[i]);
      }
    }
    return null;
  }

  /** 上部バーに表示する現在地（サイドメニュー項目 → 本文見出しの順） */
  function resolveAppbarTitle() {
    var navTitle = resolveSidebarNavTitle(currentFile());
    if (navTitle) {
      return navTitle;
    }
    var heading = document.querySelector('.main-title, .schedule-title');
    if (heading) {
      return heading.textContent.replace(/\s+/g, ' ').trim();
    }
    return (document.title || '').split('｜')[0].trim() || '管理画面';
  }

  function resolveAppbarParent() {
    var here = currentFile();
    return APPBAR_PARENT.hasOwnProperty(here) ? APPBAR_PARENT[here] : null;
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
    var title = resolveAppbarTitle();
    var parentHref = resolveAppbarParent();
    var leadingControl = parentHref
      ? '<a class="sp-appbar-btn sp-appbar-back" href="./' + parentHref + '" aria-label="戻る">' +
          '<span class="sp-appbar-back-icon" aria-hidden="true">←</span></a>'
      : '<button type="button" class="sp-appbar-btn" id="spNavToggle" ' +
          'aria-label="メニューを開く" aria-expanded="false" aria-controls="' + sidebar.id + '">' +
          '<span class="sp-burger-icon"><span></span><span></span><span></span></span></button>';

    var appbar = document.createElement('header');
    appbar.className = 'sp-appbar';
    appbar.innerHTML =
      leadingControl +
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
      '<a href="#" class="js-sp-drawer-manual">📖 オンラインマニュアル</a>' +
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
      var active = item.href === here ? ' is-active' : '';
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
    var navToggle = document.getElementById('spNavToggle');
    var bottomToggle = document.getElementById('spNavToggleBottom');
    var toggles = bottomToggle ? [bottomToggle] : [];
    if (navToggle) toggles.unshift(navToggle);
    var closeBtn = head.querySelector('.sp-drawer-close');
    var backdropEls = [document.querySelector('.topbar'), document.querySelector('.main'), bottom];
    var lastFocusedBeforeOpen = null;

    function getDrawerFocusables() {
      var nodes = sidebar.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      var list = [];
      for (var i = 0; i < nodes.length; i++) {
        if (!nodes[i].disabled) list.push(nodes[i]);
      }
      return list;
    }

    function setInert(el, inert) {
      if (!el) return;
      if ('inert' in el) el.inert = inert;
      if (inert) el.setAttribute('aria-hidden', 'true');
      else el.removeAttribute('aria-hidden');
    }

    function syncDrawerA11y(open) {
      if (!isSpContent()) {
        setInert(sidebar, false);
        sidebar.removeAttribute('aria-hidden');
        backdropEls.forEach(function (el) { setInert(el, false); });
        scrim.setAttribute('aria-hidden', 'true');
        return;
      }
      setInert(sidebar, !open);
      sidebar.setAttribute('aria-hidden', open ? 'false' : 'true');
      backdropEls.forEach(function (el) { setInert(el, open); });
      scrim.setAttribute('aria-hidden', open ? 'false' : 'true');
    }

    function handleDrawerTabTrap(e) {
      if (!isOpen() || !isSpContent() || e.key !== 'Tab') return;
      var focusables = getDrawerFocusables();
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      var active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || !sidebar.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !sidebar.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    }

    function setOpen(open) {
      document.body.classList.toggle('sp-nav-open', open);
      syncDrawerA11y(open);
      toggles.forEach(function (b) {
        if (b) b.setAttribute('aria-expanded', String(open));
      });
      if (navToggle) {
        navToggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      }
      if (open) {
        lastFocusedBeforeOpen = document.activeElement;
        var focusables = getDrawerFocusables();
        if (focusables.length) focusables[0].focus();
      } else {
        var returnFocus = navToggle || bottomToggle || lastFocusedBeforeOpen;
        if (returnFocus && sidebar.contains(document.activeElement) && typeof returnFocus.focus === 'function') {
          returnFocus.focus();
        }
      }
    }
    function isOpen() { return document.body.classList.contains('sp-nav-open'); }

    syncDrawerA11y(false);

    toggles.forEach(function (b) {
      if (b) b.addEventListener('click', function () { setOpen(!isOpen()); });
    });
    closeBtn.addEventListener('click', function () { setOpen(false); });
    scrim.addEventListener('click', function () { setOpen(false); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) {
        setOpen(false);
        return;
      }
      handleDrawerTabTrap(e);
    });

    // 引き出し内のリンクを押したら閉じる（同一ページ内リンク対策）
    sidebar.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link) return;
      if (link.classList.contains('js-sp-drawer-manual')) {
        e.preventDefault();
        var topManual = document.querySelector('.topbar .phase-wrapper .link-btn, .topbar .phase-wrapper a.link-btn');
        if (topManual) topManual.click();
      }
      setOpen(false);
    });

    // PC幅に戻したら開閉状態をリセットする
    var mq = window.matchMedia('(min-width: ' + SP_BP + 'px)');
    var onChange = function (ev) {
      if (ev.matches) setOpen(false);
      else syncDrawerA11y(isOpen());
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
  }

  /* ==================================================================
     (3) 一覧テーブルのカード化用ラベル付与
     ================================================================== */
  var TITLE_RE = /(名|件名|タイトル|内容|項目)/;
  var ID_RE = /^(ID|Ｉ?Ｄ|No\.?|番号)$/i;

  function isActionColumnLabel(label) {
    return label === '操作';
  }

  function cellHasActionControl(td) {
    return !!td.querySelector('button, .action-btn, a.link-btn, input[type="button"], input[type="submit"]');
  }

  function findTitleIndex(labels, idIdx) {
    var i;
    for (i = 0; i < labels.length; i++) {
      if (labels[i] === '操作日時') return i;
    }
    for (i = 0; i < labels.length; i++) {
      if (i === idIdx) continue;
      if (isActionColumnLabel(labels[i])) continue;
      if (TITLE_RE.test(labels[i])) return i;
    }
    return -1;
  }

  function normalizeOplogDateTimeForSp(table, sp) {
    if (!table.classList.contains('oplog-table')) return;
    Array.prototype.forEach.call(table.querySelectorAll('tbody td:first-child'), function (td) {
      if (sp) {
        if (!td.hasAttribute('data-oplog-datetime-html')) {
          td.setAttribute('data-oplog-datetime-html', td.innerHTML);
        }
        if (/<br/i.test(td.innerHTML)) {
          td.innerHTML = td.innerHTML.replace(/<br\s*\/?>/gi, ' ');
        }
        return;
      }
      if (td.hasAttribute('data-oplog-datetime-html')) {
        td.innerHTML = td.getAttribute('data-oplog-datetime-html');
      }
    });
  }

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
    var titleIdx = findTitleIndex(labels, idIdx);

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
          if (isActionColumnLabel(label) || cellHasActionControl(td)) {
            td.classList.add('action-cell');
            td.removeAttribute('data-label');
            return;
          }
          if (label) td.setAttribute('data-label', label);
        });
      });
    });
    normalizeOplogDateTimeForSp(table, isSpContent());
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
     (4) 受付・予約画面：1024px 未満では「1日」、1024px 以上では「1週間」
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
     (5) DnD 無効化（1024px 未満）
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
    if (!isSpContent()) return;
    e.preventDefault();
  }, true);

  /* ==================================================================
     (6) 全画面モーダル：背面スクロールロック／端末「戻る」で閉じる
     ================================================================== */
  var MODAL_SELECTOR = '.popup-overlay, .list-popup-overlay, .reservation-modal, .block-modal, .reservation-detail-modal, dialog';
  var modalScrollY = 0;
  var sheetHistoryCount = 0;
  var sheetHistoryFromUiBack = false;
  var sheetHistoryFromPopstate = false;
  var prevSheetRoots = [];

  function isModalVisible(el) {
    if (!el || !el.isConnected) return false;
    if (el.tagName === 'DIALOG') return el.open;
    var cs = window.getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.opacity === '0') return false;
    if (el.classList.contains('show')) return true;
    return cs.display !== 'none';
  }

  function isSheetRoot(el) {
    if (!el || !el.matches) return false;
    if (el.matches('.popup-overlay, .list-popup-overlay, dialog')) return true;
    if (el.matches('.reservation-modal, .block-modal, .reservation-detail-modal')) {
      return !el.closest('.popup-overlay, .list-popup-overlay');
    }
    return false;
  }

  function getVisibleSheetRoots() {
    var roots = [];
    Array.prototype.forEach.call(document.querySelectorAll(MODAL_SELECTOR), function (el) {
      if (isSheetRoot(el) && isModalVisible(el)) roots.push(el);
    });
    return roots;
  }

  function getTopmostSheetRoot() {
    var roots = getVisibleSheetRoots();
    if (!roots.length) return null;
    var top = roots[0];
    var topZ = parseInt(window.getComputedStyle(top).zIndex, 10) || 0;
    for (var i = 1; i < roots.length; i++) {
      var z = parseInt(window.getComputedStyle(roots[i]).zIndex, 10) || 0;
      if (z >= topZ) {
        top = roots[i];
        topZ = z;
      }
    }
    return top;
  }

  function closeSheetElement(el) {
    if (!el || !el.isConnected) return;
    if (el.tagName === 'DIALOG') {
      if (el.open) el.close();
      return;
    }
    el.style.display = 'none';
    el.classList.remove('show');
    Array.prototype.forEach.call(el.querySelectorAll('.show'), function (node) {
      node.classList.remove('show');
    });
  }

  function syncSheetHistory() {
    if (!isSpContent() || !window.history || !window.history.pushState) {
      sheetHistoryCount = 0;
      prevSheetRoots = [];
      sheetHistoryFromUiBack = false;
      sheetHistoryFromPopstate = false;
      return;
    }

    if (sheetHistoryFromPopstate) {
      prevSheetRoots = getVisibleSheetRoots().slice();
      sheetHistoryFromPopstate = false;
      return;
    }

    var current = getVisibleSheetRoots();
    var i;
    var j;

    for (i = 0; i < current.length; i++) {
      if (prevSheetRoots.indexOf(current[i]) === -1) {
        sheetHistoryCount++;
        window.history.pushState({ spSheet: true }, '');
      }
    }

    for (j = 0; j < prevSheetRoots.length; j++) {
      if (current.indexOf(prevSheetRoots[j]) === -1 && sheetHistoryCount > 0 && !sheetHistoryFromUiBack) {
        sheetHistoryFromUiBack = true;
        window.history.back();
      }
    }

    prevSheetRoots = current.slice();
  }

  function onSheetPopstate() {
    if (!isSpContent()) return;

    if (sheetHistoryFromUiBack) {
      sheetHistoryFromUiBack = false;
      if (sheetHistoryCount > 0) sheetHistoryCount--;
      prevSheetRoots = getVisibleSheetRoots().slice();
      syncModalScrollLock();
      return;
    }

    if (sheetHistoryCount <= 0) return;

    sheetHistoryFromPopstate = true;
    sheetHistoryCount--;

    var modal = getTopmostSheetRoot();
    if (modal) closeSheetElement(modal);

    syncModalScrollLock();
  }

  function hasOpenModal() {
    var nodes = document.querySelectorAll(MODAL_SELECTOR);
    for (var i = 0; i < nodes.length; i++) {
      if (isModalVisible(nodes[i])) return true;
    }
    return false;
  }

  function lockModalScroll() {
    if (document.body.classList.contains('sp-modal-open')) return;
    modalScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.classList.add('sp-modal-open');
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + modalScrollY + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }

  function unlockModalScroll() {
    if (!document.body.classList.contains('sp-modal-open')) return;
    var y = modalScrollY;
    document.body.classList.remove('sp-modal-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, y);
  }

  function syncModalScrollLock() {
    if (!isSpContent()) {
      unlockModalScroll();
      sheetHistoryCount = 0;
      prevSheetRoots = [];
      return;
    }
    if (hasOpenModal()) {
      lockModalScroll();
    } else {
      unlockModalScroll();
    }
  }

  function watchModals() {
    if (!('MutationObserver' in window)) return;
    var timer = null;
    var mo = new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        syncSheetHistory();
        syncModalScrollLock();
        if (isSpContent()) enhanceModalFooterOverflow();
      }, 30);
    });
    mo.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'open']
    });
    Array.prototype.forEach.call(document.querySelectorAll('dialog'), function (dialog) {
      dialog.addEventListener('close', function () {
        syncSheetHistory();
        syncModalScrollLock();
      });
      dialog.addEventListener('cancel', function () {
        syncSheetHistory();
        syncModalScrollLock();
      });
    });

    window.addEventListener('popstate', onSheetPopstate);
  }

  function syncListPagerLayout() {
    var isSp = isSpContent();

    function restorePagerBar(bar) {
      var parent = bar.parentElement;
      if (!parent) return;
      var controls = bar.querySelector('.pagination-controls');
      var footer = parent.querySelector(':scope > .sp-list-pager-footer');
      if (!controls || !footer) return;
      var pagination = footer.querySelector('.pagination');
      var pageRange = footer.querySelector('.page-range');
      if (pagination) controls.appendChild(pagination);
      if (pageRange) controls.appendChild(pageRange);
      footer.remove();
      bar.classList.remove('sp-list-pager-toolbar');
    }

    function relocatePagerBar(bar, container) {
      var parent = bar.parentElement;
      if (!parent || !container) return;
      var controls = bar.querySelector('.pagination-controls');
      if (!controls) return;

      if (!isSp) {
        if (bar.classList.contains('sp-list-pager-toolbar')) restorePagerBar(bar);
        return;
      }

      var pagination = controls.querySelector('.pagination');
      var pageRange = controls.querySelector('.page-range');
      if (!pagination && !pageRange) return;

      var footer = parent.querySelector(':scope > .sp-list-pager-footer');
      if (!footer) {
        footer = document.createElement('div');
        footer.className = 'search-results-footer sp-list-pager-footer pagination-controls';
        container.insertAdjacentElement('afterend', footer);
      }
      if (pagination && pagination.parentElement !== footer) footer.appendChild(pagination);
      if (pageRange && pageRange.parentElement !== footer) footer.appendChild(pageRange);
      bar.classList.add('sp-list-pager-toolbar');
    }

    document.querySelectorAll('.search-results-header').forEach(function (header) {
      var container = header.nextElementSibling;
      while (container && !container.classList.contains('results-table-container')) {
        container = container.nextElementSibling;
      }
      relocatePagerBar(header, container);
    });

    document.querySelectorAll('.reservation-pager').forEach(function (pager) {
      var container = pager.nextElementSibling;
      while (container && !container.classList.contains('results-table-container')) {
        container = container.nextElementSibling;
      }
      relocatePagerBar(pager, container);
    });

    document.querySelectorAll('.usage-list-pager-wrap').forEach(function (pager) {
      var container = pager.nextElementSibling;
      while (container && !container.classList.contains('results-table-container')) {
        container = container.nextElementSibling;
      }
      relocatePagerBar(pager, container);
    });
  }

  function setSearchFilterPanelOpen(panel, bar, open) {
    var toggle = bar.querySelector('.sp-search-filter-toggle');
    panel.classList.toggle('sp-search-filter-panel--collapsed', !open);
    panel.hidden = !open;
    if (toggle) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? '絞り込み検索を閉じる' : '絞り込み検索');
    }
    if (open) panel.dataset.spFilterUserOpen = '1';
    else delete panel.dataset.spFilterUserOpen;
  }

  function ensureSearchFilterBar(panel) {
    var anchorSel = panel.getAttribute('data-sp-search-anchor');
    var anchor = anchorSel ? document.querySelector(anchorSel) : panel.previousElementSibling;
    if (!anchor) return null;
    var bar = anchor.nextElementSibling;
    if (!bar || !bar.classList.contains('sp-search-filter-bar')) {
      bar = document.createElement('div');
      bar.className = 'sp-search-filter-bar';
      bar.innerHTML =
        '<button type="button" class="date-btn sp-search-filter-toggle" aria-expanded="false" aria-label="絞り込み検索">' +
          '<span>三 絞り込み検索</span>' +
        '</button>';
      anchor.insertAdjacentElement('afterend', bar);
    } else {
      var summary = bar.querySelector('.sp-search-filter-summary');
      if (summary) summary.parentNode.removeChild(summary);
    }
    return bar;
  }

  function bindSearchFilterPanel(panel, bar) {
    if (panel.dataset.spFilterBound === '1') return;
    panel.dataset.spFilterBound = '1';

    var toggle = bar.querySelector('.sp-search-filter-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = panel.classList.contains('sp-search-filter-panel--collapsed') || panel.hidden;
        setSearchFilterPanelOpen(panel, bar, open);
      });
    }
  }

  function syncSpSearchFilterPanels() {
    var isSp = isSpContent();
    document.querySelectorAll('[data-sp-search-filter]').forEach(function (panel) {
      if (!isSp) {
        panel.hidden = false;
        panel.classList.remove('sp-search-filter-panel--collapsed');
        var anchorSel = panel.getAttribute('data-sp-search-anchor');
        var anchor = anchorSel ? document.querySelector(anchorSel) : null;
        if (anchor) {
          var maybeBar = anchor.nextElementSibling;
          if (maybeBar && maybeBar.classList.contains('sp-search-filter-bar')) {
            maybeBar.hidden = true;
          }
        }
        return;
      }

      var bar = ensureSearchFilterBar(panel);
      if (!bar) return;
      bar.hidden = false;
      bindSearchFilterPanel(panel, bar);

      if (panel.dataset.spFilterUserOpen === '1') {
        setSearchFilterPanelOpen(panel, bar, true);
      } else {
        setSearchFilterPanelOpen(panel, bar, false);
      }
    });
  }

  function restoreScheduleToolbarToTopbar(topbar, searchWrap, warnBtn, refreshBtn) {
    if (!topbar) return;
    if (searchWrap && searchWrap.parentNode !== topbar) {
      var searchHome = searchWrap._spToolbarHome;
      if (searchHome && searchHome.parent) {
        if (searchHome.next) searchHome.parent.insertBefore(searchWrap, searchHome.next);
        else searchHome.parent.appendChild(searchWrap);
      } else {
        topbar.insertBefore(searchWrap, topbar.firstChild);
      }
      searchWrap._spToolbarHome = null;
    }
    if (refreshBtn) {
      var dateControls = document.querySelector('.schedule-section .date-controls');
      if (dateControls && refreshBtn.parentNode !== dateControls) {
        var refreshHome = refreshBtn._spToolbarHome;
        if (refreshHome && refreshHome.parent) {
          if (refreshHome.next) refreshHome.parent.insertBefore(refreshBtn, refreshHome.next);
          else refreshHome.parent.appendChild(refreshBtn);
        } else {
          dateControls.insertBefore(refreshBtn, dateControls.firstChild);
        }
      }
      refreshBtn._spToolbarHome = null;
    }
    if (warnBtn && warnBtn.parentNode !== topbar) {
      var warnHome = warnBtn._spToolbarHome;
      if (warnHome && warnHome.parent) {
        if (warnHome.next) warnHome.parent.insertBefore(warnBtn, warnHome.next);
        else warnHome.parent.appendChild(warnBtn);
      } else {
        topbar.appendChild(warnBtn);
      }
      warnBtn._spToolbarHome = null;
    }
    topbar.classList.remove('sp-schedule-topbar-hidden');
  }

  function syncReservationScheduleToolbar() {
    var scheduleSection = document.querySelector('.schedule-section');
    if (!scheduleSection) return;

    var topbar = document.querySelector('.topbar');
    var header = scheduleSection.querySelector('.schedule-header');
    var searchWrap = topbar && topbar.querySelector('.search');
    var warnBtn = topbar && topbar.querySelector('.schedule-web-reception-btn, .warn-btn');
    var refreshBtn = document.getElementById('scheduleRefreshBtn');
    var overflowBtn = document.getElementById('scheduleOverflowBtn');
    var panel = document.getElementById('scheduleSpToolsPanel');

    if (!isSpContent()) {
      restoreScheduleToolbarToTopbar(topbar, searchWrap, warnBtn, refreshBtn);
      if (overflowBtn && overflowBtn.parentNode) overflowBtn.parentNode.removeChild(overflowBtn);
      if (panel && panel.parentNode) panel.parentNode.removeChild(panel);
      return;
    }

    if (!header || !topbar || !searchWrap || !warnBtn) return;

    if (!searchWrap._spToolbarHome) {
      searchWrap._spToolbarHome = { parent: searchWrap.parentNode, next: searchWrap.nextSibling };
    }
    if (warnBtn && !warnBtn._spToolbarHome) {
      warnBtn._spToolbarHome = { parent: warnBtn.parentNode, next: warnBtn.nextSibling };
    }
    if (refreshBtn && !refreshBtn._spToolbarHome) {
      refreshBtn._spToolbarHome = { parent: refreshBtn.parentNode, next: refreshBtn.nextSibling };
    }

    if (searchWrap.parentNode !== header) header.insertBefore(searchWrap, header.firstChild);
    if (warnBtn.parentNode !== header) header.appendChild(warnBtn);
    if (refreshBtn && refreshBtn.parentNode !== header) {
      header.insertBefore(refreshBtn, warnBtn);
    }

    topbar.classList.add('sp-schedule-topbar-hidden');
    if (overflowBtn && overflowBtn.parentNode) overflowBtn.parentNode.removeChild(overflowBtn);
    if (panel && panel.parentNode) panel.parentNode.removeChild(panel);
  }

  function getSpTopbarIconName(label) {
    if (!label) return '';
    if (label.indexOf('リソースグループ') >= 0) return 'group_work';
    if (label.indexOf('リソース管理') >= 0) return 'event_seat';
    return '';
  }

  function enhanceTopbarButtons() {
    var isSp = isSpContent();
    document.querySelectorAll('.topbar .regist-btn').forEach(function (btn) {
      if (!btn.dataset.spHtmlStored) {
        btn.dataset.spHtmlStored = btn.innerHTML;
        btn.dataset.spFullLabel = btn.textContent.replace(/\s+/g, ' ').trim();
      }
      if (isSp) {
        btn.classList.add('sp-topbar-icon-btn');
        btn.innerHTML = '<i class="material-icons">add</i>';
        btn.setAttribute('aria-label', btn.dataset.spFullLabel || '新規登録');
      } else {
        btn.classList.remove('sp-topbar-icon-btn');
        btn.innerHTML = btn.dataset.spHtmlStored;
      }
    });

    document.querySelectorAll('.topbar .btn.normal-btn').forEach(function (btn) {
      if (btn.classList.contains('print-reservation-btn')) return;
      if (!btn.dataset.spHtmlStored) {
        btn.dataset.spHtmlStored = btn.innerHTML;
        btn.dataset.spFullLabel = btn.textContent.replace(/\s+/g, ' ').trim();
      }
      var text = btn.dataset.spFullLabel;
      var iconName = getSpTopbarIconName(text);
      if (!btn.dataset.spShortLabel) {
        if (text.indexOf('並び替え') >= 0) btn.dataset.spShortLabel = '⇅';
        else if (text.indexOf('メニュー') >= 0) btn.dataset.spShortLabel = '≡';
        else btn.dataset.spShortLabel = text.charAt(0) || '…';
      }
      if (isSp && iconName) {
        btn.classList.add('sp-topbar-icon-btn');
        btn.classList.remove('sp-topbar-short-btn');
        btn.innerHTML = '<i class="material-icons">' + iconName + '</i>';
        btn.setAttribute('aria-label', text);
      } else if (isSp) {
        btn.classList.remove('sp-topbar-icon-btn');
        btn.classList.add('sp-topbar-short-btn');
        btn.textContent = btn.dataset.spShortLabel;
        btn.setAttribute('aria-label', text);
      } else {
        btn.classList.remove('sp-topbar-icon-btn', 'sp-topbar-short-btn');
        btn.innerHTML = btn.dataset.spHtmlStored;
      }
    });
  }

  function enhanceMainHeaders() {
    document.querySelectorAll('.main-header').forEach(function (header) {
      header.classList.toggle('sp-main-header-hidden', isSpContent());
    });
  }

  function enhanceSearchFormActions() {
    document.querySelectorAll('.search-form-actions').forEach(function (row) {
      row.classList.add('sp-search-actions-inline');
    });
    document.querySelectorAll('.form-group, .search-form-row').forEach(function (group) {
      if (group.querySelector('.search-form-actions')) return;
      var searchBtn = group.querySelector('.link-btn');
      var clearBtn = group.querySelector('.clear-btn');
      if (!searchBtn || !clearBtn) return;
      if (searchBtn.parentNode !== group || clearBtn.parentNode !== group) return;
      var wrap = document.createElement('div');
      wrap.className = 'search-form-actions sp-search-actions-inline';
      group.insertBefore(wrap, searchBtn);
      wrap.appendChild(searchBtn);
      wrap.appendChild(clearBtn);
    });
  }

  function getModalCloseHandler(modalRoot) {
    var closeBtn = modalRoot.querySelector('.modal-header .modal-close, .modal-header-new .modal-close');
    if (closeBtn && closeBtn.getAttribute('onclick')) return closeBtn.getAttribute('onclick');
    var named = modalRoot.querySelector('[onclick*="close"], [onclick*="hide"], [onclick*="Close"]');
    return named ? named.getAttribute('onclick') : null;
  }

  function ensureModalChrome() {
    document.querySelectorAll('.popup-overlay, .list-popup-overlay, .reservation-modal, .block-modal, .reservation-detail-modal').forEach(function (overlay) {
      var modal = overlay.querySelector('.normal-modal, .list-modal, .division-modal');
      if (!modal || modal.dataset.spChromeDone === '1') return;
      modal.dataset.spChromeDone = '1';

      var header = modal.querySelector('.modal-header, .modal-header-new');
      if (header && !header.querySelector('.modal-close')) {
        var closeHandler = getModalCloseHandler(overlay);
        if (closeHandler) {
          var x = document.createElement('button');
          x.type = 'button';
          x.className = 'modal-close';
          x.setAttribute('aria-label', '閉じる');
          x.textContent = '×';
          x.setAttribute('onclick', closeHandler);
          header.appendChild(x);
        }
      }

      var actions = modal.querySelector('.modal-actions, .modal-actions-new');
      if (!actions) return;
      var hasClose = false;
      actions.querySelectorAll('button').forEach(function (btn) {
        if (/閉じる/.test(btn.textContent)) hasClose = true;
      });
      if (!hasClose) {
        var closeHandler = getModalCloseHandler(overlay);
        if (closeHandler) {
          var footerClose = document.createElement('button');
          footerClose.type = 'button';
          footerClose.className = 'modal-btn modal-btn-cancel sp-modal-footer-close';
          footerClose.textContent = '閉じる';
          footerClose.setAttribute('onclick', closeHandler);
          actions.appendChild(footerClose);
        }
      }
    });
  }

  function enhancePageCancelButtons() {
    document.querySelectorAll('.sort-actions .form-btn-cancel, .sort-actions button[onclick*="goBack"], .sort-actions button[onclick*="closeShiftPage"]').forEach(function (btn) {
      if (btn.dataset.spCancelDone === '1') return;
      btn.dataset.spCancelDone = '1';
      if (/閉じる/.test(btn.textContent)) btn.textContent = 'キャンセル';
      btn.classList.add('sp-page-cancel-btn');
    });
  }

  function isModalCloseButton(btn) {
    var text = (btn.textContent || '').replace(/\s+/g, '').trim();
    return btn.classList.contains('modal-btn-cancel') ||
      btn.classList.contains('sp-modal-footer-close') ||
      text === '閉じる' ||
      text === 'キャンセル';
  }

  function getModalButtonKey(btn) {
    return btn.id || btn.getAttribute('onclick') || (btn.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function captureModalButtonVisibility(actions) {
    var map = {};
    actions.querySelectorAll('button').forEach(function (btn) {
      map[getModalButtonKey(btn)] = {
        display: btn.style.display,
        hidden: btn.hidden,
        text: (btn.textContent || '').replace(/\s+/g, ' ').trim()
      };
    });
    return map;
  }

  function applyModalButtonVisibility(actions, map) {
    if (!map) return;
    actions.querySelectorAll('button').forEach(function (btn) {
      var state = map[getModalButtonKey(btn)];
      if (!state) return;
      if (state.display) {
        btn.style.display = state.display;
      } else {
        btn.style.removeProperty('display');
      }
      btn.hidden = !!state.hidden;
      if (state.text) btn.textContent = state.text;
    });
  }

  function isVisibleModalActionButton(btn) {
    if (isModalCloseButton(btn)) return false;
    if (btn.classList.contains('modal-action-pc-only')) return false;
    if (btn.classList.contains('sp-modal-action-stash')) return false;
    if (btn.hidden) return false;
    if (btn.getAttribute('aria-hidden') === 'true') return false;
    if (btn.style.display === 'none') return false;
    var computed = window.getComputedStyle(btn);
    return computed.display !== 'none' && computed.visibility !== 'hidden';
  }

  function countVisibleModalActionButtons(actions) {
    return actions.querySelectorAll(':scope > button').length
      ? Array.prototype.filter.call(actions.querySelectorAll(':scope > button'), isVisibleModalActionButton).length
      : Array.prototype.filter.call(actions.querySelectorAll('button'), isVisibleModalActionButton).length;
  }

  function modalActionButtonPriority(btn) {
    if (btn.classList.contains('modal-btn-save') || btn.classList.contains('modal-btn-primary')) return 0;
    if (btn.classList.contains('modal-btn-delete')) return 1;
    return 2;
  }

  function closeModalOverflowMenu(actions) {
    if (!actions) return;
    var menu = actions.querySelector(':scope > .modal-overflow-menu');
    var toggle = actions.querySelector(':scope > .modal-actions-overflow .modal-overflow-toggle');
    if (menu) menu.hidden = true;
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  function styleOverflowMenuItem(btn) {
    btn.classList.add('modal-overflow-menu-item');
    btn.setAttribute('role', 'menuitem');
    if (btn.classList.contains('modal-btn-delete')) {
      btn.classList.add('modal-overflow-menu-item--danger');
    } else if (!btn.classList.contains('modal-btn-primary') && !btn.classList.contains('modal-btn-save')) {
      btn.classList.add('modal-btn-primary');
    }
  }

  function bindModalOverflowMenu(actions) {
    if (actions.dataset.spOverflowBound === '1') return;
    var toggle = actions.querySelector(':scope > .modal-actions-overflow .modal-overflow-toggle');
    var menu = actions.querySelector(':scope > .modal-overflow-menu');
    if (!toggle || !menu) return;
    actions.dataset.spOverflowBound = '1';

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      document.querySelectorAll('.modal-actions--sp-footer .modal-overflow-menu:not([hidden]), .modal-actions-new.modal-actions--sp-footer .modal-overflow-menu:not([hidden])').forEach(function (otherMenu) {
        if (otherMenu === menu) return;
        var otherActions = otherMenu.closest('.modal-actions, .modal-actions-new');
        closeModalOverflowMenu(otherActions);
      });
      var open = menu.hidden;
      menu.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    });

    menu.addEventListener('click', function (e) {
      e.stopPropagation();
      if (e.target.closest('.modal-overflow-menu-item')) closeModalOverflowMenu(actions);
    });
  }

  function ensureModalOverflowGlobalHandlers() {
    if (document.body.dataset.spOverflowGlobalBound === '1') return;
    document.body.dataset.spOverflowGlobalBound = '1';

    document.addEventListener('click', function (e) {
      if (e.target.closest('.modal-overflow-toggle, .modal-overflow-menu')) return;
      document.querySelectorAll('.modal-actions--sp-footer .modal-overflow-menu:not([hidden])').forEach(function (menu) {
        closeModalOverflowMenu(menu.closest('.modal-actions, .modal-actions-new'));
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('.modal-actions--sp-footer .modal-overflow-menu:not([hidden])').forEach(function (menu) {
        closeModalOverflowMenu(menu.closest('.modal-actions, .modal-actions-new'));
      });
    });
  }

  function restoreModalFooterActions(actions) {
    if (actions.dataset.spActionsHtmlStored) {
      actions.innerHTML = actions.dataset.spActionsHtmlStored;
    }
    actions.classList.remove(
      'modal-actions--sp-footer',
      'modal-actions--has-overflow',
      'modal-actions--empty',
      'modal-actions--sp-footer-single'
    );
    actions.removeAttribute('data-sp-visible-count');
    delete actions.dataset.spOverflowTransformed;
    delete actions.dataset.spOverflowBound;
  }

  function prepareModalFooterActions(actions) {
    if (!actions.dataset.spActionsHtmlStored) {
      actions.dataset.spActionsHtmlStored = actions.innerHTML;
    }
    var visibility = captureModalButtonVisibility(actions);
    if (actions.dataset.spOverflowTransformed === '1') {
      restoreModalFooterActions(actions);
    }
    applyModalButtonVisibility(actions, visibility);
  }

  function transformModalFooterActions(actions) {
    var hasManualOverflow = !!actions.querySelector(':scope > .modal-actions-overflow');
    if (hasManualOverflow) {
      actions.classList.add('modal-actions--sp-footer');
      actions.querySelectorAll('.modal-action-pc-only, .modal-btn-cancel').forEach(function (btn) {
        if (isModalCloseButton(btn) || btn.classList.contains('modal-action-pc-only')) {
          btn.classList.add('sp-modal-footer-close');
        }
      });
      actions.querySelectorAll('.modal-overflow-menu-item').forEach(styleOverflowMenuItem);
      var visibleCount = countVisibleModalActionButtons(actions);
      actions.setAttribute('data-sp-visible-count', String(visibleCount));
      if (visibleCount === 1) actions.classList.add('modal-actions--sp-footer-single');
      if (actions.querySelector(':scope > .modal-actions-overflow')) {
        actions.classList.add('modal-actions--has-overflow');
      }
      actions.dataset.spOverflowTransformed = '1';
      bindModalOverflowMenu(actions);
      return;
    }

    var allButtons = Array.prototype.filter.call(actions.children, function (el) {
      return el.tagName === 'BUTTON';
    });
    var closeButtons = allButtons.filter(isModalCloseButton);
    var allActionButtons = allButtons.filter(function (btn) { return !isModalCloseButton(btn); });
    var visibleActionButtons = allActionButtons.filter(isVisibleModalActionButton);
    var hiddenActionButtons = allActionButtons.filter(function (btn) { return !isVisibleModalActionButton(btn); });
    visibleActionButtons.sort(function (a, b) {
      var diff = modalActionButtonPriority(a) - modalActionButtonPriority(b);
      if (diff !== 0) return diff;
      return allButtons.indexOf(a) - allButtons.indexOf(b);
    });

    var visibleButtons = visibleActionButtons.slice(0, 2);
    var overflowButtons = visibleActionButtons.slice(2);

    actions.classList.add('modal-actions--sp-footer');
    actions.setAttribute('data-sp-visible-count', String(visibleButtons.length));
    if (visibleButtons.length === 1) actions.classList.add('modal-actions--sp-footer-single');
    if (overflowButtons.length > 0) actions.classList.add('modal-actions--has-overflow');
    if (visibleButtons.length === 0) actions.classList.add('modal-actions--empty');

    closeButtons.forEach(function (btn) {
      btn.classList.add('sp-modal-footer-close');
    });

    while (actions.firstChild) actions.removeChild(actions.firstChild);

    if (overflowButtons.length > 0) {
      var menu = document.createElement('div');
      menu.className = 'modal-overflow-menu';
      menu.setAttribute('role', 'menu');
      menu.hidden = true;
      overflowButtons.forEach(function (btn) {
        styleOverflowMenuItem(btn);
        menu.appendChild(btn);
      });
      actions.appendChild(menu);
    }

    visibleButtons.forEach(function (btn) {
      btn.classList.remove('sp-modal-action-stash');
      btn.hidden = false;
      if (btn.style.display === 'none') btn.style.removeProperty('display');
      actions.appendChild(btn);
    });

    if (overflowButtons.length > 0) {
      var overflowWrap = document.createElement('div');
      overflowWrap.className = 'modal-actions-overflow';
      var toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'modal-btn modal-overflow-toggle';
      toggle.setAttribute('aria-label', 'その他の操作');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-haspopup', 'true');
      toggle.textContent = '⋯';
      overflowWrap.appendChild(toggle);
      actions.appendChild(overflowWrap);
    }

    hiddenActionButtons.forEach(function (btn) {
      btn.classList.add('sp-modal-action-stash');
      btn.style.display = 'none';
      btn.hidden = true;
      actions.appendChild(btn);
    });

    closeButtons.forEach(function (btn) {
      actions.appendChild(btn);
    });

    actions.dataset.spOverflowTransformed = '1';
    bindModalOverflowMenu(actions);
  }

  function enhanceModalFooterOverflow() {
    ensureModalOverflowGlobalHandlers();
    var isSp = isSpContent();

    document.querySelectorAll('.modal-actions, .modal-actions-new').forEach(function (actions) {
      if (!isSp) {
        if (actions.dataset.spOverflowTransformed === '1') restoreModalFooterActions(actions);
        return;
      }
      prepareModalFooterActions(actions);
      transformModalFooterActions(actions);
    });
  }

  window.tryServRefreshModalFooter = enhanceModalFooterOverflow;

  function enhanceMockUi() {
    enhanceTopbarButtons();
    enhanceMainHeaders();
    enhanceSearchFormActions();
    ensureModalChrome();
    enhancePageCancelButtons();
    enhanceModalFooterOverflow();
    document.querySelectorAll('.modal-actions .modal-btn-cancel, .modal-actions-new .modal-btn-cancel').forEach(function (btn) {
      if (/^閉じる$/.test((btn.textContent || '').replace(/\s+/g, ''))) {
        btn.classList.add('sp-modal-footer-close');
      }
    });
  }

  function onSpLayoutChange() {
    disableDraggableInDom();
    syncScheduleViewMode();
    syncListPagerLayout();
    syncSpSearchFilterPanels();
    syncReservationScheduleToolbar();
    enhanceMockUi();
    if (!isSpContent()) {
      document.body.classList.remove('sp-schedule-filter-open');
    } else {
      var filterSection = document.getElementById('resourceFilterSection');
      var filterOpen = filterSection && filterSection.style.display !== 'none';
      document.body.classList.toggle('sp-schedule-filter-open', !!filterOpen);
    }
    Array.prototype.forEach.call(document.querySelectorAll('table.oplog-table'), function (table) {
      normalizeOplogDateTimeForSp(table, isSpContent());
    });
    syncModalScrollLock();
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
    watchModals();
    syncModalScrollLock();
    watchDraggable();
    syncListPagerLayout();
    syncSpSearchFilterPanels();
    syncReservationScheduleToolbar();
    enhanceMockUi();

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
