/* 既存の店舗管理画面（admin_*.html）に「店舗切替」と「本部へ戻る」を差し込む
 * 既存ファイルへの変更は <script src="./js/hq_data.js"> と このファイルの読み込み2行だけ。
 * 本部ユーザーでログインしているときだけ表示する想定（プロトタイプでは常に表示）。
 */
(function () {
  function current() {
    const q = new URLSearchParams(location.search).get('store');
    if (q) { try { localStorage.setItem('hq_store', q); } catch (e) {} return q; }
    try { return localStorage.getItem('hq_store') || HQ.stores[0].id; } catch (e) { return HQ.stores[0].id; }
  }
  function run() {
    if (!window.HQ) return;
    const id = current();
    const st = HQ.store(id) || HQ.stores[0];

    // 1) 上部バーの先頭に店舗切替を置く
    const bar = document.createElement('div');
    bar.className = 'store-switcher';
    bar.innerHTML =
      '<a class="ss-back" href="./hq_index.html" title="本部の全店ダッシュボードへ">← 本部へ戻る</a>' +
      '<span class="ss-group">🏢 ' + HQ.group.name + '</span>' +
      '<select class="ss-select" aria-label="店舗切替">' +
      HQ.stores.map(s => '<option value="' + s.id + '"' + (s.id === st.id ? ' selected' : '') + '>' + s.area + '｜' + s.name + '</option>').join('') +
      '</select>';
    const topbar = document.querySelector('.topbar');
    if (topbar) topbar.insertBefore(bar, topbar.firstChild);
    else { const m = document.querySelector('.main'); if (m) m.insertBefore(bar, m.firstChild); }

    bar.querySelector('select').addEventListener('change', e => {
      const u = new URL(location.href); u.searchParams.set('store', e.target.value); location.href = u.toString();
    });

    // 2) サイドメニューの名前欄を店舗名に
    const who = document.querySelector('.sidebar .logo strong');
    if (who) who.textContent = st.name + '（' + st.area + '）';

    // 3) 本部でロックされている項目がある画面は、案内帯を出す
    const page = location.pathname.split('/').pop();
    const locked = { 'admin_menus.html': 'メニューの一部（料金・所要時間）は本部の「標準メニュー v3」でロックされています。', 'admin_setting.html': 'キャンセル期限・キャンセルポリシーは本部の共通設定でロックされています。' };
    if (locked[page]) {
      const note = document.createElement('div');
      note.className = 'hq-lock-note';
      note.innerHTML = '🔒 ' + locked[page] + ' <a href="./hq_distribute.html">本部の配信設定を見る</a>';
      const m = document.querySelector('.main');
      if (m) m.insertBefore(note, m.firstChild);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
