'use client';

import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let animFrameId: number;
    let cleanupFn: (() => void) | undefined;

    const init = async () => {
      const [THREE, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('three'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const canvas  = canvasRef.current;
      const section = sectionRef.current;
      if (!canvas || !section) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile       = window.innerWidth < 768 || window.matchMedia('(hover: none)').matches;

      // ─── Renderer ───────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(1.5, 2.8, 10);
      camera.lookAt(0, -0.5, 0);

      const clock  = new THREE.Clock();
      const ACCENT = new THREE.Color(0xc8a97e);

      const rootGroup = new THREE.Group();
      scene.add(rootGroup);

      // ─── Materials ──────────────────────────────────────────
      const wireMat = new THREE.LineBasicMaterial({
        color: ACCENT, transparent: true, opacity: 0.30,
      });
      const edgeMat = new THREE.LineBasicMaterial({
        color: ACCENT, transparent: true, opacity: 0.55,
      });
      const fillMat = new THREE.MeshBasicMaterial({
        color: 0x0c0a07, transparent: true, opacity: 0.92,
      });

      // Helper: add a mesh + its edges to a group
      const addBox = (
        group: InstanceType<typeof THREE.Group>,
        w: number, h: number, d: number,
        x: number, y: number, z: number,
        mat?: InstanceType<typeof THREE.MeshBasicMaterial>,
      ) => {
        const geo   = new THREE.BoxGeometry(w, h, d);
        const mesh  = new THREE.Mesh(geo, mat ?? fillMat);
        mesh.position.set(x, y, z);
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat);
        edges.position.set(x, y, z);
        group.add(mesh, edges);
        return { geo, mesh, edges };
      };

      const addCyl = (
        group: InstanceType<typeof THREE.Group>,
        rt: number, rb: number, h: number, segs: number,
        x: number, y: number, z: number,
      ) => {
        const geo   = new THREE.CylinderGeometry(rt, rb, h, segs);
        const mesh  = new THREE.Mesh(geo, fillMat);
        mesh.position.set(x, y, z);
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat);
        edges.position.set(x, y, z);
        group.add(mesh, edges);
        return { geo, mesh, edges };
      };

      // ─── Room shell ─────────────────────────────────────────
      // Back wall, left wall, right wall, floor, ceiling — open front
      const FLOOR_Y = -2.25;
      const CEIL_Y  =  2.25;
      const roomGroup = new THREE.Group();

      // Walls as planes (EdgesGeometry on PlaneGeometry = 4 lines per plane)
      const wallMat = wireMat;
      const planeEdge = (w: number, h: number, rx: number, ry: number, rz: number, px: number, py: number, pz: number) => {
        const geo  = new THREE.PlaneGeometry(w, h, 4, 3);
        const edge = new THREE.LineSegments(new THREE.EdgesGeometry(geo), wallMat.clone());
        edge.rotation.set(rx, ry, rz);
        edge.position.set(px, py, pz);
        roomGroup.add(edge);
      };
      planeEdge(10, 4.5, 0,      0,    0,    0,  0, -3.5);   // back wall
      planeEdge(4.5, 10, 0, -Math.PI/2, 0,  0, FLOOR_Y, 0);  // floor
      planeEdge(4.5, 10, 0,  Math.PI/2, 0,  0, CEIL_Y,  0);  // ceiling
      planeEdge(4.5, 4.5, 0,  Math.PI/2,  Math.PI/2, -5, 0, 0); // left wall
      planeEdge(4.5, 4.5, 0, -Math.PI/2,  Math.PI/2,  5, 0, 0); // right wall

      // Window frame on back wall
      addBox(roomGroup, 2.0, 1.4, 0.04,  1.2, 0.6, -3.48);   // window opening border
      addBox(roomGroup, 0.04, 1.4, 0.04, 1.2, 0.6, -3.48);   // vertical pane divider
      addBox(roomGroup, 2.0, 0.04, 0.04, 1.2, 0.6, -3.48);   // horizontal pane divider

      rootGroup.add(roomGroup);

      // ─── Floor grid ─────────────────────────────────────────
      const grid    = new THREE.GridHelper(10, 20, ACCENT, ACCENT);
      const gridMat = grid.material as import('three').Material;
      gridMat.transparent = true;
      gridMat.opacity     = 0.08;
      grid.position.y     = FLOOR_Y;
      rootGroup.add(grid);

      // ─── Furniture ──────────────────────────────────────────
      const furGroup = new THREE.Group();

      // ── Sofa ──────────────────────────────────────────────
      const sofa = new THREE.Group();
      // Seat cushion base
      addBox(sofa, 3.2, 0.45, 1.1,  0, 0, 0);
      // Back rest
      addBox(sofa, 3.2, 1.0, 0.30,  0, 0.72, -0.40);
      // Left armrest
      addBox(sofa, 0.28, 0.65, 1.1, -1.46, 0.10, 0);
      // Right armrest
      addBox(sofa, 0.28, 0.65, 1.1,  1.46, 0.10, 0);
      // 4 legs
      [[-1.3, -0.4], [1.3, -0.4], [-1.3, 0.4], [1.3, 0.4]].forEach(([lx, lz]) => {
        addBox(sofa, 0.10, 0.28, 0.10, lx, -0.36, lz);
      });
      // 3 seat cushions (thin pillows)
      [-1.0, 0, 1.0].forEach(cx => {
        addBox(sofa, 0.9, 0.12, 1.0, cx, 0.25, 0.02);
      });
      // 2 back cushions
      [-0.82, 0.82].forEach(cx => {
        addBox(sofa, 1.1, 0.7, 0.18, cx, 0.6, -0.30);
      });
      sofa.position.set(-1.8, FLOOR_Y + 0.50, 0.6);
      furGroup.add(sofa);

      // ── Coffee table ──────────────────────────────────────
      const table = new THREE.Group();
      // Tabletop
      addBox(table, 1.8, 0.08, 0.90, 0, 0, 0);
      // Lower shelf
      addBox(table, 1.5, 0.06, 0.70, 0, -0.38, 0);
      // 4 tapered legs
      [[-0.82, -0.38], [0.82, -0.38], [-0.82, 0.38], [0.82, 0.38]].forEach(([lx, lz]) => {
        addCyl(table, 0.035, 0.045, 0.74, 6, lx, -0.37, lz);
      });
      // Small decor: a book stack
      addBox(table, 0.35, 0.07, 0.25,  0.5, 0.07, 0);
      addBox(table, 0.30, 0.05, 0.22,  0.5, 0.135, 0);
      // Small bowl/sphere
      addCyl(table, 0.12, 0.15, 0.08, 8, -0.4, 0.06, 0);
      table.position.set(1.0, FLOOR_Y + 0.42, 0.3);
      furGroup.add(table);

      // ── Floor lamp ────────────────────────────────────────
      const lamp = new THREE.Group();
      // Heavy base disc
      addCyl(lamp, 0.22, 0.26, 0.06, 10, 0, 0, 0);
      // Pole — slim cylinder
      addCyl(lamp, 0.025, 0.025, 2.4, 8, 0, 1.23, 0);
      // Mid-pole ring detail
      addCyl(lamp, 0.06, 0.06, 0.05, 8, 0, 0.9, 0);
      // Shade (cone)
      const shadGeo  = new THREE.CylinderGeometry(0.30, 0.16, 0.55, 10, 1, true);
      const shadMesh = new THREE.Mesh(shadGeo, fillMat);
      shadMesh.position.set(0, 2.55, 0);
      const shadEdge = new THREE.LineSegments(new THREE.EdgesGeometry(shadGeo), edgeMat);
      shadEdge.position.set(0, 2.55, 0);
      lamp.add(shadMesh, shadEdge);
      // Inner top cap
      addCyl(lamp, 0.15, 0.15, 0.04, 10, 0, 2.83, 0);
      lamp.position.set(3.5, FLOOR_Y, -1.2);
      furGroup.add(lamp);

      // ── Bookshelf ─────────────────────────────────────────
      const shelf = new THREE.Group();
      const SW = 1.4, SH = 3.0, SD = 0.36;
      // Outer frame
      addBox(shelf, SW, 0.055, SD,  0, 0,      0);   // bottom
      addBox(shelf, SW, 0.055, SD,  0, SH,     0);   // top
      addBox(shelf, 0.055, SH, SD, -SW/2 + 0.03, SH/2, 0); // left side
      addBox(shelf, 0.055, SH, SD,  SW/2 - 0.03, SH/2, 0); // right side
      addBox(shelf, SW, SH, 0.055,  0, SH/2, -SD/2 + 0.03); // back panel
      // 3 internal shelves at different heights
      [0.75, 1.55, 2.35].forEach(sy => {
        addBox(shelf, SW - 0.12, 0.04, SD, 0, sy, 0);
      });
      // Books — varying heights & widths on each shelf level
      const bookData: [number, number, number, number][] = [
        // [shelf_y, x_offset, book_w, book_h]
        [0.42,  -0.48, 0.10, 0.54], [0.42, -0.36, 0.09, 0.50], [0.42, -0.24, 0.11, 0.60],
        [0.42, -0.11, 0.08, 0.45], [0.42,  0.02, 0.10, 0.52], [0.42,  0.15, 0.09, 0.48],
        [0.42,  0.26, 0.10, 0.56], [0.42,  0.38, 0.11, 0.42],
        [1.22, -0.5,  0.10, 0.55], [1.22, -0.38, 0.09, 0.48], [1.22, -0.25, 0.12, 0.62],
        [1.22, -0.10, 0.08, 0.44], [1.22,  0.02, 0.10, 0.58],
        [2.02, -0.48, 0.09, 0.46], [2.02, -0.37, 0.11, 0.52], [2.02, -0.23, 0.10, 0.50],
        [2.02, -0.10, 0.08, 0.44], [2.02,  0.02, 0.09, 0.49], [2.02,  0.13, 0.10, 0.53],
      ];
      bookData.forEach(([sy, bx, bw, bh]) => {
        addBox(shelf, bw, bh, SD * 0.82, bx, sy + bh / 2, 0);
      });
      // Small decorative object on top
      addCyl(shelf, 0.07, 0.09, 0.28, 8, 0.2, SH + 0.16, 0);
      addBox(shelf, 0.22, 0.10, 0.14, -0.3, SH + 0.055, 0);
      shelf.position.set(-4.2, FLOOR_Y, -0.5);
      furGroup.add(shelf);

      // ── Rug (flat box with subdivided edge lines) ──────────
      const rugGeo  = new THREE.BoxGeometry(4.2, 0.03, 2.6, 6, 1, 4);
      const rugMesh = new THREE.Mesh(rugGeo, fillMat);
      rugMesh.position.set(-0.4, FLOOR_Y + 0.016, 0.4);
      const rugEdge = new THREE.LineSegments(new THREE.EdgesGeometry(rugGeo), new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.20 }));
      rugEdge.position.copy(rugMesh.position);
      furGroup.add(rugMesh, rugEdge);

      rootGroup.add(furGroup);

      // ─── Particles ──────────────────────────────────────────
      const COUNT = isMobile ? 80 : 220;
      const positions = new Float32Array(COUNT * 3);
      const velocities: { phase: number; speed: number; amp: number; origY: number }[] = [];
      for (let i = 0; i < COUNT; i++) {
        const x = (Math.random() - 0.5) * 9;
        const y = (Math.random() - 0.5) * 4;
        const z = (Math.random() - 0.5) * 7;
        positions[i * 3] = x; positions[i * 3 + 1] = y; positions[i * 3 + 2] = z;
        velocities.push({ phase: Math.random() * Math.PI * 2, speed: 0.15 + Math.random() * 0.35, amp: 0.002 + Math.random() * 0.003, origY: y });
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({ color: ACCENT, size: 0.035, transparent: true, opacity: 0.40, sizeAttenuation: true });
      rootGroup.add(new THREE.Points(particleGeo, particleMat));

      // ─── Mouse ──────────────────────────────────────────────
      const mouseTarget  = { x: 0, y: 0 };
      const mouseCurrent = { x: 0, y: 0 };
      const onMouse = (e: MouseEvent) => {
        mouseTarget.x = (e.clientX / window.innerWidth  - 0.5) * 2;
        mouseTarget.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      if (!isMobile) document.addEventListener('mousemove', onMouse);

      // ─── Visibility observer ────────────────────────────────
      let visible = true;
      const obs = new IntersectionObserver(e => { visible = e[0].isIntersecting; }, { threshold: 0 });
      obs.observe(section);

      // ─── Render loop ────────────────────────────────────────
      const animate = () => {
        animFrameId = requestAnimationFrame(animate);
        if (!visible) { renderer.render(scene, camera); return; }
        const t = clock.getElapsedTime();

        if (!prefersReduced) {
          mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.028;
          mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.028;
          rootGroup.rotation.y = Math.sin(t * 0.06) * 0.04 + mouseCurrent.x * 0.09;
          rootGroup.rotation.x = mouseCurrent.y * 0.04;
          wireMat.opacity   = 0.22 + Math.sin(t * 0.5) * 0.08;
          edgeMat.opacity   = 0.45 + Math.sin(t * 0.5 + 1) * 0.10;

          const pos = particleGeo.attributes.position.array as Float32Array;
          for (let i = 0; i < COUNT; i++) {
            const v = velocities[i];
            pos[i * 3 + 1] = v.origY + Math.sin(t * v.speed + v.phase) * v.amp * 60;
          }
          particleGeo.attributes.position.needsUpdate = true;
        }

        renderer.render(scene, camera);
      };
      animate();

      // ─── Resize ─────────────────────────────────────────────
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      };
      window.addEventListener('resize', onResize);

      // ─── Scroll fade ────────────────────────────────────────
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: self => {
          if (canvas) canvas.style.opacity = String(Math.max(0, 1 - self.progress * 1.4));
          if (!prefersReduced) rootGroup.rotation.y += self.progress * 0.004;
        },
      });

      cleanupFn = () => {
        cancelAnimationFrame(animFrameId);
        st.kill();
        obs.disconnect();
        document.removeEventListener('mousemove', onMouse);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        particleGeo.dispose();
      };
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => init(), { timeout: 2000 });
    } else {
      setTimeout(init, 200);
    }
    return () => { cleanupFn?.(); };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.eyebrow}>Home Renovation. Reimagined.</p>
        <h1 className={styles.headline} aria-label="Scan it. Style it. Own it.">
          <span className={styles.line}><span className={styles.lineInner}>Scan it.</span></span>
          <span className={styles.line}><span className={styles.lineInner}>Style it.</span></span>
          <span className={`${styles.line} ${styles.lineAccent}`}>
            <span className={styles.lineInner}>Own it.</span>
          </span>
        </h1>
        <p className={styles.sub}>LiDAR scanning. AI-powered design. One-tap multi-brand checkout.</p>
        <div className={styles.ctaGroup}>
          <a href={process.env.NEXT_PUBLIC_APP_URL || '/try'} className={styles.btnPrimary}>Try It Free</a>
          <a href="#how-it-works" className={styles.btnGhost}>How it works</a>
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
