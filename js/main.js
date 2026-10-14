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
    initFloatingWidgets();
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

  /* 8. Floating WhatsApp & AI Assistant Widgets --------------------------- */
  function initFloatingWidgets() {
    // 1. WhatsApp Button (Bottom Left)
    if (!document.querySelector('.floating-whatsapp')) {
      var waBtn = document.createElement('a');
      waBtn.className = 'floating-whatsapp';
      waBtn.href = 'https://wa.me/918041238900?text=Hello%20Kiran%20%26%20Co%2C%20I%20would%20like%20to%20enquire%20about%20your%20CA%20services.';
      waBtn.target = '_blank';
      waBtn.rel = 'noopener noreferrer';
      waBtn.setAttribute('aria-label', 'Contact Kiran & Co on WhatsApp');
      waBtn.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true">' +
          '<path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.19.53-1.09 1.04-1.52 1.09-.43.05-.98.07-1.59-.12-.37-.12-.85-.28-1.47-.55-2.58-1.12-4.26-3.72-4.39-3.89-.13-.17-1.05-1.4-1.05-2.67 0-1.27.66-1.89.9-2.14.23-.25.51-.31.68-.31.17 0 .34 0 .49.01.16.01.37-.06.58.44.21.51.73 1.77.79 1.9.06.13.1.28.02.44-.08.17-.13.27-.25.41-.13.14-.27.31-.38.42-.13.13-.26.27-.11.53.15.25.66 1.09 1.42 1.77.98.87 1.8 1.14 2.06 1.27.25.13.4.11.55-.06.15-.17.64-.75.81-1 .17-.26.34-.21.57-.13.23.08 1.48.7 1.73.83.25.12.42.19.48.29.07.1.07.61-.12 1.14z"/>' +
        '</svg>';
      document.body.appendChild(waBtn);
    }

    // 2. AI Robot Button (Bottom Right)
    if (!document.querySelector('.floating-ai-btn')) {
      var aiBtn = document.createElement('button');
      aiBtn.className = 'floating-ai-btn';
      aiBtn.id = 'ai-chat-btn';
      aiBtn.setAttribute('type', 'button');
      aiBtn.setAttribute('aria-label', 'Open AI Assistant Demo');
      aiBtn.innerHTML =
        '<span class="ai-status-dot" aria-hidden="true"></span>' +
        '<svg viewBox="0 0 24 24" aria-hidden="true">' +
          '<path d="M12 2v2M4.93 4.93l1.41 1.41M19.07 4.93l-1.41 1.41"/>' +
          '<rect x="4" y="8" width="16" height="12" rx="4"/>' +
          '<circle cx="9" cy="13" r="1.5" fill="currentColor"/>' +
          '<circle cx="15" cy="13" r="1.5" fill="currentColor"/>' +
          '<path d="M9.5 17h5"/>' +
          '<line x1="2" y1="14" x2="4" y2="14"/>' +
          '<line x1="20" y1="14" x2="22" y2="14"/>' +
        '</svg>';
      document.body.appendChild(aiBtn);
    }

    // 3. AI Chat Drawer Modal
    if (!document.querySelector('.ai-chat-drawer')) {
      var drawer = document.createElement('div');
      drawer.className = 'ai-chat-drawer';
      drawer.id = 'ai-chat-drawer';
      drawer.setAttribute('role', 'dialog');
      drawer.setAttribute('aria-labelledby', 'ai-chat-title');
      drawer.innerHTML =
        '<div class="ai-chat-header">' +
          '<div class="ai-chat-header-info">' +
            '<div class="ai-chat-header-avatar">' +
              '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                '<rect x="4" y="8" width="16" height="12" rx="3"/><circle cx="9" cy="13" r="1.2" fill="currentColor"/><circle cx="15" cy="13" r="1.2" fill="currentColor"/><path d="M10 17h4"/><line x1="12" y1="4" x2="12" y2="8"/>' +
              '</svg>' +
            '</div>' +
            '<div>' +
              '<div class="ai-chat-header-title" id="ai-chat-title">Kiran CA Assistant</div>' +
              '<div class="ai-chat-header-sub"><span style="width:7px;height:7px;border-radius:50%;background:#34D399;display:inline-block;"></span> Online · Indian CA Advisory</div>' +
            '</div>' +
          '</div>' +
          '<button class="ai-chat-close" id="ai-chat-close" aria-label="Close Assistant">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="ai-chat-body" id="ai-chat-body">' +
          '<div class="ai-bubble ai-bubble--bot">' +
            'Namaste! I am the <strong>Kiran &amp; Co AI Assistant</strong>. Ask me anything regarding Indian statutory audits, direct tax u/s 44AB, GST returns, or MCA ROC compliances.' +
          '</div>' +
          '<div class="ai-chips-container">' +
            '<button type="button" class="ai-chip" data-q="What are key GST due dates?">📅 GST Due Dates</button>' +
            '<button type="button" class="ai-chip" data-q="Who requires a Tax Audit u/s 44AB?">📑 44AB Tax Audit</button>' +
            '<button type="button" class="ai-chip" data-q="What are the steps to incorporate a Pvt Ltd company?">🏢 Pvt Ltd Setup</button>' +
            '<button type="button" class="ai-chip" data-q="How can I book a partner consultation?">📞 Book Consultation</button>' +
          '</div>' +
        '</div>' +
        '<form class="ai-chat-footer" id="ai-chat-form">' +
          '<input type="text" class="ai-chat-input" id="ai-chat-input" placeholder="Ask about GST, tax, audit, ROC..." autocomplete="off">' +
          '<button type="submit" class="ai-chat-send" aria-label="Send query">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
          '</button>' +
        '</form>';
      document.body.appendChild(drawer);

      var openBtn = document.getElementById('ai-chat-btn');
      var closeBtn = document.getElementById('ai-chat-close');
      var chatBody = document.getElementById('ai-chat-body');
      var chatForm = document.getElementById('ai-chat-form');
      var chatInput = document.getElementById('ai-chat-input');

      function toggleChat(isOpen) {
        drawer.classList.toggle('is-open', isOpen);
        if (isOpen && chatInput) chatInput.focus();
      }

      openBtn.addEventListener('click', function () {
        toggleChat(!drawer.classList.contains('is-open'));
      });

      closeBtn.addEventListener('click', function () {
        toggleChat(false);
      });

      // Quick chips click
      drawer.addEventListener('click', function (e) {
        var chip = e.target.closest('.ai-chip');
        if (chip) {
          var query = chip.getAttribute('data-q');
          handleUserQuery(query);
        }
      });

      chatForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var val = chatInput.value.trim();
        if (!val) return;
        chatInput.value = '';
        handleUserQuery(val);
      });

      function handleUserQuery(query) {
        appendMessage(query, 'user');

        // Show typing indicator
        var typingId = 'typing-' + Date.now();
        var typingEl = document.createElement('div');
        typingEl.className = 'ai-bubble ai-bubble--bot';
        typingEl.id = typingId;
        typingEl.textContent = 'Analyzing statutory guidelines...';
        chatBody.appendChild(typingEl);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(function () {
          var existingTyping = document.getElementById(typingId);
          if (existingTyping) existingTyping.remove();

          var botReply = generateBotResponse(query);
          appendMessage(botReply, 'bot');
        }, 600);
      }

      function appendMessage(text, sender) {
        var bubble = document.createElement('div');
        bubble.className = 'ai-bubble ' + (sender === 'user' ? 'ai-bubble--user' : 'ai-bubble--bot');
        bubble.innerHTML = text;
        chatBody.appendChild(bubble);
        chatBody.scrollTop = chatBody.scrollHeight;
      }

      function generateBotResponse(query) {
        var q = query.toLowerCase();

        if (q.indexOf('gst') !== -1 || q.indexOf('gstr') !== -1) {
          return 'Under Indian GST laws: Monthly <strong>GSTR-1</strong> is due by the 11th, and <strong>GSTR-3B</strong> summary return is due by the 20th of each month. Annual <strong>GSTR-9/9C</strong> reconciliation is due by Dec 31st. We also automate <strong>GSTR-2B Input Tax Credit</strong> matching. <br><br><a href="services.html#gst" style="color:var(--navy);font-weight:600;text-decoration:underline;">Explore our GST Practice →</a>';
        }

        if (q.indexOf('44ab') !== -1 || q.indexOf('tax audit') !== -1 || q.indexOf('audit limit') !== -1) {
          return 'Under <strong>Section 44AB of the Income Tax Act</strong>:<br>• Businesses require a Tax Audit if turnover exceeds ₹1 Crore (threshold increases to ₹10 Crore if 95%+ transactions are digital).<br>• Professionals require a Tax Audit if gross receipts exceed ₹50 Lakhs (or ₹75 Lakhs under 44ADA).<br>Reports must be furnished via Form 3CA/3CD before Sept 30th.<br><br><a href="services.html#tax" style="color:var(--navy);font-weight:600;text-decoration:underline;">View Tax Audit Services →</a>';
        }

        if (q.indexOf('pvt ltd') !== -1 || q.indexOf('incorporat') !== -1 || q.indexOf('roc') !== -1 || q.indexOf('company') !== -1) {
          return 'To incorporate a Private Limited company in India:<br>1. Digital Signature Certificates (DSC) &amp; Name reservation on MCA SPICe+ (Part A).<br>2. SPICe+ Part B drafting with MOA, AOA, AGILE-PRO-S (GST/EPFO/ESIC), and PAN/TAN generation.<br>3. Bank account opening &amp; Form INC-20A Commencement of Business within 180 days.<br><br><a href="contact.html?service=Compliance" style="color:var(--navy);font-weight:600;text-decoration:underline;">Initiate Incorporation Brief →</a>';
        }

        if (q.indexOf('consult') !== -1 || q.indexOf('book') !== -1 || q.indexOf('contact') !== -1 || q.indexOf('fee') !== -1 || q.indexOf('call') !== -1) {
          return 'You can schedule an introductory conference with our partners directly:<br>• <strong>Telephone:</strong> <a href="tel:+918041238900" style="color:var(--navy);font-weight:600;">+91 (080) 4123 8900</a><br>• <strong>WhatsApp:</strong> <a href="https://wa.me/918041238900" target="_blank" style="color:#059669;font-weight:600;">Chat on WhatsApp →</a><br>• <strong>Portal:</strong> <a href="contact.html" style="color:var(--navy);font-weight:600;text-decoration:underline;">Submit Consultation Form →</a>';
        }

        if (q.indexOf('cfo') !== -1 || q.indexOf('bookkeep') !== -1 || q.indexOf('mis') !== -1) {
          return 'Our <strong>Virtual CFO &amp; Management Accounting</strong> service provides growing enterprises with outsourced financial controllership: monthly MIS reporting, cashflow forecasting, Tally/Zoho/NetSuite ledger closing, and board presentations.<br><br><a href="services.html#advisory" style="color:var(--navy);font-weight:600;text-decoration:underline;">Learn About Virtual CFO →</a>';
        }

        return 'Thank you for your enquiry regarding ' + escapeHtml(query) + '. Kiran &amp; Co provides partner-led advisory across Indian statutory audit, corporate tax, GST, and MCA filings. Would you like to connect with a partner on WhatsApp or submit a consultation brief?<br><br><div style="display:flex;gap:0.5rem;margin-top:0.4rem;"><a href="https://wa.me/918041238900" target="_blank" class="btn btn--secondary" style="padding:0.35rem 0.75rem;font-size:0.8rem;">WhatsApp Us</a><a href="contact.html" class="btn btn--primary" style="padding:0.35rem 0.75rem;font-size:0.8rem;">Book Consultation</a></div>';
      }
    }
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
