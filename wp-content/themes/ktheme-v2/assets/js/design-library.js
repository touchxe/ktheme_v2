(function () {
  var root = document.querySelector(".kt-design-library");

  if (!root) {
    return;
  }

  function closest(target, selector) {
    return target && target.closest ? target.closest(selector) : null;
  }

  var tocLinks = Array.prototype.slice.call(root.querySelectorAll(".kt-library-toc a[href^='#']"));
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

    root.querySelectorAll(".kt-library-block[id]").forEach(function (section) {
      observer.observe(section);
    });
  }

  root.querySelectorAll("[data-kt-library-tabs]").forEach(function (tabs) {
    var buttons = Array.prototype.slice.call(tabs.querySelectorAll("[data-kt-library-tab]"));
    var panels = Array.prototype.slice.call(tabs.querySelectorAll("[data-kt-library-panel]"));

    buttons.forEach(function (button, index) {
      var selected = index === 0;

      button.setAttribute("aria-selected", selected ? "true" : "false");
      button.classList.toggle("is-active", selected);
    });

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var target = button.getAttribute("data-kt-library-tab");

        buttons.forEach(function (item) {
          item.setAttribute("aria-selected", item === button ? "true" : "false");
          item.classList.toggle("is-active", item === button);
        });

        panels.forEach(function (panel) {
          panel.hidden = panel.getAttribute("data-kt-library-panel") !== target;
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
    modal.hidden = false;
    document.documentElement.classList.add("kt-library-modal-open");

    var focusTarget = modal.querySelector("[data-kt-library-modal-close]") || modal.querySelector("button, a, input, select, textarea");

    if (focusTarget) {
      focusTarget.focus();
    }
  }

  function closeModal(modal) {
    if (!modal) {
      return;
    }

    modal.hidden = true;
    document.documentElement.classList.remove("kt-library-modal-open");

    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  function showToast() {
    var wrap = document.getElementById("kt-library-toast-wrap");

    if (!wrap) {
      return;
    }

    var toast = document.createElement("div");
    toast.className = "kt-library-toast-in";
    toast.setAttribute("role", "status");
    toast.innerHTML = [
      '<svg class="kt-icon" aria-hidden="true"><use href="#kt-icon-check"></use></svg>',
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
    var openButton = closest(event.target, "[data-kt-library-modal-open]");
    var closeButton = closest(event.target, "[data-kt-library-modal-close]");
    var toastButton = closest(event.target, "[data-kt-library-toast]");

    if (openButton) {
      event.preventDefault();
      openModal(openButton.getAttribute("data-kt-library-modal-open"));
      return;
    }

    if (closeButton) {
      event.preventDefault();
      closeModal(closest(closeButton, ".kt-library-modal"));
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

    var modal = document.querySelector(".kt-library-modal:not([hidden])");

    if (modal) {
      closeModal(modal);
    }
  });
})();
