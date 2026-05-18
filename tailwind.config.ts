/**
 * Tailwind CSS v4 — configuration reference
 *
 * In Tailwind v4 the primary configuration surface has moved into CSS:
 *   - Design tokens  →  @theme { … }  in src/styles/globals.css
 *   - Dark mode      →  @custom-variant dark (&:where(.dark, .dark *))
 *   - Vite plugin    →  @tailwindcss/vite in vite.config.ts
 *
 * This file exists for IDE tooling awareness only; Tailwind v4 does not
 * read a tailwind.config.ts at build time when using the Vite plugin.
 */
import type { Config } from 'tailwindcss'

export default {
  // "class" strategy: add/remove the `dark` class on <html> to switch themes.
  // Mirrored by @custom-variant dark in globals.css.
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
} satisfies Config
