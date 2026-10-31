import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ArtworkCard from "../components/ArtworkCard.jsx";
import ArtworkLightbox from "../components/ArtworkLightbox.jsx";
import ScrambleText from "../components/ScrambleText.jsx";
import { imageWorks, portfolio, works } from "../data/portfolio.js";

const TABS = [
  { id: "video", label: "Video" },
  { id: "images", label: "Images" },
];

/**
 * WORK — the wordmark returns huge, centred above the grid;
 * Video/Images tabs switch what the grid holds (rev 34).
 */
export default function WorkSection() {
  const [tab, setTab] = useState("video");
  const [active, setActive] = useState(null);
  const reduced = useReducedMotion();
  const items = tab === "video" ? works : imageWorks;

  return (
    <section id="work" aria-labelledby="works-title" className="page-pad py-24 md:py-36">
      <div className="mb-10 flex flex-col items-center text-center md:mb-14">
        <h1 id="works-title">
          <span className="sr-only">Works</span>
          <span
            aria-hidden="true"
            className="block select-none font-aurix text-[clamp(3.8rem,13vw,12.5rem)] leading-[0.9] tracking-[-0.03em]"
          >
            <ScrambleText text={portfolio.wordmark} delay={250} duration={900} />
          </span>
        </h1>
        <p
          aria-hidden="true"
          className="relative z-10 -mt-3 text-[13px] uppercase tracking-[0.16em] text-ink font-vcr"
        >
          <ScrambleText text="Works" delay={1100} />
        </p>

        {/* Video / Images tabs (rev 34) — flat fill for the active one */}
        <div className="mt-8 flex gap-2" role="group" aria-label="Work type">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={tab === t.id}
              onClick={() => {
                setTab(t.id);
                setActive(null);
              }}
              className={`px-4 py-2 font-vcr text-base transition-colors duration-300 ${
                tab === t.id ? "bg-ink text-canvas" : "text-mute hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: reduced ? 0 : 0.25, ease: "easeOut" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-7 lg:grid-cols-3"
        >
          {items.map((work, i) => (
            <ArtworkCard key={work.id} work={work} index={i} onOpen={setActive} />
          ))}
        </motion.div>
      </AnimatePresence>

      <ArtworkLightbox work={active} onClose={() => setActive(null)} />
    </section>
  );
}
