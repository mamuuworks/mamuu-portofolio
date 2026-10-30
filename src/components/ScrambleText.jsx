import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "#%&@$+=*XYZMWAQK";

/**
 * Scrambled-text reveal: on first appearance the characters cycle through
 * random glyphs and settle left-to-right into the real text. Reduced motion
 * renders the final text immediately.
 */
export default function ScrambleText({
  text,
  delay = 0,
  duration = 650,
  step = 34,
  className = "",
  as: Tag = "span",
}) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const rafRef = useRef(0);

  useEffect(() => {
    if (reduced) {
      setDisplay(text);
      return undefined;
    }
    const chars = Array.from(text);
    let start = null;
    let last = 0;

    const tick = (t) => {
      if (start === null) start = t + delay;
      const elapsed = t - start;
      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(1, elapsed / duration);
      if (t - last >= step) {
        last = t;
        const fixed = Math.floor(progress * chars.length);
        setDisplay(
          chars
            .map((c, i) => (c === " " || i < fixed ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
            .join("")
        );
      }
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [text, delay, duration, step, reduced]);

  return (
    <Tag className={className} aria-label={text}>
      {display}
    </Tag>
  );
}
