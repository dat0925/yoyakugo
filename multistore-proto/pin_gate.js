/* 多店舗管理プロトタイプ：PINゲート
 * 公開URLを知っているだけでは中身が見えないようにする簡易ゲート（本格的な認証ではない）。
 * PINの平文はソースに置かず、djb2 ハッシュで照合する。一度通ればタブを閉じるまで再入力不要（sessionStorage）。
 * 各HTMLの <head> 先頭で同期読み込みする。
 */
(function () {
  var KEY = 'ms_proto_pin_ok';
  var HASH = 2088332156;
  function djb2(s) { var h = 5381; for (var i = 0; i < s.length; i++) { h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; } return h; }
  try { if (sessionStorage.getItem(KEY) === '1') return; } catch (e) {}

  // 中身を隠す（オーバーレイだけは表示する）
  var st = document.createElement('style');
  st.textContent = 'html{visibility:hidden!important}' +
    '#msPin{visibility:visible!important;position:fixed;inset:0;z-index:2147483647;background:#0b1f3a;display:flex;align-items:center;justify-content:center;font-family:"Meiryo","Yu Gothic",system-ui,sans-serif}' +
    '#msPin .b{background:#fff;border-radius:16px;padding:28px 26px;width:min(340px,88vw);text-align:center;box-shadow:0 12px 32px rgba(0,0,0,.25)}' +
    '#msPin h1{font-size:17px;margin:0 0 6px;color:#0b1f3a}#msPin p{font-size:12px;color:#6b7280;margin:0 0 16px}' +
    '#msPin input{width:100%;box-sizing:border-box;font-size:22px;letter-spacing:.4em;text-align:center;padding:10px;border:1px solid #d1d5db;border-radius:10px}' +
    '#msPin button{margin-top:12px;width:100%;padding:11px;border:0;border-radius:10px;background:#10B981;color:#fff;font-weight:700;font-size:15px;cursor:pointer}' +
    '#msPin .e{color:#dc2626;font-size:12px;height:16px;margin-top:8px}';
  document.head ? document.head.appendChild(st) : document.documentElement.appendChild(st);

  function mount() {
    var o = document.createElement('div');
    o.id = 'msPin';
    o.innerHTML = '<div class="b"><h1>予約GO 多店舗管理プロトタイプ</h1><p>閲覧にはPINコードが必要です</p>' +
      '<input id="msPinIn" type="password" inputmode="numeric" maxlength="8" autocomplete="off" aria-label="PINコード">' +
      '<button id="msPinBtn" type="button">表示する</button><div class="e" id="msPinErr"></div></div>';
    document.documentElement.appendChild(o);
    var inp = document.getElementById('msPinIn');
    function check() {
      if (djb2(inp.value.trim()) === HASH) {
        try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
        st.remove(); o.remove();
      } else {
        document.getElementById('msPinErr').textContent = 'PINコードが違います';
        inp.value = ''; inp.focus();
      }
    }
    document.getElementById('msPinBtn').addEventListener('click', check);
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
    inp.focus();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
