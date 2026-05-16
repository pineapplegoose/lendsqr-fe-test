# Lendsqr Frontend Engineer Assessment

A pixel-perfect implementation of the Lendsqr Admin Console built as part of the Lendsqr Frontend Engineer assessment.

**Live App:** https://teniola-kalaro-lendsqr-fe-test.vercel.app

---

## Pages

- **Login** — Email and password authentication with client-side validation
- **Dashboard** — Summary stats and navigation
- **Users** — Paginated table of 500 mock users with filtering and status indicators
- **User Details** — Full user profile retrieved from localStorage

---

## Tech Stack

| Tech | Reason |
|------|--------|
| React + TypeScript | Required by assessment. TypeScript used throughout for full type safety |
| SCSS | Required by assessment. Modular, scoped styles per component |
| Chakra UI | Used selectively for accessible primitives — all visual styling done in SCSS |

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# clone the repo
git clone https://github.com/your-username/teniola-kalaro-lendsqr-fe-test.git

# navigate into the project
cd teniola-kalaro-lendsqr-fe-test

# install dependencies
npm install

# start the dev server
npm run dev
```

App runs on `http://localhost:3000`

### Running Tests

```bash
npm run test
```

---

## Project Structure

```
src/
├── components/        # reusable UI components
├── pages/             # one folder per page (Login, Dashboard, Users, UserDetails)
├── types/             # shared TypeScript interfaces and types
├── styles/            # global SCSS variables, mixins, and resets
├── services/          # API calls and localStorage utilities
└── utils/             # helper functions
```

---

## Data & API

Mock data was generated using [json-generator.com](https://json-generator.com) — 500 user records structured to match the fields in the Figma design.

- Data is fetched on mount on the Users page
- On row click, the selected user object is saved to `localStorage` keyed by user ID
- The User Details page reads from `localStorage` — data persists on refresh and direct URL access

---

## Responsiveness

All pages are fully mobile responsive:

- Sidebar collapses to a hamburger menu on mobile
- Stat cards stack vertically on smaller screens
- Users table converts to a scrollable card layout on mobile

---

## Design Decisions

- SCSS variables and mixins were set up from the start to match Figma design tokens — no hardcoded colour or spacing values
- Chakra UI was used only where it added accessibility value (modals, tooltips) — never as a styling shortcut
- All visual decisions follow the Figma design exactly with no intentional deviations

---

## Assessment Checklist

- [x] Login page
- [x] Dashboard page
- [x] Users page with 500 mock records
- [x] User Details page with localStorage
- [x] Mobile responsive
- [x] TypeScript throughout
- [x] SCSS for styling
- [x] Unit tests
- [x] Deployed on Vercel

---

## Author

**Teniola Kalaro**
[LinkedIn](https://linkedin.com/in/teniola-kalaro) · [GitHub](https://github.com/pineapplegoose)
