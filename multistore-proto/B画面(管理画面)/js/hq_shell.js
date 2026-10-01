/* 本部画面の共通シェル
 * 既存の管理画面（style.css の .app / .sidebar / .topbar / .main）と同じ骨組みを JS で描く。
 * 各 hq_*.html は <aside id="hqSide"> と <header id="hqTop"> を置いて、このファイルを読むだけでよい。
 * 2026-10-02：エリアマネージャーでログインしたときの表示（メニュー・店舗の絞り込み）を追加。
 */
(function () {
  // [ファイル, アイコン, 本部管理者での名前, エリアマネージャーでの名前（null は表示しない）]
  const NAV = [
    ['hq_index.html',        '📊', '全店ダッシュボード', 'エリアダッシュボード'],
    ['hq_stores.html',       '🏬', '店舗管理',           null],
    ['hq_distribute.html',   '📤', '一括配信',           null],
    ['hq_users.html',        '🔐', 'ユーザー・権限',     null],
    ['hq_customers.html',    '👥', '予約情報の共有',     '予約情報の共有'],
    ['hq_billing.html',      '💰', '請求・利用料金',     null]
  ];
  const here = location.pathname.split('/').pop() || 'hq_index.html';
  const am = HQ.isAM();
  const mine = HQ.myStores();
  const nav = NAV.filter(n => !am || n[3]).map(n => [n[0], n[1], am ? n[3] : n[2]]);

  function side() {
    const el = document.getElementById('hqSide');
    if (!el) return;
    el.className = 'sidebar hq-sidebar';
    const chip = am
      ? '📍 ' + HQ.me.area + 'エリア<small>' + HQ.group.name + '｜担当 ' + mine.length + ' 店舗</small>'
      : '🏢 ' + HQ.group.name + '<small>' + HQ.stores.length + ' 店舗（上限なし）</small>';
    el.innerHTML =
      '<div class="logo"><img src="./logo.png" alt="予約GO" style="width:150px;height:auto;">' +
      '<div><span class="hq-console-label">' + (am ? 'エリア管理' : '本部コンソール') + '</span><br><strong>' + HQ.me.name + '</strong></div></div>' +
      '<div class="hq-group-chip" title="' + HQ.group.company + '">' + chip + '</div>' +
      '<nav class="nav" id="nav">' + nav.map(n =>
        '<a href="./' + n[0] + '"' + (n[0] === here ? ' class="active"' : '') + '>' + n[1] + ' ' + n[2] + '</a>').join('') + '</nav>' +
      '<div class="foot">© 2025 IFLAG Co, Ltd.</div>';
  }

  function top() {
    const el = document.getElementById('hqTop');
    if (!el) return;
    el.className = 'topbar hq-topbar';
    const opts = mine.map(s => '<option value="' + s.id + '">' + s.area + '｜' + s.name + '</option>').join('');
    const who = Object.keys(HQ.viewers).map(k => '<option value="' + k + '"' + (k === HQ.me.key ? ' selected' : '') + '>' + HQ.viewers[k].label + '</option>').join('');
    el.innerHTML =
      '<span class="hq-crumb">🏢 ' + HQ.group.name + ' <b>' + (am ? HQ.me.area + 'エリア' : '本部') + '</b></span>' +
      '<div class="search"></div>' +
      '<label class="hq-switch hq-proto" title="プロトタイプで見せ方を切り替えるためのもの。実際はログインしたユーザーで決まります">表示するユーザー <select id="fRole">' + who + '</select></label>' +
      '<label class="hq-switch">店舗画面へ切替 <select id="hqStoreJump"><option value="">店舗を選択…</option>' + opts + '</select></label>' +
      '<button class="link-btn" onclick="location.href=\'admin_login.html\'">ログアウト</button>';
    document.getElementById('hqStoreJump').addEventListener('change', e => {
      if (e.target.value) HQ_goStore(e.target.value);
    });
    document.getElementById('fRole').addEventListener('change', e => {
      HQ.setViewer(e.target.value);
      // 切り替え先で使えない画面にいるときはダッシュボードへ戻す
      const ok = e.target.value === 'hq' || NAV.some(n => n[0] === here && n[3]);
      const u = new URL(ok ? location.href : './hq_index.html', location.href);
      u.searchParams.delete('as');
      location.href = u.toString();
    });
  }

  // エリアマネージャーが使えない画面を開いたときの案内
  function guard() {
    if (!am || NAV.some(n => n[0] === here && n[3])) return;
    const m = document.querySelector('.main');
    if (!m) return;
    // 画面の要素は各画面のスクリプトが参照するので、消さずに隠す
    Array.from(m.children).forEach(c => { c.hidden = true; });
    m.insertAdjacentHTML('afterbegin', '<div class="card hq-denied"><h3>🔒 この画面は本部管理者だけが使えます</h3>' +
      '<p class="muted">エリアマネージャーは、担当エリアのダッシュボード・予約情報の共有・担当店舗の管理画面を使えます。配信・店舗の追加・ユーザー管理・請求は本部で行います。</p>' +
      '<a class="regist-btn" href="./hq_index.html" style="display:inline-block;text-decoration:none">エリアダッシュボードへ</a></div>');
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

  side(); top(); guard();
})();
