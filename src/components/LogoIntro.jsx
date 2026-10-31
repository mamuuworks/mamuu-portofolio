import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import logoRaw from "../assets/mamuu-logo.svg?raw";

/**
 * HOME hero (rev 19, client request): the client's own SVG logo played as a
 * one-time Three.js intro on first page load, replacing the Aurix wordmark.
 *
 *   1. a small black circle fades in at the centre of the canvas — a visible
 *      tiny dot, ~16% of full size — then grows only to a MEDIUM size
 *      (ink #111111, ~55%, never full). rev 20, client request: the small
 *      circle becomes medium, then transforms into the stardust directly.
 *      Growth 0.6 s, whole intro ~1.9 s (rev 19 was 0.9 s / ~2.2 s).
 *   2. the asterisk from the logo spins in onto the medium disc and grows
 *      with it as the disc becomes the stardust, then keeps idling
 *   3. the disc swells INTO the starburst — it becomes the stardust, not a
 *      dissolve in place — while the whole star (disc + asterisk + burst)
 *      drifts from the canvas centre to its home on the left (client
 *      request: the circle that becomes the stardust goes centre → left)
 *   4. the three letter glyphs and the katakana マムー (client file's own
 *      spot, 54 SVG units, canvas texture, Aurix-first stack — client
 *      request) emerge from BEHIND the stardust and slide rightward into
 *      place (client request; rev 18 slid them in from the right edge)
 *
 * Layer order (client request, rev 15): asterisk on top, starburst under it,
 * glyphs (and the katakana) at the bottom — which is exactly what lets the
 * glyphs rise out from behind the stardust.
 *
 * The SVG's own geometry is parsed with SVGLoader — every fill is forced to
 * the site ink. SVGLoader cannot turn <text> into geometry, so the
 * katakana is drawn onto a canvas texture instead. Reduced motion renders
 * the finished lockup statically; any failure (parse or WebGL) falls back
 * to a static ink SVG <img>. Everything is disposed on unmount.
 */

const EASE_BACK = (t) => {
  const c = 1.70158 * 1.2;
  const p = t - 1;
  return 1 + p * p * ((c + 1) * p + c);
};
const EASE_OUT = (t) => 1 - Math.pow(1 - t, 3);

// マムー needs a Japanese face; the site ships none and machines without
// one would draw tofu. rev 16 self-hosts a 1.6 KB woff2 subset carrying
// exactly these three glyphs (public/fonts/mamuu-katakana.woff2). The
// promise is shared so remounts never re-fetch.
let katakanaFontPromise = null;
const loadKatakanaFont = () => {
  if (!katakanaFontPromise) {
    katakanaFontPromise = new FontFace("Mamuu Katakana", "url(/fonts/mamuu-katakana.woff2)")
      .load()
      .then((face) => {
        document.fonts.add(face);
        return true;
      })
      .catch((err) => {
        // Not fatal: the intro keeps playing, the texture falls back to
        // whatever Japanese system font the machine has.
        console.warn("LogoIntro: katakana font unavailable, using system fallback —", err);
        return false;
      });
  }
  return katakanaFontPromise;
};
// rev 17: Aurix first in the stack (client request). Aurix itself has no
// kana coverage (verified against its cmap), so the subset paints the
// glyphs; the stack keeps the order if Aurix ever gains them.
const KATA_FONT =
  '"Aurix", "Mamuu Katakana", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif';

function buildElement(paths, z, color = 0x111111) {
  const inner = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide, // y-flip reverses winding
  });
  for (const path of paths) {
    for (const shape of SVGLoader.createShapes(path)) {
      const geo = new THREE.ShapeGeometry(shape, 12);
      geo.scale(1, -1, 1); // SVG y-down → three y-up
      inner.add(new THREE.Mesh(geo, mat));
    }
  }
  // Pivot the element around its own centre so rotation/scale read as
  // intended, not around the SVG corner.
  const box = new THREE.Box3().setFromObject(inner);
  const centre = box.getCenter(new THREE.Vector3());
  inner.position.set(-centre.x, -centre.y, z);
  const pivot = new THREE.Group();
  pivot.position.copy(centre);
  pivot.add(inner);
  return { pivot, mat, meshes: inner.children, centre };
}

export default function LogoIntro({ reducedMotion = false }) {
  const mountRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    let sceneRef;
    let ro;
    let disposed = false;

    const start = async () => {
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
        // The katakana texture is drawn from fonts, so every face in its
        // stack must be ready before buildScene rasterises it. Aurix comes
        // from the CSS @font-face and may not be fetched yet on home.
        await loadKatakanaFont();
        await document.fonts.load('54px "Aurix"').catch(() => {});
        if (disposed) return;
        const built = buildScene();

        const width = mount.clientWidth || 1;
        const height = mount.clientHeight || 1;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
        renderer.setSize(width, height);
        mount.appendChild(renderer.domElement);

        const { scene, camera, parts, fitCamera } = built;
        sceneRef = scene;
        fitCamera(width, height);

        const applyFinal = () => {
          // Final state (rev 15): the circle has dissolved into the starburst —
          // no disc remains.
          parts.circle.material.opacity = 0;
          parts.circle.scale.setScalar(0.001);
          parts.asterisk.mat.opacity = 1;
          parts.asterisk.pivot.rotation.z = 0;
          parts.asterisk.pivot.scale.setScalar(1);
          parts.burst.mat.opacity = 1;
          parts.burst.pivot.scale.setScalar(1);
          parts.text.mat.opacity = 1;
          parts.kata.mat.opacity = 1;
          parts.text.pivot.position.x = parts.text.baseX;
          parts.star.position.x = 0; // rev 19: star assembly at its home
        };

        // rev 20, client request: the circle never reaches full size — it
        // becomes MEDIUM, then transforms into the stardust directly, and
        // the pace stays quick. Appear 0–0.35 s, grow 0.35–0.95 s (to 55%),
        // asterisk lands 0.65–1.0 s, the medium disc swells into the
        // stardust (0.95–1.75 s) while the star drifts centre → left, and
        // the glyphs + katakana emerge from behind the stardust sliding
        // right (1.15–1.85 s). Settles in ~1.9 s.
        const PHASE = {
          circle: [0.0, 0.95], // fades in tiny (0–0.35), then grows to medium
          asterisk: [0.65, 1.0], // spins down onto the medium disc
          burst: [0.95, 1.75], // disc becomes the stardust; star drifts centre → left
          dissolve: [1.0, 1.65], // …the disc fades as it merges with the burst
          text: [1.15, 1.85], // glyphs (with the katakana) rise from behind the stardust
        };
        const slide = 420; // glyph slide-in distance, SVG units (≈ a third of the lockup width)
        const renderFrame = (t) => {
          const [d0, d1] = PHASE.dissolve;
          const pd = THREE.MathUtils.clamp((t - d0) / (d1 - d0), 0, 1);
          const [b0, b1] = PHASE.burst;
          const pb = THREE.MathUtils.clamp((t - b0) / (b1 - b0), 0, 1);
          // Three readable stages (rev 20 timing). (1) Appear: fade in as
          // a small dot at ~16% size. (2) Grow: a quick smoothstep to a
          // MEDIUM size (55%) — the circle never becomes large (client
          // request). (3) Become the stardust: from that medium size the
          // disc keeps swelling as the burst takes over and it fades away
          // — the circle transforms into the stardust directly — while the
          // whole star drifts from the canvas centre to its home on the
          // left.
          const fade = 1 - EASE_OUT(pd);
          const S_SMALL = 0.16;
          const S_MED = 0.55;
          const pg = THREE.MathUtils.clamp((t - 0.35) / 0.6, 0, 1);
          const grow = pg * pg * (3 - 2 * pg); // smoothstep — slow in, slow out
          const swell = 1 + 0.25 * EASE_OUT(pb); // disc swells as it becomes the stardust
          parts.circle.scale.setScalar(Math.max(0.001, (S_SMALL + (S_MED - S_SMALL) * grow) * swell));
          parts.circle.material.opacity = Math.min(1, t / 0.35) * fade;
          // rev 19: the star assembly (disc, asterisk, burst) starts at the
          // canvas centre and drifts left to its home while bursting.
          parts.star.position.x = parts.driftX * (1 - EASE_OUT(pb));

          const [a0, a1] = PHASE.asterisk;
          const pa = THREE.MathUtils.clamp((t - a0) / (a1 - a0), 0, 1);
          const spin = Math.max(0, t - a1) * 0.1; // idle slow rotation after the settle
          parts.asterisk.pivot.rotation.z = (1 - EASE_OUT(pa)) * -Math.PI * 2.25 + spin;
          // rev 20: the asterisk lands sized to the MEDIUM disc, then grows
          // with it as the disc transforms into the full-size stardust.
          parts.asterisk.pivot.scale.setScalar(Math.max(0.001, S_MED * (0.5 + 0.5 * EASE_OUT(pa))));
          parts.asterisk.mat.opacity = EASE_OUT(pa);

          parts.burst.pivot.scale.setScalar(Math.max(0.001, 0.12 + 0.88 * EASE_BACK(pb)));
          parts.asterisk.pivot.scale.setScalar(Math.max(0.001, S_MED + (1 - S_MED) * EASE_OUT(pb)));
          parts.burst.mat.opacity = Math.min(1, pb * 4);

          const [t0, t1] = PHASE.text;
          const pt = THREE.MathUtils.clamp((t - t0) / (t1 - t0), 0, 1);
          // rev 19: the glyphs (bottom layer, under the burst) start behind
          // the stardust and slide RIGHT into place — the client asked for
          // them to rise out from behind the stardust toward the right.
          parts.text.pivot.position.x = parts.text.baseX - (1 - EASE_OUT(pt)) * slide;
          parts.text.mat.opacity = EASE_OUT(pt);
          parts.kata.mat.opacity = EASE_OUT(pt);

          renderer.render(scene, camera);
        };

        const onResize = () => {
          const w = mount.clientWidth || 1;
          const h = mount.clientHeight || 1;
          renderer.setSize(w, h);
          fitCamera(w, h);
        };
        ro = new ResizeObserver(onResize);
        ro.observe(mount);

        // `?logoT=1.5` freezes the intro at t seconds (used for phase
        // screenshots); production visits never pass it. The app routes through
        // the hash, so the param usually arrives inside `location.hash`.
        const freezeT = (() => {
          const fromSearch = new URLSearchParams(window.location.search).get("logoT");
          const fromHash = (window.location.hash.match(/[?&]logoT=([^&]*)/) || [])[1];
          const raw = fromSearch ?? fromHash;
          return raw === undefined || raw === null ? null : Number(raw);
        })();

        if (reducedMotion) {
          applyFinal();
          renderer.render(scene, camera);
        } else if (freezeT !== null && Number.isFinite(freezeT)) {
          renderFrame(freezeT);
        } else {
          let raf = 0;
          const clock = new THREE.Clock();
          const loop = () => {
            renderFrame(clock.getElapsedTime());
            raf = requestAnimationFrame(loop);
          };
          loop();
        }
      } catch (err) {
        // Never leave a broken mount on the page — fall back to the static ink
        // SVG, and keep the reason visible in the console for debugging.
        console.warn("LogoIntro: Three.js intro unavailable, using static logo —", err);
        renderer?.dispose?.();
        if (!disposed) setFailed(true);
      }
    };
    start();

    return () => {
      disposed = true;
      ro?.disconnect();
      sceneRef?.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (obj.material.map) obj.material.map.dispose();
          obj.material.dispose();
        }
      });
      renderer?.dispose();
      if (renderer?.domElement?.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [reducedMotion]);

  function buildScene() {
    const data = new SVGLoader().parse(logoRaw);
    if (data.paths.length < 3) throw new Error("unexpected logo structure");
    // Document order: [0] letter glyphs, [1] starburst polygon, [2] asterisk.
    // Classify by bounding box instead of trusting order blindly.
    const withBox = data.paths.map((p) => {
      const probe = new THREE.Box3().setFromObject(
        (() => {
          const g = new THREE.Group();
          for (const s of SVGLoader.createShapes(p)) {
            const geo = new THREE.ShapeGeometry(s, 12);
            geo.scale(1, -1, 1);
            g.add(new THREE.Mesh(geo));
          }
          return g;
        })(),
      );
      return { path: p, box: probe };
    });
    const byWidth = [...withBox].sort((a, b) => b.box.getSize(new THREE.Vector3()).x - a.box.getSize(new THREE.Vector3()).x);
    const burst = byWidth[0]; // widest: the full-bleed starburst
    // Among the rest, the leftmost element is the asterisk and everything
    // further right is the wordmark. No hard x threshold — the first
    // glyph's curves reach x≈620 even though its path data starts at x≈735.
    const others = withBox.filter((e) => e !== burst).sort((a, b) => a.box.min.x - b.box.min.x);
    if (others.length !== 2) throw new Error("unexpected logo structure");
    const asterisk = others[0];
    const text = others[1];

    const scene = new THREE.Scene();
    const span = burst.box.getSize(new THREE.Vector3());
    const circle = new THREE.Mesh(
      new THREE.CircleGeometry(span.y * 0.38, 96),
      new THREE.MeshBasicMaterial({ color: 0x111111, transparent: true, opacity: 0, side: THREE.DoubleSide }),
    );

    const parts = {
      circle,
      // The client's file fills BOTH the wordmark path and the asterisk
      // with the same light tone (#d3d4d4, class cls-2); only the starburst
      // is black. The SVG draws the asterisk after the burst, so the light
      // asterisk sits on top of it. Layer order (rev 15): asterisk on top,
      // starburst under it, glyphs at the bottom.
      asterisk: buildElement([asterisk.path], 3, 0xd3d4d4),
      burst: buildElement([burst.path], 2),
      text: buildElement([text.path], 1, 0xd3d4d4),
    };
    parts.text.baseX = parts.text.pivot.position.x; // slide-in adds to this
    circle.position.copy(parts.burst.centre);
    circle.position.z = 0;

    // rev 17: the katakana マムー from the client file, at its exact
    // original spot — translate(1256.9966 516.0573), 54 SVG units, #d3d4d4
    // (class cls-1, same light as the glyphs), drawn with Aurix first in
    // the font stack per client. SVGLoader can't turn <text> into
    // geometry, so the run is rasterised into a canvas texture at 4× and
    // placed as a textured plane inside the glyphs' pivot: it slides in
    // with them and shares their bottom layer.
    const drawKatakana = () => {
      const S = 4; // texture supersample factor
      const fontSize = 54; // SVG units, from the client file
      const probe = document.createElement("canvas");
      const pctx = probe.getContext("2d");
      pctx.font = `${fontSize * S}px ${KATA_FONT}`;
      const w = Math.ceil(pctx.measureText("マムー").width);
      const pad = fontSize * S * 0.5;
      const canvas = document.createElement("canvas");
      canvas.width = w + pad * 2;
      canvas.height = Math.ceil(fontSize * S * 1.6) + pad * 2;
      const ctx = canvas.getContext("2d");
      ctx.font = pctx.font;
      ctx.fillStyle = "#d3d4d4";
      ctx.fillText("マムー", pad, pad + fontSize * S);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      const unit = 1 / S; // one canvas px → SVG units
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0 });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(canvas.width * unit, canvas.height * unit), mat);
      // Anchor the run at the client file's baseline (SVG y-down), then
      // convert into the scene's flipped space (scene y = −svg y) and the
      // pivot's local frame.
      const baseX = 1256.9966;
      const baseY = 516.0573;
      const centreSvgX = baseX - pad * unit + (canvas.width * unit) / 2;
      const centreSvgY = baseY - (pad + fontSize * S) * unit + (canvas.height * unit) / 2;
      mesh.position.set(centreSvgX - parts.text.centre.x, -centreSvgY - parts.text.centre.y, 1);
      return { mesh, mat };
    };
    const kata = drawKatakana();
    parts.text.pivot.add(kata.mesh);
    parts.kata = kata;

    const root = new THREE.Group();
    // rev 19: the disc + asterisk + burst travel together as one "star"
    // assembly. It starts shifted to the canvas centre (parts.driftX) and
    // drifts left to this home position while bursting; the glyphs are
    // outside the group so they can rise from behind the moving star.
    const star = new THREE.Group();
    star.add(circle, parts.asterisk.pivot, parts.burst.pivot);
    root.add(star, parts.text.pivot);
    parts.star = star;
    scene.add(root);

    // Fit an orthographic camera to the whole lockup (SVG-space units),
    // keeping the lockup's own aspect so odd canvas ratios letterbox it
    // instead of stretching it horizontally.
    const full = new THREE.Box3().setFromObject(root);
    const size = full.getSize(new THREE.Vector3());
    const centre = full.getCenter(new THREE.Vector3());
    root.position.set(-centre.x, -centre.y, 0);
    // rev 19: horizontal offset from the lockup's centre to the star's
    // home — the distance the assembly travels centre → left (0 when the
    // burst is already centred).
    parts.driftX = centre.x - parts.burst.centre.x;
    const halfW = size.x * 0.515;
    const halfH = size.y * 0.515;
    const camera = new THREE.OrthographicCamera(-halfW, halfW, halfH, -halfH, -10, 10);
    camera.position.z = 5;
    const fitCamera = (w, h) => {
      const aspect = w / h;
      if (aspect >= halfW / halfH) {
        camera.top = halfH;
        camera.bottom = -halfH;
        camera.left = -halfH * aspect;
        camera.right = halfH * aspect;
      } else {
        camera.left = -halfW;
        camera.right = halfW;
        camera.top = halfW / aspect;
        camera.bottom = -halfW / aspect;
      }
      camera.updateProjectionMatrix();
    };

    return { scene, camera, parts, fitCamera };
  }

  if (failed) {
    return (
      <img
        src="/images/logo/mamuu-logo-black.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none block w-full"
        draggable="false"
      />
    );
  }

  return <div ref={mountRef} aria-hidden="true" className="pointer-events-none block h-full w-full" />;
}
