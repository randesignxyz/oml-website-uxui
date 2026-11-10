# OML website prototype

Editable source exported from the published prototype, 5 November 2026.
Source revision: 44a7ee723ca0ec89a99de98eb6e217b38d3e2b4e.

## Open and run

1. Open this entire folder in VS Code.
2. Open its terminal and run:

```sh
npm run dev
```

3. Open the website URL printed in the terminal (normally http://127.0.0.1:4173). If that port is busy, the dev server automatically selects the next available port. Press Ctrl+C in the terminal to stop.

The dev command uses Python 3's built-in static web server. No build step, npm dependencies, `npm install`, or API keys are required. You can also run `python3 -m http.server 4173 --bind 127.0.0.1` directly. If Python is unavailable, serve this folder using your preferred static web server.

## Files to edit

- `index.html`: shared header, footer and script loading.
- `styles.css`: all styling, colors, typography and responsive layouts.
- `app.js`: page navigation, homepage, business profiles, About tabs, media and contact form.
- `overview.js`: Overview story, mission, vision, QRICE, impact figures, awards and certificate previews.
- `motion.js`: GSAP entrance and scroll animations, including reduced-motion handling.
- `assets/`: supplied logo, hero artwork, and original Figma photographs and certificate images.
- `vendor/`: locally bundled GSAP and ScrollTrigger. Preserve their license headers.

Use VS Code's Format Document command to format files to your preference.

## Main page addresses

- `/#/` — Home
- `/#/about` — About / Overview
- `/#/ecosystem` — Company and brand portfolio
- `/#/media` — Media Center
- `/#/careers` — Careers
- `/#/contact` — Contact

## Current prototype behavior

The contact form simulates submission; it does not send or store enquiries. CMS, recruitment processing, Telegram and email delivery are not implemented. The company profile supports English and Khmer; other content remains English. Editorial sample content and facts awaiting confirmation are identified in the interface. Some photos and Google Fonts load from external URLs and require an internet connection.

This export is independent of Sites hosting and contains no hosting credentials. Local edits do not automatically update the hosted prototype. Keep a backup or place the folder under your own Git version control before making substantial changes.
