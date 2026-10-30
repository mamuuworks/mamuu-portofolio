import { motion, useReducedMotion } from "framer-motion";
import ScrambleText from "./ScrambleText.jsx";
import { navSections } from "../data/portfolio.js";

/**
 * Fixed top navigation — every button sits centred in one row, set in the
 * client-requested VCR OSD Mono: MENU opens the full-screen overlay (HOME &
 * CONTACT live in there); WORK / ABOUT switch page directly. No active dot.
 */
const NAV_LABEL =
  "font-vcr p-2 text-[13px] uppercase leading-none tracking-[0.16em] transition-colors duration-200 hover:text-accent";

export default function Navigation({ active, menuOpen, onMenuOpen, onNavigate }) {
  const reduced = useReducedMotion();
  // Each label rises on its own beat (staggered entrance, reduced-motion safe).
  const item = (delay) => ({
    initial: { opacity: 0, y: reduced ? 0 : -10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  });
  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40"
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        aria-label="Primary"
        className="page-pad flex items-start justify-center gap-0.5 pt-4 sm:gap-1 md:gap-2 md:pt-6"
      >
        <motion.button
          type="button"
          onClick={onMenuOpen}
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          className={NAV_LABEL}
          {...item(0.7)}
        >
          <ScrambleText text="MENU" delay={900} />
        </motion.button>
        {navSections.map((section, i) => (
          <motion.button
            key={section.id}
            type="button"
            onClick={() => onNavigate(section.id)}
            aria-current={active === section.id ? "true" : undefined}
            className={NAV_LABEL}
            {...item(0.78 + i * 0.08)}
          >
            <ScrambleText text={section.label} delay={1000} />
          </motion.button>
        ))}
      </nav>
    </motion.header>
  );
}
