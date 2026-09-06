(function () {
  function closest(target, selector) {
    return target && target.closest ? target.closest(selector) : null;
  }

  var lastFocus = null;

  function openModal(id, community) {
    var modal = document.getElementById(id);

    if (!modal) return;

    lastFocus = document.activeElement;

    modal.hidden = false;
    document.documentElement.classList.add('modu-library-modal-open');
    document.body.classList.add('modu-library-modal-open');

    if (community) {
      var select = modal.querySelector('[data-modu-modal-community-select]');
      if (select) select.value = community;
    }

    var focusTarget = modal.querySelector('[data-modu-modal-close]') || modal.querySelector('button, a, input, select, textarea');
    if (focusTarget) focusTarget.focus();
  }

  function closeModal(modal) {
    if (!modal) return;

    modal.hidden = true;
    document.documentElement.classList.remove('modu-library-modal-open');
    document.body.classList.remove('modu-library-modal-open');

    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  document.addEventListener('click', function (event) {
    var openButton = closest(event.target, '[data-modu-modal-open]');
    var closeButton = closest(event.target, '[data-modu-modal-close]');

    if (openButton) {
      event.preventDefault();
      openModal(openButton.getAttribute('data-modu-modal-open'), openButton.getAttribute('data-modu-modal-community'));
      return;
    }

    if (closeButton) {
      event.preventDefault();
      closeModal(closest(closeButton, '.modu-library-modal'));
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;

    var modal = document.querySelector('.modu-library-modal:not([hidden])');
    if (modal) closeModal(modal);
  });
})();
