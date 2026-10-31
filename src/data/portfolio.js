// ─────────────────────────────────────────────────────────────
// Central portfolio configuration — everything personal lives here.
// Replace the placeholders with real values; no component edits needed.
// ─────────────────────────────────────────────────────────────

export const portfolio = {
  projectName: "mamuu-work",
  artistName: "Mamuu",
  wordmark: "MAMUU",
  websiteTitle: "Mamuu — Artist Portfolio",
  characterName: "Mamuu OC",

  // Client biography (rev 28, client-supplied copy).
  biography:
    "I started my career since the age of 15 in the creative industry, specializing in music videos, motion graphics, visualizers, and live event visuals (BGAs/visualizers), beginning with Indonesian government projects before expanding into creative visual production for international clients. Currently, I am focusing on creating event visuals on a national and international scale, as well as producing music videos for indie and international Virtual YouTubers (VTubers).",

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
