/* ==========================================================================
   Kiran & Co — shared behaviour
   1. Footer copyright year
   2. Mobile navigation
   3. Contact form validation (front-end prototype — nothing is transmitted)
   ========================================================================== */
(function () {
  'use strict';

  /* 1. Footer copyright year ------------------------------------------------ */
  function setYear() {
    var year = String(new Date().getFullYear());
    var nodes = document.querySelectorAll('[data-year]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = year;
    }
  }

  /* 2. Mobile navigation ---------------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('primary-nav');
    if (!toggle || !nav) { return; }

    var desktop = window.matchMedia('(min-width: 901px)');

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close after a link is selected (the next page loads, but same-page links need this).
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) { setOpen(false); }
    });

    // Close with Escape and return focus to the toggle button.
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    // Close when clicking outside the header.
    document.addEventListener('click', function (event) {
      if (toggle.getAttribute('aria-expanded') === 'true' && !event.target.closest('.site-header')) {
        setOpen(false);
      }
    });

    // Reset when the viewport grows to desktop width.
    function onViewportChange(e) { if (e.matches) { setOpen(false); } }
    if (desktop.addEventListener) { desktop.addEventListener('change', onViewportChange); }
    else if (desktop.addListener) { desktop.addListener(onViewportChange); }
  }

  /* 3. Contact form --------------------------------------------------------- */
  /*
   * IMPORTANT: this form is a FRONT-END PROTOTYPE. No backend, email service or
   * form-delivery provider is configured, so nothing is sent anywhere.
   *
   * To connect a real delivery method later, choose ONE approved option:
   *
   *   A) Hosted form service (e.g. Formspree, Netlify Forms, Basin):
   *      - Set the <form> "action" attribute to the provider's endpoint and add method="post".
   *      - Inside submitForm() below, send the data with fetch(), for example:
   *
   *          fetch(form.action, {
   *            method: 'POST',
   *            headers: { 'Accept': 'application/json' },
   *            body: new FormData(form)
   *          }).then(function (response) {
   *            if (response.ok) { showStatus('success', 'Your enquiry has been sent.'); form.reset(); }
   *            else { showStatus('error', 'The enquiry could not be sent. Please try again.'); }
   *          }).catch(function () {
   *            showStatus('error', 'The enquiry could not be sent. Please check your connection.');
   *          });
   *
   *   B) Your own server endpoint (PHP, Node, serverless function):
   *      - POST the fields to your endpoint, validate again on the server, and send the email there.
   *
   * Only show a success message AFTER the provider confirms delivery.
   * Also update privacy.html to describe how enquiry data is stored and processed.
   */
  var DELIVERY_CONFIGURED = false; // set to true only after submitForm() really sends the data

  function initForm() {
    var form = document.getElementById('enquiry-form');
    if (!form) { return; }

    var status = document.getElementById('form-status');
    var fields = {
      name: { el: form.elements['name'], required: true, message: 'Enter your full name.' },
      email: { el: form.elements['email'], required: true, message: 'Enter your work email address.' },
      phone: { el: form.elements['phone'], required: false, message: '' },
      service: { el: form.elements['service'], required: true, message: 'Select the service you need.' },
      message: { el: form.elements['message'], required: true, message: 'Enter a message describing your requirement.' }
    };

    var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function validateField(key) {
      var field = fields[key];
      var value = field.el.value.trim();

      if (field.required && value === '') { return field.message; }

      if (key === 'email' && value !== '' && !EMAIL_PATTERN.test(value)) {
        return 'Enter a valid email address, for example name@company.com.';
      }

      if (key === 'phone' && value !== '') {
        var digits = value.replace(/\D/g, '');
        if (!/^[+\d\s().-]+$/.test(value) || digits.length < 6 || digits.length > 15) {
          return 'Enter a valid phone number, or leave this field empty.';
        }
      }
      return '';
    }

    function showError(key, text) {
      var field = fields[key];
      var wrapper = field.el.closest('.field');
      var error = document.getElementById(field.el.id + '-error');
      if (!wrapper || !error) { return; }

      if (text) {
        error.textContent = text;
        error.hidden = false;
        wrapper.classList.add('has-error');
        field.el.setAttribute('aria-invalid', 'true');
      } else {
        error.textContent = '';
        error.hidden = true;
        wrapper.classList.remove('has-error');
        field.el.removeAttribute('aria-invalid');
      }
    }

    function showStatus(type, html) {
      status.className = 'form-status' + (type === 'error' ? ' form-status--error' : '');
      status.innerHTML = html;
      status.hidden = false;
    }

    function clearStatus() {
      status.hidden = true;
      status.innerHTML = '';
    }

    // Replace the body of this function with a real submission once a service is approved.
    function submitForm() {
      if (!DELIVERY_CONFIGURED) {
        showStatus('prototype',
          '<strong>Your enquiry was not sent.</strong> The details passed validation, but this website ' +
          'is a front-end prototype and no form-delivery service is connected yet. Nothing has been ' +
          'transmitted or stored. Please use the contact details on this page once they are published.');
        return;
      }
      // Real delivery code goes here (see the notes above).
    }

    // Validate each field when the person leaves it, then keep the message current while they type.
    Object.keys(fields).forEach(function (key) {
      var el = fields[key].el;
      el.addEventListener('blur', function () {
        if (el.value.trim() !== '' || el.getAttribute('aria-invalid') === 'true') {
          showError(key, validateField(key));
        }
      });
      var liveEvent = el.tagName === 'SELECT' ? 'change' : 'input';
      el.addEventListener(liveEvent, function () {
        if (el.getAttribute('aria-invalid') === 'true') { showError(key, validateField(key)); }
        clearStatus();
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      clearStatus();

      var firstInvalid = null;
      Object.keys(fields).forEach(function (key) {
        var text = validateField(key);
        showError(key, text);
        if (text && !firstInvalid) { firstInvalid = fields[key].el; }
      });

      if (firstInvalid) {
        showStatus('error', '<strong>Please correct the highlighted fields.</strong> Nothing has been sent.');
        firstInvalid.focus();
        return;
      }
      submitForm();
    });
  }

  setYear();
  initNav();
  initForm();
})();
