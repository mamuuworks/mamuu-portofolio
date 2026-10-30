/**
 * Six original placeholder illustrations for the gallery — one consistent
 * flat world of little m-creatures, drawn so no gallery slot is ever empty.
 * Each is replaced by a real image via src/data/portfolio.js (`image` field).
 * Canvas: 800 × 450 (16:9).
 */

const INK = "#111111";
const CANVAS = "#FFFFFF";
const GRAY = "#A3A3A3";
const GRAY_DARK = "#737373";
const GRAY_LIGHT = "#D4D4D4";
const GRAY_MID = "#8C8C8C";
const GRAY_SOFT = "#BFBFBF";
const GRAY_PALE = "#E0E0E0";
const GRAY_PALE_DARK = "#B8B8B8";
const SURFACE = "#F5F5F5";

function Face({ x, y, s = 1, blush = "rgba(23,23,23,0.14)", smile = true }) {
  return (
    <g>
      <circle cx={x - 20 * s} cy={y} r={6.5 * s} fill={INK} />
      <circle cx={x + 20 * s} cy={y} r={6.5 * s} fill={INK} />
      <circle cx={x - 22 * s} cy={y - 2.5 * s} r={2.2 * s} fill={CANVAS} />
      <circle cx={x + 18 * s} cy={y - 2.5 * s} r={2.2 * s} fill={CANVAS} />
      {smile && (
        <path
          d={`M${x - 9 * s} ${y + 15 * s}q${9 * s} ${8 * s} ${18 * s} 0`}
          stroke={INK}
          strokeWidth={5 * s}
          strokeLinecap="round"
          fill="none"
        />
      )}
      <circle cx={x - 36 * s} cy={y + 14 * s} r={6 * s} fill={blush} />
      <circle cx={x + 36 * s} cy={y + 14 * s} r={6 * s} fill={blush} />
    </g>
  );
}

// A small m-creature drawn with one thick stroke, reusable at any spot.
function MiniM({ x, y, s = 1, color = INK, face = true, faceY = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M0 92V56q0-40 39-40t39 40v36m0-36q0-40 39-40t39 40v36"
        stroke={color}
        strokeWidth="34"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {face && <Face x={78} y={faceY || 24} s={0.72} />}
    </g>
  );
}

function Parade() {
  const bits = [
    { x: 90, y: 70, r: 30, c: GRAY_LIGHT },
    { x: 240, y: 40, r: -20, c: CANVAS },
    { x: 420, y: 80, r: 15, c: GRAY_MID },
    { x: 610, y: 50, r: -35, c: GRAY_SOFT },
    { x: 720, y: 120, r: 20, c: GRAY },
    { x: 160, y: 180, r: -10, c: GRAY_SOFT },
    { x: 520, y: 160, r: 40, c: GRAY_LIGHT },
  ];
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className="block h-full w-full">
      <rect width="800" height="450" fill={GRAY_PALE} />
      {bits.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width="26" height="26" rx="7" fill={b.c} transform={`rotate(${b.r} ${b.x + 13} ${b.y + 13})`} />
      ))}
      <circle cx="330" cy="130" r="10" fill={CANVAS} />
      <circle cx="680" cy="200" r="8" fill={INK} />
      {[
        { x: 52, y: 300, s: 0.92, c: GRAY },
        { x: 216, y: 322, s: 0.78, c: GRAY_LIGHT },
        { x: 356, y: 296, s: 0.95, c: GRAY_MID },
        { x: 540, y: 318, s: 0.8, c: GRAY_SOFT },
      ].map((m, i) => (
        <g key={i}>
          <ellipse cx={m.x + 78 * m.s} cy={m.y + 100 * m.s} rx={70 * m.s} ry={12 * m.s} fill={GRAY_PALE_DARK} />
          <MiniM x={m.x} y={m.y} s={m.s} color={m.c} />
        </g>
      ))}
    </svg>
  );
}

function Sun() {
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className="block h-full w-full">
      <rect width="800" height="450" fill={SURFACE} />
      {[...Array(8)].map((_, i) => (
        <rect key={i} x="386" y="26" width="28" height="58" rx="14" fill={GRAY_LIGHT} transform={`rotate(${i * 45} 400 180)`} />
      ))}
      <circle cx="400" cy="180" r="104" fill={GRAY} />
      <Face x={400} y={168} s={1.5} blush={GRAY_DARK} />
      <path d="M0 356q210-70 420-22t380-10v126H0z" fill={GRAY_MID} />
      <g opacity="0.9">
        <MiniM x={560} y={288} s={0.62} color={INK} face={false} />
      </g>
      <circle cx="120" cy="90" r="10" fill={GRAY} />
      <circle cx="700" cy="70" r="7" fill={GRAY_MID} />
    </svg>
  );
}

function Plant() {
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className="block h-full w-full">
      <rect width="800" height="450" fill={GRAY_SOFT} />
      <ellipse cx="298" cy="292" rx="46" ry="20" fill={GRAY_MID} transform="rotate(-28 298 292)" />
      <ellipse cx="502" cy="292" rx="46" ry="20" fill={GRAY_MID} transform="rotate(28 502 292)" />
      <circle cx="330" cy="252" r="56" fill={GRAY} />
      <circle cx="470" cy="252" r="56" fill={GRAY} />
      <circle cx="400" cy="212" r="80" fill={GRAY} />
      <Face x={400} y={228} s={1.35} blush={GRAY_DARK} />
      <rect x="290" y="300" width="220" height="26" rx="13" fill={GRAY_LIGHT} />
      <path d="M304 326h192l-20 92H324z" fill={GRAY_LIGHT} />
      <circle cx="640" cy="120" r="9" fill={CANVAS} />
      <circle cx="140" cy="200" r="7" fill={GRAY_LIGHT} />
      <path d="M96 330q12-14 24 0t24 0" stroke={CANVAS} strokeWidth="7" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Bath() {
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className="block h-full w-full">
      <rect width="800" height="450" fill={GRAY_MID} />
      <circle cx="180" cy="110" r="12" fill={CANVAS} opacity="0.55" />
      <circle cx="620" cy="80" r="8" fill={CANVAS} opacity="0.55" />
      <circle cx="520" cy="150" r="10" fill={CANVAS} opacity="0.4" />
      <circle cx="400" cy="206" r="52" fill={GRAY_PALE} />
      <Face x={400} y={198} s={1} blush={GRAY_PALE_DARK} />
      <circle cx="556" cy="216" r="15" fill={GRAY_LIGHT} />
      <path d="M570 212l14 5-14 5z" fill={GRAY_DARK} />
      {[240, 290, 340, 390, 440, 490, 540].map((cx, i) => (
        <circle key={i} cx={cx} cy={238 + (i % 2) * 8} r={i % 2 ? 24 : 30} fill={CANVAS} />
      ))}
      <rect x="196" y="252" width="408" height="118" rx="56" fill={CANVAS} />
      <path d="M250 372l-8 34M550 372l8 34" stroke={INK} strokeWidth="14" strokeLinecap="round" />
      <Face x={400} y={306} s={0.9} blush={GRAY_PALE_DARK} smile={false} />
      <ellipse cx="400" cy="420" rx="270" ry="16" fill="#2F6F62" />
    </svg>
  );
}

function Window() {
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className="block h-full w-full">
      <rect width="800" height="450" fill={INK} />
      <circle cx="668" cy="104" r="36" fill={GRAY_LIGHT} />
      <circle cx="686" cy="92" r="30" fill={INK} />
      <rect x="130" y="60" width="320" height="270" rx="10" fill={GRAY_SOFT} />
      {[210, 290, 370].map((x, i) => (
        <path key={i} d={`M${x} 84l-14 44M${x + 60} 140l-14 44M${x + 20} 220l-14 44`} stroke={CANVAS} strokeWidth="7" strokeLinecap="round" opacity="0.75" />
      ))}
      <rect x="278" y="60" width="16" height="270" fill={INK} />
      <rect x="130" y="184" width="320" height="16" fill={INK} />
      <rect x="118" y="48" width="344" height="294" rx="14" fill="none" stroke={INK} strokeWidth="18" />
      <circle cx="608" cy="368" r="62" fill={GRAY} />
      <circle cx="588" cy="352" r="7.5" fill={INK} />
      <circle cx="628" cy="352" r="7.5" fill={INK} />
      <circle cx="586" cy="349" r="2.6" fill={CANVAS} />
      <circle cx="626" cy="349" r="2.6" fill={CANVAS} />
      <circle cx="572" cy="382" r="8" fill={GRAY_DARK} />
      <circle cx="644" cy="382" r="8" fill={GRAY_DARK} />
      <circle cx="548" cy="428" r="17" fill={GRAY} />
    </svg>
  );
}

function Creatures() {
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className="block h-full w-full">
      <rect width="800" height="450" fill={GRAY} />
      <ellipse cx="400" cy="408" rx="330" ry="26" fill={GRAY_DARK} />
      <rect x="150" y="168" width="122" height="212" rx="61" fill={GRAY_LIGHT} />
      <Face x={211} y={252} s={1.05} blush="rgba(23,23,23,0.12)" />
      <circle cx="400" cy="308" r="74" fill={GRAY_MID} />
      <Face x={400} y={300} s={1.15} blush="#2F6F62" />
      <rect x="520" y="252" width="96" height="128" rx="48" fill={GRAY_PALE} />
      <Face x={568} y={308} s={0.85} blush={GRAY_PALE_DARK} />
      <circle cx="680" cy="120" r="9" fill={CANVAS} />
      <circle cx="100" cy="90" r="7" fill={GRAY_LIGHT} />
      <path d="M620 190q12-14 24 0t24 0" stroke={CANVAS} strokeWidth="7" strokeLinecap="round" fill="none" />
    </svg>
  );
}

const SCENES = {
  parade: Parade,
  sun: Sun,
  plant: Plant,
  bath: Bath,
  window: Window,
  creatures: Creatures,
};

/** Renders the placeholder scene for a work entry (used while `image` is null). */
export default function WorksArt({ art, label, className = "" }) {
  const Scene = SCENES[art] ?? SCENES.creatures;
  if (label) {
    return (
      <span role="img" aria-label={label} className={`block ${className}`}>
        <Scene />
      </span>
    );
  }
  return (
    <span aria-hidden="true" className={`block ${className}`}>
      <Scene />
    </span>
  );
}
