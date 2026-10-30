import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Home's backdrop (rev 9, client request): an abstract Y2K-style wireframe
 * star — long top/bottom spikes, slight fixed tilt — whose six points
 * alternately stretch and shrink (each point pulses on its own phase, so
 * neighbours swap who is long), rebuilt at a 30 fps throttle. Two
 * counter-rotating layers keep the mesh full while staying faint. Reduced
 * motion renders one static frame; no WebGL falls back to a flat SVG star.
 * Everything is disposed on unmount.
 */
const SPIKE = 5.1; // top / bottom base length (Y2K spikes)
const SIDE = 2.9; // the four shorter points
const INNER = 1.2; // waist of the star

function starGeometry(t) {
  const shape = new THREE.Shape();
  for (let i = 0; i < 12; i += 1) {
    let r;
    if (i % 2 === 0) {
      // An outer point: base length plus an oscillation. Adjacent points
      // run on opposite phases (step PI), so while one stretches the next
      // shrinks — the silhouette keeps swapping long and short spikes.
      const base = i === 0 || i === 6 ? SPIKE : SIDE;
      const phase = (i / 2) * Math.PI;
      r = base + Math.sin(t * 0.9 + phase) * base * 0.13;
    } else {
      // An inner waist vertex, breathing gently against the points.
      r = INNER + Math.sin(t * 0.7 + i * 1.7) * 0.07;
    }
    const a = (Math.PI / 6) * i - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.9,
    bevelEnabled: true,
    bevelThickness: 0.16,
    bevelSize: 0.16,
    bevelSegments: 2,
  });
  geo.center();
  return geo;
}

export default function StarVisual({ reducedMotion = false }) {
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.z = 7.2; // closer than rev 8 — the star reads larger

    const group = new THREE.Group();
    scene.add(group);

    // Two faint layers sharing one (morphing) geometry: the big star and a
    // smaller counter-turning echo.
    const geo = starGeometry(reducedMotion ? 0.8 : 0);
    const mat = new THREE.MeshBasicMaterial({ color: 0x171717, wireframe: true, transparent: true, opacity: 0.12 });
    const star = new THREE.Mesh(geo, mat);
    group.add(star);

    const echoMat = new THREE.MeshBasicMaterial({ color: 0x171717, wireframe: true, transparent: true, opacity: 0.08 });
    const echo = new THREE.Mesh(geo, echoMat);
    echo.scale.setScalar(0.55);
    group.add(echo);

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

    let raf = 0;
    let lastGeoT = -1;
    const clock = new THREE.Clock();
    const renderFrame = (t) => {
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
      // Slow drift on every axis around a slight permanent tilt, plus
      // non-uniform breathing on top of the per-point morph.
      group.rotation.z = 0.14 + Math.sin(t * 0.23) * 0.06 + pointer.x * 0.05;
      group.rotation.y = t * 0.12 + pointer.x * 0.35;
      group.rotation.x = 0.16 + Math.sin(t * 0.17) * 0.12 + pointer.y * 0.22;
      group.scale.set(1 + Math.sin(t * 0.31) * 0.05, 1 + Math.cos(t * 0.26) * 0.06, 1);
      echo.rotation.y = -t * 0.22;
      echo.rotation.x = Math.sin(t * 0.21) * 0.35;
      if (!reducedMotion && t - lastGeoT > 1 / 30) {
        // Rebuild the shape with the points at their new lengths (30 fps
        // throttle), swap it into both meshes, free the old one.
        lastGeoT = t;
        const next = starGeometry(t);
        const old = star.geometry;
        star.geometry = next;
        echo.geometry = next;
        old.dispose();
      }
      renderer.render(scene, camera);
    };

    if (reducedMotion) {
      renderFrame(0.8);
    } else {
      const loop = () => {
        renderFrame(clock.getElapsedTime());
        raf = requestAnimationFrame(loop);
      };
      loop();
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      star.geometry.dispose();
      mat.dispose();
      echoMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [reducedMotion]);

  if (failed) {
    return (
      <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden="true">
        <svg viewBox="0 0 200 320" className="w-64 opacity-25">
          <path
            d="M100 6l18 78 46 28-42 46 8 74-30-34-30 34 8-74-42-46 46-28z"
            fill="none"
            stroke="#171717"
            strokeWidth="1"
          />
        </svg>
      </div>
    );
  }

  return <div ref={mountRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
}
