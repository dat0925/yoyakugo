(function (global) {
  'use strict';

  var instances = [];

  function isSp() {
    return typeof global.tryServIsSpContent === 'function' && global.tryServIsSpContent();
  }

  function destroyAll() {
    instances.forEach(function (inst) {
      if (inst && typeof inst.destroy === 'function') inst.destroy();
    });
    instances = [];
  }

  function bindSortableList(el, options) {
    if (!el || typeof global.Sortable === 'undefined') return;
    instances.push(global.Sortable.create(el, options));
  }

  /** ▲▼ボタン（およびグループ行の移動ボタン）はドラッグ開始対象外 */
  var SORT_ORDER_FILTER = '.sort-order-btns, .sort-order-btn';
  var RG_ITEM_DRAG_FILTER = '.sort-order-btns, .sort-order-btn, .rg-move-btn';

  function withSortFilter(options, filter) {
    var merged = Object.assign({}, options);
    merged.filter = filter;
    merged.preventOnFilter = false;
    return merged;
  }

  function refreshGroupSortButtons() {
    if (typeof global.ListSortButtons === 'undefined') return;
    document.querySelectorAll('.resource-group-modal ul.rg-list[data-zone="group"]').forEach(function (ul) {
      global.ListSortButtons.refresh(ul, '.rg-item');
    });
    if (typeof global.rgApplyResourceSortButtonColors === 'function') {
      global.rgApplyResourceSortButtonColors();
    }
  }

  function refreshOptionGroupSortUi() {
    if (typeof global.ListSortButtons !== 'undefined') {
      var ul = document.getElementById('optionGroupSelectedList');
      if (ul) global.ListSortButtons.refresh(ul, '.rg-item');
    }
    if (typeof global.syncEditingOptionGroupOrderFromDom === 'function') {
      global.syncEditingOptionGroupOrderFromDom();
    }
  }

  function initPcSortable() {
    destroyAll();
    if (isSp()) return;

    bindSortableList(document.getElementById('menuList'), withSortFilter({
      animation: 150,
      draggable: '.drag-item',
      ghostClass: 'ghost',
      chosenClass: 'chosen',
      dragClass: 'drag'
    }, SORT_ORDER_FILTER));

    bindSortableList(document.getElementById('resourceList'), withSortFilter({
      animation: 150,
      draggable: '.drag-item',
      ghostClass: 'ghost',
      chosenClass: 'chosen',
      dragClass: 'drag'
    }, SORT_ORDER_FILTER));

    document.querySelectorAll('.resource-group-modal ul.rg-list[data-zone="group"]').forEach(function (ul) {
      bindSortableList(ul, withSortFilter({
        animation: 150,
        draggable: '.rg-item',
        ghostClass: 'rg-dragging',
        onEnd: function () {
          refreshGroupSortButtons();
        }
      }, RG_ITEM_DRAG_FILTER));
    });

    document.querySelectorAll('#optionGroupSelectedList').forEach(function (ul) {
      bindSortableList(ul, withSortFilter({
        animation: 150,
        draggable: '.rg-item',
        ghostClass: 'rg-dragging',
        onEnd: function () {
          refreshOptionGroupSortUi();
        }
      }, RG_ITEM_DRAG_FILTER));
    });
  }

  global.TryServPcSortable = {
    init: initPcSortable,
    destroy: destroyAll
  };

  var prevLayoutChange = global.tryServOnSpLayoutChange;
  global.tryServOnSpLayoutChange = function (sp) {
    if (typeof prevLayoutChange === 'function') prevLayoutChange(sp);
    initPcSortable();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPcSortable);
  } else {
    initPcSortable();
  }
})(typeof window !== 'undefined' ? window : this);
