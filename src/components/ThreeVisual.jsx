import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * The menu's companion: a slowly breathing wireframe blob with a small coral
 * satellite. Pointer movement turns the group and swells the distortion.
 * Lives only while the menu is open; everything is disposed on unmount.
 */
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.z = 7.5;

    const group = new THREE.Group();
    scene.add(group);

    const geo = new THREE.IcosahedronGeometry(2.3, width < 768 ? 3 : 4);
    const base = geo.attributes.position.array.slice();
    const mat = new THREE.MeshBasicMaterial({ color: 0x171717, wireframe: true, transparent: true, opacity: 0.24 });
    const blob = new THREE.Mesh(geo, mat);
    group.add(blob);

    const dotGeo = new THREE.IcosahedronGeometry(0.34, 1);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x525252 });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    group.add(dot);

    const pos = geo.attributes.position;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const distort = (t, amp) => {
      for (let i = 0; i < pos.count; i += 1) {
        const ix = i * 3;
        const bx = base[ix];
        const by = base[ix + 1];
        const bz = base[ix + 2];
        const n =
          Math.sin(bx * 1.35 + t * 0.7) * Math.cos(by * 1.15 + t * 0.5) +
          Math.sin(bz * 1.5 + t * 0.62) * Math.cos(bx * 0.9 - t * 0.4);
        const f = 1 + n * amp;
        pos.array[ix] = bx * f;
        pos.array[ix + 1] = by * f;
        pos.array[ix + 2] = bz * f;
      }
      pos.needsUpdate = true;
    };

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
    const clock = new THREE.Clock();
    const renderFrame = () => {
      const t = clock.getElapsedTime();
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
      group.rotation.y = t * 0.12 + pointer.x * 0.45;
      group.rotation.x = pointer.y * 0.3;
      const proximity = 1 - Math.min(Math.hypot(pointer.x, pointer.y) / 1.4, 1);
      distort(t, 0.13 + proximity * 0.12);
      dot.position.set(Math.sin(t * 0.5) * 3.1, Math.cos(t * 0.36) * 1.7, Math.sin(t * 0.42) * 1.2);
      renderer.render(scene, camera);
    };

    if (reducedMotion) {
      distort(0.8, 0.13);
      renderer.render(scene, camera);
    } else {
      const loop = () => {
        renderFrame();
        raf = requestAnimationFrame(loop);
      };
      loop();
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      geo.dispose();
      mat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [reducedMotion]);

  if (failed) {
    return (
      <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="w-72 opacity-30">
          <path
            d="M100 18c30 0 58 12 70 38 12 27 4 58-14 78-19 21-50 30-78 22-27-8-48-32-52-60-4-29 10-58 34-72 12-7 26-6 40-6z"
            fill="#525252"
            opacity="0.4"
          />
        </svg>
      </div>
    );
  }

  return <div ref={mountRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
}
