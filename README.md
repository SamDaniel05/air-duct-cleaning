# Airduct — Four Landing Page Concepts

A React + Vite + TypeScript workspace for four full-length Airduct landing-page directions:

- `/architectural` — warm, architectural editorial direction
- `/airflow-lab` — dark, technical direction
- `/clear-living` — bright, residential direction
- `/field-notes` — bold, editorial direction

Each concept contains a full single-page journey: hero, About Airduct, why duct cleaning matters, services, Why Airduct, process, service standards, customer feedback, FAQs, estimate/contact form, and footer.

## Run locally

```bash
npm install
npm run dev
```

## Included

- Bespoke inline Airduct airflow mark for the header, footer and contact panel.
- Distinct photography for each image placement.
- More image-led opening sections, larger typography, richer supporting content and estimate calls to action throughout.
- Responsive navigation and layouts, accessible FAQ accordion, and reduced-motion support.
- GSAP/ScrollTrigger reveal foundation.
- One Inter font family across the experience.

## Important before production

- The estimate form currently validates in the browser only. Connect a backend or form service before using it to receive enquiries.
- Customer reviews are intentionally not fabricated; add approved, verified testimonials when available.
- Images are loaded from remote Unsplash URLs and require an internet connection.
- Verify image relevance/licensing, business service claims, contact details, accessibility, and production build before launch.
- The four concepts share content and functional components but use separate visual themes. Select a direction in the top selector to compare them.
