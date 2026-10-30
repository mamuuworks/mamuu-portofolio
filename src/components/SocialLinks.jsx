/**
 * Social / contact icon links. Original monochrome SVG icons so the four
 * brands share one drawn style. Destinations come from src/data/portfolio.js.
 */
import { motion } from "framer-motion";

function XIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
      <path d="M4.5 4.5l15 15M19.5 4.5l-15 15" />
    </svg>
  );
}

function InstagramIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="16.9" cy="7.1" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MailIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M4 7.5l8 6 8-6" />
    </svg>
  );
}

function VGenIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <path d="M8 8.5l4 7.5 4-7.5" />
    </svg>
  );
}

const ICONS = {
  x: { label: "Mamuu on X (Twitter)", Icon: XIcon, external: true },
  instagram: { label: "Mamuu on Instagram", Icon: InstagramIcon, external: true },
  email: { label: "Email Mamuu", Icon: MailIcon, external: false },
  vgen: { label: "Mamuu on VGen — commissions", Icon: VGenIcon, external: true },
};

export default function SocialLinks({ links, order = ["x", "instagram", "email"], size = 20, gap = "gap-6", className = "", animated = false }) {
  return (
    <ul className={`flex items-center ${gap} ${className}`}>
      {order.map((id, i) => {
        const { label, Icon, external } = ICONS[id];
        const href = links[id];
        if (!href) return null;
        const liProps = animated
          ? {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.35 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            }
          : {};
        const Item = animated ? motion.li : "li";
        return (
          <Item key={id} {...liProps}>
            <a
              href={href}
              aria-label={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-block p-1.5 text-ink transition-[color,transform] duration-200 hover:-translate-y-1 hover:-rotate-6 hover:text-accent"
            >
              <Icon size={size} />
            </a>
          </Item>
        );
      })}
    </ul>
  );
}
