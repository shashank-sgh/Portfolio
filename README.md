# Shashank Kumar Singh · Portfolio

I’m a computer science student in Bangalore interested in full-stack development and AI/ML. This portfolio brings together my projects, technical skills, resume and contact information.

## Featured project

**Workora** is a team hackathon prototype that helps informal and semi-skilled workers discover nearby jobs. The case study describes the problem, the React and Tailwind CSS frontend, and proposed integrations for regional-language voice search, job matching, location and worker verification.

## Tech stack

- Next.js App Router, React and TypeScript
- SCSS for responsive layouts and light and dark themes
- GSAP, Lenis and Three.js for motion and the hero background
- Cloudflare Workers and R2 for hosted contact submissions
- Playwright for desktop and mobile browser tests

## Run locally

Install Node.js 22 or newer. Run these commands from the repository root.

```bash
npm ci
npm run build
npm run dev
```

Open [https://portfolio-1igw.vercel.app/](https://portfolio-1igw.vercel.app/). The local preview saves contact submissions as JSON in `.local-inbox/enquiries/`. Use `npm run dev:next` for live reload while editing the interface.

## Update the portfolio

| What to change | Where to edit |
| --- | --- |
| Profile details, skills, social links and project content | `data/profile.ts` |
| Homepage sections and copy | `app/page.tsx` |
| Global styles and hero layout | `app/style.scss` and `app/hero.module.scss` |
| Portraits and project images | `public/assets/` |
| Downloadable resume | `public/resume.pdf` |
| Contact form and submission handler | `components/ContactForm.tsx` and `worker/contact.mjs` |

## Checks

```bash
npm run typecheck
node --test tests/contact.test.mjs
npx playwright install chromium webkit
npm test
```

Run the production build before the browser tests.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to your deployed URL before building so metadata and sitemap links point to the correct domain. The build creates static pages in `out/` and a Cloudflare module Worker at `dist/server/index.js`.

For a deployment with contact submissions, deploy the Worker and bind a private R2 bucket as `BUCKET`. A static host can serve `out/` and needs a separate `POST /api/contact` endpoint to accept messages.

## Connect

[GitHub](https://github.com/shashank-sgh) · [LinkedIn](https://www.linkedin.com/in/shashank-kumar-singh-291a30441/)
