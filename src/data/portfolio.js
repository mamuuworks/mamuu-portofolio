// ─────────────────────────────────────────────────────────────
// Central portfolio configuration — everything personal lives here.
// Replace the placeholders with real values; no component edits needed.
// ─────────────────────────────────────────────────────────────

export const portfolio = {
  projectName: "mamuu-portofolio",
  artistName: "Mamuu",
  wordmark: "MAMUU",
  websiteTitle: "Mamuu — Artist Portfolio",
  characterName: "Mamuu OC",

  // TEMPORARY biography — replace with verified copy.
  biography:
    "I started my career at the age of 16 in the creative industry, exploring illustration, character design, and visual storytelling. My work is inspired by playful forms, expressive characters, and the little details that make each artwork feel alive. I enjoy experimenting with different visual styles while building a personal world through my art.",

  // Real destinations (client, rev 13).
  socialLinks: {
    x: "https://x.com/mamsenpai",
    instagram: "https://www.instagram.com/mamsenpai",
    email: "mailto:sayhitomamuu@gmail.com",
    vgen: "https://vgen.co/mamsenpai",
  },

  // Mamuu OC portrait. The current file is a generated placeholder
  // (art/character.svg rasterized); replace it with the real illustration.
  characterImage: "/images/character/character.png",
};

// Six gallery slots. `image` is optional: while it is null the site renders
// an original SVG placeholder from src/components/WorksArt.jsx.
// Titles/descriptions below are sample content to replace.
export const works = [
  {
    id: "work-01",
    title: "Little parade",
    description: "Sample entry. Replace title, description and image in src/data/portfolio.js.",
    image: "/images/works/work-01.png",
    art: "parade",
  },
  {
    id: "work-02",
    title: "Sun study",
    description: "Sample entry. Replace title, description and image in src/data/portfolio.js.",
    image: "/images/works/work-02.png",
    art: "sun",
  },
  {
    id: "work-03",
    title: "Plant friend",
    description: "Sample entry. Replace title, description and image in src/data/portfolio.js.",
    image: "/images/works/work-03.png",
    art: "plant",
  },
  {
    id: "work-04",
    title: "Bath time",
    description: "Sample entry. Replace title, description and image in src/data/portfolio.js.",
    image: "/images/works/work-04.png",
    art: "bath",
  },
  {
    id: "work-05",
    title: "Rainy window",
    description: "Sample entry. Replace title, description and image in src/data/portfolio.js.",
    image: "/images/works/work-05.png",
    art: "window",
  },
  {
    id: "work-06",
    title: "Three creatures",
    description: "Sample entry. Replace title, description and image in src/data/portfolio.js.",
    image: "/images/works/work-06.png",
    art: "creatures",
  },
];

// Primary navigation.
export const sections = [
  { id: "home", label: "HOME" },
  { id: "work", label: "WORK" },
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
];

// Top bar buttons (client: HOME & CONTACT live in the menu overlay only).
export const navSections = [
  { id: "work", label: "WORK" },
  { id: "about", label: "ABOUT" },
];
