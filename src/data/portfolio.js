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

// Works. Since rev 31 the list migrates to the client's real video works:
// a video entry carries `videoUrl` + `credits` and the lightbox renders the
// credit roll with a WATCH ON YOUTUBE link (the card keeps its still frame,
// grayscaled to stay inside the monochrome palette). The remaining entries
// are sample placeholders to replace.
// Works. Since rev 32 the list is the client's real video works only:
// every entry carries `videoUrl` (the YouTube watch link, deep-linked to
// the featured moment), `video` + `poster` (a self-hosted 30-second clip
// cut from that moment, autoplayed muted + looped on the card, grayscaled
// to stay inside the monochrome palette) and `credits` — an array of
// [role, names] where each name is `{ name, url? }` and url (usually the
// person's X/Twitter) renders as a link in the lightbox credit roll.
export const works = [
  {
    id: "jane-doe",
    title: "Jane Doe - Kenshi Yonezu & Utada Hikaru (Limina Alteri & Hiyori Mokami cover)",
    videoUrl: "https://youtu.be/0azi-Z4ttT4?t=62",
    video: "/videos/jane-doe.mp4",
    poster: "/videos/jane-doe.jpg",
    credits: [
      ["Vocals", [{ name: "Limina Alteri" }, { name: "HiyoriMokami" }]],
      ["Video", [{ name: "mamuu", url: "https://x.com/mamsenpai" }]],
      ["English Lyrics", [{ name: "Limina Alteri" }]],
      ["Illustration", [{ name: "Art of Raven", url: "https://x.com/AimableManahira" }]],
      ["Time/Tune", [{ name: "Nara", url: "https://x.com/The_girlbehind" }]],
      ["Mix", [{ name: "KuroKi", url: "https://x.com/kurongeng" }]],
      ["Inst", [{ name: "Mick Music" }]],
    ],
  },
  {
    id: "mosi-mosi",
    title: "mosi mosi? (Karissa Sharlotte cover)",
    videoUrl: "https://youtu.be/-iHSxWKb7Ms?t=112",
    video: "/videos/mosi-mosi.mp4",
    poster: "/videos/mosi-mosi.jpg",
    credits: [
      ["Vocal", [{ name: "Karissa Sharlotte" }]],
      ["Mix", [{ name: "tadada", url: "https://x.com/tadada69" }]],
      ["Illust", [{ name: "naru", url: "https://x.com/mendakonaru" }]],
      ["MV", [{ name: "mamuu", url: "https://x.com/mamsenpai" }, { name: "Reyn", url: "https://x.com/reyn_scz" }]],
      ["CC Translations JP-ID", [{ name: "MDDD0", url: "https://x.com/MiDodododonkats" }]],
    ],
  },
  {
    id: "hit-me-up",
    title: "KIRA x ASTEROID - HIT ME UP (Vulpie cover)",
    videoUrl: "https://youtu.be/zYMRjC5I9AI?t=159",
    video: "/videos/hit-me-up.mp4",
    poster: "/videos/hit-me-up.jpg",
    credits: [
      ["Vocal", [{ name: "vulpiepie", url: "https://x.com/vulpiepie" }]],
      ["Vocal Mixing & Mastering", [{ name: "overspacemusic", url: "https://x.com/overspacemusic" }]],
      ["Music Video", [{ name: "mamsenpai", url: "https://x.com/mamsenpai" }]],
      ["Illustration", [{ name: "c4t_lynx", url: "https://x.com/c4t_lynx" }]],
    ],
  },
  {
    id: "wordy",
    title: "wordy. feat. amiaryllis",
    videoUrl: "https://youtu.be/1C1vsGE0LLQ?t=56",
    video: "/videos/wordy.mp4",
    poster: "/videos/wordy.jpg",
    credits: [
      ["Music", [{ name: "stickii B" }]],
      ["Vocals", [{ name: "amiaryllis", url: "https://x.com/amiaryllis_" }]],
      ["Mastering", [{ name: "AZALI", url: "https://x.com/AZALI00013" }]],
      ["MV", [{ name: "mamsenpai", url: "https://x.com/mamsenpai" }]],
    ],
  },
  {
    id: "undefeated",
    title: "Undefeated - XG x VALORANT (Ver. Keomio)",
    videoUrl: "https://youtu.be/XCuwRDAzl_0?t=74",
    video: "/videos/undefeated.mp4",
    poster: "/videos/undefeated.jpg",
    credits: [
      ["Vocals", [{ name: "keomio" }]],
      ["Arrangement + Mix", [{ name: "cosmowave" }]],
      ["Art", [{ name: "yuuk1_0wo" }]],
      ["MV", [{ name: "mamsenpai", url: "https://x.com/mamsenpai" }]],
      ["Original", [{ name: "UNDEFEATED - XG & VALORANT" }]],
    ],
  },
  {
    id: "code-x",
    title: "Code X - Yutsuri & vivid. feat. Airi Cordelia",
    videoUrl: "https://youtu.be/gqLXXXfjDYA?t=157",
    video: "/videos/code-x.mp4",
    poster: "/videos/code-x.jpg",
    credits: [
      ["Music Producer", [{ name: "u3yutsuri" }, { name: "vividdd_" }]],
      ["Vocal & Lyrics", [{ name: "airicordelia" }]],
      ["Illustrator", [{ name: "k_yura1907" }]],
      ["Cover Art", [{ name: "izzaahlana" }]],
      ["Music Video", [{ name: "mamsenpai", url: "https://x.com/mamsenpai" }]],
    ],
  },
  {
    id: "dreamseeker",
    title: "dreamseeker",
    videoUrl: "https://youtu.be/9FSP1asKwLA?t=102",
    video: "/videos/dreamseeker.mp4",
    poster: "/videos/dreamseeker.jpg",
    credits: [
      ["Vocals", [{ name: "Eva Ananova" }, { name: "Tomoe Carmine" }]],
      ["Lyrics", [{ name: "Eva Ananova" }, { name: "xia" }]],
      ["Written By", [{ name: "Eva Ananova" }, { name: "GIN" }, { name: "Un3H" }, { name: "Tomoe Carmine" }, { name: "xia" }]],
      ["Arranged By", [{ name: "Flay!" }]],
      ["Vocal Editing", [{ name: "kanalia_s" }]],
      ["Mix & Master Engineer", [{ name: "Flay!" }]],
      ["MV", [{ name: "mamuu", url: "https://x.com/maguro2242" }]],
      ["Jacket Illust", [{ name: "tuna", url: "https://x.com/maguro2242" }]],
    ],
  },
  {
    id: "watch-me-woo",
    title: "Watch Me Woo! (Haishe x Beryl cover)",
    videoUrl: "https://youtu.be/yR-u1e9m23Q?t=103",
    video: "/videos/watch-me-woo.mp4",
    poster: "/videos/watch-me-woo.jpg",
    credits: [
      ["Original", [{ name: "Watch Me Woo! - PLAVE" }]],
      ["Vocals", [{ name: "HaisheVT" }, { name: "BerylBijoux" }]],
      ["Mix/Tune/Timing", [{ name: "maxdeMaxine", url: "https://x.com/maxdeMaxine" }]],
      ["Illustration", [{ name: "marutaro02", url: "https://x.com/marutaro02" }]],
      ["Video", [{ name: "mamsenpai", url: "https://x.com/mamsenpai" }]],
    ],
  },
  {
    id: "romeo-cinderella",
    title: "Romeo and Cinderella (Chrysalia Csilla cover)",
    videoUrl: "https://youtu.be/ENxtkyI4PdU?t=67",
    video: "/videos/romeo-cinderella.mp4",
    poster: "/videos/romeo-cinderella.jpg",
    credits: [
      ["Vocals", [{ name: "ChrysaliaCsilla" }]],
      ["Tune Time", [{ name: "kanalia", url: "https://x.com/kanalia_s" }]],
      ["Mix", [{ name: "PLiXoR", url: "https://x.com/plixormusic" }]],
      ["Art", [{ name: "kabesasu", url: "https://x.com/kabesasu" }]],
      ["MV", [{ name: "mamuu", url: "https://x.com/mamsenpai" }]],
    ],
  },
];

// Images tab (rev 34). Placeholder gallery until real artwork arrives:
// the six original character studies (rev 8 art, grayscale 1600×900),
// restored from the pre-rev-32 list. Titles + notes are samples — swap
// with the client's real pieces.
export const imageWorks = [
  { id: "little-parade", title: "Little parade", image: "/images/works/work-01.png", description: "Character study — parade poster." },
  { id: "sun-study", title: "Sun study", image: "/images/works/work-02.png", description: "Character study — sticker sheet." },
  { id: "plant-friend", title: "Plant friend", image: "/images/works/work-03.png", description: "Character study — riso print." },
  { id: "bath-time", title: "Bath time", image: "/images/works/work-04.png", description: "Character study — zine spread." },
  { id: "rainy-window", title: "Rainy window", image: "/images/works/work-05.png", description: "Character study — palette study." },
  { id: "three-creatures", title: "Three creatures", image: "/images/works/work-06.png", description: "Character study — pattern tile." },
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
