# mahiiruu_ Art Master Edition

An immersive, cinematic portfolio built with Vite, React, TypeScript, Tailwind CSS, Framer Motion, React Router, and ShadCN UI.

## Quickstart

```bash
npm install
npm run dev
```

Visit the local URL printed in the terminal (usually http://localhost:5173) to explore the site.

## Pages & Content

- **Home** – Neon introduction, tagline, and quick jumps into the experience.
- **Ảnh để đời 📸** – Responsive glassmorphism gallery with hover motion.
- **Story Mode ⏳** – Timeline-driven yearly cards with smooth transitions into detailed monthly stories.

## Customize the Gallery & Story

### Picture Gallery
1. Open `src/pages/Picture.tsx`.
2. Replace the image URLs inside the `images` array with your own links.
3. Adjust captions or animations as desired.

### Story Mode
1. Open `src/pages/Story.tsx`.
2. Update the `timeline` array with your own `year`, `description`, `image`, and `note` values.
3. Tailor the descriptive paragraph inside each timeline card to match your narrative.
4. Dive into per-year details inside `src/pages/StoryYear.tsx` to curate monthly entries with custom photos and notes.

### Story Expansion + Mobile Fix
- Story Mode now routes to `/story/:year`, revealing month-by-month imagery and captions for each highlighted year.
- Mobile typography auto-wraps with the new Outfit font, ensuring long captions and neon copy stay inside the viewport.
- Global containers enforce `overflow-x-hidden` and responsive spacing so galleries, stories, and toggles remain thumb-friendly on 360px screens.

## Cinematic Layers & Toggles

- The ambient particle field (`BackgroundFX`) is enabled by default. Toggle it via the ✨ button in the footer.
- The simulated music wave (`MusicWave`) pulses along the bottom edge. Toggle it via the 🎵 button in the footer.

You can tweak the defaults inside `src/App.tsx` if you prefer either layer disabled on initial load.

## Styling & Motion Tweaks

- Tailwind theme configuration lives in `tailwind.config.ts`. Adjust the neon palette or font family there.
- Global base styles and reusable utilities are in `src/index.css`.
- Animations are powered by Framer Motion components sprinkled throughout `src/pages` and `src/components`.
- Buttons follow the ShadCN UI pattern located at `src/components/ui/button.tsx`. Extend variants to craft new UI controls.

## Build for Production

```bash
npm run build
```

This runs TypeScript type checks and compiles an optimized production build.

