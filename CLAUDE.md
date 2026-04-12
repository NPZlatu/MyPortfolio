# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:5173)
npm run build        # Production build (static pre-rendering)
npm run preview      # Preview production build locally
npm run check        # Validate Svelte components and TypeScript
npm run check:watch  # Continuous validation in watch mode
npm run deploy       # Build and deploy to GitHub Pages
```

No test framework is configured in this project.

## Architecture

This is a **single-page portfolio website** built with SvelteKit and deployed as a static site to GitHub Pages via `adapter-static`.

**Page structure**: `src/routes/+page.svelte` is the sole route — it composes all section components in order: Header → Hero → About → Resume → Article → Contact → Footer. Navigation in the Header uses anchor links (`#section-id`) for smooth scrolling between sections.

**Components** (`src/components/`) are self-contained with scoped CSS. Each maps to a visible page section. The `Seo.svelte` component manages all `<head>` meta tags (Open Graph, Twitter Cards).

**Styling**: Global styles in `src/global.css` set the black background and Poppins font. The accent color is `#ffbd39` (yellow). Bootstrap 3 (CDN) handles the grid system. Component styles are scoped.

**Images**: Stored as `.webp` files in `src/lib/images/` and imported directly in components (Vite optimizes them). Import with `import img from "$lib/images/file.webp"`.

**Contact form**: Links externally to Google Forms — there is no server-side form handling.

**Deployment**: `npm run deploy` runs `predeploy` (build with 8GB Node memory) then pushes the `build/` directory to GitHub Pages via the `gh-pages` package.
