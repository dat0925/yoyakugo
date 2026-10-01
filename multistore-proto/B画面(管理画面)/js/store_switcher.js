/* 既存の店舗管理画面（admin_*.html）に「店舗切替」と「本部へ戻る」を差し込む
 * 既存ファイルへの変更は <script src="./js/hq_data.js"> と このファイルの読み込み2行だけ。
 * 本部ユーザーでログインしているときだけ表示する想定（プロトタイプでは常に表示）。
 * 2026-10-02：エリアマネージャーは担当エリアの店舗だけ切り替えられる。
 *             受付・予約詳細に「グループ内の他店舗での予約・来店」（M4 予約情報の共有）を差し込む。
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
    const mine = HQ.myStores();
    const am = HQ.isAM();

    // 1) 上部バーの先頭に店舗切替を置く
    const bar = document.createElement('div');
    bar.className = 'store-switcher';
    bar.innerHTML =
      '<a class="ss-back" href="./hq_index.html" title="' + (am ? 'エリアダッシュボードへ' : '本部の全店ダッシュボードへ') + '">← ' + (am ? 'エリアへ戻る' : '本部へ戻る') + '</a>' +
      '<span class="ss-group">🏢 ' + HQ.group.name + '</span>' +
      '<select class="ss-select" aria-label="店舗切替">' +
      (mine.some(s => s.id === st.id) ? mine : [st].concat(mine)).map(s => '<option value="' + s.id + '"' + (s.id === st.id ? ' selected' : '') + '>' + s.area + '｜' + s.name + '</option>').join('') +
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
  // 受付・予約詳細に、同じお客様のグループ内の他店舗での予約・来店を出す（M4）
  function sharedPanel() {
    const modal = document.getElementById('reservationDetailModal');
    if (!modal || !window.HQ) return;
    const cur = current();
    const nm = sid => (HQ.store(sid) || {}).name || sid;
    const txt = id => { const e = document.getElementById(id); return e ? e.textContent.trim() : ''; };
    function draw() {
      if (modal.style.display === 'none') return;
      let box = document.getElementById('ssShared');
      if (!box) {
        box = document.createElement('div'); box.id = 'ssShared'; box.className = 'ss-shared';
        const body = modal.querySelector('.modal-body'); if (!body) return; body.insertBefore(box, body.firstChild);  // 開いてすぐ目に入るよう先頭に置く
      }
      const c = HQ.findShared(txt('detailPhone'), txt('detailLastName') + txt('detailFirstName'));
      const others = c ? c.visits.filter(v => v.store !== cur) : [];
      const nextOther = c && c.next && c.next.store !== cur ? c.next : null;
      let h = '<div class="ss-shared-h">🔗 グループ内の他店舗での予約・来店 <span class="hq-badge blue">予約情報の共有</span></div>';
      if (!c || (!others.length && !nextOther)) {
        h += '<div class="muted ss-shared-none">このお客様の他店舗での予約・来店はありません。</div>';
      } else {
        h += '<div class="ss-shared-sum">全店で来店 <b>' + HQ.totalVisits(c) + ' 回</b>' + (others.length ? '（うち他店舗 ' + others.reduce((a, v) => a + v.n, 0) + ' 回）' : '') + '</div>';
        h += '<div class="ss-shared-chips">' + others.map(v => '<span class="hq-badge gray">' + nm(v.store) + '　来店 ' + v.n + ' 回・最終 ' + v.last.slice(5) + '</span>').join('') + '</div>';
        if (nextOther) h += '<div class="ss-shared-next">📅 次回の予約：<b>' + nextOther.at.slice(5) + '　' + nm(nextOther.store) + '</b>　' + nextOther.menu + '</div>';
        const rec = c.recent.filter(r => r[1] !== cur).slice(0, 3);
        if (rec.length) h += '<table class="ss-shared-tbl"><tbody>' + rec.map(r => '<tr><td>' + r[0].slice(5) + '</td><td>' + nm(r[1]) + '</td><td>' + r[2] + '</td><td>' + r[3] + '</td></tr>').join('') + '</tbody></table>';
      }
      h += '<div class="ss-shared-foot">電話番号で照合しています。他店舗の施設メモ・コメントは表示しません。</div>';
      box.innerHTML = h;
    }
    new MutationObserver(draw).observe(modal, { attributes: true, attributeFilter: ['style'] });
    ['detailPhone', 'detailLastName'].forEach(id => { const e = document.getElementById(id); if (e) new MutationObserver(draw).observe(e, { childList: true, characterData: true, subtree: true }); });
    draw();
  }
  function start() { run(); sharedPanel(); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
