/* ==========================================================================
   ui.js — Reusable UI primitives
   Provides: icon rendering, escaping, button markup, form field builders,
   and a dependency-free accessible Modal controller (focus trap + ESC).
   ========================================================================== */

window.UI = (function () {
  "use strict";

  /* ---------- Escape arbitrary text before injecting into innerHTML ---------- */
  function esc(value) {
    if (value === null || value === undefined) return "";
    return String(value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* ---------- Inline SVG icon reference (sprite lives in index.html) ---------- */
  function icon(name, className) {
    return (
      '<svg class="icon ' + esc(className || "") + '" aria-hidden="true" focusable="false">' +
      '<use href="#' + esc(name) + '"></use></svg>'
    );
  }

  /* ---------- Button markup ---------- */
  function button(opts) {
    opts = opts || {};
    var cls = ["btn", "btn--" + (opts.variant || "primary")];
    if (opts.size) cls.push("btn--" + opts.size);
    if (opts.className) cls.push(opts.className);
    var attrs = ' class="' + esc(cls.join(" ")) + '"';
    if (opts.type) attrs += ' type="' + esc(opts.type) + '"';
    if (opts.href) attrs += ' href="' + esc(opts.href) + '"';
    if (opts.disabled) attrs += " disabled";
    if (opts.ariaLabel) attrs += ' aria-label="' + esc(opts.ariaLabel) + '"';
    if (opts.dataset) {
      for (var k in opts.dataset) {
        if (Object.prototype.hasOwnProperty.call(opts.dataset, k)) {
          attrs += " data-" + esc(k) + '="' + esc(opts.dataset[k]) + '"';
        }
      }
    }
    var inner =
      (opts.icon ? icon(opts.icon, "btn__icon") : "") +
      '<span class="btn__label">' + esc(opts.label) + "</span>";
    return "<a" + attrs + ">" + inner + "</a>";
  }

  /* ---------- Form field builder (label + control + error slot) ---------- */
  function field(opts) {
    opts = opts || {};
    var id = opts.id;
    var describedBy = [];
    if (opts.hint) describedBy.push(id + "-hint");
    if (opts.error) describedBy.push(id + "-error");

    var control;
    if (opts.type === "select") {
      var optsHtml = (opts.placeholder !== false)
        ? '<option value="">' + esc(opts.placeholder || "Select an option") + "</option>"
        : "";
      (opts.options || []).forEach(function (o) {
        var val = typeof o === "string" ? o : o.value;
        var lab = typeof o === "string" ? o : o.label;
        optsHtml += '<option value="' + esc(val) + '">' + esc(lab) + "</option>";
      });
      control =
        '<select id="' + esc(id) + '" name="' + esc(opts.name || id) + '"' +
        (describedBy.length ? ' aria-describedby="' + describedBy.join(" ") + '"' : "") +
        ' required>' + optsHtml + "</select>";
    } else if (opts.type === "textarea") {
      control =
        '<textarea id="' + esc(id) + '" name="' + esc(opts.name || id) + '" rows="' + (opts.rows || 4) + '"' +
        (opts.placeholder ? ' placeholder="' + esc(opts.placeholder) + '"' : "") +
        (describedBy.length ? ' aria-describedby="' + describedBy.join(" ") + '"' : "") +
        " required></textarea>";
    } else {
      var type = opts.type || "text";
      control =
        '<input id="' + esc(id) + '" name="' + esc(opts.name || id) + '" type="' + esc(type) + '"' +
        (opts.placeholder ? ' placeholder="' + esc(opts.placeholder) + '"' : "") +
        (opts.autocomplete ? ' autocomplete="' + esc(opts.autocomplete) + '"' : "") +
        (opts.maxLength ? ' maxlength="' + esc(opts.maxLength) + '"' : "") +
        (opts.min ? ' min="' + esc(opts.min) + '"' : "") +
        (opts.max ? ' max="' + esc(opts.max) + '"' : "") +
        (describedBy.length ? ' aria-describedby="' + describedBy.join(" ") + '"' : "") +
        (opts.toggle ? ' data-password-toggle="' + esc(opts.toggle) + '"' : "") +
        " required>";
    }

    var hintHtml = opts.hint
      ? '<p class="field__hint" id="' + esc(id) + '-hint">' + esc(opts.hint) + "</p>"
      : "";
    var errorHtml = '<p class="field__error" id="' + esc(id) + '-error" role="alert"></p>';

    var label = '<label class="field__label" for="' + esc(id) + '">' + esc(opts.label);
    if (opts.optional) label += ' <span class="field__optional">(Optional)</span>';
    label += "</label>";

    return (
      '<div class="field' + (opts.toggle ? " field--password" : "") + (opts.className ? " " + opts.className : "") + '">' +
      label +
      '<div class="field__control">' + control +
      (opts.toggle
        ? '<button type="button" class="field__toggle" data-toggle-target="' + esc(opts.toggle) + '"' +
          ' aria-label="Show password" aria-pressed="false">' + icon("i-eye") + "</button>"
        : "") +
      "</div>" + hintHtml + errorHtml + "</div>"
    );
  }
/* ------------------------------------------------------------------
   Modal controller
   - role="dialog" + aria-modal
   - Focus moves into the dialog on open and is restored on close
   - Tab is trapped inside the dialog
   - ESC and backdrop click both close
   - Background scroll is locked
   ------------------------------------------------------------------ */
  var Modal = (function () {
    var overlay, panel, titleEl, descEl, bodyEl, lastFocused = null, isOpen = false;
    var closeTimer = null;

    var FOCUSABLE =
      'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), ' +
      'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function init() {
      overlay = document.getElementById("modalOverlay");
      if (!overlay) return;
      panel = overlay.querySelector(".modal");
      titleEl = overlay.querySelector(".modal__title");
      descEl = overlay.querySelector(".modal__desc");
      bodyEl = overlay.querySelector(".modal__body");

      overlay.addEventListener("click", function (e) {
        if (e.target === overlay || e.target.closest("[data-modal-close]")) close();
      });
      document.addEventListener("keydown", function (e) {
        if (!isOpen) return;
        if (e.key === "Escape") { e.preventDefault(); close(); return; }
        if (e.key === "Tab") trapFocus(e);
      });
    }

    function trapFocus(e) {
      var nodes = panel.querySelectorAll(FOCUSABLE);
      if (!nodes.length) return;
      var list = Array.prototype.slice.call(nodes);
      var first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    function open(config) {
      if (!overlay) return;
      /* cancel a pending close so a freshly opened dialog is never wiped */
      if (closeTimer) { window.clearTimeout(closeTimer); closeTimer = null; }

      lastFocused = document.activeElement;
      titleEl.textContent = config.title || "";
      if (config.description) {
        descEl.textContent = config.description;
        descEl.hidden = false;
      } else {
        descEl.textContent = "";
        descEl.hidden = true;
      }
      bodyEl.innerHTML = config.html || "";
      panel.className = "modal" + (config.size ? " modal--" + config.size : "");
      if (config.onOpen) config.onOpen(bodyEl, close);

      overlay.hidden = false;
      /* force reflow so the transition plays */
      void overlay.offsetWidth;
      overlay.classList.add("is-open");
      document.body.classList.add("is-locked");
      isOpen = true;

      var target = bodyEl.querySelector("[data-autofocus]") ||
                  bodyEl.querySelector("input, select, textarea, button");
      if (target) target.focus();
    }

    function close() {
      if (!overlay || !isOpen) return;
      overlay.classList.remove("is-open");
      document.body.classList.remove("is-locked");
      isOpen = false;
      if (closeTimer) window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(function () {
        closeTimer = null;
        overlay.hidden = true;
        bodyEl.innerHTML = "";
      }, 220);
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    }

    return { init: init, open: open, close: close, isOpen: function () { return isOpen; } };
  })();

  return { esc: esc, icon: icon, button: button, field: field, Modal: Modal };
})();