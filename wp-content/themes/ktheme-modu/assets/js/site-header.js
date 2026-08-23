(function () {
  function initializeHeader(header) {
    if (header.dataset.ktHeaderInitialized === 'true') return;

    header.dataset.ktHeaderInitialized = 'true';

    var shell = header.closest('header.wp-block-template-part') || header.parentElement;
    var megaToggle = header.querySelector('[data-kt-mega-toggle]');
    var megaMenu = header.querySelector('#kt-mega-menu');
    var searchToggle = header.querySelector('[data-kt-search-toggle]');
    var searchPanel = header.querySelector('#kt-header-search');
    var searchInput = header.querySelector('#kt-header-search-input');

    if (shell) shell.classList.add('kt-site-header-shell');

    function setMegaMenu(open) {
      if (!megaToggle || !megaMenu) return;
      if (open) setSearch(false);

      header.classList.toggle('is-mega-open', open);
      header.dataset.ktMegaOpen = open ? 'true' : 'false';
      megaToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      megaMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
    }

    function setSearch(open) {
      if (!searchToggle || !searchPanel) return;
      if (open) setMegaMenu(false);

      header.classList.toggle('is-search-open', open);
      searchToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      searchPanel.setAttribute('aria-hidden', open ? 'false' : 'true');

      if (open && searchInput) window.setTimeout(function () { searchInput.focus(); }, 80);
    }

    if (megaToggle) {
      megaToggle.addEventListener('click', function () {
        setMegaMenu(!header.classList.contains('is-mega-open'));
      });
    }

    if (searchToggle) {
      searchToggle.addEventListener('click', function () {
        setSearch(!header.classList.contains('is-search-open'));
      });
    }

    document.addEventListener('click', function (event) {
      if (!header.contains(event.target)) {
        setMegaMenu(false);
        setSearch(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        setMegaMenu(false);
        setSearch(false);
      }
    });

    function syncScrollState() {
      var isScrolled = window.scrollY > 8;
      header.classList.toggle('is-scrolled', isScrolled);
      if (shell) shell.classList.toggle('is-scrolled', isScrolled);
    }

    syncScrollState();
    window.addEventListener('scroll', syncScrollState, { passive: true });
  }

  function initializeHeaders() {
    document.querySelectorAll('[data-kt-header]').forEach(initializeHeader);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHeaders, { once: true });
  } else {
    initializeHeaders();
  }
})();
