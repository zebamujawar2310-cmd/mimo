/* ==========================================================================
   validate.js — Client-side form validation
   Pure frontend. Nothing is transmitted anywhere.
   Every field carries data-validate="<rule>" so rules stay declarative.
   ========================================================================== */

window.Validate = (function () {
  "use strict";

  var EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

  /* ---------- error slot helpers (support .field and .check wrappers) ---------- */
  function slotOf(input) {
    var wrap = input.closest ? input.closest(".field, .check") : null;
    return wrap ? wrap.querySelector(".field__error, .check__error") : null;
  }

  function setError(input, message) {
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    var slot = slotOf(input);
    if (slot) slot.textContent = message;
  }

  function clearError(input) {
    input.classList.remove("is-invalid");
    input.removeAttribute("aria-invalid");
    var slot = slotOf(input);
    if (slot) slot.textContent = "";
  }

  function clearAll(form) {
    form.querySelectorAll(".is-invalid").forEach(function (el) {
      el.classList.remove("is-invalid");
      el.removeAttribute("aria-invalid");
    });
    form.querySelectorAll(".field__error, .check__error").forEach(function (el) {
      el.textContent = "";
    });
  }

  /* ---------- individual rules — return "" when valid, else the message ---------- */
  var rules = {
    required: function (v) {
      return v && v.trim() !== "" ? "" : "This field is required.";
    },

    fullName: function (v) {
      v = (v || "").trim();
      if (!v) return "Please enter your full name.";
      if (v.length < 2) return "Please enter your full name.";
      if (v.length > 60) return "Please keep your name under 60 characters.";
      if (!/^[\p{L}][\p{L}\s.'-]*$/u.test(v)) return "Use letters, spaces, apostrophes or hyphens only.";
      return "";
    },

    mobile: function (v) {
      v = (v || "").replace(/[\s()-]/g, "");
      if (!v) return "Please enter your mobile number.";
      var digits = v.replace(/^\+?91/, "");
      if (!/^[6-9]\d{9}$/.test(digits)) {
        return "Enter a valid 10-digit Indian mobile number (starting 6–9).";
      }
      return "";
    },

    email: function (v) {
      v = (v || "").trim();
      if (!v) return "Please enter your email address.";
      if (v.length > 120) return "Please enter a shorter email address.";
      return EMAIL.test(v) ? "" : "Enter a valid email address, e.g. name@example.com.";
    },

    loginId: function (v) {
      v = (v || "").trim();
      if (!v) return "Enter your email address or mobile number.";
      if (EMAIL.test(v)) return "";
      var digits = v.replace(/[\s()-]/g, "").replace(/^\+?91/, "");
      if (/^[6-9]\d{9}$/.test(digits)) return "";
      return "Enter a valid email address or 10-digit mobile number.";
    },

    password: function (v) {
      if (!v) return "Please create a password.";
      if (v.length < 8) return "Password must be at least 8 characters.";
      if (v.length > 72) return "Password must be 72 characters or fewer.";
      if (!/[A-Za-z]/.test(v)) return "Include at least one letter.";
      if (!/\d/.test(v)) return "Include at least one number.";
      return "";
    },

    loginPassword: function (v) {
      if (!v) return "Please enter your password.";
      return v.length < 8 ? "Password must be at least 8 characters." : "";
    },

    dob: function (v) {
      if (!v) return "Please enter your date of birth.";
      var d = new Date(v + "T00:00:00");
      if (isNaN(d.getTime())) return "Enter a valid date of birth.";
      var today = new Date(); today.setHours(23, 59, 59, 999);
      if (d > today) return "Date of birth cannot be in the future.";
      var min = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
      if (d < min) return "Please check the date of birth.";
      return "";
    },

    time: function (v) {
      if (!v) return "Please enter your time of birth.";
      return /^([01]\d|2[0-3]):[0-5]\d$/.test(v) ? "" : "Enter a valid time, e.g. 14:30.";
    },

    place: function (v) {
      v = (v || "").trim();
      if (!v) return "";
      return v.length < 2 ? "Please enter the full name of your birth place." : "";
    }
  };
/* ---------- confirm-password + terms handled inline ---------- */
  function matchesConfirm(input, form) {
    var other = form.querySelector('[name="password"]');
    if (!input.value) return "Please confirm your password.";
    if (other && input.value !== other.value) return "Passwords do not match.";
    return "";
  }

  function validateField(input) {
    var kind = input.getAttribute("data-validate");
    var form = input.form;
    var isCheckbox = input.type === "checkbox";
    var value = isCheckbox ? input.checked : input.value;
    var msg = "";

    if (kind === "confirm") {
      msg = matchesConfirm(input, form);
    } else if (kind === "terms") {
      msg = value ? "" : "Please accept the terms to continue.";
    } else if (rules[kind]) {
      msg = rules[kind](isCheckbox ? "" : value);
    }

    if (msg) { setError(input, msg); return false; }
    clearError(input);
    return true;
  }

  /* ---------- validate every field; focuses the first failure ---------- */
  function validateForm(form) {
    var inputs = Array.prototype.slice.call(form.querySelectorAll("[data-validate]"));
    var firstBad = null;
    inputs.forEach(function (input) {
      if (!validateField(input) && !firstBad) firstBad = input;
    });
    if (firstBad) {
      try { firstBad.focus({ preventScroll: true }); } catch (err) { firstBad.focus(); }
      if (firstBad.scrollIntoView) {
        firstBad.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return false;
    }
    return true;
  }

  /* ---------- re-validate on input, but only AFTER the first failed submit ---------- */
  function attachLiveValidation(form) {
    var armed = false;
    form.addEventListener("submit", function () { armed = true; });
    function revalidate(e) {
      if (!armed) return;
      var t = e.target;
      if (t && t.matches && t.matches("[data-validate]") && t.classList.contains("is-invalid")) {
        validateField(t);
      }
    }
    form.addEventListener("input", revalidate);
    form.addEventListener("change", revalidate);
  }

  return {
    rules: rules,
    setError: setError,
    clearError: clearError,
    clearAll: clearAll,
    validateField: validateField,
    validateForm: validateForm,
    attachLiveValidation: attachLiveValidation
  };
})();