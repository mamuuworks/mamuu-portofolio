import { motion } from "framer-motion";
import WorksArt from "./WorksArt.jsx";

/**
 * One gallery slot: 16:9, minimal framing, gentle viewport reveal,
 * hover/focus shows the title, click opens the lightbox.
 */
export default function ArtworkCard({ work, index, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.07, ease: "easeOut" }}
    >
      <button
        type="button"
        onClick={() => onOpen(work)}
        aria-haspopup="dialog"
        aria-label={`Open larger preview: ${work.title}`}
        className="group relative block w-full text-left"
      >
        {/* mac-style window frame (tone step, no hairline) */}
        <div className="block overflow-hidden rounded-xl bg-surface">
          <span aria-hidden="true" className="flex h-8 items-center gap-1.5 bg-surface px-3.5">
            <span className="h-2.5 w-2.5 rounded-full bg-mute/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-mute/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-mute/40" />
            {work.videoUrl && (
              <span className="ml-auto font-vcr text-[10px] tracking-[0.14em] text-ink/70">Video</span>
            )}
          </span>
          <span className="block aspect-video w-full overflow-hidden bg-surface">
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
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
              />
            ) : work.image ? (
              <img
                src={work.image}
                alt={work.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale transition-transform duration-500 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
              />
            ) : (
              <WorksArt
                art={work.art}
                className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
              />
            )}
          </span>
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl bg-ink/0 transition-colors duration-300 group-hover:bg-ink/15 group-focus-visible:bg-ink/15"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] translate-y-2 bg-canvas px-3 py-1.5 font-vcr text-base font-medium leading-snug opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        >
          {work.title}
        </span>
      </button>
    </motion.div>
  );
}
