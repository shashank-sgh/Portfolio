# Shashank Kumar Singh — Engineering portfolio

A responsive Next.js App Router portfolio for an AI/ML student in Bangalore. Workora is the featured team project. The site includes a case study, two optimized supplied portraits, a short résumé generated from the supplied biography, a persistent theme preference and a private enquiry form.

## Run locally

Use Node 22 or newer. Run `npm ci`, then `npm run build`, then `npm run dev`. Open http://localhost:3000. This production preview serves the complete site and writes form submissions as JSON records in the ignored .local-inbox/enquiries folder. For fast interface editing use `npm run dev:next`; use the production preview to exercise the form.

## Edit

- Update personal information, social links, skills, achievements and project records in data/profile.ts. Empty achievements stay hidden. Each project record generates its own static case study. Keep team contributions and planned features identified.
- Update narrative sections and calls to action in app/page.tsx and components/ContactForm.tsx. Revise the handwritten résumé and profile summary when changing the supplied facts.
- Replace public/assets/hero-cutout.webp with a transparent portrait and public/assets/about.webp with a landscape headshot. Replace public/resume.pdf with the official résumé when available.
- Edit global colors, layouts, responsive navigation and contrast in app/style.scss. The hero uses app/hero.module.scss.
- Update public/llms.txt and public/profile.md when publishing new material. Set NEXT_PUBLIC_SITE_URL before building on another domain, to regenerate absolute metadata and the sitemap.

## Creative direction

The opening juxtaposes an authentic full-color portrait with a violet wireframe orbit. Project discovery follows immediately, then the reader meets the student behind the work. The orbit is an original visual interpretation of the human/computation theme. Navigation has no name-based brand mark. Motion is progressive and the HTML remains readable with WebGL disabled. The small-screen layout keeps the identity, biography and contact actions in document order.

GSAP and ScrollTrigger handle entrance motion, Lenis handles scrolling, and a lazy Three.js shader renders on wide screens with motion enabled. Reduced-motion preference avoids these enhancements. Web Vitals are recorded locally as Performance API marks named portfolio:LCP, portfolio:INP and portfolio:CLS; no tracking endpoint is configured.

## Contact and deployment

The hosted Worker handles POST /api/contact, validates input and writes a private JSON record to the BUCKET object-storage binding under enquiries/. It returns success only after storage confirms the write. No visitor endpoint lists stored messages. Email notifications are not configured.

The standard build generates out/ for the static Next.js pages and dist/server/index.js for the complete Worker, including the assets and form handler. Deploy dist/server/index.js as a Cloudflare module Worker with an R2 binding named BUCKET, or use the configured Sites deployment. A static-only host needs a separate implementation of POST /api/contact. The local preview uses filesystem storage for development.

## Checks

Run `npm run typecheck`, `node --test tests/contact.test.mjs` and `npm run build`. For browser tests, install the Playwright Chromium and WebKit engines with `npx playwright install chromium webkit`, then run `npm test` after building. Test forms against a development instance only. Social URLs come from the supplied brief. No public follower counts, corporate roles, credentials or unverified repositories are asserted.

### Recorded verification

The production build and strict TypeScript check passed. Three contact-handler tests covered valid storage, invalid email and storage failure. Six browser tests passed in headless Chromium at 1366×900 and 390×844, including case-study navigation, theme switching, horizontal overflow and submitting a contact message into local development storage. Both viewports had zero horizontal overflow. First Contentful Paint measured 348 ms on desktop and 260 ms at mobile width in a single local run without network or CPU throttling. These are local measurements. WebKit/Safari and field performance were not verified.
