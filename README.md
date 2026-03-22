# Niraj Paudel — Portfolio

Personal portfolio website for Niraj Paudel, Software Engineer & Writer based in Auckland, New Zealand.

Live at: [nirajpaudel.me](https://nirajpaudel.me)

---

## Stack

- **SvelteKit** — framework and static site generation
- **mdsvex** — markdown as Svelte components (powers the Notebook section)
- **adapter-static** — prerendered static output, deployed to GitHub Pages
- **Vite** — build tooling
- Custom CSS with CSS variables — no UI framework, no Bootstrap

---

## Project Structure

```
src/
  routes/
    +page.svelte          # Single-page app, composes all sections
  components/
    Header.svelte         # Fixed nav with NP monogram logo
    Hero.svelte           # Rotating featured writings epigraph
    About.svelte          # Bio + skills colophon
    Experience.svelte     # Work history (tier 1 cards + tier 2 list) + hackathon badge
    Research.svelte       # Academic research projects (AIS)
    Notebook.svelte       # On-site writings + external articles
    Education.svelte      # Education + academic excellence certificate lightbox
    Contact.svelte        # Contact details
    Footer.svelte         # Quote + nav links
    QuizModal.svelte      # A Good Day to Quiz Hard — movie dialogue quiz game
    Seo.svelte            # Head meta tags
  content/
    writings/             # Markdown files with YAML frontmatter (Notebook content)
  lib/
    content.js            # Loads and exports all writings via import.meta.glob
    quizData.js           # 100 movie dialogue questions for the quiz
    stores/
      notebook.js         # openSlug writable store (hero → notebook navigation)
    utils/
      observer.js         # Svelte action for scroll-triggered fade-in animations
  global.css              # CSS custom properties, typography, base styles
static/
  favicon.svg             # SVG favicon (modern browsers)
  favicon.ico             # ICO fallback
  favicon-16.png          # 16×16 PNG
  favicon-32.png          # 32×32 PNG
  favicon-192.png         # Android/PWA
  favicon-512.png         # Android/PWA splash
  apple-touch-icon.png    # iOS home screen
  site.webmanifest        # PWA manifest
  academic_excellence.jpeg # Certificate of Academic Excellence (AIS, Trimester 2 2025)
```

---

## Sections

| Section | Description |
|---|---|
| Hero | Rotates through featured writings every 7 seconds. Clicking the epigraph navigates to that piece in the Notebook. |
| About | Career bio, skills colophon (languages, frameworks, tools). |
| The Work | Tier 1: Law Cyborg + UBA Solutions SDET as editorial chapter cards. Tier 2: compact timeline of earlier roles. Includes React Riot 2018 Hacker Favorite badge with the movie quiz game. |
| The Research | Two AIS research projects: "Small Wins" Slack Bot (COMP902) and RAGAS metrics reliability study (COMP903). |
| The Notebook | On-site writings (expand inline) and external articles (LinkedIn, Medium). Filter by type. First 3 pinned pieces shown by default with show more toggle. |
| The Learning | AIS Master of IT (current) with Certificate of Academic Excellence lightbox. Earlier degrees listed compactly. |
| Contact | Email, phone, location, LinkedIn, GitHub, Medium. |

---

## Notebook Content

Writings live in `src/content/writings/` as Markdown files with YAML frontmatter:

```yaml
---
title: "The In-Between"
type: reflection        # reflection | parable | technical | essay
date: "2025-01-01"
featured: true
pinned: true            # shows in first 3 by default
excerpt: "..."
---
```

External articles use `externalUrl` instead of body content — they render as links in the Notebook list and open in a new tab from the hero epigraph.

---

## Quiz

*A Good Day to Quiz Hard* — built originally for React Riot 2018, awarded Hacker Favorite by Hackbit. Accessible via the "Play it →" button in the Work section hackathon badge.

- 100 movie dialogue questions, 10 random per game
- 4 multiple choice options per question
- Hints, scoring, Web Audio API sound effects
- GIFs via Tenor API for correct/wrong feedback
- Fully responsive

---

## Commands

```bash
npm run dev        # Dev server at localhost:5173
npm run build      # Production build (static prerender)
npm run preview    # Preview production build locally
npm run check      # Svelte + TypeScript validation
npm run deploy     # Build and deploy to GitHub Pages
```

---

## Design

Warm editorial aesthetic — paper tones, serif headings, monospace labels.

| Variable | Value | Use |
|---|---|---|
| `--bg` | `#FAF6F0` | Page background |
| `--text` | `#2C2C2C` | Body text |
| `--accent` | `#B85C38` | Terracotta — links, highlights |
| `--accent-green` | `#3A5A40` | Tags, awards |
| `--border` | `#D4CFC7` | Dividers |
| `--font-display` | Cormorant Garamond | Headings |
| `--font-body` | Lora | Prose |
| `--font-mono` | JetBrains Mono | Labels, code, meta |
| `--font-nav` | Jost | Navigation |

---

## Deployment

Deployed as a static site to GitHub Pages via the `gh-pages` package.

```bash
npm run deploy
```

This runs `vite build` (with 8GB Node memory) then pushes the `build/` directory to the `gh-pages` branch.

---

## Contact

Niraj Paudel — [itsmenirajpaudel@gmail.com](mailto:itsmenirajpaudel@gmail.com)
