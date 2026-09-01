(function (global) {
  'use strict';

  function sortOrderButtonsHtml() {
    return (
      '<div class="sort-order-btns" role="group" aria-label="並び替え">' +
      '<button type="button" class="sort-order-btn" data-sort-dir="up" aria-label="上へ">▲</button>' +
      '<button type="button" class="sort-order-btn" data-sort-dir="down" aria-label="下へ">▼</button>' +
      '</div>'
    );
  }

  function moveItem(item, direction) {
    var list = item.parentNode;
    if (!list) return;
    if (direction < 0 && item.previousElementSibling) {
      list.insertBefore(item, item.previousElementSibling);
    } else if (direction > 0 && item.nextElementSibling) {
      list.insertBefore(item.nextElementSibling, item);
    }
  }

  function refreshSortOrderButtons(list, itemSelector) {
    if (!list) return;
    var items = list.querySelectorAll(':scope > ' + itemSelector);
    var i;
    for (i = 0; i < items.length; i++) {
      var item = items[i];
      var up = item.querySelector('[data-sort-dir="up"]');
      var down = item.querySelector('[data-sort-dir="down"]');
      if (up) up.disabled = i === 0;
      if (down) down.disabled = i === items.length - 1;
    }
  }

  function bindSortOrderButtons(list, itemSelector, onReorder) {
    if (!list) return;
    if (!list._sortOrderBound) {
      list._sortOrderBound = true;
      list.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-sort-dir]');
        if (!btn || !list.contains(btn)) return;
        var item = btn.closest(itemSelector);
        if (!item || item.parentNode !== list) return;
        e.preventDefault();
        moveItem(item, btn.getAttribute('data-sort-dir') === 'up' ? -1 : 1);
        refreshSortOrderButtons(list, itemSelector);
        if (typeof onReorder === 'function') onReorder(list);
      });
    }
    refreshSortOrderButtons(list, itemSelector);
  }

  global.ListSortButtons = {
    html: sortOrderButtonsHtml,
    bind: bindSortOrderButtons,
    refresh: refreshSortOrderButtons,
    move: moveItem
  };
})(typeof window !== 'undefined' ? window : this);
