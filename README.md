# Layla & Omar — Wedding Invitation

A cinematic, single-page wedding invitation built with **plain HTML, CSS, and vanilla JavaScript**. No build step, no frameworks — just open `index.html` and it runs.

## ✨ Features

- Animated preloader
- Hero with parallax background
- Scroll progress bar
- Floating petals & a heart that travels along a curved path as you scroll
- Photo reveal with parallax
- Love-story chapters
- Live countdown to **Dec 20, 2026 · 8:00 PM**
- Calendar (December 2026) with the wedding day pulsing
- Cinematic venue section
- Day-of timeline
- Drag-to-explore photo gallery (mouse + touch)
- RSVP form (front-end only — wire up to your own backend)
- Background music toggle (with smooth fade)

## 📁 Project Structure

```
wedding-static/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── assets/
    ├── hero-bg.jpg
    ├── petra.jpg
    ├── beach-dance.jpg
    ├── pyramids-kiss.jpg
    ├── pyramids-walk.jpg
    ├── painting.jpg
    ├── cinema.jpg
    ├── sunset-hand.jpg
    └── lanterns.jpg
```

## 🚀 Run Locally

Just open `index.html` in your browser, or serve with any static server:

```bash
# Python
python3 -m http.server 8080

# Node
npx serve
```

Then visit http://localhost:8080.

## 🌐 Deploy (GitHub Pages)

1. Create a new GitHub repo and push these files.
2. In the repo settings → **Pages** → set the source to `main` branch / root.
3. Your invitation will be live at `https://<your-username>.github.io/<repo-name>/`.

Other one-click hosts that work out of the box:
- **Netlify** — drag-and-drop the folder onto https://app.netlify.com/drop
- **Vercel** — `vercel` from inside the folder
- **Cloudflare Pages** — connect the GitHub repo, no build command needed

## ✏️ Customize

- **Names**: edit them in `index.html` (preloader, hero, footer, final section).
- **Date**: change `TARGET` in `js/script.js` and the texts in `index.html`.
- **Venue & address**: edit the Location section in `index.html`.
- **Photos**: replace the files in `assets/` keeping the same names, or update the references in `index.html` and the gallery list in `js/script.js`.
- **Colors & typography**: tweak the CSS variables at the top of `css/styles.css`.
- **Music**: change the audio URL inside `js/script.js`.

## 📜 License

Personal use. Have a beautiful wedding ✦
