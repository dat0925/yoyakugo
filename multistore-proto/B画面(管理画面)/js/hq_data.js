/* 多店舗管理プロトタイプ：ダミーデータ
 * 画面（HTML）・見た目（hq.css）・動き（hq_shell.js / 各画面のscript）と分けて、データはここ1か所に置く。
 * 店舗名・人名はすべて架空。実在の店舗名は使わない。
 */
window.HQ = {
  group: { id: 'g1000123', name: 'アイフラッグ整骨院グループ', company: '株式会社みほんヘルスケア（架空）', plan: '予約GO 多店舗プラン', maxStores: 30 },

  // 本部ユーザー（ログイン中は index 0）
  me: { name: '本部 花子', role: 'hq_admin' },

  areas: ['東京', '神奈川', '埼玉'],

  // today: 本日の予約件数 / month: 今月の予約件数 / web: WEB予約比率(%) / cancel: キャンセル率(%)
  // setup: 初期設定の充足（ポリシー・メニュー配信） / trend: 直近7日の予約件数
  stores: [
    { id: 's1001', code: 'x3877301', name: '新宿院',       area: '東京',   addr: '東京都新宿区西新宿1-1-1',   tel: '03-0000-1001', manager: '佐藤 一郎', today: 24, month: 412, web: 68, cancel: 4.1, status: '稼働中', policy: true,  menuVer: 'v3', trend: [52,58,61,55,63,70,66] },
    { id: 's1002', code: 'x3877302', name: '渋谷院',       area: '東京',   addr: '東京都渋谷区道玄坂2-2-2',   tel: '03-0000-1002', manager: '鈴木 次郎', today: 21, month: 377, web: 72, cancel: 3.6, status: '稼働中', policy: true,  menuVer: 'v3', trend: [48,50,57,53,60,64,62] },
    { id: 's1003', code: 'x3877303', name: '池袋院',       area: '東京',   addr: '東京都豊島区南池袋3-3-3',   tel: '03-0000-1003', manager: '高橋 三郎', today: 17, month: 301, web: 55, cancel: 6.8, status: '稼働中', policy: true,  menuVer: 'v3', trend: [40,43,41,45,44,49,47] },
    { id: 's1004', code: 'x3877304', name: '門前仲町院',   area: '東京',   addr: '東京都江東区門前仲町4-4-4', tel: '03-0000-1004', manager: '田中 四郎', today: 12, month: 208, web: 41, cancel: 9.2, status: '稼働中', policy: false, menuVer: 'v2', trend: [30,28,31,29,33,35,30] },
    { id: 's1005', code: 'x3877305', name: '横浜院',       area: '神奈川', addr: '神奈川県横浜市西区5-5-5',   tel: '045-000-1005', manager: '伊藤 五郎', today: 19, month: 344, web: 63, cancel: 5.0, status: '稼働中', policy: true,  menuVer: 'v3', trend: [44,47,50,48,52,56,55] },
    { id: 's1006', code: 'x3877306', name: '川崎院',       area: '神奈川', addr: '神奈川県川崎市川崎区6-6-6', tel: '044-000-1006', manager: '渡辺 六子', today: 14, month: 251, web: 58, cancel: 5.5, status: '稼働中', policy: true,  menuVer: 'v3', trend: [33,36,35,38,37,41,40] },
    { id: 's1007', code: 'x3877307', name: '大宮院',       area: '埼玉',   addr: '埼玉県さいたま市大宮区7-7-7', tel: '048-000-1007', manager: '山本 七海', today: 10, month: 186, web: 47, cancel: 7.4, status: '稼働中', policy: false, menuVer: 'v2', trend: [25,27,26,29,28,30,31] },
    { id: 's1008', code: 'x3877308', name: '浦和院',       area: '埼玉',   addr: '埼玉県さいたま市浦和区8-8-8', tel: '048-000-1008', manager: '中村 八重', today: 0,  month: 0,   web: 0,  cancel: 0,   status: '準備中', policy: false, menuVer: '—',  trend: [0,0,0,0,0,0,0] }
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

  // 権限マトリクス（○=可 △=担当店舗のみ ×=不可）
  perms: [
    ['全店ダッシュボード・横断予約一覧', '○', '△', '×', '×'],
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
        { label: '初診 骨格調整 60分', value: '6,600円 / 60分', lock: true },
        { label: '骨盤矯正 45分',      value: '5,500円 / 45分', lock: true },
        { label: '鍼灸 40分',          value: '4,950円 / 40分', lock: false },
        { label: '産後ケア 50分',      value: '6,050円 / 50分', lock: false },
        { label: '準備時間',           value: '10分',           lock: false } ] },
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

  // 横断予約一覧
  reservations: [
    ['2026/09/23 10:00', '新宿院',     '山田 太郎', '骨盤矯正 45分',      '佐藤 一郎', 'WEB',     '受付完了'],
    ['2026/09/23 10:30', '渋谷院',     '佐々木 花', '初診 骨格調整 60分', '鈴木 次郎', 'WEB',     '受付待ち'],
    ['2026/09/23 11:00', '横浜院',     '井上 健',   '鍼灸 40分',          '伊藤 五郎', '電話',    '受付完了'],
    ['2026/09/23 11:15', '池袋院',     '木村 愛',   '産後ケア 50分',      '高橋 三郎', 'WEB',     '受付待ち'],
    ['2026/09/23 12:00', '新宿院',     '林 誠',     '初診 骨格調整 60分', '小林 応援', 'WEB',     '受付待ち'],
    ['2026/09/23 13:30', '門前仲町院', '清水 翔',   '骨盤矯正 45分',      '田中 四郎', '電話',    'キャンセル'],
    ['2026/09/23 14:00', '川崎院',     '森 優子',   '鍼灸 40分',          '渡辺 六子', 'WEB',     '受付待ち'],
    ['2026/09/23 15:00', '大宮院',     '池田 学',   '骨盤矯正 45分',      '山本 七海', '管理画面', '受付待ち'],
    ['2026/09/23 16:30', '渋谷院',     '橋本 葵',   '産後ケア 50分',      '鈴木 次郎', 'WEB',     '受付待ち'],
    ['2026/09/23 18:00', '横浜院',     '山口 陸',   '初診 骨格調整 60分', '伊藤 五郎', 'WEB',     '受付待ち']
  ],

  // 料金案（税抜）。資料と同じ値。
  price: { hqMonthly: 9800, tiers: [ { from: 2, to: 9, unit: 2980 }, { from: 10, to: 19, unit: 2780 }, { from: 20, to: 30, unit: 2580 } ], hqInitial: 80000, storeInitial: 10000 }
};

// 店舗IDから店舗を引く
HQ.store = id => HQ.stores.find(s => s.id === id);
// 店舗数から店舗単価を引く
HQ.unitPrice = n => (HQ.price.tiers.find(t => n >= t.from && n <= t.to) || HQ.price.tiers[0]).unit;
HQ.yen = n => n.toLocaleString('ja-JP') + '円';
