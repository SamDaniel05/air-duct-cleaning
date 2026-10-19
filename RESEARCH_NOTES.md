# Airduct Website Research Notes

Research date: 19 October 2026
Scope: public duct-cleaning and HVAC service websites, example roundups, and commercial templates. This is a representative benchmark, not an exhaustive crawl of every website on the internet. Pages were inspected through accessible public page text and listing details; a blocked or incomplete page is noted implicitly by not treating it as evidence.

## Direct service-business references

### DUCTZ — https://www.ductz.com/
- The main navigation distinguishes air ducts, HVAC restoration, dryer vents, indoor air quality, locations, reviews, team, before/after photos, and request service.
- The home page ties service categories to specific problems and has a direct request-service action.
- The “Why DUCTZ?” section explains standards, methods, before/after documentation, and pricing expectations.
- Takeaway: explain the actual job and what proof a customer can expect. Do not borrow claims about training, certifications, guarantees, or checklist counts unless Airduct can substantiate them.

### Pristine Air Duct Cleaners — https://pristineairductcleaners.com/
- Opens with a direct local service proposition and a free-estimate CTA.
- Services are clearly differentiated (duct cleaning, dryer vent cleaning, duct repair, sanitation, crawlspace services).
- A step-by-step process explains inspection, preparation, cleaning, quality check, and handoff.
- It foregrounds real customer feedback and job photos.
- Takeaway: make the service and estimate action obvious; explain the sequence of work. Airduct must not copy Pristine's reviews, ratings, credentials, location-specific claims, prices, guarantees, or service promises.

### Air Central — https://aircentralusa.com/our-work/
- Its work gallery is categorized by service and includes technician-at-work imagery, equipment, duct interiors, and before/after documentation.
- The photo captions identify what each image shows rather than using generic decorative labels.
- Takeaway: service photography should demonstrate actual duct cleaning, inspection, equipment, or a real worksite—not generic construction scenes or unrelated interior design photos. Any claimed before/after must show the same area and be a genuine documented job.

### Aircor Heating & Cooling — https://www.aircorheatingcooling.com/
- Clear phone/contact path, concise introductory service explanation, and an appointment CTA.
- Combines residential and commercial service language with technician/equipment imagery.
- Takeaway: practical navigation and direct contact are useful; Airduct should avoid unrelated HVAC scope creep.

### ACAPS — https://acapsltd.co.uk/
- Separates ventilation from heating, air conditioning, and electrical work; has an explicit quote action.
- Explains commercial ventilation work in practical terms and gives a clear contact path.
- Takeaway: the commercial concept should communicate building/ventilation competence and service scope, not simply use a dark theme and technical buzzwords.

## Template and curated-example references

### HVACiFlow, Webflow Marketplace — https://webflow.com/templates/html/hvaciflow-website-template
- Template page lists home, about, service CMS, commercial, residential, team, booking, blog, and contact pages.
- Designed to support multiple home-service categories and a full service-site information architecture.
- Takeaway: complete information architecture is useful; a generic multipurpose template's visual patterns are not a suitable finished art direction by themselves.

### ThemeForest HVAC template catalogue — https://themeforest.net/search/hvac
- Broad catalogue with WordPress, HTML, template-kit, and other offerings; many center on generic HVAC installation/repair.
- Takeaway: template availability is not evidence of design quality or relevance. Avoid copying common blue-gradient, icon-card, and oversized-heading conventions by default.

### Webflow HVAC template search — https://templates.webflow.com/search/hvac
- Broad home-services and HVAC template catalogue with light/dark, minimal/modern, and one-page/multipage filters.
- Takeaway: evaluate each design for the actual duct-cleaning service and content, not category labels alone.

### Site Builder Report — https://www.sitebuilderreport.com/inspiration/hvac-websites
- Highlights consistency, mobile usability, clear contact paths, scannable service details, team photography, real reviews/credentials, and job examples.
- Examples discussed include Paragon Mechanical, 911 HVAC, Aircor, Stott HVAC, DASH, and other regional contractors.
- Takeaway: trustworthy local context and readable service information matter more than decorative effects.

### Housecall Pro — https://www.housecallpro.com/resources/hvac-website/
- Emphasizes clear CTAs, real team imagery, mobile performance, local service pages, and a working booking/contact flow.
- Takeaway: conversion paths must be functional and contact information must be real before launch. The current Airduct estimate form remains demo-only until connected to a submission service.

### Zarla HVAC inspiration — https://www.zarla.com/inspiration/hvac
- Discusses immediate estimate/contact capture, clear local context, and real technician photography.
- Takeaway: the hero should quickly answer “what service is this?”, “is this for my property?”, and “how do I ask for an estimate?”

## Research conclusions translated into implementation

1. **Relevant first-screen visual:** replaced the construction-site hero image with HVAC/technical-work image assets. These remote stock assets still need a final visual and licensing check before production; the strongest final choice is Airduct-owned photography of an actual technician accessing ductwork, cleaning a register, inspecting duct interiors, or using extraction equipment.
2. **Shorter service-led headlines:** reduced the hero copy to direct, scannable propositions instead of abstract multi-line statements.
3. **Less ornamental styling:** removed the decorative hero border, floating index, redundant icon decoration, orbit rings, and circular flourishes from the main visual hierarchy. Reduced headline scale and card framing.
4. **Different art directions:** Architectural remains restrained and editorial; Airflow Lab uses a dark technical treatment; Clear Living uses a softer residential composition; Field Notes uses an editorial serif headline and reverses the hero composition. These are differentiated layout treatments within a shared content system, not four separate codebases.
5. **No unsupported social proof:** the reviews section explains that verified customer feedback must be supplied instead of fabricating names, quotes, ratings, or credentials.
6. **Real service details before promises:** service descriptions and FAQs explain scope, access, worksite handling, and variation by system; they avoid guaranteed medical outcomes.
7. **Estimate actions:** the estimate CTA remains visible in the navigation, hero, service entries, and other relevant points. The form explicitly discloses that no message is sent until a backend/form service is connected.
8. **Image uniqueness:** image references are audited for reuse in the app source; each placement should have its own unique asset. URL uniqueness alone does not guarantee that a photo is relevant, authentic, licensed, or visually suitable.

## Known implementation limitations at the end of this pass

- No browser screenshot or successful local production build was available during this implementation pass. Do not describe the changes as visually verified or production-ready.
- The Unsplash image URLs have not all been visually opened one by one. Before final approval, inspect every photo in the running site and replace any generic/irrelevant images with properly licensed service-specific assets.
- The form still needs a real submission integration; do not use the current demo as a live lead-capture form.
- Business-specific location, phone number, operating hours, certifications, review sources, guarantees, and actual job photos must be supplied/verified before production.
