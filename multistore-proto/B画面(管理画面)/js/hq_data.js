/* 多店舗管理プロトタイプ：ダミーデータ
 * 画面（HTML）・見た目（hq.css）・動き（hq_shell.js / 各画面のscript）と分けて、データはここ1か所に置く。
 * 店舗名・人名はすべて架空。実在の店舗名は使わない。
 * 2026-10-02：対象業種（リラク・美容サロン）に合わせて架空チェーンを整骨院からリラクサロンへ置き換え。
 */
window.HQ = {
  group: { id: 'g1000123', name: 'みほんリラクサロン', company: '株式会社みほんウェルネス（架空）', plan: '予約GO 多店舗プラン', maxStores: null },

  areas: ['東京', '神奈川', '埼玉'],

  // today: 本日の予約件数 / month: 今月の予約件数 / web: WEB予約比率(%) / cancel: キャンセル率(%)
  // policy・menuVer: 本部設定の配信状況 / trend: 直近7日の予約件数
  stores: [
    { id: 's1001', code: 'x3877301', name: '新宿店',       area: '東京',   addr: '東京都新宿区西新宿1-1-1',   tel: '03-0000-1001', manager: '佐藤 一郎', today: 24, month: 412, web: 68, cancel: 4.1, status: '稼働中', policy: true,  menuVer: 'v3', trend: [52,58,61,55,63,70,66] },
    { id: 's1002', code: 'x3877302', name: '渋谷店',       area: '東京',   addr: '東京都渋谷区道玄坂2-2-2',   tel: '03-0000-1002', manager: '鈴木 次郎', today: 21, month: 377, web: 72, cancel: 3.6, status: '稼働中', policy: true,  menuVer: 'v3', trend: [48,50,57,53,60,64,62] },
    { id: 's1003', code: 'x3877303', name: '池袋店',       area: '東京',   addr: '東京都豊島区南池袋3-3-3',   tel: '03-0000-1003', manager: '高橋 三郎', today: 17, month: 301, web: 55, cancel: 6.8, status: '稼働中', policy: true,  menuVer: 'v3', trend: [40,43,41,45,44,49,47] },
    { id: 's1004', code: 'x3877304', name: '門前仲町店',   area: '東京',   addr: '東京都江東区門前仲町4-4-4', tel: '03-0000-1004', manager: '田中 四郎', today: 12, month: 208, web: 41, cancel: 9.2, status: '稼働中', policy: false, menuVer: 'v2', trend: [30,28,31,29,33,35,30] },
    { id: 's1005', code: 'x3877305', name: '横浜店',       area: '神奈川', addr: '神奈川県横浜市西区5-5-5',   tel: '045-000-1005', manager: '伊藤 五郎', today: 19, month: 344, web: 63, cancel: 5.0, status: '稼働中', policy: true,  menuVer: 'v3', trend: [44,47,50,48,52,56,55] },
    { id: 's1006', code: 'x3877306', name: '川崎店',       area: '神奈川', addr: '神奈川県川崎市川崎区6-6-6', tel: '044-000-1006', manager: '渡辺 六子', today: 14, month: 251, web: 58, cancel: 5.5, status: '稼働中', policy: true,  menuVer: 'v3', trend: [33,36,35,38,37,41,40] },
    { id: 's1007', code: 'x3877307', name: '大宮店',       area: '埼玉',   addr: '埼玉県さいたま市大宮区7-7-7', tel: '048-000-1007', manager: '山本 七海', today: 10, month: 186, web: 47, cancel: 7.4, status: '稼働中', policy: false, menuVer: 'v2', trend: [25,27,26,29,28,30,31] },
    { id: 's1008', code: 'x3877308', name: '浦和店',       area: '埼玉',   addr: '埼玉県さいたま市浦和区8-8-8', tel: '048-000-1008', manager: '中村 八重', today: 0,  month: 0,   web: 0,  cancel: 0,   status: '準備中', policy: false, menuVer: '—',  trend: [0,0,0,0,0,0,0] }
  ],

  // 本部ユーザーと権限
  roles: {
    hq_admin: { label: '本部管理者',           color: '#0b1f3a' },
    area_mgr: { label: 'エリアマネージャー',   color: '#1E90FF' },
    store_mgr:{ label: '店舗管理者（店長）',   color: '#10B981' },
    staff:    { label: 'スタッフ',             color: '#6b7280' }
  },
  users: [
    { name: '本部 花子',   mail: 'hq.hanako@example.com',  role: 'hq_admin',  stores: ['*'] },
    { name: '本部 太郎',   mail: 'hq.taro@example.com',    role: 'hq_admin',  stores: ['*'] },
    { name: '東京 統括',   mail: 'tokyo.am@example.com',   role: 'area_mgr',  stores: ['s1001','s1002','s1003','s1004'] },
    { name: '神奈川・埼玉 統括', mail: 'ks.am@example.com', role: 'area_mgr', stores: ['s1005','s1006','s1007','s1008'] },
    { name: '佐藤 一郎',   mail: 'sato.ichiro@example.com', role: 'store_mgr', stores: ['s1001'] },
    { name: '伊藤 五郎',   mail: 'ito.goro@example.com',   role: 'store_mgr', stores: ['s1005'] },
    { name: '小林 応援',   mail: 'kobayashi.s@example.com', role: 'staff',    stores: ['s1001','s1002'] }
  ],

  // プロトタイプで切り替えて見せるログインユーザー（hq_shell.js の「表示するユーザー」）
  viewers: {
    hq: { key: 'hq', name: '本部 花子', role: 'hq_admin', area: null,   label: '本部管理者（本部 花子）' },
    am: { key: 'am', name: '東京 統括', role: 'area_mgr', area: '東京', label: 'エリアマネージャー（東京 統括）' }
  },

  // 権限マトリクス（○=可 △=担当店舗のみ ×=不可）
  perms: [
    ['全店ダッシュボード',               '○', '×', '×', '×'],
    ['エリアダッシュボード（担当エリア）', '○', '○', '×', '×'],
    ['お客様の他店舗での予約の参照',     '○', '○', '○', '○'],
    ['メニュー・ポリシーの一括配信',     '○', '×', '×', '×'],
    ['店舗の追加・停止',                 '○', '×', '×', '×'],
    ['本部ユーザー・権限の管理',         '○', '×', '×', '×'],
    ['店舗の基本設定（ロック外の項目）', '○', '△', '△', '×'],
    ['受付・予約の登録・変更',           '○', '△', '△', '△'],
    ['スタッフ・リソース管理',           '○', '△', '△', '×'],
    ['一括請求・店舗別明細の閲覧',       '○', '×', '×', '×']
  ],

  // 配信テンプレート
  templates: [
    { id: 't1', kind: 'メニュー',             name: '標準メニュー v3（2026年10月改定）', items: [
        { label: 'ボディケア 60分',   value: '6,600円 / 60分', lock: true },
        { label: 'ボディケア 90分',   value: '9,350円 / 90分', lock: true },
        { label: 'フットケア 40分',   value: '4,950円 / 40分', lock: false },
        { label: 'ヘッドスパ 30分',   value: '3,850円 / 30分', lock: false },
        { label: '準備時間',          value: '10分',           lock: false } ] },
    { id: 't2', kind: 'キャンセルポリシー',   name: 'グループ共通キャンセルポリシー（法務確認版）', items: [
        { label: 'WEBキャンセル期限',  value: '1日前まで',      lock: true },
        { label: '電話キャンセル期限', value: '当日まで',       lock: true },
        { label: 'ポリシー本文',       value: '屋号は店舗名で自動差し込み', lock: true } ] },
    { id: 't3', kind: '営業時間',             name: '平日10-21時・土日祝9-18時', items: [
        { label: '平日',   value: '10:00〜21:00', lock: false },
        { label: '土日祝', value: '9:00〜18:00',  lock: false } ] }
  ],
  history: [
    { at: '2026/09/01 10:12', who: '本部 花子', tpl: '標準メニュー v3（2026年10月改定）', to: '6店舗', result: '完了' },
    { at: '2026/08/25 18:40', who: '本部 太郎', tpl: 'グループ共通キャンセルポリシー（法務確認版）', to: '5店舗', result: '完了' },
    { at: '2026/08/10 09:05', who: '本部 花子', tpl: '平日10-21時・土日祝9-18時', to: '全店（7店舗）', result: '完了' }
  ],

  // 店舗間で共有する予約情報（M4）。氏名・電話番号で照合する。
  // 電話番号は店舗の受付・予約画面（川島さんモック）のサンプルと揃え、予約詳細を開くと照合結果が出るようにしている。
  // 共有するのは「どの店舗で・いつ・何を予約し・来店したか」だけ。施設メモ・コメントは店舗の外に出さない。
  shared: [
    { name: '山田 太郎', kana: 'ヤマダ タロウ', tel: '090-6789-0123',
      visits: [ { store: 's1001', n: 11, last: '2026/09/23' }, { store: 's1002', n: 3, last: '2026/09/10' } ],
      next: { at: '2026/10/03 14:00', store: 's1002', menu: 'ヘッドスパ 30分' },
      recent: [ ['2026/09/23 10:00', 's1001', 'ボディケア 60分', '来店'], ['2026/09/10 19:00', 's1002', 'ボディケア 90分', '来店'], ['2026/08/28 18:30', 's1001', 'フットケア 40分', 'キャンセル'] ] },
    { name: '山田 花子', kana: 'ヤマダ ハナコ', tel: '090-2345-6789',
      visits: [ { store: 's1005', n: 5, last: '2026/09/12' }, { store: 's1006', n: 1, last: '2026/07/30' } ],
      next: { at: '2026/10/08 11:00', store: 's1005', menu: 'ボディケア 60分' },
      recent: [ ['2026/09/12 11:00', 's1005', 'ボディケア 60分', '来店'], ['2026/07/30 15:00', 's1006', 'ヘッドスパ 30分', '来店'] ] },
    { name: '山田 学', kana: 'ヤマダ マナブ', tel: '090-3456-7890',
      visits: [ { store: 's1007', n: 2, last: '2026/08/30' } ],
      next: null,
      recent: [ ['2026/08/30 16:00', 's1007', 'フットケア 40分', '来店'] ] },
    { name: 'テスト 花子', kana: 'テスト ハナコ', tel: '09012345678',  // 予約詳細の初期表示に合わせる
      visits: [ { store: 's1002', n: 4, last: '2026/09/19' }, { store: 's1003', n: 2, last: '2026/08/22' }, { store: 's1001', n: 1, last: '2026/09/05' } ],
      next: { at: '2026/10/05 13:00', store: 's1003', menu: 'ボディケア 90分' },
      recent: [ ['2026/09/19 18:00', 's1002', 'ボディケア 60分', '来店'], ['2026/09/05 12:00', 's1001', 'ヘッドスパ 30分', '来店'], ['2026/08/22 17:30', 's1003', 'フットケア 40分', '来店'] ] },
    { name: '佐藤 美咲', kana: 'サトウ ミサキ', tel: '090-4567-8901',
      visits: [ { store: 's1001', n: 2, last: '2026/09/14' } ],
      next: null,
      recent: [ ['2026/09/14 10:30', 's1001', 'ボディケア 60分', '来店'] ] },
    { name: '鈴木 一郎', kana: 'スズキ イチロウ', tel: '090-5678-9012',
      visits: [ { store: 's1004', n: 6, last: '2026/09/20' }, { store: 's1001', n: 2, last: '2026/09/02' } ],
      next: { at: '2026/10/04 10:00', store: 's1004', menu: 'ボディケア 60分' },
      recent: [ ['2026/09/20 10:00', 's1004', 'ボディケア 60分', '来店'], ['2026/09/02 20:00', 's1001', 'フットケア 40分', '来店'] ] }
  ],

  // 料金案（税抜）。資料と同じ値。
  price: { hqMonthly: 9800, tiers: [ { from: 2, to: 9, unit: 2980 }, { from: 10, to: 19, unit: 2780 }, { from: 20, to: Infinity, unit: 2580 } ], hqInitial: 80000, storeInitial: 10000 }
};

// 店舗IDから店舗を引く
HQ.store = id => HQ.stores.find(s => s.id === id);
// 店舗数から店舗単価を引く
HQ.unitPrice = n => (HQ.price.tiers.find(t => n >= t.from && n <= t.to) || HQ.price.tiers[0]).unit;
HQ.yen = n => n.toLocaleString('ja-JP') + '円';

// 表示中のユーザー（?as=hq|am で切替。タブを閉じるまで保持）
HQ.viewerKey = function () {
  const q = new URLSearchParams(location.search).get('as');
  if (q === 'hq' || q === 'am') { try { sessionStorage.setItem('hq_as', q); } catch (e) {} return q; }
  try { return sessionStorage.getItem('hq_as') === 'am' ? 'am' : 'hq'; } catch (e) { return 'hq'; }
};
HQ.setViewer = function (key) { try { sessionStorage.setItem('hq_as', key); } catch (e) {} };
HQ.me = HQ.viewers[HQ.viewerKey()];
HQ.isAM = () => HQ.me.role === 'area_mgr';
// 表示中のユーザーが見られる店舗
HQ.myStores = () => HQ.me.area ? HQ.stores.filter(s => s.area === HQ.me.area) : HQ.stores;

// 店舗間の予約情報の共有：氏名または電話番号で照合する
HQ.digits = v => String(v || '').replace(/\D/g, '');
HQ.findShared = function (tel, name) {
  const d = HQ.digits(tel), nm = String(name || '').replace(/[\s　]/g, '');
  return HQ.shared.find(c => d && HQ.digits(c.tel) === d) || HQ.shared.find(c => nm && c.name.replace(/[\s　]/g, '') === nm) || null;
};
HQ.searchShared = function (q) {
  const s = String(q || '').replace(/[\s　]/g, ''), d = HQ.digits(q);
  if (!s) return HQ.shared.slice();
  return HQ.shared.filter(c => c.name.replace(/[\s　]/g, '').indexOf(s) >= 0 || c.kana.replace(/[\s　]/g, '').indexOf(s) >= 0 || (d.length >= 4 && (d.length >= 8 ? HQ.digits(c.tel).indexOf(d) >= 0 : HQ.digits(c.tel).slice(-d.length) === d)));
};
HQ.maskTel = t => { const d = HQ.digits(t); return '***-****-' + d.slice(-4); };
HQ.totalVisits = c => c.visits.reduce((a, v) => a + v.n, 0);
