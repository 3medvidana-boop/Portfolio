# Components

Reference for all UI components in the project — structure, properties, creation and implementation conventions.

---

## Principles

### 1. One component — one set of files
Every component lives in three parallel locations:
```
css/components/<name>.css      ← all styles for the component
js/components/<name>.js        ← behaviour (if needed)
components/<name>.html         ← markup reference / partial
```
No styles or logic from one component leak into another's file.

### 2. BEM naming
Every component has a single **block** class (`.<name>`). Child elements use `.<name>__element`. Variants use `.<name>--modifier`. State classes added by JS follow the `is-<state>` pattern (not BEM — intentionally shared vocabulary).

```
.video-player                  ← block
.video-player__poster          ← element
.video-player-overlay          ← related block (own namespace)
.video-player__play            ← element
is-open                        ← state (JS-added)
```

### 3. Design tokens only — no hardcoded values
All colors, z-index, border-radius, and transitions come from `css/base/variables.css`. No component CSS file contains raw `#000`, `rgba(...)`, `0.3s ease`, or `z-index: 100`.

```css
/* ✗ never */
color: #000;
transition: 0.3s ease;

/* ✓ always */
color: var(--color-black);
transition: background var(--transition-base);
```

### 4. Desktop-first, max-width media queries
Base styles target the largest viewport. Overrides stack downward via `@media (max-width: N)`. Standard breakpoints:

| Label | Query |
|-------|-------|
| Tablet | `@media (max-width: 1200px)` |
| Mobile | `@media (max-width: 834px)` |

Use intermediate breakpoints (`1440px`, `1266px`, etc.) only when the layout demands it — document the reason in a comment.

### 5. Vanilla JS — IIFE, self-contained
Every JS module is an immediately-invoked function expression. No global variables are exported unless explicitly needed for cross-component communication (`window.imageZoomOpenGallery` is the only current exception).

```js
(function () {
  var el = document.querySelector('.my-component');
  if (!el) return;          // guard — exits silently if component not on page
  // ...
})();
```

### 6. Passive event listeners, no scroll hijacking
Scroll and touch listeners always include `{ passive: true }`. Components never call `e.preventDefault()` on scroll events.

### 7. Showcase every component
Every component must have a rendered example on `pages/components.html`. This is the visual QA surface — no component ships without it.

---

## Creating a new component

### Step-by-step checklist

```
1. css/components/<name>.css      — create, write styles with tokens
2. js/components/<name>.js        — create if behaviour needed (IIFE + guard)
3. components/<name>.html         — create markup reference partial
4. css/main.css                   — add @import for the new CSS file
5. pages/components.html          — add rendered example
6. pages/*.html                   — add <script> tag on pages that use it
7. components/components.md       — add entry to Component Inventory below
```

### CSS file template

```css
/* ==========================================================================
   <ComponentName> — one-line description
   ========================================================================== */

.<name> {
  /* base styles */
}

.<name>__element {
  /* element styles */
}

/* ==========================================================================
   1200px — Tablet
   ========================================================================== */
@media (max-width: 1200px) {
  /* tablet overrides */
}

/* ==========================================================================
   834px — Mobile
   ========================================================================== */
@media (max-width: 834px) {
  /* mobile overrides */
}
```

### JS file template

```js
/* ==========================================================================
   <ComponentName> — one-line description
   ========================================================================== */

(function () {
  var root = document.querySelector('.<name>');
  if (!root) return;

  // implementation
})();
```

---

## Implementing a component on a page

### Adding CSS
CSS is loaded globally via `css/main.css` — no per-page action needed once the `@import` is added.

```css
/* css/main.css */
@import 'components/<name>.css';
```

### Adding JS
Each page that uses the component must include its script **at the bottom of `<body>`**, after `main.js`:

```html
<script src="../js/components/<name>.js"></script>
<!-- path prefix: ../ for pages/, none for index.html -->
```

Script load order for case pages:
```html
<script src="../js/main.js"></script>
<script src="../js/components/header-menu.js"></script>
<script src="../js/components/contact-overlay.js"></script>
<script src="../js/components/resume-overlay.js"></script>
<script src="../js/components/case-hero.js"></script>
<script src="../js/components/image-zoom.js"></script>
<script src="../js/components/image-carousel.js"></script>  <!-- case2, case3 only -->
<script src="../js/components/video-player.js"></script>
<script src="../js/components/grid-overlay.js"></script>
```

### HTML partial role
Files in `components/*.html` are **reference copies**, not server-side includes. There is no templating engine. When adding a component to a page, copy the markup from the partial and paste it inline. Keep the partial in sync when the markup structure changes.

---

## Component Inventory

---

### `header`

Sticky site header. Two visual variants: home page (transparent with background image) and inner pages (white with black border).

| | |
|---|---|
| **CSS** | `css/components/header.css` |
| **JS** | `js/components/header-menu.js` |
| **Partial** | `components/header.html` |
| **Used on** | All pages |

**BEM block:** `.header`

| Element | Description |
|---------|-------------|
| `__home` | Logo / menu-toggle link (90×90) |
| `__home-icon` | Logo SVG (hidden on tablet+) |
| `__menu-icon` | Hamburger / close icon (visible on tablet+) |
| `__menu-icon--open` | Hamburger state |
| `__menu-icon--close` | Close state |
| `__center` | Name + role area (flex, grows) |
| `__name` | Designer name |
| `__role` | Role label |
| `__email` | Email icon button (90×90, hidden on tablet+) |
| `__resume` | Resume CTA button (370×90 desktop → icon-only mobile) |
| `__resume-label` | Button label text |
| `__resume-arrow` | Arrow icon (inverted) |
| `__menu` | Mobile menu overlay panel |
| `__menu-left` | Left decorative strip |
| `__menu-bottom` | Bottom decorative strip |
| `__menu-content` | Nav links container |
| `__menu-link` | Navigation link |
| `__menu-email` | Email icon button inside menu |

**Modifiers:** `.header--inner` — white bg, black border, smaller name/role text (used on case pages)

**States:** `.header--menu-open` (on `.header`) — toggles icon; `.is-open` (on `.header__menu`) — slides panel in

**Breakpoints:** 1440px (name stacks), 1200px (menu icon appears, email hides), 834px (60px height, resume icon-only)

---

### `hero`

Full-height landing section. CSS Grid, 4 panels + 90px bottom row.

| | |
|---|---|
| **CSS** | `css/components/hero.css` |
| **JS** | — |
| **Partial** | `components/hero.html` |
| **Used on** | `index.html` |

**BEM block:** `.hero`

| Element | Description |
|---------|-------------|
| `__panel-left` | Left gradient strip (90px wide) |
| `__panel-left-img` | Gradient SVG image |
| `__panel-content` | Main text area (ticker + H1 + subtitle) |
| `__ticker` | Marquee strip (hidden via CSS, markup preserved) |
| `__ticker-track` | Animated track |
| `__ticker-text` | Repeating text units |
| `__text` | H1 + subtitle wrapper (bottom-aligned) |
| `__title` | H1 heading |
| `__subtitle` | Subtitle paragraph |
| `__panel-center` | Circle image panel |
| `__circle-img` | Hero circle image (responsive via `<picture>`) |
| `__panel-nav` | Right nav buttons panel |
| `__nav-link` | Nav button link |
| `__nav-label` | Link label (slides right on hover) |
| `__nav-arrow` | Arrow icon (slides in on hover) |
| `__bottom-left` | Cyan block below panel 1 |
| `__bottom-contact` | "Contact me" button below panel 2 — has `.js-contact-open`, opens contact overlay |
| `__bottom-contact-label` | Button label |
| `__bottom-contact-arrow` | Arrow icon |
| `__bottom-visual` | Image strip below panels 3–4 |
| `__bottom-visual-img` | Bottom visual image |

**Image switching** via `<picture>`:
```html
<picture>
  <source media="(max-width: 1200px)" srcset="hero-circle1200.svg">
  <source media="(max-width: 1919px)" srcset="hero-circle1440.svg">
  <img src="hero-circle.svg">
</picture>
```

**Breakpoints:** 1919px (circle shrinks to 372px), 1200px (2-col stack, panel 4 hidden), 834px (60px grid margin)

---

### `competences`

Section with expandable skill cards. Accordion on tablet/mobile.

| | |
|---|---|
| **CSS** | `css/components/competences.css` |
| **JS** | `js/components/competences.js` |
| **Partial** | — |
| **Used on** | `index.html` |

**BEM block:** `.competences`

| Element | Description |
|---------|-------------|
| `__header` | Section header |
| `__title` | H2 section title |
| `__hint` | Subtitle / hint text |
| `__cards` | Cards container (flex-wrap) |
| `__card` | Individual skill card (50% desktop, 100% mobile) |
| `__card-icon` | 120×120 skill illustration |
| `__card-title` | Card heading |
| `__card-body` | Body text (accordion content) |
| `__card-toggle` | Chevron toggle button (tablet/mobile only) |
| `__bottom` | Bottom decorative image strip |

**States:** `.is-open` on `.competences__card` — reveals body text on tablet/mobile

**Breakpoints:** 1200px (single column, accordion enabled), 834px (spacing adjustments)

---

### `projects`

Paginated case preview section with staircase card layout and rotating preview image.

| | |
|---|---|
| **CSS** | `css/components/projects.css` |
| **JS** | `js/components/projects.js` |
| **Partial** | — |
| **Used on** | `index.html` |

**BEM block:** `.projects`

| Element | Description |
|---------|-------------|
| `__header` | Header row (title + pagination + fill + see-all) |
| `__title-wrap` | Title width block (2.5 cols) |
| `__title` | H2 heading |
| `__pagination` | Pagination button group |
| `__page-btn` | Individual pagination button (90×90) |
| `__page-btn--prev` | Previous arrow (mint bg) |
| `__page-btn--1/2/3` | Numbered page buttons |
| `__page-btn--next` | Next arrow (green bg) |
| `__header-fill` | Green flex fill between buttons and see-all |
| `__see-all` | "See all" CTA button |
| `__see-all-label` | Button label (hidden below 1266px) |
| `__see-all-arrow` | Arrow icon |
| `__content` | Preview + cases container |
| `__preview` | Left preview image area |
| `__preview-img` | Preview image (one per project) |
| `__cases` | Right case list |
| `__case` | Individual case card (link) |
| `__case-title` | Case heading |
| `__case-body` | Case description |

**States:** `.is-active` on `__page-btn` — active page; `.is-focused` on `__case` — highlighted row; `.is-active` on `__preview-img` — visible preview

**Case 4 rule:** `pointer-events: none; cursor: default; text visibility: hidden` — "Coming soon" slot

**Breakpoints:** 1266px (see-all icon-only), 1200px (vertical layout, only focused case shown), 834px (60px buttons)

---

### `services`

Six service cards in a staircase grid. Scroll-driven horizontal animation on desktop.

| | |
|---|---|
| **CSS** | `css/components/services.css` |
| **JS** | `js/components/services.js` |
| **Partial** | — |
| **Used on** | `index.html` |

**BEM block:** `.services`

| Element | Description |
|---------|-------------|
| `__header` | Section header |
| `__title` | H2 heading |
| `__hint` | Subtitle text |
| `__cards-wrapper` | Overflow-hidden scroll container |
| `__cards` | Inner cards flex container (translateX target) |
| `__row` | Row of 2 cards |
| `__card` | Individual card (240px height, bg image) |
| `__card-overlay` | White gradient overlay (bottom half) |
| `__card-title` | Card label (bottom-left) |

**JS:** On desktop (>1200px), calculates overflow and maps scroll position to `translateX` — cards slide left as user scrolls. Disabled on tablet/mobile.

**Breakpoints:** 1200px (staircase offset removed, single column rows), 834px (full width, hover disabled)

---

### `workflow`

5-step process section. 2-column grid on large desktop, single column below 1440px.

| | |
|---|---|
| **CSS** | `css/components/workflow.css` |
| **JS** | — |
| **Partial** | — |
| **Used on** | `index.html` |

**BEM block:** `.workflow`

| Element | Description |
|---------|-------------|
| `__header` | Section header |
| `__title` | H2 heading |
| `__hint` | Subtitle text |
| `__cards` | Grid container |
| `__card` | Step card (flex row, number + text) |
| `__card-number` | 32px circle with step number |
| `__card-title` | Step title |
| `__card-body` | Step description |
| `__image-wrap` | Bottom image container |
| `__image` | Workflow illustration (870px fixed width, scales down) |

**Visual note:** Cards 3–4–5 have `background: #E1F7FC` (light blue — intentionally hardcoded, not a token, as it's unique to this component).

**Breakpoints:** 1440px (2-col → 1-col), 1200px (margin adjustments), 834px (80px bottom padding)

---

### `email`

Reusable contact CTA section. Appears at the bottom of all pages.

| | |
|---|---|
| **CSS** | `css/components/email.css` |
| **JS** | — |
| **Partial** | `components/email.html` |
| **Used on** | All pages |

**BEM block:** `.email`

| Element | Description |
|---------|-------------|
| `__content` | Inner flex row |
| `__title-block` | Left: greeting + avatar + name + subtitle |
| `__greeting` | "Hi, I'm" H2 |
| `__name-row` | Avatar + name flex row |
| `__avatar` | 72×72 round avatar image |
| `__name` | Designer name H2 |
| `__subtitle` | Tagline |
| `__cta` | Right: CTA text + image + button |
| `__cta-text` | Body copy |
| `__cta-image-container` | Relative wrapper |
| `__cta-image-wrap` | Inner wrapper for image + button |
| `__cta-image` | email-small.svg (cover, 218px height) |
| `__cta-button` | "Contact me" button (`.js-contact-open`) |
| `__cta-label` | Button label |
| `__cta-arrow` | Email icon |

**JS trigger:** `.js-contact-open` class opens the contact overlay — shared with header and menu.

**Breakpoints:** 834px (column layout, 60px button height), container query ≤618px (button above image, full width)

---

### `footer`

Dark site footer. Back-to-top + name + nav grid.

| | |
|---|---|
| **CSS** | `css/components/footer.css` |
| **JS** | `js/components/footer.js` |
| **Partial** | — |
| **Used on** | All pages |

**BEM block:** `.footer`

| Element | Description |
|---------|-------------|
| `__content` | Main content row |
| `__left` | Back button + name + LinkedIn |
| `__back` | Back-to-top button (90×90, white bg) |
| `__back-icon` | Arrow icon (rotated -90deg) |
| `__text` | Name + role text block |
| `__name` | Designer name (H2, white) |
| `__role` | Role label (70% white) |
| `__linkedin` | LinkedIn icon link |
| `__linkedin-icon` | LinkedIn SVG (inverted) |
| `__nav` | Nav card grid |
| `__nav-card` | Nav link card |
| `__copyright` | Bottom bar (#141414 bg) |
| `__copyright-text` | ©year text |

**JS:** Smooth-scrolls to `.hero` on back button click.

**Breakpoints:** 1334px (2×2 nav grid → single column), 834px (60px back button)

---

### `contact-overlay`

Slide-in side panel with contact form. Submits to Formspree.

| | |
|---|---|
| **CSS** | `css/components/contact-overlay.css` |
| **JS** | `js/components/contact-overlay.js` |
| **Partial** | — |
| **Used on** | All pages |

**BEM block:** `.contact-overlay`

| Element | Description |
|---------|-------------|
| `__backdrop` | Full-screen blur overlay |
| `__panel` | Sliding panel (right side, `overflow-y: auto`) |
| `__content` | Inner padded content |
| `__header` | Title + close button row |
| `__title` | "Let's break the ice" heading |
| `__close` | × close button |
| `__form` | Form element (Formspree action) |
| `__row` | Two-column input row |
| `__field` | Field wrapper (input + error) |
| `__input` | Text/email input |
| `__textarea` | Message textarea (`resize: vertical`, min-height 120px) |
| `__error` | Validation error message |
| `__bottom` | Submit + image row |
| `__submit` | Submit button |
| `__submit-label` | Button label |
| `__submit-arrow` | Arrow icon |
| `__image` | Decorative SVG (max-height 120px, `object-fit: contain`) |
| `__success` | Success state container (shown after send) |
| `__again` | "Send one more" button |

**States:**
- `.is-open` on `.contact-overlay` — panel visible
- `.is-error` on `__input` / `__textarea` — red border
- `.is-visible` on `__error` — shows error text
- `.is-sending` on `__submit` — disabled opacity state
- `.is-sent` on `__form` — hides form, shows success

**Trigger:** Any `.js-contact-open` element opens the overlay. Current triggers: header email button, hero "Contact me" button (`hero__bottom-contact`), email section CTA button, menu email button.

**Backdrop note:** `backdrop-filter: blur(12px)` is applied **only** inside `.contact-overlay.is-open` — not on the base backdrop rule. This prevents iOS Safari from creating a GPU compositing layer when the overlay is closed, which would cause other `position: fixed` / sticky elements (header, hero panels) to paint as solid black.

**Breakpoints:** 1440px (panel from col 2), 1200px (panel from col 2 of 4-col grid), 834px (full-width panel, stacked fields)

---

### `resume-overlay`

Fullscreen overlay embedding Google Doc as resume preview.

| | |
|---|---|
| **CSS** | `css/components/resume-overlay.css` |
| **JS** | `js/components/resume-overlay.js` |
| **Partial** | — |
| **Used on** | All pages |

**BEM block:** `.resume-overlay`

| Element | Description |
|---------|-------------|
| `__toolbar` | Top bar with download + close |
| `__download` | "Download PDF" link button |
| `__close` | × close button (round) |
| `__frame-wrap` | Scrollable flex container |
| `__frame` | Google Doc `<iframe>` (max-width 900px) |

**States:** `.is-open` on `.resume-overlay` — switches from `display:none` to `display:flex`

**Trigger:** `.header__resume` button on any page.

**z-index:** `var(--z-resume)` (1001) — above video/zoom modals.

---

### `case-hero`

Top section of every case page. Left decorative strip + title/info row + laptop image + gate-driven accordion nav.

| | |
|---|---|
| **CSS** | `css/components/case-hero.css` |
| **JS** | `js/components/case-hero.js` |
| **Partial** | — |
| **Used on** | `pages/case1.html`, `case2.html`, `case3.html` |

**BEM block:** `.case-hero`

| Element | Description |
|---------|-------------|
| `__left` | Decorative strip (90px, 900px tall) |
| `__body` | Everything right of the strip |
| `__top` | Top row: title block + info column |
| `__title-block` | H1 + subtitle area |
| `__title` | H1 heading |
| `__subtitle` | Subtitle paragraph |
| `__info` | Info column (right, background image) |
| `__info-row` | Label + value pair with divider |
| `__info-label` | Row label |
| `__info-value` | Row value |
| `__main` | Laptop + nav wrapper |
| `__laptop` | Laptop hero image (absolute desktop, static tablet) |
| `__nav` | Accordion nav list |
| `__nav-item` | Individual section (grid 2-col desktop) |
| `__nav-left` | Sticky left column (title + body) |
| `__nav-title` | Section heading (H3, with divider) |
| `__nav-body` | Lead/summary text (collapsed by default) |
| `__nav-content` | Right column content (840/784/100% widths) |
| `__nav-spacer` | 200px white end spacer |

**States:**
- `.is-open` — section fully revealed, content visible
- `.is-active` — section being revealed (transition in progress)

**JS gate logic (desktop > 1200px):** Closed items are `display:none`. On scroll, when the previous section's bottom passes 50px above viewport bottom edge, the next item gets `.is-open`. All listeners are passive.

**Breakpoints:** 1440px (info column narrows), 1200px (single-column layout, all sections open on load, sticky disabled), 834px (left strip hidden, full-width)

---

### `bullet-list`

Vertical list with circular markers and top dividers.

| | |
|---|---|
| **CSS** | `css/components/bullet-list.css` |
| **JS** | — |
| **Partial** | — |
| **Used on** | Case pages (inside `.case-hero__nav-content`) |

**BEM block:** `.bullet-list`

| Element | Description |
|---------|-------------|
| `__item` | List item (padding 20px, border-top divider) |
| `__marker` | 16×16 black circle |
| `__title` | Item heading (28px bold) |
| `__subtitle` | Item description (19px, offset-left 28px) |

**First item rule:** No border-top, no padding-top.

---

### `content-blocks`

Flexible stack of titled content blocks. Primary layout unit for case page right columns.

| | |
|---|---|
| **CSS** | `css/components/content-blocks.css` |
| **JS** | — |
| **Partial** | `components/content-block.html`, `components/content-block-media.html` |
| **Used on** | Case pages (inside `.case-hero__nav-content`) |

**BEM blocks:** `.content-blocks` (container), `.content-block` (item)

| Element | Description |
|---------|-------------|
| `__title` | Block heading (28px bold, 19px mobile) |
| `__text` | Body paragraph (16px, line-height 1.4) |
| `__list` | `<ul>` with disc markers, 16px, 4px item gap |
| `__media` | Image wrapper (width 100%, relative) |
| `__media--fit` | Modifier: adds 1px `var(--color-border)` stroke |
| `__media-img` | Image (100% width, height auto — natural ratio, no crop) |
| `__zoom` | Zoom trigger button (absolute top-right of media) |
| `__pills` | Tag row (flex-wrap, gap 12px) |
| `__pill` | Single tag (`var(--color-black-08)` bg, `var(--radius-md)`) |
| `__persona` | Persona card (grid 64px + 1fr) |
| `__persona-avatar` | 64×64 avatar image |
| `__grid` | 2×2 cell layout (JTBD format) |
| `__cell` | Grid cell (flex column, gap 8px) |

**Scoped override:** Inside `.case-hero__nav-content`, `.content-block` has no border-top and no padding-top (blocks are already spaced by the nav-content padding-top).

**Zoom contract:** `__zoom` button requires `data-zoom-src` and `data-zoom-alt` attributes — picked up by `image-zoom.js`.

---

### `image-zoom`

Fullscreen lightbox with discrete zoom steps and drag-to-pan. Optionally opens as gallery.

| | |
|---|---|
| **CSS** | `css/components/image-zoom.css` |
| **JS** | `js/components/image-zoom.js` |
| **Partial** | — |
| **Used on** | All case pages |

**Trigger contract:**
```html
<button data-zoom-src="path/to/image.png" data-zoom-alt="Description">+</button>
```

**Gallery API (exposed globally):**
```js
window.imageZoomOpenGallery(srcs[], alts[], startIndex)
```
Called by `image-carousel.js` to open a slide in fullscreen.

**States:** `.is-open` on overlay; `.has-overflow` on overlay — shows 4-arrow pan cluster.

**Zoom range:** 10%–100% of natural image size, 10% per step. Default open: 50%.

**Breakpoints:** 834px (close button repositioned)

---

### `image-carousel`

Horizontal sliding image gallery with dot navigation and prev/next buttons.

| | |
|---|---|
| **CSS** | `css/components/image-carousel.css` |
| **JS** | `js/components/image-carousel.js` |
| **Partial** | — |
| **Used on** | `pages/case2.html`, `pages/case3.html` |

**BEM block:** `.image-carousel`

| Element | Description |
|---------|-------------|
| `__track` | Sliding container (`translateX`) |
| `__slide` | Individual slide (width 100%) |
| `__slide-img` | Slide image |
| `__btn` | Prev / next button |
| `__btn--prev` | Previous |
| `__btn--next` | Next |
| `__dots` | Dot navigation row |
| `__dot` | Individual dot |

**States:** `.is-active` on `__dot` — current slide indicator.

**Integration:** Clicking a slide triggers `window.imageZoomOpenGallery()` to open the image in the fullscreen zoom lightbox.

**Markup contract:**
```html
<div class="image-carousel">
  <div class="image-carousel__track">
    <div class="image-carousel__slide">
      <img class="image-carousel__slide-img"
           src="..." alt="..."
           data-zoom-src="..." data-zoom-alt="...">
    </div>
  </div>
  <button class="image-carousel__btn image-carousel__btn--prev"></button>
  <button class="image-carousel__btn image-carousel__btn--next"></button>
  <div class="image-carousel__dots"></div>
</div>
```

---

### `video-player`

Inline poster-preview card that opens a fullscreen video overlay. Silent screen recordings.

| | |
|---|---|
| **CSS** | `css/components/video-player.css` |
| **JS** | `js/components/video-player.js` |
| **Partial** | `components/video-player.html` |
| **Used on** | All case pages, `pages/components.html` |

**BEM blocks:** `.video-player` (inline), `.video-player-overlay` (fullscreen)

| Element | Description |
|---------|-------------|
| `__poster` | Poster `<img>` (100% width, contain) |
| `__play` | Centered play button (88×88 circle, CSS triangle) |
| `__video` | `<video>` element (absolute fill, `object-fit: contain`) |
| `__close` | × close button (fixed top-right) |

**Markup contract:**
```html
<div class="video-player"
     data-video-src="../assets/videos/file.mp4"
     data-video-poster="../assets/images/poster.png">
  <img class="video-player__poster" src="..." alt="">
  <button class="video-player__play" type="button" aria-label="Play video"></button>
</div>
```

**Mobile landscape (≤ 834px portrait):**
- JS attempts `screen.orientation.lock('landscape')` — works on Android Chrome.
- CSS fallback: overlay rotates 90° and swaps `width: 100vh / height: 100vw` — works on iOS and any browser that denies the lock.

**Native controls stripped:** volume, mute, fullscreen button, PiP, cast, overflow menu hidden via `::-webkit-media-controls-*` pseudo-elements.

**Breakpoints:** 834px (play button 64×64), 834px + portrait orientation (landscape rotation)

---

### `more-projects`

Two-card section linking to other case studies. Appears at the bottom of every case page.

| | |
|---|---|
| **CSS** | `css/components/more-projects.css` |
| **JS** | — |
| **Partial** | `components/more-projects.html` |
| **Used on** | All case pages (inside `.case-bottom`) |

**BEM block:** `.more-projects`

| Element | Description |
|---------|-------------|
| `__title` | Section heading |
| `__list` | 2-column grid |
| `__card` | Clickable card (`<a>` tag) |
| `__card-text` | Text block (title + body) |
| `__card-title` | Case title (H3) |
| `__card-body` | Short description |
| `__card-img` | Image wrapper (400px height, cover) |

**Visibility:** Wrapped in `.case-bottom` (`display: none`). `case-hero.js` adds `.is-visible` to `.case-bottom` after all nav-items have received `.is-open`.

**Breakpoints:** 834px (2-col → 1-col, 340px image height)

---

### `grid-overlay`

Developer tool — renders the column grid on top of the page. Inactive in production.

| | |
|---|---|
| **CSS** | `css/components/grid-overlay.css` |
| **JS** | `js/components/grid-overlay.js` |
| **Partial** | `components/grid-overlay.html` |
| **Used on** | All pages (script loaded, toggle button not rendered) |

**Note:** The toggle button creation in `grid-overlay.js` is commented out. The overlay is never shown unless manually re-enabled. Safe to keep the script loaded — the guard exits immediately when no trigger element is found.

---

## State class conventions

| Class | Applied to | Meaning |
|-------|-----------|---------|
| `is-open` | Overlay, panel, nav-item, accordion card, menu | Fully visible / expanded |
| `is-active` | Nav-item (case-hero), pagination button, carousel dot | In transition / currently selected |
| `is-focused` | Project case card | Keyboard/JS highlight state |
| `is-error` | Form input / textarea | Validation error |
| `is-visible` | Error message, `.case-bottom` wrapper | Shown (previously hidden) |
| `is-sending` | Submit button | In-flight request, interactions locked |
| `is-sent` | Contact form | Submission complete, shows success state |
