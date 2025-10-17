export const quotes = [
  "Chaos is just creativity waiting for a neon outline.",
  "Build the world you wish existed, then give it particle effects.",
  "Dream in gradients, ship in pixels.",
  "The future is a canvas—spray it with photons.",
  "Ideas are just glitches that never got patched.",
  "Invent a reality where you already won.",
  "If it glows, it goes.",
  "Code spells are best cast under ultraviolet light.",
  "Design like a poet, debug like a scientist.",
  "Pixels are portals for those brave enough to dive.",
  "Some doors are locked; we render our own.",
  "Neon nights are better than daylight logic.",
  "Stop scrolling, start conjuring.",
  "Art is just math with better storytelling.",
  "Glitches are love letters from alternate timelines.",
  "The muse speaks fluent TypeScript.",
  "Invent impossible modes; then press start.",
  "Shadows prove the lights are working.",
  "Every idea deserves a synthwave sunrise."
];

export const getRandomQuote = (exclude?: string): string => {
  const filtered = quotes.filter((quote) => quote !== exclude);
  return filtered[Math.floor(Math.random() * filtered.length)] ?? quotes[0];
};
