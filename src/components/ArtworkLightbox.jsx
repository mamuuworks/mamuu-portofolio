import { Fragment, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import WorksArt from "./WorksArt.jsx";

/**
 * Expanded artwork view — a small exhibition room, not a product page.
 * Escape closes, clicking the backdrop closes, focus is trapped while open
 * and returns to the artwork card on close.
 */
function Lightbox({ work, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const prevActive = document.activeElement;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll("button, a[href]");
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
      if (prevActive && typeof prevActive.focus === "function") prevActive.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center p-4 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.22 }}
    >
      <button type="button" tabIndex={-1} aria-label="Close preview" onClick={onClose} className="absolute inset-0 cursor-default bg-ink/70" />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${work.title} — artwork preview`}
        className="relative w-full max-w-5xl overflow-hidden rounded-xl bg-canvas"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* mac-style window title bar */}
        <div className="flex h-10 items-center bg-surface pl-4 pr-1.5">
          <span aria-hidden="true" className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-mute/40" />
            <span className="h-3 w-3 rounded-full bg-mute/40" />
            <span className="h-3 w-3 rounded-full bg-mute/40" />
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="ml-auto grid h-9 w-9 place-items-center transition-[color,transform] duration-300 hover:rotate-90 hover:text-accent"
          >
            <X size={20} strokeWidth={1.8} />
          </button>
        </div>
        <div className="aspect-video w-full overflow-hidden bg-surface">
          {work.video ? (
            <video
              src={work.video}
              poster={work.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              tabIndex={-1}
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          ) : work.image ? (
            <img src={work.image} alt={work.title} className="h-full w-full object-cover grayscale" />
          ) : (
            <WorksArt art={work.art} label={`${work.title} — placeholder artwork`} className="h-full w-full" />
          )}
        </div>
        <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-3 px-5 py-4 md:px-7 md:py-5">
          <div className="flex flex-col">
            <h3 className="font-vcr text-xl tracking-[-0.01em] md:text-2xl">{work.title}</h3>
            {work.videoUrl && (
              <a
                href={work.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1 font-vcr text-sm text-ink underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-accent"
              >
                Watch on YouTube
                <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
              </a>
            )}
          </div>
          {work.credits ? (
            <ul className="max-w-md space-y-0.5 font-vcr text-sm leading-relaxed">
              {work.credits.map(([role, names]) => (
                <li key={role}>
                  <span className="text-ink">{role}</span>
                  <span className="text-mute">
                    {" : "}
                    {names.map((person, i) => (
                      <Fragment key={person.name}>
                        {i > 0 && ", "}
                        {person.url ? (
                          <a
                            href={person.url}
                            target="_blank"
                            rel="noreferrer"
                            className="underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-accent"
                          >
                            {person.name}
                          </a>
                        ) : (
                          person.name
                        )}
                      </Fragment>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="max-w-md font-vcr text-sm leading-relaxed text-mute">{work.description}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ArtworkLightbox({ work, onClose }) {
  return (
    <AnimatePresence>{work && <Lightbox key="lightbox" work={work} onClose={onClose} />}</AnimatePresence>
  );
}
