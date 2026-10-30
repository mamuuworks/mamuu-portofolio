import { motion } from "framer-motion";
import ScrambleText from "../components/ScrambleText.jsx";
import { portfolio } from "../data/portfolio.js";

const EASE = [0.22, 1, 0.36, 1];

/**
 * ABOUT — its own page. The heading and the biography sit centred, with no
 * portrait: the words carry the whole page, revealed sentence by sentence.
 */
export default function AboutSection() {
  // Split the single biography string into sentences for a staggered reveal.
  const sentences = portfolio.biography.match(/[^.]+\./g) ?? [portfolio.biography];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="page-pad flex min-h-svh flex-col items-center justify-center bg-canvas py-28 text-center md:py-36"
    >
      <div className="flex flex-col items-center">
        <motion.h1
          id="about-title"
          className="font-aurix text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.95] tracking-[-0.03em]"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <ScrambleText text="ABOUT ME" delay={300} duration={800} />
        </motion.h1>

        <div className="mt-10 max-w-xl">
          {sentences.map((sentence, i) => (
            <motion.p
              key={i}
              className="font-vcr text-base leading-[1.7] md:text-lg [&:not(:first-child)]:mt-4"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.5, ease: EASE }}
            >
              <ScrambleText text={sentence.trim()} delay={450 + i * 120} duration={700} />
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}