import { motion } from "framer-motion";
import ScrambleText from "../components/ScrambleText.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import { portfolio } from "../data/portfolio.js";

const EASE = [0.22, 1, 0.36, 1];

/**
 * CONTACT — its own page, one full viewport: a big headline, one primary
 * mailto action, the social row, and a small footer closing the page.
 * (No giant wordmark, per client.)
 */
export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="page-pad flex min-h-svh flex-col pt-28 md:pt-36"
    >
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <motion.h1
          id="contact-title"
          className="font-aurix text-[clamp(2.8rem,9vw,8rem)] leading-[0.92] tracking-[-0.04em]"
          style={{ wordSpacing: "0.3em" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <ScrambleText text="LET'S CONNECT" delay={300} duration={900} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="font-vcr mt-6 max-w-md text-lg leading-relaxed"
        >
          <ScrambleText
            text="Commissions, questions, or just saying hi — every door is open."
            delay={550}
          />
        </motion.p>

        <motion.a
          href={portfolio.socialLinks.email}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
          className="mt-10 inline-block rounded-full bg-ink px-9 py-4 font-vcr text-base text-canvas transition-transform duration-200 hover:-translate-y-0.5 md:text-lg"
        >
          Start a project
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="mt-10 md:mt-12"
        >
          <SocialLinks
            links={portfolio.socialLinks}
            order={["x", "instagram", "vgen"]}
            size={26}
            gap="gap-9 md:gap-12"
            animated
            className="[&_a]:p-2 [&_a]:hover:-rotate-12"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="font-vcr mt-8 text-[13px] uppercase tracking-[0.16em] text-mute"
        >
          <ScrambleText text="X / Twitter, Instagram & VGen (for commissions)" delay={1000} />
        </motion.p>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="flex flex-wrap items-center justify-between gap-3 pb-8 pt-10"
      >
        <p className="font-vcr text-sm text-mute">© {new Date().getFullYear()} {portfolio.artistName}</p>
        <p className="font-vcr text-[13px] uppercase tracking-[0.16em] text-mute">{portfolio.projectName}</p>
      </motion.footer>
    </section>
  );
}
