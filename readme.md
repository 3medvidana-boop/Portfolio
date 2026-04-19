# Portfolio — Anastasiia Medvid

## Goals

- Build a scalable, component-driven portfolio site
- Maintain clean separation between structure, styles, and logic
- Provide a component showcase page for visual QA and development

## Pages

| Page | File | `<title>` | Purpose |
|------|------|-----------|---------|
| Home | `index.html` | Portfolio Anastasiia Medvid, UX/UI Designer | Main portfolio page |
| Case 1 | `pages/case1.html` | HR Tool Redesign — Anastasiia Medvid | Project case page (HR B2B) |
| Case 2 | `pages/case2.html` | Prompt Marketplace — Anastasiia Medvid | Project case page (Prompt Marketplace) |
| Case 3 | `pages/case3.html` | AI Hotel Management — Anastasiia Medvid | Project case page (AI Hotel Management) |
| Components | `pages/components.html` | Components — Showcase | UI component showcase / sandbox |

## Project Structure

```
Portfolio/
├── index.html                  # Index Blog page
├── pages/
│   ├── case1.html              # Project case page
│   ├── case2.html              # Project case page
│   ├── case3.html              # Project case page
│   └── components.html         # Component showcase / sandbox
├── assets/
│   ├── icons/                  # SVG icon set
│   ├── images/                 # All raster and vector images
│   └── videos/                 # Case-page video walkthroughs (mp4)
├── css/
│   ├── main.css                # Entry point — imports only
│   ├── base/
│   │   ├── reset.css           # Reset / normalize (min-width: 375px)
│   │   ├── variables.css       # Design tokens (CSS custom properties)
│   │   ├── breakpoints.css     # Breakpoint reference
│   │   └── typography.css      # Font-face & base type
│   ├── components/             # One file per component
│   │   ├── header.css
│   │   ├── hero.css
│   │   ├── competences.css
│   │   ├── projects.css
│   │   ├── services.css
│   │   ├── workflow.css
│   │   ├── email.css
│   │   ├── footer.css
│   │   ├── contact-overlay.css
│   │   ├── resume-overlay.css
│   │   ├── case-hero.css
│   │   ├── bullet-list.css
│   │   ├── content-blocks.css
│   │   ├── image-zoom.css
│   │   ├── image-carousel.css
│   │   ├── video-player.css
│   │   ├── more-projects.css
│   │   └── grid-overlay.css
│   └── pages/                  # Page-specific overrides
├── js/
│   ├── main.js                 # Entry point
│   └── components/             # JS per component
│       ├── competences.js
│       ├── projects.js
│       ├── services.js
│       ├── footer.js
│       ├── header-menu.js
│       ├── contact-overlay.js
│       ├── resume-overlay.js
│       ├── case-hero.js
│       ├── image-zoom.js
│       ├── image-carousel.js
│       ├── video-player.js
│       └── grid-overlay.js
├── components/                 # Component HTML partials + reference docs
│   ├── components.md           # Component inventory, properties, creation guide
│   ├── header.html             # Site header partial
│   ├── hero.html               # Hero section partial
│   ├── content-block.html      # Base titled block + divider
│   ├── content-block-media.html# Image preview + zoom trigger
│   ├── video-player.html       # Poster preview + fullscreen video overlay
│   ├── email.html              # Reusable email/contact CTA section
│   ├── more-projects.html      # Two-card "More projects" section
│   └── grid-overlay.html       # Dev grid overlay partial
└── readme.md
```

## Principles

1. **Component-based** — each UI element lives in its own HTML partial, CSS file, and (if needed) JS file
2. **No framework** — vanilla HTML / CSS / JS
3. **Scalable structure** — adding a new component means adding files in `components/`, `css/components/`, and optionally `js/components/`
4. **Showcase-driven** — every component is rendered on the Components page for isolated review
5. **Desktop-first** — `max-width` media queries, four defined breakpoints
6. **Minimum width** — `body { min-width: 375px }` prevents content collapse below 375px

> **Component reference:** full inventory of all 18 components with BEM structure, state classes, JS contracts, breakpoints, and creation/implementation guide → [`components/components.md`](components/components.md)

---

## Breakpoints

| Label | Width | Trigger | Type |
|-------|-------|---------|------|
| Large desktop | 1920px | default | — |
| Desktop | 1440px | `@media (max-width: 1919px)` | fluid |
| Tablet transition | 1200px | `@media (max-width: 1200px)` | layout switch |
| Mobile | 834px | `@media (max-width: 834px)` | layout switch |
| Small mobile | 390px | — | fluid |

Additional breakpoints:

| Width | Purpose |
|-------|---------|
| 1440px | Workflow cards switch to single column (start at grid col 3) |
| 1334px | Footer nav cards stack vertically |
| 1266px | Projects "See all" switches to icon-only |

### Breakpoint Transition Flow

```
1920 ——fluid——> 1440 ——fluid——> 1200 ——SWITCH——> 834 ——SWITCH——> 390
 │                │                │                │               │
 desktop          desktop          tablet           mobile          mobile
 (large)          (small)          (layout change)  (layout change) (small)
```

---

## Grid System

| Breakpoint | Columns | Margin (left/right) | Gutter | Notes |
|------------|---------|---------------------|--------|-------|
| >= 1200px  | 6       | 90px                | 24px   | Full grid |
| 834-1199px | 4       | 60px                | 20px   | Cols 5-6 hidden |
| < 834px    | 2       | 20px                | 16px   | Cols 3-6 hidden |

---

## CSS Design Tokens

All tokens defined in `css/base/variables.css`. All component CSS files use these tokens — no hardcoded color, z-index, border-radius or transition values in components.

### Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-black` | `#000` | Primary text, backgrounds, buttons |
| `--color-white` | `#fff` | Backgrounds, text on dark |
| `--color-surface` | `#f7f7f7` | Video player bg, subtle backgrounds |
| `--color-black-08` | `rgba(0,0,0,0.08)` | Card borders, pill backgrounds |
| `--color-black-16` | `rgba(0,0,0,0.16)` | Borders, form fields |
| `--color-black-20` | `rgba(0,0,0,0.20)` | Dividers (content-blocks, bullet-list, case-hero) |
| `--color-black-60` | `rgba(0,0,0,0.60)` | Play button, zoom button, close button |
| `--color-black-85` | `rgba(0,0,0,0.85)` | Hover state for overlaid buttons |
| `--color-border` | `#EAEAEA` | Image carousel border, video-player border |
| `--color-accent-green` | `#6DF644` | Projects fill, pagination btn 1 + next |
| `--color-accent-mint` | `#55F8AF` | Projects pagination prev button |
| `--color-error` | `#E53935` | Form validation errors |

### Spacing Tokens

| Token | Value | Notes |
|-------|-------|-------|
| `--page-margin` | `90px` / `60px` / `20px` | Updates via media query at 1200px and 834px |
| `--section-gap-lg` | `120px` | Large section padding (projects bottom, email, more-projects) |
| `--section-gap-md` | `80px` | Medium section padding (mobile) |
| `--section-gap-sm` | `40px` | Small gaps (hint margin on mobile) |
| `--space-4` | `4px` | |
| `--space-8` | `8px` | |
| `--space-12` | `12px` | |
| `--space-16` | `16px` | |
| `--space-20` | `20px` | |
| `--space-24` | `24px` | |

### Border-radius Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `4px` | Resume overlay download button |
| `--radius-md` | `8px` | Pills, image-zoom pan buttons |
| `--radius-full` | `50%` | All circular buttons and markers |

### Transition Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--transition-fast` | `0.2s ease` | Video/image button hover states |
| `--transition-base` | `0.3s ease` | General hover transitions (arrows, backgrounds) |
| `--transition-slow` | `0.5s ease` | (available, not currently used) |
| `--transition-panel` | `0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Contact overlay slide-in, header menu |
| `--transition-spring` | `0.6s cubic-bezier(0.34, 1.56, 0.64, 1)` | Hero nav label/arrow, footer back icon |

### Z-index Tokens

| Token | Value | Layer |
|-------|-------|-------|
| `--z-header-menu` | `99` | Mobile menu overlay |
| `--z-header` | `100` | Sticky header |
| `--z-overlay` | `200` | Contact overlay |
| `--z-modal` | `1000` | Video player + image zoom fullscreen |
| `--z-resume` | `1001` | Resume overlay (above modal) |
| `--z-dev-grid` | `9999` | Dev grid overlay |

### Typography Tokens

Mobile overrides at `@media (max-width: 834px)`.

#### `--h1-*`

| Property | Desktop (>= 835px) | Mobile (<= 834px) |
|----------|--------------------|--------------------|
| font-family | `"Roboto", sans-serif` | `"Roboto", sans-serif` |
| font-size | 64.6px | 36px |
| font-weight | 600 | 600 |
| line-height | 68px | 36px |
| letter-spacing | -0.969px | -0.5px |
| color | `var(--color-black)` | `var(--color-black)` |

**Used in:** `h1` (global), `.hero__title`, `.projects__title`

#### `--h2-*`

| Property | Desktop (>= 835px) | Mobile (<= 834px) |
|----------|--------------------|--------------------|
| font-family | `"Roboto", sans-serif` | `"Roboto", sans-serif` |
| font-size | 57px | 36px |
| font-weight | 600 | 600 |
| line-height | 64px | 36px |
| letter-spacing | -0.855px | -0.5px |
| color | `var(--color-black)` | `var(--color-black)` |

**Used in:** `h2` (global), `.competences__title`, `.services__title`, `.workflow__title`, `.email__greeting`, `.email__name`, `.footer__name`

#### `--h3-*`

| Property | Desktop (>= 835px) | Mobile (<= 834px) |
|----------|--------------------|--------------------|
| font-family | `"Roboto", sans-serif` | `"Roboto", sans-serif` |
| font-size | 36px | 24px |
| font-weight | 600 | 600 |
| line-height | 36px | 135% |
| letter-spacing | -0.5px | normal |
| color | `var(--color-black)` | `var(--color-black)` |

**Used in:** `h3` (global), `.competences__card-title`, `.projects__case-title`, `.services__card-title`, `.workflow__card-title`

#### `--body-*`

| Property | Desktop (>= 835px) | Mobile (<= 834px) |
|----------|--------------------|--------------------|
| font-family | `"Roboto", sans-serif` | `"Roboto", sans-serif` |
| font-size | 28px | 19px |
| font-weight | 400 | 400 |
| line-height | 34px | normal |
| letter-spacing | normal | -0.6px |
| color | `var(--color-black)` | `var(--color-black)` |

**Used in:** `body` (global), `.hero__subtitle`, `.competences__card-body`, `.projects__case-body`, `.projects__page-btn`, `.email__cta-text`, `.footer__role`

#### `--hint-text-*`

| Property | Desktop (>= 835px) | Mobile (<= 834px) |
|----------|--------------------|--------------------|
| font-family | `"Roboto", sans-serif` | `"Roboto", sans-serif` |
| font-size | 22px | 16px |
| font-weight | 400 | 400 |
| line-height | 34px | 28px |
| color | rgba(0, 0, 0, 0.70) | rgba(0, 0, 0, 0.70) |

**Used in:** `.competences__hint`, `.services__hint`, `.workflow__hint`, `.email__subtitle`

#### `--button-text-*`

| Property | Desktop (>= 835px) | Mobile (<= 834px) |
|----------|--------------------|--------------------|
| font-family | `"Roboto", sans-serif` | `"Roboto", sans-serif` |
| font-size | 36px | 24px |
| font-weight | 600 | 600 |
| line-height | 36px | 34px |
| letter-spacing | -0.5px | normal |
| color | `var(--color-black)` | `var(--color-black)` |

**Used in:** `.header__resume-label`, `.hero__nav-link`, `.hero__bottom-contact-label`, `.projects__see-all-label`, `.email__cta-label`, `.footer__nav-card`

---

## Icon Strategy

### Icon Sizes per Breakpoint

| Context | >= 1200px | < 1200px | < 834px |
|---------|-----------|----------|---------|
| Header resume arrow | 48x48 | 32x32 | 32x32 |
| Hero bottom contact arrow | 48x48 | 32x32 | 32x32 |
| Projects "See all" arrow | 48x48 | 48x48 | 32x32 |
| Email "Contact me" icon | 48x48 | 32x32 | 32x32 |
| Footer back icon | 48x48 | 48x48 | 32x32 |

### Icon Color Strategy

Single SVG source (`icon-arrow-right.svg`, fill: `#000000`) used in two color contexts:

| Context | Visual color | CSS method |
|---------|-------------|------------|
| Hero nav buttons | black (#000) | No filter (default) |
| Header resume arrow | white (#FFF) | `filter: invert(1)` |
| Hero bottom contact arrow | white (#FFF) | `filter: invert(1)` |
| Projects "See all" arrow | white (#FFF) | `filter: invert(1)` |
| Email "Contact me" icon | white (#FFF) | `filter: invert(1)` |
| Footer back icon | black (#000) | No filter (default, on white bg) |

---

## Section Adaptation Schemes

### Header

| Property | >= 1200px | 834-1199px | < 834px |
|----------|-----------|------------|---------|
| Position | sticky, top: 0, z-index: var(--z-header) | same | same |
| Height | 90px | 90px | 60px |
| Home button | 90x90, logo56 | 90x90, menu icon 48x48 | 60x60, menu icon 32x32 |
| Name font | 68px inline | 36px stacked | 24px stacked |
| Role font | 36px inline | 24px stacked | 16px stacked |
| Email button | 90x90 visible | hidden | hidden |
| Resume button | 370x90, label + arrow | 316x90, label 32px | 60x60, icon only 32x32 |
| Menu overlay | hidden | enabled (slide-in) | enabled (slide-in) |
| Background | image-header-background.svg | same | same |

---

### Hero Section

#### 1920px — Desktop (large)

```
+------+----------------+----------+----------+
| P1   | P2             | P3       | P4       |
| 90px | 1fr            | 596px    | 370px    |
|      |                |          |          |
| grad | ticker         | hero-    | nav      |
| strip| H1 + subtitle  | circle   | buttons  |
|      |                | 596x900  |          |
+------+----------------+----------+----------+
| cyan | Contact me     | hero-circle-bottom  |
| 90x90| 90px           | 90px                |
+------+----------------+---------------------+
height: 990px
grid: 90px 1fr 596px 370px / 1fr 90px
```

#### 1440px — Desktop (small) `@media (max-width: 1919px)`

```
+------+----------------+--------+----------+
| P1   | P2             | P3     | P4       |
| 90px | 1fr            | 372px  | 370px    |
|      |                |        |          |
| grad | ticker         | hero-  | nav      |
| strip| H1 + subtitle  | circle | buttons  |
|      |                | 372x776|          |
+------+----------------+--------+----------+
| cyan | Contact me     | hero-circle-bottom|
| 90x90| 90px           | 90px              |
+------+----------------+-------------------+
height: 866px
grid: 90px 1fr 372px 370px / 1fr 90px
image: hero-circle1440.svg (via <picture>)
```

#### 1200px — Tablet `@media (max-width: 1200px)`

```
+------+----------------------+
| P1   | P2                   |
| 90px | ticker               |
|      | H1 + subtitle        |
| grad | (fills free space)   |
| strip+----------------------+
|      | P3                   |
|      | hero-circle1200      |
|      | cover, top left      |
|      | (auto height)        |
|      +----------------------+
|      | Contact me           |
|      | 90px                 |
+------+----------------------+
height: calc(100vh - 90px)
grid: 90px 1fr / 1fr auto 90px
P4: hidden
Bottom left: hidden (P1 spans all rows)
Bottom visual: hidden
image: hero-circle1200.svg (via <picture>)
```

#### 834px — Mobile `@media (max-width: 834px)`

```
+----+----------------------+
| P1 | P2                   |
|60px| ticker               |
|    | H1 + subtitle        |
|grad| (fills free space)   |
|strip----------------------+
|    | P3                   |
|    | hero-circle1200      |
|    | cover, top left      |
|    | (auto height)        |
+----+----------------------+
|cyan| Contact me           |
|60px| 60px                 |
+----+----------------------+
height: calc(100vh - 60px)
grid: 60px 1fr / 1fr auto 60px
P4: hidden
P2 min-width: 330px
Bottom left: 60x60 cyan (visible)
```

#### Hero Panel 3 — Image Sizes

| Breakpoint | Image file | CSS width x height | object-fit |
|------------|------------|---------------------|------------|
| 1920px | hero-circle.svg | 596 x 900 | — (fixed) |
| 1440px | hero-circle1440.svg | 372 x 776 | — (fixed) |
| 1200px | hero-circle1200.svg | 100% x 100% | cover, top left |
| 834px | hero-circle1200.svg | 100% x 100% | cover, top left |

Image switching via `<picture>` + `<source media>`:
```html
<picture>
  <source media="(max-width: 1200px)" srcset="hero-circle1200.svg">
  <source media="(max-width: 1919px)" srcset="hero-circle1440.svg">
  <img src="hero-circle.svg">
</picture>
```

#### Hero Nav Button Hover Animation

```
Default:     [Label text          ]
              | hover
Hover:       [->  Label text      ]
              arrow appears (opacity 0->1, translateX -56->0)
              label shifts right (translateX 0->56px)
```

- Duration: **600ms**
- Easing: `var(--transition-spring)` = `cubic-bezier(0.34, 1.56, 0.64, 1)`
- Arrow: absolute positioned, slides in from left
- Label: shifts right by 56px

---

### Competences Section

#### Layout

| Property | >= 1200px | 834-1199px | < 834px |
|----------|-----------|------------|---------|
| Section padding-top | 24px | 24px | 24px |
| Header padding-left | 90px + 20px | 60px + 20px | 20px + 20px |
| Header padding-right | 90px | 60px | 20px |
| Hint margin-bottom | 64px | 64px | 40px |
| Title margin-bottom | 24px | 24px | 24px |

#### Cards

| Property | >= 1200px | 834-1199px | < 834px |
|----------|-----------|------------|---------|
| Container padding-left/right | 90px | 60px | 20px |
| Layout | flex-wrap, 2 columns | flex-direction: column | flex-direction: column |
| Card width | 50% | 100% | 100% |
| Card padding | 20px | 16px | 16px |
| Card gap | 16px | 8px | 8px |
| Card border | 1px solid var(--color-black-08) | same | same |
| Icon size | 120x120 | 120x120 | 120x120 |
| Chevron toggle | hidden | visible | visible |
| Body text | always visible | accordion (hidden by default) | accordion (hidden by default) |
| First card | — | `.is-open` by default (JS) | `.is-open` by default (JS) |

#### Bottom Visual

| Property | >= 1200px | 834-1199px | < 834px |
|----------|-----------|------------|---------|
| Height | 120px | 120px | 120px |
| Margin-top | 24px | 24px | 24px |
| Padding-left | 90px | 60px | 20px |
| Padding-right | `calc(90px + 1col + 1gutter)` | `calc(60px + 1col + 1gutter)` | `calc(20px + 1col + 1gutter)` |
| Ends at | 2nd-to-last column edge | 2nd-to-last column edge | 2nd-to-last column edge |

---

### Projects Section

#### Header

| Property | >= 1200px | 834-1199px | < 834px |
|----------|-----------|------------|---------|
| Layout | flex, single row | flex-wrap, may wrap | flex-wrap, may wrap |
| Height | 90px | auto | auto |
| Padding-left | 90px | 60px | 20px |
| Title-wrap width | 2.5 cols + 2 gutters | auto | auto |
| Title-wrap padding-left | 20px | 20px | 20px |

#### Pagination Buttons

| Property | >= 1200px | 834-1199px | < 834px |
|----------|-----------|------------|---------|
| Button size | 90x90 | 90x90 | 60x60 |
| Colors: prev | var(--color-accent-mint) | same | same |
| Colors: btn 1 | var(--color-accent-green) | same | same |
| Colors: btn 2 | #C095BF | same | same |
| Colors: btn 3 | #F1EC14 | same | same |
| Colors: next | var(--color-accent-green) | same | same |
| Number hover | bg var(--color-black), color white | same | same |
| Active state | bg var(--color-black), color white (JS) | same | same |
| Fill area bg | var(--color-accent-green) | same | same |

#### "See all" Button

| Property | >= 1267px | 1200-1266px | 834-1199px | < 834px |
|----------|-----------|-------------|------------|---------|
| Width | 370px + 90px padding | 90px + 90px padding | 90px + 60px padding | 60px |
| Height | 90px | 90px | 90px | 60px |
| Padding-right | 90px (= grid margin) | 90px | 60px | 0 |
| Label | visible | hidden | hidden | hidden |
| Background | var(--color-black) | same | same | same |
| Arrow | 48x48 | 48x48 | 48x48 | 32x32 |

#### Content

| Property | >= 1200px | 834-1199px | < 834px |
|----------|-----------|------------|---------|
| Layout | flex row | flex column | flex column |
| Padding-left | 90px | 0 | 0 |
| Preview width | `calc((100% - 90px) / 2)` | 100% | 100% |
| Preview min-width | 370px | auto | auto |
| Preview padding-left/right | 0 | 60px | 20px |
| Cases padding-left/right | 0 | 60px | 20px |
| Case order | — | cases first, preview second | cases first, preview second |

#### Case Cards (Desktop >= 1200px)

| Property | Case 1 | Case 2 | Case 3 | Case 4 |
|----------|--------|--------|--------|--------|
| margin-right | 90px | 150px | 210px | 270px |
| Background image | project-case1.svg | project-case2.svg | project-case3.svg | project-case4.svg |
| border-left | 4px solid transparent | same | same | none |
| Focused border-left | 4px solid var(--color-black) | same | same | — |
| Hover | bg var(--color-white), no image | same | same | disabled |
| Text | visible | visible | visible | `visibility: hidden` |

#### Case Cards (Tablet/Mobile <= 1200px)

| Property | Value |
|----------|-------|
| Display | only `.is-focused` visible |
| margin-right | 0 (no staircase) |
| Hover | disabled |
| Focused border-left | transparent |
| Body text | max 2 lines (`-webkit-line-clamp: 2`) |

#### Bottom Padding

| Breakpoint | padding-bottom |
|------------|---------------|
| >= 834px   | 120px |
| < 834px    | 80px |

---

### Services Section

#### Layout

| Property | >= 1200px | 834-1199px | < 834px |
|----------|-----------|------------|---------|
| Section padding | 24px top, 120px bottom | same | 24px top, 80px bottom |
| Header padding-left | 90px + 20px | 60px + 20px | 20px + 20px |
| Header padding-right | 90px | 60px | 20px |
| Hint margin-bottom | 64px | 64px | 40px |
| Title margin-bottom | 24px | 24px | 24px |

#### Cards Wrapper & Rows

| Property | >= 1200px | 834-1199px | < 834px |
|----------|-----------|------------|---------|
| Wrapper | `overflow: hidden` | same | same |
| Row direction | flex (horizontal) | flex-direction: column | flex-direction: column |
| Row 1 padding-left | 90px | 60px | 20px |
| Row 2 padding-left | 90px + 120px (staircase) | 60px | 20px |
| Row 3 padding-left | 90px + 240px (staircase) | 60px | 20px |
| Row padding-right | 90px | 60px | 20px |

#### Staircase Pattern (Desktop >= 1200px)

```
Row 1: |--90px--|[Card][Card]|--90px--|
Row 2: |--210px--|[Card][Card]|--90px--|
Row 3: |--330px--|[Card][Card]|--90px--|
         +120px per row
```

#### Staircase Pattern (Tablet 834-1199px)

```
|--60px--|[Card 1 (100%)]|--60px--|
|--60px--|--120px--|[Card 2 (100% - 120px)]|--60px--|
```

Each row becomes a column. 1st card is full width, 2nd card has 120px left offset.

#### Cards

| Property | >= 1200px | 834-1199px | < 834px |
|----------|-----------|------------|---------|
| Card width | 50% | 100% (1st), calc(100% - 120px) (2nd) | 100% |
| Card height | 240px | 240px | 240px |
| Card padding | 16px | 16px | 16px |
| Border | 1px solid var(--color-black-16) | same | same |
| Background-size | 100% 100% | 100% 100% | 100% 100% |
| Hover bg-size | 110% 110% (10% zoom) | 110% 110% | disabled (stays 100% 100%) |
| Gradient overlay | 48% height, white gradient | same | same (stays visible) |
| Hover overlay | opacity: 0 | opacity: 0 | disabled (stays opacity: 1) |
| 2nd card margin-left | 0 | 120px | 0 |
| Title position | bottom-left, max 2 lines | same | same |

#### Background Images

| Card | Image file |
|------|-----------|
| Product design | services-productDesign.svg |
| UX/UI design | services-uxUiDesign.svg |
| Prototyping | services-prototyping.svg |
| AI-driven | services-aiDrived.svg |
| Design systems | services-ds.svg |
| User tests | services-tests.svg |

#### Scroll-Driven Horizontal Movement (Desktop Only)

On viewports > 1200px, when the staircase pushes cards beyond the viewport, `services.js` applies a `translateX` based on scroll progress:

- Calculates overflow: `cards.scrollWidth - wrapper.clientWidth`
- Maps scroll progress (0-1) to `translateX(0 ... -overflow)`
- Moves cards right-to-left as user scrolls down
- Disabled on tablet/mobile (<= 1200px)

---

### Workflow Section

#### Layout

| Property | >= 1200px | 834-1199px | < 834px |
|----------|-----------|------------|---------|
| Section padding | 24px top, 120px bottom | same | 24px top, 80px bottom |
| Header padding-left | 90px + 20px | 60px + 20px | 20px + 20px |
| Header padding-right | 90px | 60px | 20px |
| Hint margin-bottom | 64px | 64px | 40px |
| Title margin-bottom | 24px | 24px | 24px |

#### Cards

| Property | > 1440px | 1200-1440px | 834-1199px | < 834px |
|----------|----------|-------------|------------|---------|
| Layout | grid 2 columns | single column | single column | single column |
| Cards padding-left | 90px | col 3 start (6-col grid) | col 2 start (4-col grid) | 20px |
| Cards padding-right | 90px | 90px | 60px | 20px |
| Card 1 + Card 3 | same row height | sequential 1-2-3-4-5 | sequential | sequential |
| Card 2 + Card 4 | same row height | — | — | — |
| Card 5 | col 2 only | — | — | — |

#### Single Card

| Property | Value |
|----------|-------|
| Padding | 20px |
| Border | top + bottom only, 1px solid var(--color-black-16) |
| Layout | flex row, number + text, gap 16px |
| Number | 32px circle, var(--color-black) bg, white text, 16px font |
| Cards 3-4-5 background | #E1F7FC |

#### Bottom Image

| Property | Value |
|----------|-------|
| Image | workflow-image.svg |
| Fixed size | 870 x auto (proportional) |
| Max width | 100% of container |
| Margin-top | 0px |
| Container padding | matches section margins (90px / 60px / 20px) |
| Responsive | shrinks proportionally when container < 870px |

---

### Email Section

#### Layout

| Property | >= 1200px | 834-1199px | < 834px |
|----------|-----------|------------|---------|
| Height | wraps content | wraps content | wraps content |
| Padding top/bottom | 120px | 120px | 80px |
| Content layout | flex row, gap 24px | flex row, gap 24px | flex column |
| Content padding-left/right | 90px | 60px | 20px |
| Background | email-big.svg (cover) | same | same |

#### Title Block (Left)

| Property | >= 1200px | 834-1199px | < 834px |
|----------|-----------|------------|---------|
| Width | 2 cols + 1 gutter (6-col) | 2 cols + 1 gutter (4-col) | 100% |
| Padding-left | 20px | 20px | 20px |
| Greeting | H2 | H2 | H2 |
| Avatar | 72x72, var(--radius-full) | same | same |
| Name | H2 | H2 | H2 |
| Subtitle | hint-text, 16px gap from name | same | same |

#### CTA Block (Right)

| Property | >= 1200px | 834-1199px | < 834px |
|----------|-----------|------------|---------|
| Text | body tokens | same | same |
| Image | email-small.svg, 100% width, 218px height, cover | same | same |
| Button position | absolute, top-right of image | same | same |
| Button width | 370px | 316px | full width (container query <=618px) |
| Button height | 90px | 90px | 60px |
| Button label | visible (all breakpoints) | visible | visible |
| Icon | icon-email.svg, 48x48 | 32x32 | 32x32, static (no animation) |
| Responsive (<= 618px) | — | button above image, full width | button above image, full width |

---

### Footer

#### Layout

| Property | Value |
|----------|-------|
| Background | var(--color-black) |
| Color | var(--color-white) |
| Content padding | 24px (all sides) |
| Content layout | flex row, gap 24px |
| Min gap between blocks | 24px |

#### Left Block

| Property | >= 834px | < 834px |
|----------|----------|---------|
| Gap between elements | 45px | 45px |
| Text gap | 8px | 8px |
| Back button size | 90x90 | 60x60 |
| Back button bg | var(--color-white) | same |
| Back icon | arrow-right rotated -90deg, black | same, 32x32 |
| Back hover | bounce animation (var(--transition-spring)) | same |
| Name | H2, white | H2, white |
| Role | body text, rgba(255,255,255,0.7) | same |
| LinkedIn icon | 32x32, `filter: invert(1)` | same |

#### Right Block (Nav Cards)

| Property | > 1334px | <= 1334px | <= 834px |
|----------|----------|-----------|---------|
| Layout | 2x2 grid | single column | single column |
| Card size | 290x190px | 290x82px | 100% x 82px |
| Text align | flex-start | center | under left block |
| Border | none | none | none |
| Font | button-text tokens, white | same | same |
| Hover | rgba(255,255,255,0.05) bg | same | same |

#### Copyright Container

| Property | Value |
|----------|-------|
| Background | #141414 |
| Padding | 8px 24px 24px 24px |
| Text | ©2026 Anastasiia Medvid. |
| Font | body tokens, white |

#### Back Button Behavior

- Smooth scrolls to `.hero` section on click
- JS in `js/components/footer.js`

---

### Contact Overlay

#### Opening / Closing

| Trigger | Action |
|---------|--------|
| Header email button (`.js-contact-open`) | Opens overlay |
| Hero "Contact me" button (`.js-contact-open`) | Opens overlay |
| Email section "Contact me" button (`.js-contact-open`) | Opens overlay |
| Menu email button (`.js-contact-open`) | Closes menu, opens overlay |
| Backdrop click | Closes overlay |
| Close button (icon-close) | Closes overlay |
| Escape key | Closes overlay |

#### Animation

| Property | Value |
|----------|-------|
| Panel slide-in | `transform: translateX(100%)` → `translateX(0)` |
| Transition | `var(--transition-panel)` |
| Backdrop | `opacity: 0` → `1`, same transition; `backdrop-filter: blur(12px)` added **only** on `.is-open` (iOS compositing fix) |
| Visibility | `visibility: hidden` / `pointer-events: none` → visible/auto |

#### Panel Width

| Breakpoint | Width | Grid position |
|------------|-------|---------------|
| > 1440px | col 3 start (6-col grid, 90px margin) | `calc(100% - 90px - 2col - 2gutter)` |
| <= 1440px | col 2 start (6-col grid, 90px margin) | `calc(100% - 90px - 1col - 1gutter)` |
| <= 1200px | col 2 start (4-col grid, 60px margin) | `calc(100% - 60px - 1col - 1gutter)` |
| <= 834px | 100% | full width |

#### Content Padding

| Breakpoint | Padding |
|------------|---------|
| > 1200px | 120px 90px 40px 90px |
| <= 1200px | 120px 60px 40px 60px |
| <= 834px | 60px 20px 40px 20px |

#### Close Button

| Breakpoint | Button size | Icon size |
|------------|-------------|-----------|
| > 1200px | 90x90 | 48x48 |
| <= 1200px | 90x90 | 32x32 |
| <= 834px | 60x60 | 32x32 |

- Position: same row as title, aligned right (`margin-left: auto`)
- Icon color: #000 (white SVG + `filter: invert(1)`)

#### Form Fields

| Field | Type | Name | Max length | Required |
|-------|------|------|------------|----------|
| Email | email | `email` | 254 | yes |
| Name | text | `name` | 100 | yes |
| Message | textarea | `message` | 500 | no |

#### Validation

| Check | Trigger | Error message |
|-------|---------|---------------|
| Email empty | blur, submit | "Email is required" |
| Email format | blur, submit | "Please enter a valid email address" |
| Email > 254 chars | input (live) | "Email must be 254 characters or less" |
| Name empty | blur, submit | "Name is required" |
| Name > 100 chars | input (live) | "Name must be 100 characters or less" |
| Message > 500 chars | input (live) | "Message must be 500 characters or less" |

- Error state: border `var(--color-error)`, error text `var(--color-error)` 12px below input
- Errors clear on input when value returns within limits

#### Form Submission (Formspree)

| Property | Value |
|----------|-------|
| Endpoint | `https://formspree.io/f/xvzvbadp` |
| Method | POST via `fetch`, `Accept: application/json` |
| Sending state | submit button `opacity: 0.6`, `pointer-events: none` |
| Success state | form hides, shows "Thank you!" + "Send one more" button |
| Error handling | Formspree errors or network errors shown under email input |
| "Send one more" | resets form, clears errors, scrolls panel to top |

#### Submit Button

| Breakpoint | Height | Arrow |
|------------|--------|-------|
| > 834px | 90px | 48x48 |
| <= 834px | 60px | 32x32 |

#### Image

| Property | Value |
|----------|-------|
| Source | email-image.svg |
| Max height | `120px` (all breakpoints) — keeps the form fully visible without scroll by default |
| Fit | `object-fit: contain`, `object-position: left top` — proportional scale, no crop |

---

### Resume Overlay

`css/components/resume-overlay.css` + `js/components/resume-overlay.js`. Clicking the Resume button in any header opens a fullscreen overlay with an embedded Google Doc preview and a "Download PDF" button.

| Property | Value |
|----------|-------|
| z-index | `var(--z-resume)` (1001) |
| Embed URL | Google Doc "Publish to web" `?embedded=true` |
| Download URL | Original doc ID `/export?format=pdf` |
| iframe max-width | 900px, centered in a flex wrapper |
| Close | × button (var(--radius-full)) or Esc key |
| Body scroll lock | `overflow: hidden` while open |
| Download button | border-radius: var(--radius-sm) |

The document is editable in Google Docs — changes appear immediately in the overlay without any site updates. Wired to all pages: `index.html`, `case1–3.html`, `components.html`.

---

### Menu Overlay

#### Layout

| Property | >= 1200px | < 834px |
|----------|-----------|---------|
| Background | manu-bkg.svg (cover) | same |
| Left image | manu-left.svg, 90px wide | 60px wide |
| Bottom image | manu-bottom.svg, 90px height | 60px height |
| Content padding-left | 90px + 20px | 60px + 20px |
| Content padding-top | 40px | 40px |
| Links font | button-text tokens | same |
| Slide transition | var(--transition-panel) | same |

#### Email Button in Menu

| Breakpoint | Button size | Icon size |
|------------|-------------|-----------|
| >= 834px | 90x90 | 48x48 |
| < 834px | 60x60 | 32x32 |

- Background: var(--color-black), icon white (`filter: invert(1)`)
- Class: `.js-contact-open` — opens contact form, closes menu

---

### Case Hero (case pages)

Top section of every case page. Composed of: left decorative strip, title block, info column with background image, laptop preview image, and a vertical accordion nav listing case sections.

#### Layout

| Property | >= 1200px | 834-1199px | < 834px |
|----------|-----------|------------|---------|
| Left strip | `.case-hero__left` 90px, `case1-hero-left.svg`, 900px tall | same | hidden |
| Body padding-left | 20px | 20px | 0 |
| Title block padding | 24px 24px 24px 20px | same | 20px |
| Info column width | `calc(2*(100vw-300px)/6 + 24px + 90px)` | `calc((100vw-180px)/4 + 60px)` | 100% |
| Info column padding | 0 90px 24px 20px | 0 60px 24px 20px | 20px |
| Info min-height | 698px | auto | 400px |
| Info background | `case1-hero-right.svg`, cover, top-left | same | same |
| Laptop position | absolute, top: 380px, right: 0 | static, full width, margin-bottom 24px | static, padding-left 20px, margin-top -24px |
| Laptop image | `case1-hero.png` | min-height 445px, object-fit cover | same |

#### Nav (accordion list)

Width is parent-relative (`calc(100% - 70px)`), not `100vw`, to avoid the scrollbar offset that pushes content into the right margin. Nav left edge is aligned to col 1 via negative margin that cancels body padding-left.

| Property | >= 1200px | 834-1199px | < 834px |
|----------|-----------|------------|---------|
| Width | `calc(100% - 70px)` | `calc(100% - 10px)` | 100% |
| Margin-left | -20px | -50px | 0 |
| Padding | 0 | 0 0 24px 0 | 0 20px |

#### Nav item structure

```html
<div class="case-hero__nav-item" id="...">
  <div class="case-hero__nav-left">
    <h3 class="case-hero__nav-title">Title</h3>
    <p class="case-hero__nav-body">Subtitle / lead</p>
  </div>
  <div class="case-hero__nav-content"><!-- right column content --></div>
</div>
```

| Property | >= 1200px | <= 1200px |
|----------|-----------|-----------|
| Layout | grid 2 cols + minmax(0,1fr) | display: block |
| Col 1 width | `calc((100% - 120px)/3 + 24px)` (= 2 cols + 1 gutter) | full width |
| Col gap | 24px | — |
| Title divider | `border-top: 2px solid var(--color-black-20)` on title element only (left col) | full-width border-top |
| Title padding-left | 20px | 0 |
| Body padding-left | 20px | 0 |
| Body collapsed | `max-height: 0; overflow: hidden` | same |
| Body open | margin-top 8px, max-height 2000px | same |
| Content padding-top | 72px | 0 |
| Content collapsed | `max-height: 0; overflow: hidden` | same |
| Content open | `max-height: none; min-height: calc(100vh - 90px)` | `margin-top: 24px; min-height: 0` |
| Closed items | `display: none` (CSS, until JS adds `.is-open`) | all items `.is-open` at load |

First nav-item title has no border-top divider.

#### Right column (`.case-hero__nav-content`) width

| Breakpoint | width |
|------------|-------|
| >= 1441px (1920) | 840px |
| <= 1440px        | 784px |
| <= 1200px        | 100% (stretches to grid width) |
| <= 834px         | 100% (single-column mobile) |

#### Gate-driven section reveal

`js/components/case-hero.js` implements a gate-driven section reveal:

**Desktop (>1200px):**
- Closed nav-items are `display: none` (CSS rule: `.case-hero__nav-item:not(.is-open):not(.is-active)`)
- Solution starts with `.is-open`; all other sections are hidden
- On `scroll` / `wheel` / `touchmove`, JS checks whether the previous section's bottom is visible in the viewport (with a 50px buffer)
- When the gate clears, the next section gets `.is-open` — it appears in the DOM and both left and right blocks enter from the bottom of the viewport via natural scroll
- Left column is `position: sticky; top: 90px` — sticks under the header as the user scrolls through the right column's content
- Right column has `min-height: calc(100vh - 90px)` so each section fills at least one viewport height
- All listeners are passive — page scroll is never prevented
- Click on a closed section's title opens all sections up to that index and smooth-scrolls to it

**Tablet & mobile (≤1200px):**
- JS adds `.is-open` to every nav-item on load — all sections are static, stacked vertically
- No scroll listeners, no gate logic
- Left column is `position: static` (no sticky)
- Right column: `padding-top: 0; margin-top: 24px; min-height: 0`

---

### Bullet List

`css/components/bullet-list.css`. Vertical list with circular markers and dividers.

| Property | Value |
|----------|-------|
| Container | `width: 100%; margin: 0; padding: 0` |
| Item | `padding: 20px 0; border-top: 2px solid var(--color-black-20)` |
| First item | no border-top, padding-top: 0 |
| Marker | 16x16, var(--radius-full), var(--color-black), margin-right 12px |
| Title | 28px bold, inline-block |
| Subtitle | 19px regular, margin: 8px 0 0 28px |

---

### Content Blocks

`css/components/content-blocks.css`. Generic stack of titled content blocks separated by dividers. Used inside `.case-hero__nav-content` to compose every right-column section of a case page.

#### Stack

| Property | >= 834px | < 834px |
|----------|----------|---------|
| `.content-blocks` gap | 24px | 24px |
| `.content-block` padding-top | 24px | 24px |
| `.content-block` border-top | 2px solid var(--color-black-20) | same |
| `.content-block` first-child | no border, no padding-top | same |
| `.content-block` inner gap | 16px | 16px |

#### Title / Text

| Element | Font |
|---------|------|
| `.content-block__title` | 28px bold, line-height 1.2 (mobile <834px: 19px) |
| `.content-block__text` | 16px regular, line-height 1.4, var(--color-black) |
| `.content-block__list`  | 16px regular, line-height 1.4, `list-style: disc`, `padding-left: 20px`, 4px gap between items |

#### Media (image with zoom trigger)

| Property | All breakpoints |
|----------|-----------------|
| `.content-block__media` | width 100%, position relative |
| `.content-block__media-img` | width 100%, height auto (natural ratio, no crop) |
| `.content-block__zoom` button | absolute top:20 right:20, 48x48, var(--radius-full), var(--color-black-60) |

##### `--fit` modifier

`.content-block__media--fit` adds a 1px `var(--color-border)` stroke around the image.

#### Pills

`.content-block__pill`: `var(--color-black-08)` background, `var(--radius-md)`, gap 12px. Used for tag/label lists (e.g. success criteria).

#### Persona card

| Property | Value |
|----------|-------|
| Layout | grid `64px 1fr`, gap 16px |
| Avatar | 64x64, `object-fit: cover`, no border-radius |
| Body | flex column, gap 12px |
| Name | 19px bold |
| Role | 16px bold |
| Text | 16px regular, line-height 1.4 |

#### 2x2 grid (JTBD)

| Property | >= 834px | < 834px |
|----------|----------|---------|
| `.content-block__grid` | 2 columns, gap 24px | 1 column |
| `.content-block__cell` | flex column, gap 8px | same |
| Cell title | 16px bold | same |
| Cell text | 16px regular, line-height 1.4 | same |

---

### Image Zoom

`css/components/image-zoom.css` + `js/components/image-zoom.js`. Fullscreen lightbox with discrete-step zoom and pan navigation.

#### Overlay

| Property | Value |
|----------|-------|
| Position | fixed inset 0, z-index: var(--z-modal) |
| Background | rgba(0,0,0,0.9) |
| Display | none → `block` on `.is-open` |
| Body lock | `document.body.style.overflow = 'hidden'` while open |

#### Zoom controls

| Property | Value |
|----------|-------|
| Range | 10% – 100% of natural size |
| Step | 10% per click |
| Default open scale | 50% |
| Position | fixed bottom-center, in a rounded var(--color-black-60) bar |
| Close button | fixed top-right, 48x48, var(--radius-full) |

#### Pan navigation

When `viewport.scrollWidth/Height > clientWidth/Height + 1`, overlay gets `.has-overflow` and the 4-arrow pan cluster appears (bottom-right, 3x3 grid). Each click scrolls the viewport 120px. Pan buttons use `var(--radius-md)`.

| Trigger | Action |
|---------|--------|
| `+` / `−` button | zoom in/out by 10% |
| Drag (pointer events) | pans the viewport |
| Close button | closes |
| Keys: `+` / `=` | zoom in |
| Key: `−` | zoom out |
| Keys: arrow keys | pan |
| Key: Esc | close |

#### Trigger contract

```html
<button data-zoom-src="path/to/image.png" data-zoom-alt="...">+</button>
```

---

### Video Player

`css/components/video-player.css` + `js/components/video-player.js`. Inline poster preview that opens a fullscreen video overlay.

#### Inline preview

| Property | Value |
|----------|-------|
| `.video-player` | width 100%, 1px var(--color-border) stroke, var(--color-surface) bg |
| `.video-player__poster` | `<img>` 100% width, height auto, `object-fit: contain` |
| `.video-player__play` | absolute center, 88x88 var(--radius-full), var(--color-black-60), white CSS-triangle |

#### Trigger contract

```html
<div class="video-player"
     data-video-src="../assets/videos/file.mp4"
     data-video-poster="../assets/images/poster.png">
  <img class="video-player__poster" src="../assets/images/poster.png" alt="">
  <button class="video-player__play" type="button" aria-label="Play video"></button>
</div>
```

#### Fullscreen overlay

| Property | Value |
|----------|-------|
| `.video-player-overlay` | fixed inset 0, z-index: var(--z-modal), background var(--color-black) |
| `<video>` | `position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain` — fills overlay exactly, scales video to maximum size while keeping ratio |
| Close button | fixed top-right, 48x48, var(--radius-full), var(--color-black-60) |

#### Close behavior

| Trigger | Action |
|---------|--------|
| × Close button | closes |
| Esc | closes |
| Click on overlay background | does not close |

#### Mobile landscape (≤ 834px)

On portrait-mode phones the overlay rotates 90° so landscape video fills the screen:

| Layer | Mechanism |
|-------|-----------|
| **JS — primary** | `screen.orientation.lock('landscape')` on open; `unlock()` on close. Works on Android Chrome; silently ignored on iOS. |
| **CSS — fallback** | `@media (max-width: 834px) and (orientation: portrait)` swaps overlay dimensions (`width: 100vh; height: 100vw`) and applies `rotate(90deg)`. Effective on iOS and any browser that denies the lock. |
| Close button | Counter-rotated `rotate(-90deg)` to stay upright; physically maps to bottom-right corner of the portrait screen. |

---

### More Projects

`css/components/more-projects.css`. Two clickable preview cards linking to other case studies.

#### Layout

| Property | >= 1200px | 834-1199px | < 834px |
|----------|-----------|------------|---------|
| Section padding top/bottom | 120px | 120px | 80px |
| Section padding left/right | 90px | 60px | 20px |
| Cards layout | grid 2 columns | grid 2 columns | grid 1 column |

#### Cards

| Property | >= 1200px | < 834px |
|----------|-----------|---------|
| Padding | 20px | 20px |
| Border | 1px solid var(--color-black-20) | same |
| Internal gap | 16px | 16px |
| Image height | 400px | 340px |
| Image fit | object-fit: cover, object-position: center | same |
| Title font-size | 24px | 24px |
| Body font-size | 19px | 19px |

#### Visibility (`.case-bottom` wrapper)

On case pages, More Projects + Email + Footer are wrapped in a `.case-bottom` div (`display: none` by default). `case-hero.js` adds `.is-visible` only after all nav-items receive `.is-open`.

---

## Case 1 — Content Map

`pages/case1.html`. 7 gate-driven sections + `.case-bottom` wrapper.

| # | Section (id) | Left lead | Right column content |
|---|--------------|-----------|----------------------|
| 1 | Solution (`#solution`) | short framing line | — (placeholder, opens instantly) |
| 2 | Problem (`#problem`) | short framing line | text block(s) |
| 3 | Design process (`#design-process`) | short framing line | `bullet-list` of 5 design-thinking phases |
| 4 | Research & discovery (`#research`) | short framing line | 4 content blocks: User group, Users pain points (text + media), User personas (2 persona cards), JTBD (2x2 cell grid) |
| 5 | Prototyping (`#prototyping`) | short framing line | 4 content blocks: User flow (text + `--fit` media), Prototypes (text), User flow 1 (video-player), User flow 2 (video-player) |
| 6 | User tests (`#user-tests`) | short framing line | 2 content blocks: Context and methodology (text), Insights (text + bullets + `--fit` media) |
| 7 | Final design (`#final-design`) | short framing line | 4 content blocks with text + `--fit` media: case1-finalD1–4 |

#### Bottom sections

| # | Section | Content |
|---|---------|---------|
| 8 | More Projects | Case 2 + Case 3 |
| 9 | Email | Reusable contact CTA |
| 10 | Footer | Reusable footer |

#### Asset map

| Folder | Files |
|--------|-------|
| `assets/images/` | `case1-hero-left.svg`, `case1-hero-right.svg`, `case1-hero.png`, `case1-research-interview.png`, `case1-research-hr1.png`, `case1-research-hr2.png`, `case1-prototype-userFlow.png`, `case1-intro-flowHr.png`, `case1-intro-flowCandidate.png`, `case1-test-table.png`, `case1-finalD1.png` … `case1-finalD4.png`, `preview-case2.png`, `preview-case3.png` |
| `assets/videos/` | `case1-flowHr.mp4`, `case1-flowCandidate.mp4` |

#### Scripts

```html
<script src="../js/main.js"></script>
<script src="../js/components/grid-overlay.js"></script>
<script src="../js/components/header-menu.js"></script>
<script src="../js/components/contact-overlay.js"></script>
<script src="../js/components/resume-overlay.js"></script>
<script src="../js/components/case-hero.js"></script>
<script src="../js/components/image-zoom.js"></script>
<script src="../js/components/video-player.js"></script>
```

---

## Case 2 — Content Map

`pages/case2.html`. 7 gate-driven sections + `.case-bottom` wrapper.

| # | Section (id) | Left lead | Right column content |
|---|--------------|-----------|----------------------|
| 1 | Solution (`#solution`) | Prompt marketplace framing | — (opens instantly) |
| 2 | Context & problem (`#context-problem`) | Two-paragraph context | 1 content block: Public prompt marketplace (text + `--fit` media `case2-context.png`) |
| 3 | Goals & success criteria (`#goals-success`) | "Objectives and how success will be measured" | 3 content blocks: Product goals (list), UX goals (text), Success criteria (pills) |
| 4 | Scope of this iteration (`#scope`) | — | `bullet-list` with 3 items |
| 5 | Constraints & inputs (`#constraints`) | "What shaped the solution…" | 2 content blocks: Inputs (text), Constraints (text) |
| 6 | Competitive & best-practice analysis (`#competitive-analysis`) | Adopted patterns intro | 1 content block: Patterns (list) + `--fit` media `case2-research.png` |
| 7 | Key user flow (`#key-user-flow`) | "After several iterations…" | 5 content blocks: Prompt marketplace (4-image carousel), Save prompt (video), Prompt details (video), Publish prompt (video), Edge case (2-image carousel) |

#### Bottom sections

| # | Section | Content |
|---|---------|---------|
| 8 | More Projects | Case 3 + Case 1 |
| 9 | Email | Reusable contact CTA |
| 10 | Footer | Reusable footer |

#### Asset map

| Folder | Files |
|--------|-------|
| `assets/images/` | `case2-hero-left.svg`, `case2-hero-right.svg`, `case2-hero.png`, `case2-context.png`, `case2-research.png`, `case2-flow1.png` … `case2-flow4.png`, `case2-edge-case1.png`, `case2-edge-case2.png`, `case2-preview-user-save-from-marketplace.png`, `case2-preview-prompt-detals.png`, `case2-preview-add-prompt-to-marketplace.png`, `preview-case1.png`, `preview-case3.png` |
| `assets/videos/` | `case2-userSaveFromMarketplace.mp4`, `case2-prompt-details.mp4`, `case2-add-new-prompt-to-marketplace.mp4` |

#### Scripts

```html
<script src="../js/main.js"></script>
<script src="../js/components/header-menu.js"></script>
<script src="../js/components/contact-overlay.js"></script>
<script src="../js/components/resume-overlay.js"></script>
<script src="../js/components/case-hero.js"></script>
<script src="../js/components/image-zoom.js"></script>
<script src="../js/components/image-carousel.js"></script>
<script src="../js/components/video-player.js"></script>
<script src="../js/components/grid-overlay.js"></script>
```

---

## Case 3 — Content Map

`pages/case3.html`. 7 gate-driven sections + `.case-bottom` wrapper.

| # | Section (id) | Left lead | Right column content |
|---|--------------|-----------|----------------------|
| 1 | Solution (`#solution`) | AI agents ecosystem framing | — (opens instantly) |
| 2 | Context & problem (`#context-problem`) | Two-paragraph context | 1 content block: Core qualities (bullet-list: Transparency, Collective intelligence, Collaborative decision-making) + `--fit` media `case3-context.png` |
| 3 | Goals & success criteria (`#goals-success`) | "Objectives and how success will be measured" | 3 content blocks: Product goals (list), UX goals (text), Success criteria (pills) |
| 4 | Scope of this iteration (`#scope`) | "Design and validate the core UX for the AI assistant" | 3 content blocks: Actions and collaboration, Modes and context control, Assistant entry points & layout |
| 5 | Constraints & inputs (`#constraints`) | "What shaped the solution…" | 2 content blocks: What influenced the solution (text), Key trade-offs (text) |
| 6 | Competitive & best-practice analysis (`#competitive-analysis`) | Conversational AI patterns intro | 2 content blocks: Conversational AI patterns (text + `--fit` media `case3-pattern-ask.png`), Agentic patterns (text + `--fit` media `case3-pattern-agentic.png`) |
| 7 | Key user flow (`#key-user-flow`) | "After several iterations…" | 5 content blocks: Specify context (video), Group chat (video), Ask mode (video), Attach source (video), Agent mode (video) |

#### Bottom sections

| # | Section | Content |
|---|---------|---------|
| 8 | More Projects | Case 1 + Case 2 |
| 9 | Email | Reusable contact CTA |
| 10 | Footer | Reusable footer |

#### Asset map

| Folder | Files |
|--------|-------|
| `assets/images/` | `case3-hero-left.svg`, `case3-hero-right.svg`, `case3-hero.png`, `case3-context.png`, `case3-pattern-ask.png`, `case3-pattern-agentic.png`, `case3-preview-user-flow-context.png`, `case3-preview-user-flow-group-chat.png`, `case3-preview-user-flow-ask-mode.png`, `case3-preview-user-flow-attach-source.png`, `case3-preview-user-flow-agent-mode.png`, `preview-case1.png`, `preview-case2.png` |
| `assets/videos/` | `case3-user-flow-context.mp4`, `case3-user-flow-group-chat.mp4`, `case3-user-flow-ask-mode.mp4`, `case3-user-flow-attach-source.mp4`, `case3-user-flow-agent-mode.mp4` |

#### Scripts

```html
<script src="../js/main.js"></script>
<script src="../js/components/header-menu.js"></script>
<script src="../js/components/contact-overlay.js"></script>
<script src="../js/components/resume-overlay.js"></script>
<script src="../js/components/case-hero.js"></script>
<script src="../js/components/image-zoom.js"></script>
<script src="../js/components/image-carousel.js"></script>
<script src="../js/components/video-player.js"></script>
<script src="../js/components/grid-overlay.js"></script>
```

---

## Session retrospective (Case 1)

- **Right-column body type unified.** All paragraph / list / persona / cell text in `.case-hero__nav-content` now shares `16px / 400 / 1.4` so dense case copy reads as one voice.
- **`content-block__media` rewritten.** Old behavior (fixed 714px, `aspect-ratio: 4/3`, `object-fit: cover`) cropped any image that wasn't 4:3. New default is `width: 100%; height: auto;` — natural aspect ratio, no clipping. The `--fit` modifier now only adds the 1px stroke.
- **`content-block__list` added** as a sibling utility to `content-block__text`.
- **Divider opacity at 20%.** All dividers use `var(--color-black-20)` for a quieter rhythm.
- **`.case-hero__nav-content` fixed widths** per breakpoint (840 / 784 / 100% / 100%).
- **Image zoom hardened.** Backdrop click no longer closes the lightbox. Drag-to-pan available.
- **New `video-player` component.** Silent screen-recording walkthroughs. Native controls stripped to play/pause + progress only.
- **Case Hero gate-driven reveal.** Replaced scroll-jacked accordion. Closed items `display: none`, each opens when previous section's bottom scrolls into view (50px gate). Left column `position: sticky; top: 90px`; right column `min-height: calc(100vh - 90px)`. Passive listeners.
- **New `more-projects` component.** Two-card section with CSS subgrid for synchronized image row alignment.
- **`.case-bottom` visibility wrapper.** More Projects + Email + Footer hidden until all nav-items open.
- **Case 1 complete.** Header → Case Hero (7 sections) → More Projects → Email → Footer.

---

## Session retrospective (Cases 2 & 3)

- **New `image-carousel` component.** CSS `translateX` sliding, dot navigation, prev/next CSS chevron buttons. Integrates with Image Zoom via `window.imageZoomOpenGallery(srcs, alts, index)`.
- **Image Zoom extended with gallery navigation.** `.has-gallery` class, gallery prev/next buttons, `centerViewport()` after load.
- **`content-block__pills` added.** Tag elements with `var(--color-black-08)` background, `var(--radius-md)`.
- **Content-block dividers hidden inside case-hero.** Scoped rule `.case-hero__nav-content .content-block { border-top: none; padding-top: 0 }`.
- **Case 2 complete.** 7 sections including 2 image carousels + 3 video players.
- **Case 3 complete.** 7 sections including 5 video-player blocks + 2 pattern screenshots.
- **Cache-busting strategy.** `?v=N` query params on hero and preview images.

---

## Session retrospective (Polish & finishing)

- **Hero ticker hidden.** `.hero__ticker { display: none }` — marquee preserved in HTML but invisible.
- **Grid toggle button hidden.** `document.body.appendChild(btn)` commented out — never added to DOM.
- **New `resume-overlay` component.** Fullscreen overlay with embedded Google Doc iframe + "Download PDF" button. Wired to all pages.
- **Published to GitHub Pages.** Repo: `github.com/3medvidana-boop/Portfolio` (public). GitHub Pages enabled on `main` branch.

---

## Session retrospective (SEO titles & domain)

- **`<title>` tags updated on all pages.** `index.html`: `Portfolio Anastasiia Medvid, UX/UI Designer`. Case pages follow pattern `[Project] — Anastasiia Medvid`: HR Tool Redesign, Prompt Marketplace, AI Hotel Management. All titles ≤ 60 chars for Google display.
- **Vercel domain renamed.** `portfolio-tau-two-55.vercel.app` → `ui-ux-anastasiia-medvid.vercel.app`. Old domain set to redirect to new.
- **readme.md H1 updated.** `Portfolio Blog` → `Portfolio — Anastasiia Medvid`. Pages table expanded with `<title>` column.

---

## Session retrospective (Codebase audit & component docs)

- **Full codebase audit.** All 95 assets (78 images, 10 videos, 7 icons) verified — zero broken references across all HTML, CSS, and JS files.
- **Case 3 info-box corrected.** `pages/case3.html` had "Prompt optimization platform for LLMs" (copy-pasted from case2). Fixed to "AI hotel management SaaS".
- **`components/components.md` created.** Comprehensive component reference: 18 components documented with BEM block + elements table, modifiers, state classes, JS trigger contracts, breakpoints, and pages used. Includes component creation checklist, CSS/JS file templates, and a unified state-class conventions table.
- **`readme.md` project structure updated.** `components/components.md` added to the file tree; Principles section now links to it as the component reference.
- **Deployed to Vercel** in addition to GitHub Pages. Live URL: `ui-ux-anastasiia-medvid.vercel.app`

---

## Session retrospective (Video player & contact overlay)

- **Case 3 Agent mode video fixed.** `data-video-src` corrected to `case3-user-flow-agent-mode.mp4` (matched actual file on disk).
- **Video player overlay fill fixed.** `<video>` changed from `width/height: 100%` (flex-height unreliable) to `position: absolute; inset: 0; object-fit: contain` — video now fills the entire overlay at maximum size regardless of aspect ratio.
- **Mobile landscape playback added.** Opening a video on ≤ 834 px portrait: JS attempts `screen.orientation.lock('landscape')` (Android Chrome); CSS `@media (orientation: portrait)` rotates the overlay 90° and swaps vh/vw dimensions as a universal iOS/fallback. Orientation unlocked on close.
- **Contact overlay image constrained.** `max-height` reduced from `calc(100vh - 120px - 40px)` (~920 px) to `120 px`. Form now fits on screen without scroll; scroll appears only when textarea content overflows.

---

## Session retrospective (Hero contact button & iOS rendering fix)

- **Hero "Contact me" button wired to overlay.** `hero__bottom-contact` was `<a href="mailto:">` with no JS trigger — clicking did nothing. Changed to `<a href="#" class="hero__bottom-contact js-contact-open">` so it opens the contact overlay like all other `.js-contact-open` triggers (header, email section, menu).
- **Hero circle clipping direction fixed.** `.hero__panel-center` changed from `align-items: center` to `align-items: flex-end` — image is now anchored to the bottom of the panel, clipping happens at the top only.
- **iOS Safari black rendering bug fixed.** Random elements (header, hero, email section) painted as solid black on iOS due to `backdrop-filter: blur(12px)` being applied to `.contact-overlay__backdrop` even when the overlay was closed (opacity: 0 but still GPU-composited). Fixed by removing `backdrop-filter` from the base rule and adding it only to `.contact-overlay.is-open .contact-overlay__backdrop`. GPU compositing layer is now created only when the overlay actually opens.

---

## Session retrospective (Asset naming & design tokens)

- **Asset naming fixed.** `icon-manu.svg` renamed to `icon-menu.svg`; all 6 HTML files updated. Video reference in `case3.html` corrected to `case3-user-flow-agent.mp4` (lowercase, consistent naming).
- **Dead files removed.** `css/components/case-stack.css`, `js/components/case-stack.js`, `pages/article.html` deleted.
- **Design token system introduced.** Added to `css/base/variables.css`:
  - **Colors:** `--color-black/white/surface`, 5 black-alpha variants (`--color-black-08/16/20/60/85`), `--color-border`, `--color-accent-green/mint`, `--color-error`
  - **Spacing:** `--page-margin` (90/60/20px via breakpoint media queries), `--section-gap-lg/md/sm`, `--space-4` through `--space-24`
  - **Border-radius:** `--radius-sm/md/full`
  - **Transitions:** `--transition-fast/base/slow/panel/spring`
  - **Z-index:** `--z-header/header-menu/overlay/modal/resume/dev-grid`
- **Tokens rolled out to all 18 CSS component files.** No hardcoded color, z-index, border-radius or transition values remain in any component. Every `#000`, `#fff`, `rgba(0,0,0,X)`, `border-radius: 50%`, `0.3s ease`, `z-index: 100` etc. replaced with the corresponding token.
