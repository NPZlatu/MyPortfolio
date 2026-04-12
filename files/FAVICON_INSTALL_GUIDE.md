# Favicon Installation Guide

## Files included:
- `favicon.svg` — Vector favicon (crispest, used by modern browsers)
- `favicon.ico` — Classic favicon (16px + 32px embedded, legacy browser support)
- `favicon-32.png` — 32x32 PNG
- `favicon-16.png` — 16x16 PNG
- `favicon-192.png` — 192x192 PNG (Android/PWA)
- `favicon-512.png` — 512x512 PNG (Android/PWA splash)
- `apple-touch-icon.png` — 180x180 PNG (iOS home screen)
- `site.webmanifest` — PWA manifest file

## Installation in SvelteKit:

1. Copy ALL files into your `static/` folder:
   ```
   static/
     favicon.svg
     favicon.ico
     favicon-16.png
     favicon-32.png
     favicon-192.png
     favicon-512.png
     apple-touch-icon.png
     site.webmanifest
   ```

2. Add these lines to the `<head>` in your `src/app.html`:
   ```html
   <link rel="icon" href="/favicon.svg" type="image/svg+xml">
   <link rel="icon" href="/favicon.ico" sizes="32x32">
   <link rel="apple-touch-icon" href="/apple-touch-icon.png">
   <link rel="manifest" href="/site.webmanifest">
   <meta name="theme-color" content="#2C2C2C">
   ```

That's it. The SVG favicon is preferred by modern browsers (Chrome, Firefox, Edge).
The .ico is the fallback for older browsers. The apple-touch-icon handles iOS.
The webmanifest handles Android home screen icons.
