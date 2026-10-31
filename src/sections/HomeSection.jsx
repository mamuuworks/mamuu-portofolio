import { Suspense, lazy } from "react";
import { motion, useReducedMotion } from "framer-motion";
import LogoIntro from "../components/LogoIntro.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import { portfolio } from "../data/portfolio.js";

// Three.js lives in its own chunk and loads with the home page's star.
const StarVisual = lazy(() => import("../components/StarVisual.jsx"));

const EASE = [0.22, 1, 0.36, 1];

/**
 * HOME (rev 20, client request) — the client's SVG logo played as a one-time
 * Three.js intro (a small circle fades in at the centre and grows only to a
 * MEDIUM size → asterisk onto the medium disc → the disc swelling directly
 * into the stardust while the star drifts centre → left → glyphs + the
 * katakana マムー rising from behind the stardust and sliding right,
 * Aurix-first type; asterisk on top, burst under it, glyphs at the bottom;
 * ~1.9 s) inside the h1, sized down per client, with the rev 9 wireframe
 * star behind it and the wave-bobbing contact icons below.
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

      <div className="relative z-10 flex w-full flex-col items-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.15, duration: 0.9, ease: EASE }}
          className="w-[min(76vw,760px)] select-none"
        >
          <span className="sr-only">Mamuu, illustrator and character artist</span>
          <span aria-hidden="true" className="block aspect-[1419/855] w-full">
            <LogoIntro reducedMotion={!!reduced} />
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
