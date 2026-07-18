# Ava & Noah — Wedding Invitation

An elegant, minimal wedding invitation site built with Next.js 14 (App Router),
TypeScript, and Tailwind CSS. Guests land on a sealed envelope; tapping the wax
seal opens it into the full invitation — names, story, schedule, a live
countdown, a photo gallery, and an RSVP form.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Everything you need to edit lives in one file

Open `lib/config.ts`. That's it — names, wedding date, venue, your story,
the schedule, gallery captions, registry link, RSVP deadline, and contact
email are all there. Nothing else needs to change for day-to-day content
edits.

## Adding real photos

Drop your images into `public/gallery/` (matching the filenames in
`lib/config.ts`, or update the paths). Then in `components/Gallery.tsx`,
replace the placeholder `<div>` with:

```tsx
import Image from "next/image";

<Image src={img.src} alt={img.alt} fill className="object-cover" />
```

## Connecting the RSVP form

`app/api/rsvp/route.ts` currently just logs submissions to your server
console — it won't send you anything by default. Pick one:

- **Easiest:** skip the API route and point `rsvp.endpoint` in
  `lib/config.ts` at a [Formspree](https://formspree.io) or
  [Getform](https://getform.io) URL. Both give you a hosted endpoint and
  email you every submission, no backend code required.
- **Email yourself:** wire `app/api/rsvp/route.ts` up to
  [Resend](https://resend.com) or Postmark.
- **Spreadsheet:** use the Google Sheets API or a bridge like
  [Sheet.best](https://sheet.best).

## Design notes

- Palette: bone linen paper, deep pine green, and a soft brass gold —
  chosen to avoid the generic "AI wedding site" look (no cream + terracotta,
  no dark-mode neon).
- Type: Fraunces (display/italic) paired with Inter (body/utility).
- Signature interaction: the sealed envelope on load. Click/tap the wax
  seal to open it. Respects `prefers-reduced-motion`.
- The countdown, RSVP form, and envelope are client components; everything
  else renders as a server component for a fast first paint.

## Deploying

The fastest path is [Vercel](https://vercel.com/new) — connect the repo and
it deploys automatically. Any Node host that supports Next.js works too
(`npm run build && npm run start`).
