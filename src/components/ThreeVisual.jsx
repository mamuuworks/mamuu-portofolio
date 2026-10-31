import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * The menu's companion (rev 28, client request): the line family stays —
 * dashed wireframes only, the home star's six-pointed silhouette with the
 * longer top/bottom spikes — at the SAME SIZE as the home page's star
 * (spikes run past the screen edges on desktop and phone alike), with the
 * lines FINED DOWN to the home star's delicacy (faint opacities, fine
 * dashes) — and every
 * CORNER of the star shrinks and grows on its own random rhythm. Four
 * concentric echoes share one wireframe geometry whose
 * corner vertices are re-scaled each frame by six independent random
 * clocks; the echoes counter-rotate so the pulses read at different
 * angles. Strictly monochrome; the stardust dust field stays.
 * Lives only while the menu is open; everything is disposed on unmount.
 */

const PALETTE = {
  line: 0x111111, // ink — the star wireframes
  echo: 0xa3a3a3, // the deepest echo, gray
  dust: 0xd3d4d4, // the stardust family tie
};

// The home star's proportions: vertical spikes longest, side points mid,
// inner valleys shortest.
const SPIKE = 3.2;
const SIDE = 1.95;
const INNER = 0.85;

// How far a corner may shrink/grow around its resting length (±15%).
const PULSE = 0.15;

// Soft round mote sprite so dust points read as circles, never squares.
function makeMoteTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.55, "rgba(255,255,255,0.9)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

const gauss = () =>
  (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2;

// Twelve-vertex six-point star outline with the home star's proportions —
// the top and bottom spikes (the vertices on the y axis) run longer than
// the four side points — plus a small per-vertex jitter so the silhouette
// stays its own, never an exact copy.
function starLineShape() {
  const shape = new THREE.Shape();
  for (let i = 0; i < 12; i += 1) {
    const angle = (i * Math.PI) / 6 - Math.PI / 2;
    const jitter = 1 + Math.sin(i * 2.3 + 1.1) * 0.035;
    let rad;
    if (i % 2 === 0) {
      const onAxis = Math.abs(Math.cos(angle)) < 0.35; // top / bottom spikes
      rad = (onAxis ? SPIKE : SIDE) * jitter;
    } else {
      rad = INNER * jitter;
    }
    const x = Math.cos(angle) * rad;
    const y = Math.sin(angle) * rad;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

// The lines-only figure: the wireframe (sharp edges only) of a shallow
// extrusion of the star outline. Dashed materials turn it into the line
// family; one geometry is shared by every echo — which is also what lets
// the corner pulses re-scale every echo at once.
function starWireframe() {
  const solid = new THREE.ExtrudeGeometry(starLineShape(), {
    depth: 0.5,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.06,
    bevelSegments: 1,
    curveSegments: 4,
  });
  solid.center();
  const edges = new THREE.EdgesGeometry(solid, 14);
  solid.dispose();
  return edges;
}

export default function ThreeVisual({ reducedMotion = false }) {
  const mountRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      setFailed(true);
      return undefined;
    }

    const width = mount.clientWidth || 1;
    const height = mount.clientHeight || 1;
    const mobile = width < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.z = 10.4; // pulled back so the star fills nearly the screen

    const figure = new THREE.Group();
    // The star is the BACKGROUND now: the same apparent size as the home
    // page's star (home: SPIKE 5.1 at camera z 7.2 ≈ 1.85× the half-height,
    // spikes running past the edges) — so the menu star scales to ~1.85×
    // the half-height too, at BOTH widths (it never shrinks on a phone).
    const scaleNow = mobile ? 2.4 : 2.4;
    figure.position.set(mobile ? 0 : 1.2, mobile ? 0.25 : 0.1, 0);
    figure.rotation.x = -0.42;
    figure.rotation.z = -0.16; // the slant, held by the sway below
    figure.scale.setScalar(scaleNow);
    scene.add(figure);

    const mote = makeMoteTexture();
    const disposables = [mote];

    // One shared wireframe; four dashed echoes at shrinking scales and
    // depths, each counter-rotating on its own clock.
    const wire = starWireframe();
    disposables.push(wire);
    const echoDefs = [
      { scale: 1.0, color: PALETTE.line, opacity: 0.3, dash: [0.12, 0.08], speed: 0.05, z: 0, phase: 0 },
      { scale: 0.84, color: PALETTE.line, opacity: 0.18, dash: [0.08, 0.1], speed: -0.08, z: -0.35, phase: 2.1 },
      { scale: 0.68, color: PALETTE.line, opacity: 0.12, dash: [0.16, 0.11], speed: 0.11, z: -0.7, phase: 4.2 },
      { scale: 0.5, color: PALETTE.echo, opacity: 0.16, dash: [0.09, 0.09], speed: -0.14, z: -1.05, phase: 1.0 },
    ];
    const echoes = echoDefs.map((def) => {
      const mat = new THREE.LineDashedMaterial({
        color: def.color,
        dashSize: def.dash[0],
        gapSize: def.dash[1],
        transparent: true,
        opacity: def.opacity,
      });
      const line = new THREE.LineSegments(wire, mat);
      line.computeLineDistances();
      line.scale.setScalar(def.scale);
      line.position.z = def.z;
      line.frustumCulled = false;
      figure.add(line);
      disposables.push(mat);
      return { line, def };
    });

    // Six independent clocks — every corner of the star shrinks and grows
    // on its own random rhythm (two superimposed sines, random speeds and
    // phases per corner). The valleys between corners stay still.
    const pulseDefs = Array.from({ length: 6 }, () => ({
      slow: 0.45 + Math.random() * 0.4,
      fast: 1.05 + Math.random() * 0.6,
      p1: Math.random() * Math.PI * 2,
      p2: Math.random() * Math.PI * 2,
    }));
    const spikeAngle = (k) => -Math.PI / 2 + (k * Math.PI) / 3;
    const cornerScale = (angle, t) => {
      let k = 0;
      let best = Infinity;
      for (let j = 0; j < 6; j += 1) {
        const d = Math.abs(
          Math.atan2(Math.sin(angle - spikeAngle(j)), Math.cos(angle - spikeAngle(j))),
        );
        if (d < best) {
          best = d;
          k = j;
        }
      }
      const fall = Math.max(0, 1 - best / (Math.PI / 6)); // full at a corner tip, none in a valley
      const def = pulseDefs[k];
      const wave =
        0.62 * Math.sin(t * def.slow + def.p1) + 0.38 * Math.sin(t * def.fast + def.p2);
      return 1 + fall * PULSE * wave;
    };

    // The corner pulses re-scale the shared wireframe itself, so every
    // echo breathes together; the dash distances follow along.
    const basePos = wire.attributes.position.array.slice();
    const applyCorners = (t) => {
      const pos = wire.attributes.position.array;
      for (let v = 0; v < pos.length; v += 3) {
        const bx = basePos[v];
        const by = basePos[v + 1];
        const f = cornerScale(Math.atan2(by, bx), t);
        pos[v] = bx * f;
        pos[v + 1] = by * f;
      }
      wire.attributes.position.needsUpdate = true;
      echoes[0].line.computeLineDistances();
    };

    // The sparse dust field behind — the stardust family tie, spread wide
    // for the full-bleed background.
    const dustCount = mobile ? 90 : 150;
    const dustArr = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i += 1) {
      dustArr[i * 3] = gauss() * 6.2;
      dustArr[i * 3 + 1] = gauss() * 3.3;
      dustArr[i * 3 + 2] = -0.6 - Math.random() * 0.8;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustArr, 3));
    const dustMat = new THREE.PointsMaterial({
      color: PALETTE.dust,
      size: 0.05,
      map: mote,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    figure.add(dust);
    disposables.push(dustGeo, dustMat);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      if (!r.width || !r.height) return;
      pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.ty = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const onResize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    const renderFrame = (t) => {
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
      figure.rotation.y = pointer.x * 0.3;
      figure.rotation.x = -0.42 + pointer.y * 0.14;
      // The held slant plus a slow abstract sway.
      figure.rotation.z = -0.16 + Math.sin(t * 0.35) * 0.06;
      echoes.forEach(({ line, def }) => {
        line.rotation.z = def.phase + t * def.speed;
      });
      applyCorners(t); // every corner shrinking/growing on its own clock
      const breathe = 1 + 0.012 * Math.sin(t * 0.7);
      figure.scale.set(scaleNow * breathe, scaleNow * (2 - breathe), 1);
      dust.rotation.z = t * 0.012;
      dustMat.opacity = 0.45 * (0.75 + 0.25 * Math.sin(t * 0.6));
      renderer.render(scene, camera);
    };

    if (reducedMotion) {
      renderFrame(2.4); // a posed frame — corners at varied sizes, echoes askew
    } else {
      let raf = 0;
      const clock = new THREE.Clock();
      const loop = () => {
        renderFrame(clock.getElapsedTime());
        raf = requestAnimationFrame(loop);
      };
      loop();
    }

    return () => {
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [reducedMotion]);

  if (failed) {
    return (
      <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden="true">
        {/* Static fallback: the same line star family, drawn flat. */}
        <svg viewBox="0 0 320 320" className="w-72 opacity-50">
          <g transform="rotate(-9 160 160)">
            {(() => {
              const pts = (s) =>
                Array.from({ length: 12 }, (_, i) => {
                  const a = (i * Math.PI) / 6 - Math.PI / 2;
                  const jitter = 1 + Math.sin(i * 2.3 + 1.1) * 0.035;
                  let rad;
                  if (i % 2 === 0) {
                    const onAxis = Math.abs(Math.cos(a)) < 0.35;
                    rad = (onAxis ? 132 : 78) * s * jitter;
                  } else {
                    rad = 34 * s * jitter;
                  }
                  return `${160 + Math.cos(a) * rad},${160 + Math.sin(a) * rad}`;
                }).join(" ");
              return [
                [1.0, "#111111", "7 5", 0.3],
                [0.84, "#111111", "5 6", 0.18],
                [0.68, "#111111", "10 7", 0.12],
                [0.5, "#a3a3a3", "5 5", 0.16],
              ].map(([s, c, dash, o], i) => (
                <polygon key={i} points={pts(s)} fill="none" stroke={c} strokeWidth="1" strokeDasharray={dash} opacity={o} />
              ));
            })()}
          </g>
          {[
            [38, 70, 2], [282, 88, 2.4], [58, 236, 2], [270, 232, 1.8],
            [150, 34, 1.6], [210, 286, 1.6], [96, 44, 1.4], [236, 158, 1.4],
          ].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill="#d3d4d4" />
          ))}
        </svg>
      </div>
    );
  }

  return <div ref={mountRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
}
