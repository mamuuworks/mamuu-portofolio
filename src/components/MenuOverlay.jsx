import { Suspense, lazy, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import SocialLinks from "./SocialLinks.jsx";
import { portfolio } from "../data/portfolio.js";

// Three.js lives in its own chunk and loads the first time the menu opens.
const ThreeVisual = lazy(() => import("./ThreeVisual.jsx"));

const LINKS = [
  { id: "home", label: "HOME" },
  { id: "work", label: "WORK" },
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
];

/**
 * Full-screen navigation overlay (rev 25). The Three.js companion — the
 * home star's dashed line-wireframe family as a near full-bleed background
 * at both widths, its corners pulsing at random — lives behind the links
 * and only exists while the menu is open. Escape closes, focus is trapped
 * while open and returned to the opener on close.
 */
export default function MenuOverlay({ open, onClose, onNavigate }) {
  const overlayRef = useRef(null);
  const closeRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;
    const prevActive = document.activeElement;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const focusTimer = setTimeout(() => closeRef.current?.focus(), 40);

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !overlayRef.current) return;
      const items = overlayRef.current.querySelectorAll('a[href], button:not([disabled])');
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
      if (prevActive && typeof prevActive.focus === "function") prevActive.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 overflow-hidden bg-canvas"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.3 }}
        >
          <Suspense fallback={null}>
            <ThreeVisual reducedMotion={reduced} />
          </Suspense>
          <div className="page-pad relative flex h-full flex-col">
            <div className="flex items-start justify-between pt-4 md:pt-6">
              {/* Display-size wordmark (rev 11). Inline family: a utility class would lose to layered CSS. */}
              <p
                className="mt-1 select-none text-[clamp(1.5rem,3.5vw,2.5rem)] leading-none tracking-[-0.02em] text-ink"
                style={{ fontFamily: '"Aurix", "Space Grotesk", sans-serif' }}
              >
                {portfolio.wordmark}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="-mr-2 rounded-full p-2 transition-[color,transform] duration-300 hover:rotate-90 hover:text-accent"
              >
                <X size={26} strokeWidth={1.8} />
              </button>
            </div>

            <nav aria-label="Menu" className="flex flex-1 flex-col justify-center gap-3 md:gap-5">
              {LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => onNavigate(link.id)}
                  className="group w-fit text-left"
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                  transition={{ delay: reduced ? 0 : 0.1 + i * 0.075, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="block font-vcr text-[clamp(2.6rem,8.5vw,6.75rem)] leading-[1.06] transition-colors duration-200 group-hover:text-accent group-focus-visible:text-accent">
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-3">{link.label}</span>
                  </span>
                </motion.button>
              ))}
            </nav>

            <div className="flex items-end justify-between pb-7 md:pb-10">
              <SocialLinks links={portfolio.socialLinks} order={["x", "instagram", "email", "vgen"]} size={20} gap="gap-5" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
