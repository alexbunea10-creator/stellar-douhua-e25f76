# AGENTS.md

Architecture notes for the Orlando the Martyr LLC website. Read alongside `README.md`.

## Overview

Editorial marketing site for an independent music company in Wildwood, NJ. TanStack Start (SSR) +
React 19 + Tailwind 4, deployed on Netlify. Static content only — no database.

## Directory structure

```
public/
  __forms.html            # Build-time Netlify Forms registration (both forms). Do not delete.
  img/                    # Generated concept imagery, served through the Netlify Image CDN
src/
  components/
    SiteHeader.tsx        # Sticky header + full-screen mobile sheet
    SiteFooter.tsx        # Footer with nav, socials, trust notes, company/artist distinction
    BookingRequest.tsx    # 5-step request-to-book flow for the mobile studio
    ContactForm.tsx       # General inquiry form
    Reveal.tsx            # IntersectionObserver fade+rise — the only motion pattern on the site
    Bits.tsx              # SectionHead, ConceptNote, Tag, Placeholder
    ui.ts                 # Shared class strings (buttons, fields, page shell width)
  data/                   # All copy and content: company, artists, studio, events
  lib/img.ts              # Netlify Image CDN url + srcSet helpers
  routes/                 # File-based routes; artists/$artistSlug.tsx is the profile page
  styles.css              # Tailwind theme tokens, editorial type classes, reveal animation
scripts/
  generate-images.mjs     # One-off concept image generation via Netlify AI Gateway (already run)
```

## Conventions

- **Content lives in `src/data/`**, never inline in components. Adding an artist means adding an
  object to `artists.ts`; the grid, profile route and cross-links follow automatically.
- **Class tokens over one-off styling.** Reuse `btnSolid` / `btnOutline` / `btnOnDark` /
  `btnOnDarkOutline` / `field` / `shell` from `components/ui.ts`.
- **Typography classes** `h-display` (tight editorial headline), `h-editorial` (serif), `eyebrow`
  (uppercase label) are defined in `styles.css`. Colors use the theme tokens `ink`, `ink-soft`,
  `paper`, `paper-dim`, `silver`, `hairline`.
- **Images** always go through `img()` / `imgSet()` so originals are never shipped. Every concept
  photo must be accompanied by `<ConceptNote />`.
- **Motion** is limited to `<Reveal>`. No new animation libraries or scroll effects.

## Non-obvious decisions

- **Netlify Forms + SSR.** Forms are registered in `public/__forms.html` and submitted by `fetch`
  to `/__forms.html` — posting to `/` is swallowed by the SSR function and the submission is lost.
  Field names in the React forms must match that file exactly. `node scripts/enable.cjs` from the
  `netlify-forms` skill has already been run for this site.
- **Request-to-book, not instant booking.** `BookingRequest.tsx` shows an estimate and a 50%
  deposit figure but never takes payment; the deposit is collected out-of-band after confirmation.
  If a booking/payment platform is added later, integrate it — do not build card processing here.
- **Company vs. artist identity.** "Orlando the Martyr LLC" (company) and "Orlando the Martyr"
  (Orlando Ruiz's artist project) are deliberately presented as separate identities — on the header
  lockup, the About founder section and the footer. Keep that separation in any new copy.
- **Roster language is legally careful.** Roles are "Founder / Artist", "Collaborating Artist" and
  "Creative Partner" — never "signed artist". Releases marked `placeholder: true` render a "Pending
  approval" badge; only artist-approved releases should ever appear without it.
- **Accent colors** are per-artist (`artist.accent`) and applied by inline style, pulled from each
  artist's photography.
- **Placeholder slots** for merchandise, event galleries and add-on services exist in the layout so
  they can be enabled without a redesign.
