# Orlando the Martyr LLC

Editorial-style website for **Orlando the Martyr LLC**, an independent music and creative company
based in Wildwood, New Jersey.

> Built in South Jersey. Driven by independent music.

## What's in the site

| Route | Page |
|-------|------|
| `/` | Home — hero, company intro, featured artist and releases, mobile studio preview, upcoming events |
| `/about` | Our Story — company origin story, the four lanes of work, founder section |
| `/artists` | Artists & Partners — roster grid with collaboration/ownership notes |
| `/artists/$artistSlug` | Individual profiles for Orlando the Martyr, YxngJj, Iceymac and Yari |
| `/studio` | OTM Mobile Studio — pricing, exclusions, policies and the request-to-book flow |
| `/events` | Upcoming and past events, plus the Jersey Club & Latin Night series placeholder |
| `/contact` | General inquiry form, collaboration/business note, social links |

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start (SSR) |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 (design tokens in `src/styles.css`) |
| Forms | Netlify Forms |
| Images | Netlify Image CDN |
| Language | TypeScript (strict) |
| Hosting | Netlify |

## Running locally

```bash
npm install
netlify dev --port 8889   # recommended: emulates Netlify Forms + Image CDN
# or
npm run dev               # plain Vite dev server on :3000
```

Form submissions only work on a Netlify deploy (or under `netlify dev`); they are not captured by
the plain Vite server.

## Content you can edit without touching components

All copy and data live in `src/data/`:

- `company.ts` — tagline, story, emails, navigation, trust/ownership notes
- `artists.ts` — roster, roles, bios, accent colors, releases, connect links
- `studio.ts` — services, prices, exclusions, policies, deposit rate
- `events.ts` — event rows and the upcoming series

## Before launch

- Replace the concept imagery in `public/img/` with each artist's approved promotional photography
  (every concept image already carries the required disclaimer).
- Swap the placeholder release rows in `artists.ts` for artist-approved releases, and fill in the
  Spotify / Apple Music / Instagram URLs (they render as "link pending" until set).
- Confirm the studio rates, service radius and policy wording.

## Structured for later, not built yet

Artist merchandise, mixing/production add-on services, and an event photo gallery / news feed each
have a placeholder slot in the layout so they can be switched on without a redesign. Connecting the
booking request to a real booking/payment platform is the other future step — the flow deliberately
collects a request and never processes payment on-site.
