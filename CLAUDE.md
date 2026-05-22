# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server
npm run build      # TypeScript type-check + Vite production build
npm run lint       # ESLint on all files
npm run preview    # Serve production build locally
```

## Architecture

A single-page React dashboard for home lab service navigation, driven by a YAML config file.

**Data flow:** `data/nav.yaml` is fetched at runtime, parsed with `js-yaml`, and rendered as categorized nav cards. Edit the YAML file to add/remove services — no code changes needed.

**Styling:** Tailwind CSS v4 with `oklch()` CSS custom properties for theming. The `useTheme` hook (`src/hooks/use-theme.ts`) manages light/dark/system mode by toggling a `.dark` class on `<html>`, persisting to `localStorage`. The `@custom-variant dark` directive in CSS scopes dark styles.

**Component tree:**
- `App` — top-level: fetches YAML, owns loading/error/empty states, renders header (title, refresh button, ThemeToggle) and the category list
- `CategorySection` — renders a titled section with an icon and a responsive grid of `NavCard` components
- `NavCard` — a single `<a>` card linking to a service URL (opens in new tab)
- `DynamicIcon` — maps icon name strings from YAML to Lucide React components via a static lookup table
- `ThemeToggle` — cycles light → dark → system, consumes `useTheme`

**Types** (`src/lib/types.ts`): `NavConfig { title, subtitle, categories[] }` → `Category { name, icon, items[] }` → `NavItem { name, url, icon, description }`

**Adding a new icon:** Import the icon from `lucide-react` in `src/components/icons.tsx` and add an entry to `iconMap`. The YAML `icon` field maps directly to the map key.
