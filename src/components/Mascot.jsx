import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Mamuu OC — a little creature shaped like a hand-drawn "m".
 * It floats, blinks, and its eyes follow the pointer.
 * Pure SVG; with reduced motion it simply sits still.
 */
export default function Mascot({ className = "", float = true }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 55, damping: 13 });
  const sy = useSpring(py, { stiffness: 55, damping: 13 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (reduced) return undefined;
    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(d / 260, 1) * 6.5;
      px.set((dx / d) * k);
      py.set((dy / d) * k);
    };
    const timer = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 4200);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      clearInterval(timer);
    };
  }, [reduced, px, py]);

  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 560 500"
      className={className}
      aria-hidden="true"
      animate={float && !reduced ? { y: [0, -12, 0] } : undefined}
      transition={float && !reduced ? { duration: 4.6, repeat: Infinity, ease: "easeInOut" } : undefined}
    >
      {/* arms */}
      <path d="M74 322q-42 10-52 50" stroke="#171717" strokeWidth="17" strokeLinecap="round" fill="none" />
      <path d="M490 314q42 8 54 48" stroke="#171717" strokeWidth="17" strokeLinecap="round" fill="none" />
      {/* feet */}
      <ellipse cx="110" cy="470" rx="26" ry="11" fill="#171717" />
      <ellipse cx="282" cy="470" rx="26" ry="11" fill="#171717" />
      <ellipse cx="454" cy="470" rx="26" ry="11" fill="#171717" />
      {/* the m body, drawn in one thick stroke */}
      <path
        d="M110 430V300q0-92 86-92t86 92v130m0-130q0-92 86-92t86 92v130"
        stroke="#D4D4D4"
        strokeWidth="74"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* cowlick */}
      <path d="M282 168q-2-30 26-36" stroke="#171717" strokeWidth="13" strokeLinecap="round" fill="none" />
      {/* blush */}
      <circle cx="196" cy="298" r="14" fill="#B8B8B8" />
      <circle cx="368" cy="298" r="14" fill="#B8B8B8" />
      {/* eyes — they blink; the pupils follow the pointer */}
      {[196, 368].map((cx) => (
        <motion.g key={cx} animate={{ scaleY: blink ? 0.08 : 1 }} transition={{ duration: 0.1 }} style={{ originX: 0.5, originY: 0.5 }} className="origin-center">
          <circle cx={cx} cy="228" r="24" fill="#FFFFFF" />
          <motion.g style={{ x: sx, y: sy }}>
            <circle cx={cx} cy="230" r="10.5" fill="#171717" />
            <circle cx={cx - 3.5} cy="226" r="3" fill="#FFFFFF" />
          </motion.g>
        </motion.g>
      ))}
      {/* mouth */}
      <path d="M268 306q14 12 28 0" stroke="#171717" strokeWidth="8" strokeLinecap="round" fill="none" />
    </motion.svg>
  );
}
