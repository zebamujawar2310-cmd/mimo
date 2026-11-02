/* ==========================================================================
   app.js — Behaviour wiring. Entirely frontend-only.
   No network requests, no backend, no authentication provider.
   ========================================================================== */

(function () {
  "use strict";

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var esc = UI.esc;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ==================================================================
     Safe localStorage wrapper (file:// and private mode can throw)
     ================================================================== */
  var store = {
    get: function (key) {
      try { return window.localStorage.getItem(key); }
      catch (e) { return null; }
    },
    set: function (key, value) {
      try { window.localStorage.setItem(key, value); return true; }
      catch (e) { return false; }
    },
    remove: function (key) {
      try { window.localStorage.removeItem(key); } catch (e) {}
    }
  };
  var KEY_USER = "astro.demoUser";

  /* ==================================================================
     1. SMOOTH SCROLL + MOBILE NAV
     ================================================================== */
  function scrollToEl(el) {
    if (!el) return;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  function closeMobileNav() {
    var toggle = $("#navToggle");
    var panel = $("#mobileNav");
    if (!toggle || !panel) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    panel.classList.remove("is-open");
  }

  function initNavigation() {
    var toggle = $("#navToggle");
    var panel = $("#mobileNav");
    var header = $("#siteHeader");

    if (toggle && panel) {
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        toggle.setAttribute("aria-label", open ? "Open navigation menu" : "Close navigation menu");
        panel.classList.toggle("is-open", !open);
      });
    }

    /* any in-page anchor scrolls smoothly and closes the drawer */
    document.addEventListener("click", function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute("href");
      if (!id || id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMobileNav();
      scrollToEl(target);
      if (history.replaceState) history.replaceState(null, "", id);
    });

    /* sticky shadow */
    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-stuck", window.scrollY > 8);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    /* close drawer with Escape */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel && panel.classList.contains("is-open")) {
        closeMobileNav();
        toggle.focus();
      }
    });
  }

  /* ==================================================================
     2. ACTIVE NAVIGATION STATE (scroll-spy)
     ================================================================== */
  function initScrollSpy() {
    var links = $$('[data-nav]');
    if (!links.length || !("IntersectionObserver" in window)) return;

    var map = {};
    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute("data-nav");
      var section = document.getElementById(id);
      if (section) { map[id] = []; sections.push(section); }
    });
    if (!sections.length) return;

    function setActive(id) {
      links.forEach(function (link) {
        link.classList.toggle("is-active", link.getAttribute("data-nav") === id);
        if (link.getAttribute("data-nav") === id) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    var visible = {};
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
      });
      var bestId = null, bestRatio = 0;
      Object.keys(visible).forEach(function (id) {
        if (visible[id] > bestRatio) { bestRatio = visible[id]; bestId = id; }
      });
      if (bestId && bestRatio > 0) setActive(bestId);
    }, { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.15, 0.4, 0.75, 1] });

    sections.forEach(function (s) { observer.observe(s); });
  }
/* ==================================================================
     3. FAQ ACCORDION
     ================================================================== */
  function initAccordion() {
    document.addEventListener("click", function (e) {
      var trigger = e.target.closest(".accordion__trigger");
      if (!trigger) return;
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      var expanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.classList.toggle("is-open", !expanded);
    });
  }

  /* ==================================================================
     4. SCROLL REVEAL
     ================================================================== */
  function initReveal() {
    var items = $$(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ==================================================================
     5. PASSWORD VISIBILITY TOGLE (delegated — works inside modals)
     ================================================================== */
  function initPasswordToggles() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-toggle-target]");
      if (!btn) return;
      var input = document.getElementById(btn.getAttribute("data-toggle-target"));
      if (!input) return;
      var showing = input.type === "text";
      input.type = showing ? "password" : "text";
      btn.setAttribute("aria-pressed", String(!showing));
      btn.setAttribute("aria-label", showing ? "Show password" : "Hide password");
      btn.innerHTML = UI.icon(showing ? "i-eye" : "i-eye-off");
    });
  }

  /* ==================================================================
     6. SHARED MODAL FRAGMENTS
     ================================================================== */
  function demoBanner(text) {
    return '<p class="demo-banner">' + UI.icon("i-info") +
      "<span>" + esc(text) + "</span></p>";
  }

  function successState(title, body, extraHtml) {
    return (
      '<div class="success-state">' +
      '<div class="success-state__mark">' + UI.icon("i-check") + "</div>" +
      '<h3 class="success-state__title">' + esc(title) + "</h3>" +
      '<p class="success-state__body">' + esc(body) + "</p>" +
      (extraHtml || "") +
      '<div class="modal__foot"><button type="button" class="btn btn--primary" data-modal-close>Close</button></div>' +
      "</div>"
    );
  }

  function summaryList(rows) {
    return '<ul class="summary-list">' + rows.map(function (r) {
      return '<li><span class="k">' + esc(r[0]) + '</span><span class="v">' + esc(r[1]) + "</span></li>";
    }).join("") + "</ul>";
  }
/* ==================================================================
     7. SIGN UP MODAL (frontend prototype)
     ================================================================== */
  function signupHtml() {
    return (
      demoBanner("Prototype only — this form is validated in your browser and never sent to a server.") +
      '<form id="signupForm" novalidate>' +
      '<div class="form-grid">' +
      UI.field({ id: "suName", label: "Full Name", autocomplete: "name", placeholder: "As per your birth records", maxLength: 60, hint: "Enter your name exactly as you would like it interpreted." }) +
      UI.field({ id: "suMobile", label: "Mobile Number", type: "tel", autocomplete: "tel", placeholder: "10-digit mobile number", maxLength: 15, hint: "Used for consultation reminders only." }) +
      UI.field({ id: "suEmail", label: "Email Address", type: "email", autocomplete: "email", placeholder: "name@example.com", maxLength: 120 }) +
      '<div class="form-grid form-grid--2">' +
      UI.field({ id: "suPassword", label: "Password", type: "password", autocomplete: "new-password", toggle: "suPassword", hint: "At least 8 characters, including a number." }) +
      UI.field({ id: "suConfirm", label: "Confirm Password", type: "password", autocomplete: "new-password", toggle: "suConfirm" }) +
      "</div>" +
      '<div class="pw-meter" id="suMeter" aria-hidden="true"><span></span><span></span><span></span><span></span></div>' +
      '<div class="check">' +
      '<input type="checkbox" id="suTerms" name="terms" data-validate="terms" aria-describedby="suTerms-error">' +
      '<label class="check__text" for="suTerms">I understand this is a <strong>frontend demonstration</strong> and that no real account is created on any server.</label>' +
      "</div>" +
      '<p class="check__error" id="suTerms-error" role="alert"></p>' +
      '<button type="submit" class="btn btn--primary btn--block btn--lg">Create Account</button>' +
      "</div></form>" +
      '<p class="modal-switch">Already registered? <button type="button" data-open-modal="login">Sign in instead</button></p>'
    );
  }

  function openSignup() {
    UI.Modal.open({
      title: "Create Your Account",
      description: "Save your birth details and revisit your consultation preferences.",
      size: "slim",
      html: signupHtml(),
      onOpen: function (body) {
        var form = $("#signupForm", body);
        $("#suName", body).setAttribute("data-autofocus", "");
        $("#suName", body).setAttribute("data-validate", "fullName");
        $("#suMobile", body).setAttribute("data-validate", "mobile");
        $("#suEmail", body).setAttribute("data-validate", "email");
        $("#suPassword", body).setAttribute("data-validate", "password");
        $("#suConfirm", body).setAttribute("data-validate", "confirm");

        var meter = $("#suMeter", body);
        var pw = $("#suPassword", body);
        pw.addEventListener("input", function () {
          var v = pw.value, score = 0;
          if (v.length >= 8) score++;
          if (/[A-Z]/.test(v)) score++;
          if (/\d/.test(v)) score++;
          if (/[^A-Za-z0-9]/.test(v)) score++;
          meter.className = "pw-meter" + (v ? " is-" + Math.max(1, score) : "");
        });

        Validate.attachLiveValidation(form);
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          if (!Validate.validateForm(form)) return;

          var name = $("#suName", body).value.trim();
          var email = $("#suEmail", body).value.trim();
          store.set(KEY_USER, JSON.stringify({ name: name, email: email, since: Date.now() }));

          UI.Modal.open({
            title: "Account Setup",
            html: successState(SITE.auth.signupSuccess.title, SITE.auth.signupSuccess.body,
              summaryList([["Full Name", name], ["Email", email]]))
          });
          renderUserState();
        });
      }
    });
  }
/* ==================================================================
     8. LOGIN MODAL (frontend prototype)
     ================================================================== */
  function loginHtml() {
    return (
      demoBanner("Prototype only — no authentication service is connected and no credentials leave your device.") +
      '<form id="loginForm" novalidate>' +
      '<div class="form-grid">' +
      UI.field({ id: "liId", label: "Email or Mobile Number", autocomplete: "username", placeholder: "name@example.com or 10-digit mobile" }) +
      UI.field({ id: "liPassword", label: "Password", type: "password", autocomplete: "current-password", toggle: "liPassword" }) +
      '<div class="form-row-between">' +
      '<div class="check"><input type="checkbox" id="liRemember" name="remember"><label class="check__text" for="liRemember">Remember me on this device</label></div>' +
      '<button type="button" class="btn btn--link" data-forgot>Forgot Password?</button>' +
      "</div>" +
      '<button type="submit" class="btn btn--primary btn--block btn--lg">Login</button>' +
      "</div></form>" +
      '<p class="modal-switch">New here? <button type="button" data-open-modal="signup">Create an account</button></p>'
    );
  }

  function openLogin() {
    UI.Modal.open({
      title: "Welcome Back",
      description: "Sign in to continue to your consultation preferences.",
      size: "slim",
      html: loginHtml(),
      onOpen: function (body, close) {
        var form = $("#loginForm", body);
        $("#liId", body).setAttribute("data-autofocus", "");
        $("#liId", body).setAttribute("data-validate", "loginId");
        $("#liPassword", body).setAttribute("data-validate", "loginPassword");

        $("[data-forgot]", body).addEventListener("click", openForgot);

        Validate.attachLiveValidation(form);
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          if (!Validate.validateForm(form)) return;
          var id = $("#liId", body).value.trim();
          var display = /^[^@\s]+@/.test(id) ? id : id.replace(/[\s()-]/g, "");
          store.set(KEY_USER, JSON.stringify({ name: display, email: display, since: Date.now() }));
          close();
          UI.Modal.open({
            title: "Signed In",
            html: successState(SITE.auth.loginSuccess.title, SITE.auth.loginSuccess.body,
              summaryList([["Signed in as", display]]))
          });
          renderUserState();
        });
      }
    });
  }

  function openForgot() {
    UI.Modal.open({
      title: "Forgot Password",
      size: "slim",
      html: '<div class="modal-note">' + UI.icon("i-info") +
        "<div><p><strong>" + esc(SITE.auth.forgot.title) + "</strong></p>" +
        "<p style='margin-top:.4rem'>" + esc(SITE.auth.forgot.body) + "</p>" +
        "<p style='margin-top:.6rem;color:var(--text-soft)'>" + esc(SITE.auth.forgot.hint) + "</p></div></div>" +
        '<div class="modal__foot"><button type="button" class="btn btn--primary btn--block" data-modal-close>Close</button></div>'
    });
  }
/* ==================================================================
     9. SERVICE DETAIL MODALS
     ================================================================== */
  function openService(id) {
    var data = SITE.services[id];
    if (!data) return;
    UI.Modal.open({
      title: data.title,
      description: data.duration,
      size: "wide",
      html:
        '<span class="tag">' + esc(data.eyebrow) + "</span>" +
        '<p class="lead" style="margin-top:.9rem;font-size:1rem">' + esc(data.summary) + "</p>" +
        '<ul class="modal-list">' + data.includes.map(function (item) {
          return "<li>" + esc(item) + "</li>";
        }).join("") + "</ul>" +
        '<div class="modal-note">' + UI.icon("i-info") + "<div>" + esc(data.note) + "</div></div>" +
        '<div class="modal__foot">' +
        '<button type="button" class="btn btn--outline" data-modal-close>Close</button>' +
        '<button type="button" class="btn btn--primary" data-modal-close data-book-from-modal>Request Appointment</button>' +
        "</div>"
    });
  }

  /* ==================================================================
     10. EXPERT "KNOW MORE" MODAL
     ================================================================== */
  function openExpert() {
    var d = SITE.expert.detail;
    UI.Modal.open({
      title: "About " + SITE.expert.title,
      description: SITE.expert.role,
      size: "wide",
      html:
        d.paragraphs.map(function (p) {
          return '<p class="text-muted" style="margin-bottom:1rem;font-size:.92rem;line-height:1.8">' + esc(p) + "</p>";
        }).join("") +
        '<h4 style="margin-top:1.4rem;margin-bottom:.8rem">Areas of Expertise</h4>' +
        '<ul class="modal-list">' + d.bullets.map(function (b) {
          return "<li>" + esc(b) + "</li>";
        }).join("") + "</ul>" +
        '<div class="modal-note">' + UI.icon("i-info") +
        "<div>This profile is placeholder copy intended to be replaced with your own professional background, qualifications and experience.</div></div>" +
        '<div class="modal__foot">' +
        '<button type="button" class="btn btn--outline" data-modal-close>Close</button>' +
        '<button type="button" class="btn btn--primary" data-modal-close data-book-from-modal>Book a Consultation</button>' +
        "</div>"
    });
  }

  /* ==================================================================
     11. HEADER SESSION STATE (local demo only)
     ================================================================== */
  function renderUserState() {
    var raw = store.get(KEY_USER);
    var actions = $(".header-actions");
    var user = null;
    if (raw) { try { user = JSON.parse(raw); } catch (e) { user = null; } }

    var existing = $("#userChip");
    if (user && user.name) {
      if (!existing) {
        actions.innerHTML =
          '<div class="user-chip" id="userChip">' +
          '<span class="user-chip__avatar" aria-hidden="true">' + UI.icon("i-user") + "</span>" +
          '<span class="user-chip__meta"><b id="userName"></b><small>Demo session</small></span>' +
          '<button type="button" class="btn btn--ghost btn--sm" id="signOutBtn">Sign Out</button>' +
          "</div>" +
          '<button type="button" class="btn btn--primary btn--sm" data-book-appointment>Book Appointment</button>';
        $("#userName").textContent = user.name;
        $("#signOutBtn").addEventListener("click", function () {
          store.remove(KEY_USER);
          renderUserState();
          openLogout();
        });
      } else {
        $("#userName").textContent = user.name;
      }
    } else if (existing) {
      actions.innerHTML =
        '<button type="button" class="btn btn--ghost" data-open-modal="login">Login</button>' +
        '<button type="button" class="btn btn--outline" data-open-modal="signup">Sign Up</button>' +
        '<button type="button" class="btn btn--primary" data-book-appointment>Book Appointment</button>';
    }
  }

  function openLogout() {
    UI.Modal.open({
      title: "Signed Out",
      size: "slim",
      html: '<div class="modal-note">' + UI.icon("i-info") +
        "<div>The locally stored demo session has been cleared from this browser. " +
        "No account ever existed on a server.</div></div>" +
        '<div class="modal__foot"><button type="button" class="btn btn--primary btn--block" data-modal-close>Close</button></div>'
    });
  }
/* ==================================================================
     12. SELECT POPULATION (Day of Birth / Reason / Preferred Time)
     ================================================================== */
  var SLOT_OPTIONS = [
    "Morning (9:00 AM – 12:00 PM)",
    "Afternoon (12:00 PM – 4:00 PM)",
    "Evening (4:00 PM – 8:00 PM)",
    "Flexible — suggest a time"
  ];

  function fillDays(select) {
    if (!select || select.dataset.filled === "true") return;
    var html = '<option value="">Select day</option>';
    for (var d = 1; d <= 31; d++) html += '<option value="' + d + '">' + d + "</option>";
    select.innerHTML = html;
    select.dataset.filled = "true";
  }

  function fillReasons(select) {
    if (!select || select.dataset.filled === "true") return;
    var html = '<option value="">Select a reason</option>';
    SITE.reasons.forEach(function (r) { html += '<option value="' + esc(r) + '">' + esc(r) + "</option>"; });
    select.innerHTML = html;
    select.dataset.filled = "true";
  }

  function fillSlots(select) {
    if (!select || select.dataset.filled === "true") return;
    var html = '<option value="">No preference</option>';
    SLOT_OPTIONS.forEach(function (s) { html += '<option value="' + esc(s) + '">' + esc(s) + "</option>"; });
    select.innerHTML = html;
    select.dataset.filled = "true";
  }

  /* Keep "Day of Birth" in sync with the chosen date */
  function syncDay(dateInput, daySelect) {
    if (!dateInput || !daySelect || !dateInput.value) return;
    var d = new Date(dateInput.value + "T00:00:00");
    if (!isNaN(d.getTime())) daySelect.value = String(d.getDate());
  }

  /* ==================================================================
     13. BIRTH DETAILS → CARRIES INTO THE APPOINTMENT FORM
     ================================================================== */
  function initBirthForm() {
    var form = $("#birthForm");
    if (!form) return;

    fillDays($("#bdDay", form));
    syncDay($("#bdDob", form), $("#bdDay", form));
    $("#bdDob", form).addEventListener("change", function () {
      syncDay(this, $("#bdDay", form));
    });

    Validate.attachLiveValidation(form);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!Validate.validateForm(form)) return;

      var copy = { name: "", dob: "", time: "" };
      $("#bdName", form).value.trim().split(/\s+/).forEach(function (w) {
        if (w) copy.name += w.charAt(0).toUpperCase() + w.slice(1) + " ";
      });
      copy.name = copy.name.trim();
      copy.dob = $("#bdDob", form).value;
      copy.time = $("#bdTime", form).value;

      /* prefill the booking form so the visitor never types twice */
      var bkName = $("#bkName");
      if (bkName && !bkName.value) bkName.value = copy.name;
      if (copy.dob && $("#bkDob") && !$("#bkDob").value) $("#bkDob").value = copy.dob;
      if (copy.dob && $("#bkDay")) $("#bkDay").value = String(new Date(copy.dob + "T00:00:00").getDate());
      if (copy.time && $("#bkTime") && !$("#bkTime").value) $("#bkTime").value = copy.time;
      if ($("#bdPlace") && $("#bdPlace").value && $("#bkPlace") && !$("#bkPlace").value) {
        $("#bkPlace").value = $("#bdPlace").value;
      }

      UI.Modal.open({
        title: "Birth Details Captured",
        size: "slim",
        html: successState("Ready for the Next Step",
          "Your birth details were validated in your browser and copied into the appointment form below. Nothing was sent to a server.",
          summaryList([
            ["Name", copy.name],
            ["Date of Birth", formatDate(copy.dob)],
            ["Time of Birth", copy.time],
            ["Place of Birth", $("#bdPlace", form).value.trim() || "Not provided"]
          ])) +
          '<div class="modal__foot"><button type="button" class="btn btn--primary btn--block" data-modal-close data-book-from-modal>Continue to Appointment</button></div>'
      });
    });
  }

  function formatDate(iso) {
    if (!iso) return "—";
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }
/* ==================================================================
     14. APPOINTMENT REQUEST (frontend only — no booking is made)
     ================================================================== */
  function initBookingForm() {
    var form = $("#bookingForm");
    if (!form) return;

    fillDays($("#bkDay", form));
    fillReasons($("#bkReason", form));
    fillSlots($("#bkSlot", form));
    $("#bkDob", form).addEventListener("change", function () {
      syncDay(this, $("#bkDay", form));
    });

    Validate.attachLiveValidation(form);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!Validate.validateForm(form)) return;

      var v = function (id) { var el = $("#" + id, form); return el ? el.value.trim() : ""; };

      var rows = [
        ["Full Name", v("bkName")],
        ["Mobile Number", v("bkMobile")],
        ["Email Address", v("bkEmail")],
        ["Date of Birth", formatDate(v("bkDob"))],
        ["Day of Birth", v("bkDay") ? "Day " + v("bkDay") : "—"],
        ["Time of Birth", v("bkTime")],
        ["Place of Birth", v("bkPlace") || "Not provided"],
        ["Reason for Consultation", v("bkReason")],
        ["Preferred Date", v("bkDate") ? formatDate(v("bkDate")) : "No preference"],
        ["Preferred Time", v("bkSlot") || "No preference"]
      ];

      UI.Modal.open({
        title: "Appointment Request",
        size: "wide",
        html:
          successState(SITE.bookingConfirm.title, SITE.bookingConfirm.body, summaryList(rows)) +
          '<div class="modal-note">' + UI.icon("i-info") + "<div>" + esc(SITE.bookingConfirm.note) + "</div></div>"
      });

      form.reset();
      Validate.clearAll(form);
    });
  }

  /* ==================================================================
     15. GLOBAL DELEGATED TRIGGERS
     ================================================================== */
  function initTriggers() {
    document.addEventListener("click", function (e) {
      var el;

      if ((el = e.target.closest("[data-open-modal]"))) {
        var which = el.getAttribute("data-open-modal");
        if (which === "signup") openSignup();
        else if (which === "login") openLogin();
        return;
      }

      if (e.target.closest("[data-book-appointment]") || e.target.closest("[data-book-from-modal]")) {
        var target = document.getElementById("contact");
        if (target) window.setTimeout(function () { scrollToEl(target); }, 120);
        return;
      }

      if ((el = e.target.closest("[data-service]"))) {
        openService(el.getAttribute("data-service"));
        return;
      }

      if (e.target.closest("[data-expert-more]")) openExpert();
    });
  }

  /* ==================================================================
     16. BOOTSTRAP
     ================================================================== */
  function init() {
    UI.Modal.init();
    initNavigation();
    initScrollSpy();
    initAccordion();
    initReveal();
    initPasswordToggles();
    initBirthForm();
    initBookingForm();
    initTriggers();
    renderUserState();

    /* footer year */
    var y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();