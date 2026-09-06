(function () {
  var root = document.querySelector(".modu-design-library");

  if (!root) {
    return;
  }

  function closest(target, selector) {
    return target && target.closest ? target.closest(selector) : null;
  }

  var tocLinks = Array.prototype.slice.call(root.querySelectorAll(".modu-library-toc a[href^='#']"));
  var tocById = tocLinks.reduce(function (map, link) {
    var id = link.getAttribute("href").slice(1);
    map[id] = link;
    return map;
  }, {});

  function setActiveToc(id) {
    tocLinks.forEach(function (link) {
      link.classList.toggle("is-active", link === tocById[id]);
    });
  }

  if ("IntersectionObserver" in window && tocLinks.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveToc(entry.target.id);
        }
      });
    }, {
      rootMargin: "-28% 0px -62% 0px",
      threshold: 0.01
    });

    root.querySelectorAll(".modu-library-block[id]").forEach(function (section) {
      observer.observe(section);
    });
  }

  root.querySelectorAll("[data-modu-library-tabs]").forEach(function (tabs) {
    var buttons = Array.prototype.slice.call(tabs.querySelectorAll("[data-modu-library-tab]"));
    var panels = Array.prototype.slice.call(tabs.querySelectorAll("[data-modu-library-panel]"));

    buttons.forEach(function (button, index) {
      var selected = index === 0;

      button.setAttribute("aria-selected", selected ? "true" : "false");
      button.classList.toggle("is-active", selected);
    });

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var target = button.getAttribute("data-modu-library-tab");

        buttons.forEach(function (item) {
          item.setAttribute("aria-selected", item === button ? "true" : "false");
          item.classList.toggle("is-active", item === button);
        });

        panels.forEach(function (panel) {
          panel.hidden = panel.getAttribute("data-modu-library-panel") !== target;
        });
      });
    });
  });

  var lastFocus = null;

  function openModal(id) {
    var modal = document.getElementById(id);

    if (!modal) {
      return;
    }

    lastFocus = document.activeElement;

    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }

    modal.hidden = false;
    document.documentElement.classList.add("modu-library-modal-open");
    document.body.classList.add("modu-library-modal-open");

    var focusTarget = modal.querySelector("[data-modu-library-modal-close]") || modal.querySelector("button, a, input, select, textarea");

    if (focusTarget) {
      focusTarget.focus();
    }
  }

  function closeModal(modal) {
    if (!modal) {
      return;
    }

    modal.hidden = true;
    document.documentElement.classList.remove("modu-library-modal-open");
    document.body.classList.remove("modu-library-modal-open");

    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  function showToast() {
    var wrap = document.getElementById("modu-library-toast-wrap");

    if (!wrap) {
      return;
    }

    var toast = document.createElement("div");
    toast.className = "modu-library-toast-in";
    toast.setAttribute("role", "status");
    toast.innerHTML = [
      '<svg class="modu-icon" aria-hidden="true"><use href="#modu-icon-check"></use></svg>',
      "<div>",
      "<strong>저장되었습니다</strong>",
      "<p>피드백 토스트 컴포넌트가 동일한 방식으로 표시됩니다.</p>",
      "</div>"
    ].join("");
    wrap.appendChild(toast);

    window.setTimeout(function () {
      toast.remove();
    }, 2800);
  }

  document.addEventListener("click", function (event) {
    var openButton = closest(event.target, "[data-modu-library-modal-open]");
    var closeButton = closest(event.target, "[data-modu-library-modal-close]");
    var toastButton = closest(event.target, "[data-modu-library-toast]");

    if (openButton) {
      event.preventDefault();
      openModal(openButton.getAttribute("data-modu-library-modal-open"));
      return;
    }

    if (closeButton) {
      event.preventDefault();
      closeModal(closest(closeButton, ".modu-library-modal"));
      return;
    }

    if (toastButton) {
      event.preventDefault();
      showToast();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    var modal = document.querySelector(".modu-library-modal:not([hidden])");

    if (modal) {
      closeModal(modal);
    }
  });
})();
