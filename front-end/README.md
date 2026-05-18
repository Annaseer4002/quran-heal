# Quran Heal — Read, Reflect, and Listen

Quran Heal is a lightweight SPA that helps users discover Quranic verses based on mood, read surahs in a mushaf-inspired layout, and listen to recitations. It uses the Quran Foundation content APIs (server-side) to fetch chapters, verse text, translations, and recitations.

**Demo:** (Deploy the `server/` and `front-end/` folders; see "Deployment" below.)

**Built for:** Hackathon / Quran Foundation challenge — submission-ready with documentation, demo script, and deployment instructions.

---

**Highlights**
- **Mood-based discovery:** Search by feeling/emotion (e.g., sad, fear, gratitude) to surface a curated featured ayah.
- **Mushaf-style reading:** Continuous Arabic flow, separate Bismillah, verse separators and verse-number badges.
- **Chapter cards:** Browse surahs as cards and open a detailed reader for each chapter.
- **Audio:** Chapter-level recitation playback (no autoplay) via Quran audio sources.
- **Responsive & accessible:** Mobile-first layout and fluid typography.

---

**Tech stack**
- Frontend: React (Vite), Tailwind CSS
- Backend: Node.js + Express (server proxy + wrappers around Quran Foundation APIs)
- API: Quran Foundation content APIs (authenticated server-side calls)

---

Getting started (local)

Prerequisites
- Node.js 16+ and npm/yarn
- Quran Foundation credentials (if you plan to run server endpoints that require auth): `QURAN_CLIENT_ID` and `QURAN_CLIENT_SECRET` — set these in the `server/.env` or your environment before starting the server.

Server (API proxy)
1. Open a terminal in the `server/` folder.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file or set environment variables:

- `QURAN_CLIENT_ID` — (client credentials)
- `QURAN_CLIENT_SECRET` — (client credentials)

4. Start the server in development:

```bash
npm run dev
```

The server exposes proxy endpoints under `/api` for the front-end to consume.

Frontend (developer)
1. Open a terminal in `front-end/`.
2. Install dependencies:

```bash
npm install
```

3. Start the dev server (Vite):

```bash
npm run dev
```

The front-end expects the API proxy to be available at `http://localhost:3000` (adjust Vite proxy in `vite.config.js` if needed).

---

API Endpoints (available in `server/index.js`)
- `GET /api/chapters` — list of chapters
- `GET /api/chapter/:chapterId` — chapter metadata
- `GET /api/verses/:chapterId` — verses for a chapter
- `GET /api/uthmani-tajweed/:chapterId` — uthmani text with tajweed formatting
- `GET /api/translations/:chapterId` — translations for a chapter
- `GET /api/recitations` — list available reciters
- `GET /api/recitation/:reciterId` — reciter info or chapter recitations

Note: Some endpoints require an OAuth2 client credentials flow handled by the server; do not embed secrets in the front-end.

---

Project structure (important files)
- `front-end/` — React app (Vite + Tailwind)
  - `src/components` — UI components (`search.jsx`, `readQuran.jsx`, `listenQuran.jsx`, `card.jsx`, `header.jsx`, `footer.jsx`)
  - `src/pages` — `home.jsx`, `Read.jsx`, `Listen.jsx`, `ChapterDetail.jsx`
- `server/` — Express API proxy and Quran Foundation client wrappers (`utils/quranClient.js`)

---

Submission checklist
- [ ] Finalize UI polish and responsiveness
- [ ] Verify all API routes work with production Quran Foundation credentials
- [ ] Create a short demo video (2–4 minutes) showing: Home, Mood search, Read view (mushaf), and Listen page
- [ ] Deploy demo (prefer Netlify/Vercel for front-end and Render/Heroku for server) and include a live URL
- [ ] Prepare screenshots and GIFs for the submission page
- [ ] Package repository with README, demo link, and video URL

Tips for the demo video
- Start with a one-line project elevator pitch.
- Show the mood search flow and the featured ayah result.
- Open a chapter in `Read` to show mushaf-style rendering and verse numbers.
- Play audio (show controls) — confirm no autoplay.
- Conclude with architecture overview and next steps.

---

Contributing
- Feel free to open issues or pull requests. For major changes, open an issue first to discuss scope.

License
- MIT — see `LICENSE` (add one if not present).

Contact
- Creator — add your preferred contact (email or portfolio link) here.

---

If you want, I can also:
- Generate a short demo script and storyboard for the video.
- Prepare screenshots (mobile/desktop) and GIF clips of key flows.
- Create a one-page submission summary tailored to the contest requirements.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
