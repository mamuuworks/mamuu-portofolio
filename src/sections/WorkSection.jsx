import { useState } from "react";
import ArtworkCard from "../components/ArtworkCard.jsx";
import ArtworkLightbox from "../components/ArtworkLightbox.jsx";
import ScrambleText from "../components/ScrambleText.jsx";
import { works, portfolio } from "../data/portfolio.js";

/**
 * WORK — the wordmark returns huge, centred above the grid;
 * six mac-style window slots, three columns on desktop.
 */
export default function WorkSection() {
  const [active, setActive] = useState(null);

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
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-7 lg:grid-cols-3">
        {works.map((work, i) => (
          <ArtworkCard key={work.id} work={work} index={i} onOpen={setActive} />
        ))}
      </div>

      <ArtworkLightbox work={active} onClose={() => setActive(null)} />
    </section>
  );
}
