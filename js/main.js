/**
 * Kiran & Co — Chartered Accountants
 * Production Client-Side Interaction Controller
 * Pure static, no external dependencies, GitHub Pages optimized.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initYear();
    initHeaderScroll();
    initMobileNav();
    initBackToTop();
    initAccordions();
    initServiceChips();
    initContactForm();
  });

  /* 1. Dynamic Footer Year -------------------------------------------------- */
  function initYear() {
    var year = String(new Date().getFullYear());
    var elements = document.querySelectorAll('[data-year]');
    elements.forEach(function (el) {
      el.textContent = year;
    });
  }

  /* 2. Header Scroll Elevation ---------------------------------------------- */
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var handleScroll = function () {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* 3. Mobile Navigation ---------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('primary-nav');
    if (!toggle || !nav) return;

    function setOpen(isOpen) {
      nav.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    }

    toggle.addEventListener('click', function () {
      var isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isExpanded);
    });

    // Close on navigation link click (crucial for anchor jumps)
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        setOpen(false);
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    // Close when clicking outside header
    document.addEventListener('click', function (e) {
      if (toggle.getAttribute('aria-expanded') === 'true' && !e.target.closest('.site-header')) {
        setOpen(false);
      }
    });

    // Reset when resizing back to desktop width
    var mq = window.matchMedia('(min-width: 901px)');
    var onResize = function (e) {
      if (e.matches) setOpen(false);
    };
    if (mq.addEventListener) {
      mq.addEventListener('change', onResize);
    } else if (mq.addListener) {
      mq.addListener(onResize);
    }
  }

  /* 4. Back To Top Floating Action ------------------------------------------ */
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'back-to-top';
      btn.setAttribute('type', 'button');
      btn.setAttribute('aria-label', 'Return to top of page');
      btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
      document.body.appendChild(btn);
    }

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* 5. Accessible Accordions ------------------------------------------------ */
  function initAccordions() {
    var headers = document.querySelectorAll('.accordion-header');
    headers.forEach(function (header) {
      header.addEventListener('click', function () {
        var isExpanded = header.getAttribute('aria-expanded') === 'true';
        var panelId = header.getAttribute('aria-controls');
        var panel = document.getElementById(panelId);

        if (!panel) return;

        // Toggle state
        header.setAttribute('aria-expanded', !isExpanded);
        if (isExpanded) {
          panel.setAttribute('hidden', '');
        } else {
          panel.removeAttribute('hidden');
        }
      });
    });
  }

  /* 6. Service Filter Chips & Active Anchors -------------------------------- */
  function initServiceChips() {
    var chips = document.querySelectorAll('.chip-nav a');
    if (!chips.length) return;

    var updateActiveChip = function () {
      var hash = window.location.hash;
      if (!hash) return;
      chips.forEach(function (chip) {
        if (chip.getAttribute('href') === hash) {
          chip.classList.add('is-active');
        } else {
          chip.classList.remove('is-active');
        }
      });
    };

    window.addEventListener('hashchange', updateActiveChip);
    updateActiveChip();
  }

  /* 7. Comprehensive Static Contact Form Handler ---------------------------- */
  function initContactForm() {
    var form = document.getElementById('enquiry-form');
    if (!form) return;

    var statusEl = document.getElementById('form-status');
    var fields = {
      name: {
        el: form.elements['name'],
        err: document.getElementById('name-error'),
        validator: function (v) { return v.trim().length >= 2; },
        msg: 'Please enter your full name (at least 2 characters).'
      },
      email: {
        el: form.elements['email'],
        err: document.getElementById('email-error'),
        validator: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
        msg: 'Please enter a valid business email address.'
      },
      phone: {
        el: form.elements['phone'],
        err: document.getElementById('phone-error'),
        validator: function (v) {
          if (!v || !v.trim()) return true; // optional
          return /^[\d\s+\-()]{7,20}$/.test(v.trim());
        },
        msg: 'Please enter a valid phone number or leave blank.'
      },
      service: {
        el: form.elements['service'],
        err: document.getElementById('service-error'),
        validator: function (v) { return Boolean(v); },
        msg: 'Please select the service required.'
      },
      message: {
        el: form.elements['message'],
        err: document.getElementById('message-error'),
        validator: function (v) { return v.trim().length >= 10; },
        msg: 'Please provide brief details of your enquiry (min 10 characters).'
      }
    };

    // Live validation cleanup on input
    Object.keys(fields).forEach(function (key) {
      var f = fields[key];
      if (!f.el) return;
      var parent = f.el.closest('.field');
      f.el.addEventListener('input', function () {
        if (f.err) {
          f.err.hidden = true;
          f.err.textContent = '';
        }
        if (parent) parent.classList.remove('has-error');
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var hasErrors = false;
      var firstInvalid = null;

      // Validate all fields
      Object.keys(fields).forEach(function (key) {
        var f = fields[key];
        if (!f.el) return;
        var parent = f.el.closest('.field');
        var val = f.el.value;

        if (!f.validator(val)) {
          hasErrors = true;
          if (parent) parent.classList.add('has-error');
          if (f.err) {
            f.err.textContent = f.msg;
            f.err.hidden = false;
          }
          if (!firstInvalid) firstInvalid = f.el;
        } else {
          if (parent) parent.classList.remove('has-error');
          if (f.err) {
            f.err.hidden = true;
            f.err.textContent = '';
          }
        }
      });

      if (hasErrors) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Generate Reference ID
      var refId = 'KC-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
      var nameVal = fields.name.el.value.trim();
      var emailVal = fields.email.el.value.trim();
      var phoneVal = (fields.phone.el && fields.phone.el.value.trim()) || 'Not provided';
      var serviceVal = fields.service.el.value;
      var msgVal = fields.message.el.value.trim();

      // Formulate mailto payload for direct offline submission
      var mailSubject = encodeURIComponent('New Engagement Enquiry: ' + serviceVal + ' [' + refId + ']');
      var mailBody = encodeURIComponent(
        'Reference ID: ' + refId + '\n' +
        'Client Name: ' + nameVal + '\n' +
        'Email: ' + emailVal + '\n' +
        'Phone: ' + phoneVal + '\n' +
        'Service Requested: ' + serviceVal + '\n\n' +
        'Enquiry Details:\n' + msgVal + '\n\n' +
        '---\nSent via Kiran & Co Client Portal'
      );
      var mailtoUrl = 'mailto:info@kiranandco.com?subject=' + mailSubject + '&body=' + mailBody;

      // Display rich client confirmation
      if (statusEl) {
        statusEl.className = 'form-status is-success';
        statusEl.hidden = false;
        statusEl.innerHTML =
          '<div style="margin-bottom: 0.75rem;">' +
            '<strong>Enquiry Prepared Successfully! Reference #' + refId + '</strong>' +
          '</div>' +
          '<p style="margin-bottom: 1rem;">Thank you, ' + escapeHtml(nameVal) + '. Since this is a direct static portal, you can transmit this enquiry immediately to our partners:</p>' +
          '<div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.75rem;">' +
            '<a href="' + mailtoUrl + '" class="btn btn--primary" style="padding: 0.65rem 1.25rem; font-size: 0.9rem;">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' +
              'Send via Email App' +
            '</a>' +
            '<button type="button" id="copy-enquiry-btn" class="btn btn--secondary" style="padding: 0.65rem 1.25rem; font-size: 0.9rem;">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' +
              'Copy Details to Clipboard' +
            '</button>' +
          '</div>' +
          '<p style="font-size: 0.85rem; color: #065F46; margin: 0;">Our practice manager reviews all incoming briefs within 1 business day.</p>';

        var copyBtn = document.getElementById('copy-enquiry-btn');
        if (copyBtn) {
          copyBtn.addEventListener('click', function () {
            var rawText =
              'KIRAN & CO — CLIENT ENQUIRY\n' +
              'Reference ID: ' + refId + '\n' +
              'Client: ' + nameVal + '\n' +
              'Email: ' + emailVal + '\n' +
              'Phone: ' + phoneVal + '\n' +
              'Service: ' + serviceVal + '\n' +
              'Message:\n' + msgVal;

            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(rawText).then(function () {
                copyBtn.textContent = 'Copied to Clipboard!';
                setTimeout(function () {
                  copyBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy Details';
                }, 3000);
              });
            } else {
              alert('Enquiry Summary:\n\n' + rawText);
            }
          });
        }

        statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      form.reset();
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, function (tag) {
      return ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag);
    });
  }
})();
