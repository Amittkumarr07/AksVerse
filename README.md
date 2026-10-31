# AksVerse 2.0 — Amit Kumar's Portfolio

A React + TypeScript portfolio for Amit Kumar, built with Vite, React Router, Framer Motion and custom CSS.

## Requirements
- Node.js 20+
- npm

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages
The repository is configured for the custom domain `theamitkumar.in`.

1. Push this project to the GitHub repository you want to use.
2. In GitHub, open **Settings → Pages** and select **GitHub Actions** or deploy using the package script below.
3. To use the included `gh-pages` deployment script:
   ```bash
   npm install
   npm run deploy
   ```
4. In repository Settings → Pages, choose the `gh-pages` branch if using the script.
5. Keep the `public/CNAME` file so GitHub Pages knows the custom domain.

If using GitHub Actions, add a workflow that installs dependencies, runs `npm run build`, and deploys the `dist` directory. The included `public/CNAME` is copied into `dist` during build.

## Routes
Public:
- `/`
- `/about`
- `/projects`
- `/experience`
- `/certificates`
- `/contact`

Unlisted / hidden:
- `/terminal`
- `/lab`
- `/easter-eggs`
- `/uses`

The hidden routes are unlisted, not access-controlled.

## Project structure
```
src/
  data.ts            <- ALL editable content: profile, projects, certificates, skills, timeline
  App.tsx            <- the list of routes
  main.tsx           <- app entry point
  styles.css         <- all styles, in labelled sections
  pages/             <- one file per page (Home, About, Projects, ...)
  components/        <- shared pieces (Header, Footer, ProjectCard, ...)
  hooks/useTheme.ts  <- dark / light theme
```

## Editing content
Almost everything you will want to change is in `src/data.ts`:
- `profile` - name, email and social links
- `projects` - add or edit project cards (counts on the home page update automatically)
- `certificates`, `skills`, `timeline`

Page-specific text (for example the About paragraphs) lives in the matching file in `src/pages/`.
Colours and fonts are CSS variables at the top of `src/styles.css`.

## Notes
- The contact form opens the Google Form from the supplied README.
- No resume file or personal portrait was supplied, so neither is fabricated.
- Project art is generated with CSS rather than external placeholder images.
- The website uses a client-side router. GitHub Pages can serve the root URL directly; if custom paths return 404 on refresh, add a Pages SPA fallback or switch to hash routing.
