# Kiran & Co — Chartered Accountants Website

A static, six-page website built with plain HTML5, CSS3 and vanilla JavaScript. No frameworks, build tools or installs are required.

> The firm name **"Kiran & Co"** was read from the supplied logo. Please confirm the exact registered/legal name and wording (for example whether a full stop or "LLP" is needed) and update the text copies accordingly.

## How to open it

1. Extract the ZIP (on Windows: right-click `CA_Firm_Website_Updated.zip` → **Extract All…**).
2. Open the extracted `CA_Firm_Website` folder.
3. Double-click `index.html`. All links are relative, so it works locally without a server.

To publish, upload the folder contents to any static web host.

## Project structure

```
CA_Firm_Website/
├── index.html        Home
├── about.html        About
├── services.html     Services (five sections: accounting, tax, gst, compliance, advisory)
├── industries.html   Industries
├── team.html         Our Team (placeholder profiles)
├── contact.html      Contact (prototype form)
├── privacy.html      DRAFT privacy policy (additional file)
├── terms.html        DRAFT terms of use (additional file)
├── css/style.css     Shared stylesheet and design tokens
├── js/main.js        Mobile menu, footer year, contact-form validation
├── assets/
│   ├── kiran-logo.jpeg          Supplied logo (unmodified), used in the header
│   ├── favicon.png              K mark cropped from the supplied logo
│   ├── hero-architecture.svg    Abstract hero illustration
│   ├── about-geometry.svg       Abstract detail (About page)
│   └── portrait-placeholder.svg Neutral placeholder for team portraits
└── README.md
```

`privacy.html` and `terms.html` exist only so the footer links are not dead. They are **clearly labelled drafts that no lawyer has reviewed**. Replace them with approved legal text before publication.

## Services (exactly five)

Accounting · Tax · GST · Compliance · Advisory. They appear as cards on the home page, as sections on `services.html` (IDs `accounting`, `tax`, `gst`, `compliance`, `advisory`), in the footer and in the contact-form dropdown. To change a service, edit all four places.

## Logo and brand colours

- The header shows the supplied logo (`assets/kiran-logo.jpeg`, 1600 × 400, a 4:1 ratio) at a fixed height (52px desktop, 44px tablet, 38px small phones) with `width: auto`, so the proportions are never changed. It is a JPEG with a near-white opaque background, so it looks right on the white header but cannot be placed on a coloured background. **A transparent PNG or SVG version would be better**; if you have one, replace the file and keep the same name (or update the `src` in all pages).
- The small "CHARTERED ACCOUNTANTS" line inside the logo is small by design and is not very readable at header size.
- The footer uses a text wordmark (not the logo) because the logo's navy text would not show on the navy footer.

Colour use:

| Where | Colours |
|---|---|
| Header | White `#FFFFFF` background, Deep Navy `#0B2545` text, Blue `#004F98` hover/focus, Gold `#E5A93B` accents |
| Footer | Deep Navy `#0B2545` background, white text, Gold `#E5A93B` / Light Gold `#F3D06D` headings and accents |
| All other page content | Unchanged Espresso `#30272A`, Soft Taupe `#A88C75`, Warm Cream `#F7F3EF`, White, Warm Charcoal `#625A57` |

The navy, blue and gold colours are CSS variables (`--navy`, `--blue`, `--gold`, `--gold-light`) used only by the shared header and footer rules. Form errors use a muted red (`--error`).

Font: **Inter** from Google Fonts (the only external dependency), with a system-font fallback.

## Replace before publishing

- [ ] **Firm name wording** — confirm "Kiran & Co" (text appears in page titles, meta descriptions, the footer, About copy, and legal drafts).
- [ ] **Tagline** — "Clarity in every number. Confidence in every decision." is still placeholder brand copy (hero and footer).
- [ ] **Hero and "Our Standard" wording** — the hero description and the "Integrated — Audit · Tax · Advisory" line still mention audit, which is not one of the five services. Review with your manager.
- [ ] **Logo file** — a transparent PNG/SVG if available (see above).
- [ ] **Contact details** — email, phone and office address (footer on every page, and `contact.html`).
- [ ] **Team** — names, photographs, designations and bios (`team.html` and the home preview). Roles are proposals, not confirmed as five people. No qualifications are stated; add only verified ones.
- [ ] **Firm background** — placeholder on `about.html`. No history, clients or achievements are claimed.
- [ ] **Services and industries scope** — descriptions are general. The industries page says the sectors are proposed categories, not existing clients; update this once the firm's focus is confirmed.
- [ ] **Privacy Policy and Terms** — replace the drafts and remove "(draft)" from the footer labels.
- [ ] **On-page notices** — remove the "Placeholder" and "Prototype" notices once real content is in.

## Contact form limitation (important)

**The contact form does not deliver messages.** No backend, email service or form-delivery provider is configured. It validates the fields and, when valid, states that the enquiry **was not sent**. Nothing is transmitted or stored.

To connect delivery later, follow the comments in `js/main.js` (section 3): use an approved hosted form service or your own server endpoint, send the data inside `submitForm()`, show success only after confirmed delivery, then set `DELIVERY_CONFIGURED = true` and update the notices on `contact.html` and `privacy.html`.

## Interaction styles

Shared hover/pressed styles use tokens at the top of `css/style.css` (`--lift`, `--lift-shadow`, `--glow-on-*`) for buttons, home service cards, home industry tiles and the services-page chips. Movement is disabled under `prefers-reduced-motion`. "Our Standard" on the home page is proposed wording; edit it directly in `index.html`.

## Accessibility and responsiveness

Semantic landmarks, skip link, one `h1` per page, visible focus (blue on the white header, white on dark areas), `aria-current="page"` on the active link, a hamburger menu that closes on link selection, Escape and outside click, descriptive alt text on the logo, and breakpoints at 1100, 960, 900 (mobile navigation), 760, 620 and 420px.

## Testing performed and limitations

Automated checks were run before packaging:

- All eight HTML files exist, tags are balanced, ids are unique, each page has one `h1`, a title and a meta description.
- All local links, anchors (the five `services.html#…` sections linked from the home cards and footer) and asset paths resolve; no `#` or empty links.
- The header and footer markup is identical on every page (apart from the active-page marker); nav order and active link are correct.
- The logo file is byte-identical to the supplied file, is referenced with correct local paths on every page, and is sized by height only with `width: auto` (aspect ratio preserved).
- The contact dropdown contains exactly Accounting, Tax, GST, Compliance, Advisory; no references to the old six-service list remain.
- Brand colours (navy/blue/gold) appear only in header and footer CSS rules; other page rules are unchanged apart from a new five-card grid layout.
- Main-page text is about 38% shorter in total than before (word counts compared per page).
- `js/main.js` passes a Node.js syntax check, and its menu and form-validation logic was exercised against a simulated DOM.

**Limitations: the site has NOT been opened or visually tested in a real browser** (none was available). Logo size and alignment, header height, hamburger menu appearance on white, footer layout, the five-card grid, and the responsive behaviour at each breakpoint have not been visually confirmed, and the HTML was not run through the W3C validator. Please check every page at desktop and phone widths.
