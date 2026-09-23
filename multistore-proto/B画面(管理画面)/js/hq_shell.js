/* 本部画面の共通シェル
 * 既存の管理画面（style.css の .app / .sidebar / .topbar / .main）と同じ骨組みを JS で描く。
 * 各 hq_*.html は <aside id="hqSide"> と <header id="hqTop"> を置いて、このファイルを読むだけでよい。
 */
(function () {
  const NAV = [
    ['hq_index.html',        '📊', '全店ダッシュボード'],
    ['hq_reservations.html', '📅', '横断予約一覧'],
    ['hq_stores.html',       '🏬', '店舗管理'],
    ['hq_distribute.html',   '📤', '一括配信'],
    ['hq_users.html',        '🔐', 'ユーザー・権限'],
    ['hq_customers.html',    '👥', '顧客台帳（次期）'],
    ['hq_billing.html',      '💰', '請求・利用料金']
  ];
  const here = location.pathname.split('/').pop() || 'hq_index.html';

  function side() {
    const el = document.getElementById('hqSide');
    if (!el) return;
    el.className = 'sidebar hq-sidebar';
    el.innerHTML =
      '<div class="logo"><img src="./logo.png" alt="予約GO" style="width:150px;height:auto;">' +
      '<div><span class="hq-console-label">本部コンソール</span><br><strong>' + HQ.me.name + '</strong></div></div>' +
      '<div class="hq-group-chip" title="' + HQ.group.company + '">🏢 ' + HQ.group.name + '<small>' + HQ.stores.length + ' / ' + HQ.group.maxStores + ' 店舗</small></div>' +
      '<nav class="nav" id="nav">' + NAV.map(n =>
        '<a href="./' + n[0] + '"' + (n[0] === here ? ' class="active"' : '') + '>' + n[1] + ' ' + n[2] + '</a>').join('') + '</nav>' +
      '<div class="foot">© 2025 IFLAG Co, Ltd.</div>';
  }

  function top() {
    const el = document.getElementById('hqTop');
    if (!el) return;
    el.className = 'topbar hq-topbar';
    const opts = HQ.stores.map(s => '<option value="' + s.id + '">' + s.area + '｜' + s.name + '</option>').join('');
    el.innerHTML =
      '<span class="hq-crumb">🏢 ' + HQ.group.name + ' <b>本部</b></span>' +
      '<div class="search"></div>' +
      '<label class="hq-switch">店舗画面へ切替 <select id="hqStoreJump"><option value="">店舗を選択…</option>' + opts + '</select></label>' +
      '<a class="link-btn" href="../C画面(予約フォーム)/store_select.html" target="_blank">🌐 グループ予約ページ</a>' +
      '<button class="link-btn" onclick="location.href=\'admin_login.html\'">ログアウト</button>';
    document.getElementById('hqStoreJump').addEventListener('change', e => {
      if (e.target.value) HQ_goStore(e.target.value);
    });
  }

  // 店舗画面（既存の管理画面）へ、選んだ店舗として入る
  window.HQ_goStore = function (id, page) {
    try { localStorage.setItem('hq_store', id); } catch (e) {}
    location.href = './' + (page || 'admin_index.html') + '?store=' + id;
  };

  // 簡易トースト（alert は使わない）
  window.HQ_toast = function (msg) {
    let t = document.getElementById('hqToast');
    if (!t) { t = document.createElement('div'); t.id = 'hqToast'; t.className = 'hq-toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2600);
  };

  side(); top();
})();
