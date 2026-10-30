import { useCallback, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import Navigation from "./components/Navigation.jsx";
import MenuOverlay from "./components/MenuOverlay.jsx";
import HomeSection from "./sections/HomeSection.jsx";
import WorkSection from "./sections/WorkSection.jsx";
import AboutSection from "./sections/AboutSection.jsx";
import ContactSection from "./sections/ContactSection.jsx";
import { sections } from "./data/portfolio.js";

// Hash-routed pages: #/work etc. Keeps the back/forward-free, instant feel of a
// one-build site while giving every section its own page and URL.
const PAGES = {
  home: HomeSection,
  work: WorkSection,
  about: AboutSection,
  contact: ContactSection,
};

const pageFromHash = () => {
  if (typeof window === "undefined") return "home";
  const id = window.location.hash.replace(/^#\/?/, "");
  return PAGES[id] ? id : "home";
};

export default function App() {
  // ?menu=1 opens the overlay straight away (deep-link / screenshot testing).
  const [menuOpen, setMenuOpen] = useState(() =>
    typeof window === "undefined" ? false : new URLSearchParams(window.location.search).has("menu")
  );
  const [page, setPage] = useState(pageFromHash);

  const navigate = useCallback((id) => {
    setMenuOpen(false);
    setPage(id);
    window.history.replaceState(null, "", id === "home" ? "#" : `#/${id}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const Page = PAGES[page];

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
      >
        Skip to content
      </a>
      <Navigation active={page} menuOpen={menuOpen} onMenuOpen={() => setMenuOpen(true)} onNavigate={navigate} />
      <main id="main">
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Page />
        </motion.div>
      </main>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={navigate} />
    </MotionConfig>
  );
}
