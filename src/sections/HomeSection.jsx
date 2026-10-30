import { Suspense, lazy } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ScrambleText from "../components/ScrambleText.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import { portfolio } from "../data/portfolio.js";

// Three.js lives in its own chunk and loads with the home page's star.
const StarVisual = lazy(() => import("../components/StarVisual.jsx"));

const EASE = [0.22, 1, 0.36, 1];

/**
 * HOME (rev 7, client request) — a 3D wireframe six-pointed star turns
 * behind the wordmark "MAMUU" (scramble decode), with the contact icons
 * below it: round-bordered, bobbing like water waves.
 */
export default function HomeSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden pt-20 md:pt-16"
    >
      <Suspense fallback={null}>
        <StarVisual reducedMotion={!!reduced} />
      </Suspense>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.h1
          aria-label="Mamuu, illustrator and character artist"
          className="select-none font-aurix text-[clamp(3.4rem,13vw,10rem)] leading-none tracking-[-0.03em]"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.25, duration: 0.9, ease: EASE }}
        >
          <span aria-hidden="true" className="block">
            <ScrambleText text="MAMUU" delay={350} duration={900} />
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.7, duration: 0.6, ease: EASE }}
          className="mt-10 md:mt-12"
        >
          <SocialLinks
            links={portfolio.socialLinks}
            order={["x", "instagram", "email"]}
            size={22}
            gap="gap-5 md:gap-6"
            className="socials-wave [&_a]:rounded-full [&_a]:border [&_a]:border-ink [&_a]:bg-ink [&_a]:p-3 [&_a]:text-canvas [&_a:hover]:text-canvas"
          />
        </motion.div>
      </div>
    </section>
  );
}
