# NOVA STORE — Premium E-Commerce Interactive Showcase
### Week 5 Final Challenge — AI Web Development

A production-grade, premium lifestyle e-commerce web application engineered with semantic HTML5, modern CSS Grid/Flexbox architectures, a rigorous design system, master motion design with cubic-bezier easing, and complete client-side shopping workflows.

---

## 🌟 Overview & Brand Identity

**NOVA STORE** is an intentional digital flagship store celebrating contemporary Nordic minimalism and timeless artisanal craftsmanship. The curated inventory features:
- **Virgin Merino Knitwear**: Heavyweight, mulesing-free garments crafted in Porto.
- **Tuscan Vegetable-Tanned Leather**: Full-grain bags and small leather accessories that develop an authentic personal patina.
- **Architectural Living Objects**: Cast aluminum task lighting and handmade Kyoto stoneware vessels.
- **Precision Titanium Timepieces**: Grade 5 titanium chronographs with sapphire crystal.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript (Strict typing) |
| **Build Tool** | Vite 8.3 |
| **Styling & Design System** | Tailwind CSS v4 + Native CSS Variables Design Tokens |
| **Motion & Scroll Revelation** | AOS (Animate On Scroll) + Hardware-accelerated CSS Keyframes |
| **Celebration & Micro-interactions** | Canvas-Confetti + Lucide React |
| **Persistence** | LocalStorage API (Cart state preservation) |

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
# Server initiates at http://localhost:3000
```

### 3. Build & Type Checking
```bash
npm run lint    # Runs tsc --noEmit
npm run build   # Generates production distribution
```

---

## 🎯 Final Challenge Curriculum Mapping (Week 1–5)

### Week 1: AI Workflow & Clean Architecture
- Audited workspace, zero dead-code accumulation.
- Structured modular components under `/src/components/`.
- Strict typing with interfaces in `/src/types/index.ts`.
- Proper Git workflow with meaningful commits and documentation in `/prompt_logic.md`.

### Week 2: Semantic HTML5 & Accessibility
- Complete semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- Logical heading hierarchy (`<h1>` to `<h3>`).
- Form elements paired with explicit labels and `focus-visible` ring indicators.
- WCAG AA compliant contrast ratio (>14:1 text to canvas).
- Full keyboard support (ESC key to dismiss modals, drawers, and mobile menus).

### Week 3: Box Model, Flexbox & CSS Grid
- Modern 1-dimensional Flexbox layout for Header navigation, toolbars, and stepper buttons.
- Multi-dimensional CSS Grid for product catalog (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`).
- Zero layout thrashing, proper `aspect-ratio: 4/3` and `16/9` image containment with `object-cover`.

### Week 4: Design Tokens & Mobile-First Responsive
- 60-30-10 palette discipline:
  - 60% Warm sand/paper canvas (`#fbfaf8`).
  - 30% Structural card surfaces & hairline borders (`#ffffff`, `#e6e4df`).
  - 10% High-intent warm amber/bronze accent (`#c4823f`).
- Zero-Pill discipline: unboxed metadata with clean typographic separators (`·`).
- Responsive breakpoints tested across 375px, 390px, 768px, 1024px, and 1440px.

### Week 5: Motion Design, Scroll Revelation & Micro-Interactions
- **Intro Sequence**: Header slide-down (`fadeInDown 450ms`) + staggered Hero title/subtitle/CTA (`fadeInUp 550ms`).
- **Interactive Cards**: Smooth translateY lift (-4px), 1.05 scale image zoom, quick action triggers.
- **Scroll Revelation**: AOS integration (`data-aos="fade-up"` with custom ease-out-cubic curve).
- **Cubic-Bezier Curves**:
  - `--ease-entrance: cubic-bezier(0.22, 1, 0.36, 1)`
  - `--ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1)`
  - `--ease-exit: cubic-bezier(0.4, 0, 1, 1)`
- **Full Reduced Motion Support**: Honors `prefers-reduced-motion: reduce`.

---

## 📋 Comprehensive Test Matrix (Part 14)

| Category | Test Case | Status | Observation / Verification |
|---|---|---|---|
| **A. Product Browsing** | Keyword search | **PASSED** | Live filtering with real-time count & clear button |
| | Category filtering | **PASSED** | Segmented tabs filter across Apparel, Leather, Living, Watches |
| | Price range filtering | **PASSED** | Filter thresholds (<$150, $150–$300, >$300) operate accurately |
| | Sorting | **PASSED** | Sorts by price asc/desc, name A-Z, customer rating |
| | Empty filter state | **PASSED** | Clean empty state with "Reset All Filters" CTA |
| **B. Product Details** | Modal presentation | **PASSED** | Opens smoothly with backdrop blur and ESC key listener |
| | Variant selector | **PASSED** | Color swatches and size buttons update state immediately |
| | Quantity stepper | **PASSED** | Min 1, Max 10 limits enforced with button disable state |
| | Add to cart | **PASSED** | Visual confirmation ("Added" state + toast notification) |
| **C. Cart Experience** | Item addition | **PASSED** | Live badge count updates in navbar |
| | Quantity increment | **PASSED** | Subtotal recalculates instantaneously |
| | Item removal | **PASSED** | Removes from list and updates badge & storage |
| | Free shipping threshold | **PASSED** | Interactive progress bar towards $150 free shipping |
| | Promo code validation | **PASSED** | `NOVA10` applies 10% discount; invalid code provides feedback |
| | Persistence | **PASSED** | Cart state preserved in `localStorage` across page reload |
| **D. Checkout Simulation**| Form validation | **PASSED** | Validates required name, email format, phone, address |
| | Shipping methods | **PASSED** | Standard carbon-neutral vs. Express delivery calculation |
| | Payment options | **PASSED** | Simulated Credit Card, Cash on Delivery (COD), Apple Pay |
| | Confetti celebration | **PASSED** | Confetti triggers on successful checkout |
| | Order receipt modal | **PASSED** | Generates order number `NOV-XXXXX`, delivery date, print receipt |
| **E. Motion Design** | Header & Hero intro | **PASSED** | Compositor transform & opacity animations with zero layout shift |
| | Product card hover | **PASSED** | Card lift and image scale settle in ≤ 200ms |
| | Scroll revelation | **PASSED** | AOS triggers once with smooth entrance curves |
| | Accessibility | **PASSED** | Animations disabled under `prefers-reduced-motion` |
| **F. Responsive** | 375px & 390px Mobile | **PASSED** | 1-column layout, touch targets ≥ 44px, sticky header < 10% height |
| | 768px Tablet | **PASSED** | 2-column grid, seamless filter controls |
| | 1024px & 1440px Desktop| **PASSED** | Full 3-4 column grid, 3-zone Top Bar Contract |
| **G. Technical Integrity** | TypeScript build | **PASSED** | `tsc --noEmit` exits with 0 errors |
| | Vite compile | **PASSED** | Production bundle compiled successfully |

---

## 📁 Key Deliverables

- `prompt_logic.md`: Vietnamese technical and architectural report covering sections A through H.
- `showcase_script.md`: 45-second scene-by-scene demonstration script for video presentation.
- `src/`: Complete source code adhering to all prompt specifications.
