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
    document.documentElement.classList.add('kt-library-modal-open');
    document.body.classList.add('kt-library-modal-open');

    if (community) {
      var select = modal.querySelector('[data-kt-modal-community-select]');
      if (select) select.value = community;
    }

    var focusTarget = modal.querySelector('[data-kt-modal-close]') || modal.querySelector('button, a, input, select, textarea');
    if (focusTarget) focusTarget.focus();
  }

  function closeModal(modal) {
    if (!modal) return;

    modal.hidden = true;
    document.documentElement.classList.remove('kt-library-modal-open');
    document.body.classList.remove('kt-library-modal-open');

    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  document.addEventListener('click', function (event) {
    var openButton = closest(event.target, '[data-kt-modal-open]');
    var closeButton = closest(event.target, '[data-kt-modal-close]');

    if (openButton) {
      event.preventDefault();
      openModal(openButton.getAttribute('data-kt-modal-open'), openButton.getAttribute('data-kt-modal-community'));
      return;
    }

    if (closeButton) {
      event.preventDefault();
      closeModal(closest(closeButton, '.kt-library-modal'));
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;

    var modal = document.querySelector('.kt-library-modal:not([hidden])');
    if (modal) closeModal(modal);
  });
})();
