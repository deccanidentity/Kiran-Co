# Kiran & Co — Chartered Accountants Official Website

[![GitHub Pages Deployment](https://img.shields.io/badge/Deployment-GitHub%20Pages-blue?style=flat-square&logo=github)](https://pages.github.com/)
[![Pure Static](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-green?style=flat-square)](https://developer.mozilla.org/)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-gold?style=flat-square)](#)

A high-performance, institutional static website for **Kiran & Co — Chartered Accountants**, engineered for instant deployment on **GitHub Pages** (or any static hosting provider) with **zero server dependencies**, **no build tools**, and **zero external npm installs**.

---

## 🏛️ Brand System & Aesthetics

- **Brand Primary:** Deep Sapphire Navy (`#0A192F`, `#0B1E38`, `#163664`)
- **Brand Accents:** Warm Champagne Gold (`#C5A059`, `#D4AF37`, `#F3E0B5`)
- **Typography:** `Plus Jakarta Sans` & `Inter` (Google Fonts with robust system fallbacks)
- **Visuals:** High-definition commercial photography, 3D financial growth visualization, and verified leadership portraits.

---

## 📂 Site Structure

```
Kiran-Co/
├── index.html          # Home: Hero, Stats Ribbon, Our Standard, 5 Core Services, Industries, Team, Testimonials, FAQ
├── about.html          # About: Firm Foundation, Professional Philosophy, ICAI Core Values, 4-Stage Methodology
├── services.html       # Services: Statutory Accounting, Direct Tax, GST, Corporate Compliance, Advisory, Due Dates Tracker
├── industries.html     # Industries: Manufacturing, Tech/SaaS, Real Estate, Healthcare, Retail/E-Commerce, Startups
├── team.html           # Leadership: CA Kiran Kumar (FCA), CA Priya Sharma (FCA), CA Rajesh Mehta (ACA), Quality Standards
├── contact.html        # Client Engagement Portal: Offline-ready inquiry generator, direct mailto, office addresses, direct lines
├── privacy.html        # Privacy Policy: DPDP Act 2023 & Information Technology Act 2000 compliant
├── terms.html          # Terms of Service: ICAI non-solicitation notice, professional engagement protocols
├── 404.html            # Custom GitHub Pages 404 error page
├── css/
│   └── style.css       # Production design tokens, glassmorphic header, responsive grid, micro-interactions
├── js/
│   └── main.js         # Navigation, header elevation, back-to-top, accordions, static enquiry generator
└── assets/
    ├── kiran-logo.jpeg # Official brand identity
    ├── favicon.png     # Brand browser favicon
    ├── hero-growth.jpg # 3D Sapphire pillars & gold growth visual
    ├── about-office.jpg# Corporate boardroom consulting visual
    ├── team-kiran.jpg  # Founder & Senior Partner portrait
    ├── team-priya.jpg  # Managing Partner portrait
    └── team-rajesh.jpg # Tax & Advisory Partner portrait
```

---

## 🚀 How to Deploy on GitHub Pages (In Under 2 Minutes)

Because this website is built with pure, clean static HTML/CSS/JavaScript and relative pathing, it requires **no build step, no npm run, and no server configuration**.

### Option A: Via GitHub Web Interface
1. Push this entire repository to GitHub:
   ```bash
   git add .
   git commit -m "Production pre-release: Kiran & Co official static website"
   git push origin main
   ```
2. On GitHub, navigate to your repository **Settings** tab.
3. In the left navigation, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment** > **Branch**:
   - Select **Branch**: `main` (or `master`)
   - Select **Folder**: `/ (root)`
5. Click **Save**.
6. Within 60 seconds, your site will be live at:
   `https://<your-username>.github.io/<repository-name>/`

### Option B: Local Testing (No Server Needed)
Simply double-click `index.html` to open directly in any browser. All relative paths, images, navigation anchors, and scripts function immediately offline.

---

## 📬 Contact Form Handling on Static GitHub Pages

The client consultation portal on `contact.html` is fully operational in static environments:
- **Instant Client Feedback:** Validates corporate email, name, service, and message with inline cues.
- **Reference Code Generation:** Generates unique tracking IDs (e.g. `KC-2026-8941`).
- **Direct Mailto Trigger:** Provides a 1-click **"Send via Email App"** button prefilled with the full inquiry subject and structured body.
- **Clipboard Utility:** Offers a 1-click **"Copy Details"** button so users can paste into WhatsApp, Outlook, or Slack.
- *(Optional)* To connect an external headless form endpoint (like Formspree or Web3Forms), add the `action="https://formspree.io/f/YOUR_ID"` attribute to `<form id="enquiry-form">`.

---

## 🛡️ Professional Compliance
- Adheres to the **Institute of Chartered Accountants of India (ICAI)** ethical guidelines and non-solicitation directives.
- Incorporates **Digital Personal Data Protection (DPDP) Act 2023** privacy standards.
- Fully accessible semantic HTML5 landmarks, keyboard navigation, and WCAG AA contrast compliance.
