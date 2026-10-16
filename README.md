# Molinda Mihiranga — Portfolio

An animated, static portfolio built with Astro. Project content and screenshot captions live in `src/data/projects.ts`. The screenshot files live in `public/projects/`.

The portrait-led design uses `src/styles/global.css` and `src/scripts/interactions.ts` for light/dark themes, saved theme preferences, an expandable project index, mobile navigation, and scroll reveals. The portrait lives in `public/images/molinda.png`. The initial theme follows the device preference. Animations respect reduced-motion settings.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The static site is generated in `dist/`.

## Deploy to Vercel

Push this repository to GitHub and import it in Vercel. Vercel detects Astro automatically. The build command is `npm run build` and the output directory is `dist`.

## Deploy to GitHub Pages

The included GitHub Actions workflow deploys on pushes to `main`. In repository Settings → Pages, choose **GitHub Actions** as the source. For a root site, name the repository `MolindaMihiranga17.github.io`. If using a different repository name, add a repository variable named `SITE_BASE` with the value `/<repository-name>/` before deployment.

## Public CV

The Download CV buttons serve `public/resume/Molinda-Mihiranga-CV.pdf`, an unchanged copy of `C:/Users/user/Desktop/Molinda_Mihiranga_CV.pdf`, as requested by the owner.

To update the download, replace that public PDF with the latest original CV. The earlier shortened version in `documents/public-resume.html` is retained as an optional alternative and is not used for the download.

## Screenshot gallery

Project galleries use a native dialog lightbox with previous/next buttons, arrow keys, Home/End, Escape, touch swipes, and focus restoration. Without JavaScript, screenshot links open the original images. Add screenshots and captions in `src/data/projects.ts` to include them automatically.
