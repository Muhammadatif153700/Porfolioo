/* ================================================================
   MUHAMMAD ATIF — PORTFOLIO.JS
   Three.js Cylinder Carousel | GSAP Animations | Terminal
================================================================ */

'use strict';

/* ──────────────────────────────────────────────────────────────────
   0.  WAIT FOR DOM + LIBRARIES
────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // Set footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Init all modules
  initNavbar();
  initThreejsCylinder();
  initCategoryFilter();
  initProjectCardTilt();
  initScrollAnimations();
  initSkillsTabs();
  initTerminal();
  initContactForm();
  initTerminalModeSwitcher();
});

/* ──────────────────────────────────────────────────────────────────
   1.  NAVBAR — add scrolled class on scroll
────────────────────────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Smooth-scroll for all nav anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ──────────────────────────────────────────────────────────────────
   2.  THREE.JS — 3D GLASS CYLINDER CAROUSEL
────────────────────────────────────────────────────────────────── */
function initThreejsCylinder() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  /* ── Scene & Renderer ── */
  const scene    = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  /* ── Camera ── */
  const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 9);

  /* ── Resize handler ── */
  function onResize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', onResize);
  onResize();

  /* ── Lighting ── */
  scene.add(new THREE.AmbientLight(0xfff8ef, 0.9));

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.6);
  dirLight.position.set(5, 10, 8);
  scene.add(dirLight);

  const amberPoint = new THREE.PointLight(0xd97706, 4, 25);
  amberPoint.position.set(4, 3, 6);
  scene.add(amberPoint);

  const coolPoint = new THREE.PointLight(0x9fb3c8, 2, 25);
  coolPoint.position.set(-6, -3, -6);
  scene.add(coolPoint);

  const backLight = new THREE.PointLight(0xfff3e0, 1.5, 20);
  backLight.position.set(0, -8, -3);
  scene.add(backLight);

  /* ── Category data for panel textures ── */
  const CATEGORIES = [
    {
      id:       'web',
      title:    'WEB\nDEVELOPMENT',
      subtitle: 'HTML · CSS · JavaScript · TypeScript',
      color:    '#b45309',
      stats:    [['LIVE APPS', '3 Deployed'], ['LANG', 'JS / TS'], ['HOST', 'Vercel / Netlify']],
      icon:     '⬡',
      lines:    ['HTML · CSS · JavaScript', 'TypeScript · REST API', 'Vercel · Netlify Deploy'],
    },
    {
      id:       'mobile',
      title:    'FLUTTER\nAPPS',
      subtitle: 'Cross-Platform Mobile · Dart',
      color:    '#c2410c',
      stats:    [['APPS BUILT', '3 Flutter'], ['UI', 'Material 3'], ['PLATFORMS', 'Android/iOS']],
      icon:     '◈',
      lines:    ['Flutter · Dart · Material 3', 'QR Studio · Islamic App', 'Cross-Platform Mobile'],
    },
    {
      id:       'systems',
      title:    'SYSTEMS\nENGINEERING',
      subtitle: 'C++ · OOP · DSA · Algorithms',
      color:    '#7c5c2e',
      stats:    [['LANGUAGE', 'C++ / ASM'], ['PATTERN', 'OOP / DSA'], ['STARS', '★ 1 Star']],
      icon:     '⬧',
      lines:    ['C++ · OOP · Algorithms', 'Smart Traffic Mgmt', 'ATM Simulator · DSA'],
    },
    {
      id:       'all',
      title:    'ALL\nPROJECTS',
      subtitle: '15 Repos · GitHub Portfolio',
      color:    '#7c2d12',
      stats:    [['REPOS', '15 Public'], ['DEPLOYS', '3 Live'], ['GITHUB', 'Muhammadatif']],
      icon:     '◉',
      lines:    ['GitHub: Muhammadatif153700', 'Web · Mobile · Systems', '2025 – 2026 Active'],
    },
  ];

  /* ── Canvas Texture Painter ── */
  function drawPanelTexture(cat) {
    const W = 512, H = 768;
    const c   = document.createElement('canvas');
    c.width   = W;
    c.height  = H;
    const ctx = c.getContext('2d');

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0,   '#1c120c');
    bg.addColorStop(0.5, '#2e1c14');
    bg.addColorStop(1,   '#1c120c');
    ctx.fillStyle = bg;
    ctx.roundRect(0, 0, W, H, 24);
    ctx.fill();

    // Subtle grid pattern
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 32) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 32) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Amber glow border
    const borderGrad = ctx.createLinearGradient(0, 0, W, 0);
    borderGrad.addColorStop(0,   'transparent');
    borderGrad.addColorStop(0.3, cat.color);
    borderGrad.addColorStop(0.7, cat.color);
    borderGrad.addColorStop(1,   'transparent');
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 2;
    ctx.strokeRect(12, 12, W - 24, H - 24);

    // Corner accents
    const cSize = 20;
    ctx.strokeStyle = cat.color;
    ctx.lineWidth = 2.5;
    [[12, 12], [W-12, 12], [12, H-12], [W-12, H-12]].forEach(([x, y]) => {
      const dx = x < W/2 ? 1 : -1;
      const dy = y < H/2 ? 1 : -1;
      ctx.beginPath();
      ctx.moveTo(x + dx * cSize, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + dy * cSize);
      ctx.stroke();
    });

    // Icon / badge top
    ctx.font = 'bold 48px serif';
    ctx.fillStyle = cat.color;
    ctx.globalAlpha = 0.4;
    ctx.textAlign = 'center';
    ctx.fillText(cat.icon, W / 2, 100);
    ctx.globalAlpha = 1;

    // Category number badge
    const idx = CATEGORIES.indexOf(cat);
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillStyle = cat.color;
    ctx.textAlign = 'left';
    ctx.fillText(`0${idx + 1}`, 32, 52);

    // EXPLORE badge (top-right)
    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    ctx.fillStyle = cat.color;
    ctx.textAlign = 'right';
    ctx.fillText('CLICK TO EXPLORE →', W - 32, 52);

    // Main title (multiline)
    const titleLines = cat.title.split('\n');
    ctx.font = 'bold 52px "Playfair Display", serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    titleLines.forEach((line, i) => {
      ctx.fillText(line, W / 2, 170 + i * 60);
    });

    // Subtitle
    ctx.font = '500 16px Inter, sans-serif';
    ctx.fillStyle = 'rgba(148,163,184,0.75)';
    ctx.textAlign = 'center';
    ctx.fillText(cat.subtitle, W / 2, 310);

    // Divider
    const div = ctx.createLinearGradient(60, 0, W - 60, 0);
    div.addColorStop(0,   'transparent');
    div.addColorStop(0.5, cat.color);
    div.addColorStop(1,   'transparent');
    ctx.strokeStyle = div;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, 335); ctx.lineTo(W - 60, 335);
    ctx.stroke();

    // Stats section
    cat.stats.forEach(([label, value], i) => {
      const y = 390 + i * 80;
      // Stat box background
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      ctx.beginPath();
      ctx.roundRect(36, y - 30, W - 72, 64, 12);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.07)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(36, y - 30, W - 72, 64, 12);
      ctx.stroke();

      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(148,163,184,0.7)';
      ctx.textAlign = 'left';
      ctx.fillText(label.toUpperCase(), 58, y + 2);

      ctx.font = 'bold 22px "JetBrains Mono", monospace';
      ctx.fillStyle = cat.color;
      ctx.textAlign = 'right';
      ctx.fillText(value, W - 58, y + 2);
    });

    // Tech pills
    const pillY = H - 110;
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    cat.lines.forEach((line, i) => {
      const textW = ctx.measureText(line).width;
      const pillX = W / 2;
      const py = pillY + i * 30;

      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.beginPath();
      ctx.roundRect(pillX - textW / 2 - 14, py - 13, textW + 28, 24, 8);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.textAlign = 'center';
      ctx.fillText(line, pillX, py + 4);
    });

    return new THREE.CanvasTexture(c);
  }

  /* ── Panel Geometry ── */
  const RADIUS = 3.2;
  const PW     = 3.9;   // panel width (units)
  const PH     = 5.2;   // panel height (units)
  const panelGroup = new THREE.Group();
  const panels = [];

  CATEGORIES.forEach((cat, i) => {
    const angle = i * (Math.PI / 2);

    // Main content panel
    const geo = new THREE.PlaneGeometry(PW, PH);
    const tex = drawPanelTexture(cat);
    const mat = new THREE.MeshStandardMaterial({
      map:              tex,
      transparent:      true,
      opacity:          0.92,
      roughness:        0.12,
      metalness:        0.08,
      emissive:         new THREE.Color(cat.color),
      emissiveIntensity: 0,
      side:             THREE.FrontSide,
    });
    const panel = new THREE.Mesh(geo, mat);
    panel.position.set(
      Math.sin(angle) * RADIUS,
      0,
      Math.cos(angle) * RADIUS
    );
    panel.rotation.y = -angle;
    panel.userData   = { category: cat, index: i };

    panelGroup.add(panel);
    panels.push(panel);

    // Glowing edge outline (thin border plane, slightly larger)
    const edgeGeo = new THREE.PlaneGeometry(PW + 0.06, PH + 0.06);
    const edgeMat = new THREE.MeshBasicMaterial({
      color:       new THREE.Color(cat.color),
      transparent: true,
      opacity:     0.0,
      side:        THREE.FrontSide,
    });
    const edge = new THREE.Mesh(edgeGeo, edgeMat);
    edge.position.set(
      Math.sin(angle) * (RADIUS + 0.01),
      0,
      Math.cos(angle) * (RADIUS + 0.01)
    );
    edge.rotation.y = -angle;
    edge.userData.isEdge = true;
    panelGroup.add(edge);
    panel.userData.edge = edge;
  });

  scene.add(panelGroup);

  /* ── Decorative torus rings ── */
  function makeRing(yPos) {
    const geo  = new THREE.TorusGeometry(RADIUS, 0.018, 8, 80);
    const mat  = new THREE.MeshStandardMaterial({
      color:       0xb45309,
      roughness:   0.3,
      metalness:   0.5,
      transparent: true,
      opacity:     0.55,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = Math.PI / 2;
    mesh.position.y = yPos;
    scene.add(mesh);
    return mesh;
  }
  const topRing    = makeRing(PH / 2 + 0.05);
  const bottomRing = makeRing(-PH / 2 - 0.05);
  const midRing    = makeRing(0);

  /* ── Ambient floating particles ── */
  const PARTICLE_COUNT = 120;
  const pPositions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    pPositions[i * 3]     = (Math.random() - 0.5) * 18;
    pPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    pPositions[i * 3 + 2] = (Math.random() - 0.5) * 18;
  }
  const bgParticleGeo = new THREE.BufferGeometry();
  bgParticleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
  const bgParticleMat = new THREE.PointsMaterial({
    color:       0xd97706,
    size:        0.06,
    transparent: true,
    opacity:     0.35,
  });
  const bgParticles = new THREE.Points(bgParticleGeo, bgParticleMat);
  scene.add(bgParticles);

  /* ── Interaction State ── */
  const mouse       = new THREE.Vector2(9999, 9999);
  const raycaster   = new THREE.Raycaster();
  let hoveredPanel  = null;
  let targetRotY    = 0;
  let velRotY       = 0;
  let isDragging    = false;
  let prevPointerX  = 0;
  let autoRotSpeed  = 0.0025;
  const tooltip     = document.getElementById('cursor-tooltip');

  /* ── Mouse tracking ── */
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
    mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;

    // Move tooltip
    tooltip.style.left = `${e.clientX}px`;
    tooltip.style.top  = `${e.clientY}px`;

    if (isDragging) {
      const dx = e.clientX - prevPointerX;
      velRotY += dx * 0.008;
      prevPointerX = e.clientX;
    }
  });

  canvas.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const t = e.touches[0];
    const dx = t.clientX - prevPointerX;
    velRotY += dx * 0.006;
    prevPointerX = t.clientX;
    e.preventDefault();
  }, { passive: false });

  canvas.addEventListener('pointerdown', e => {
    isDragging   = true;
    prevPointerX = e.clientX;
    autoRotSpeed = 0;
    canvas.style.cursor = 'grabbing';
  });
  window.addEventListener('pointerup', () => {
    if (isDragging) {
      isDragging   = false;
      autoRotSpeed = 0.0025;
      canvas.style.cursor = 'default';
    }
  });

  /* ── Click: Particle burst + scroll ── */
  canvas.addEventListener('click', () => {
    if (Math.abs(velRotY) > 0.05) return; // skip if was a drag
    if (!hoveredPanel) return;

    const cat = hoveredPanel.userData.category;
    triggerParticleBurst(hoveredPanel.position.clone());

    // Fade out canvas, then scroll to projects
    gsap.to(canvas, {
      opacity:  0,
      duration: 0.5,
      onComplete: () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Activate the matching filter button
        setTimeout(() => {
          const btn = document.querySelector(`.filter-btn[data-category="${cat.id}"]`);
          if (btn) btn.click();
          gsap.to(canvas, { opacity: 1, duration: 0.8, delay: 0.3 });
        }, 600);
      },
    });
  });

  /* ── Particle burst effect ── */
  function triggerParticleBurst(origin) {
    const count  = 100;
    const pos    = new Float32Array(count * 3);
    const vels   = [];

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = origin.x;
      pos[i * 3 + 1] = origin.y;
      pos[i * 3 + 2] = origin.z;
      vels.push({
        x: (Math.random() - 0.5) * 0.35,
        y: (Math.random() - 0.5) * 0.35,
        z: (Math.random() - 0.5) * 0.35,
      });
    }

    const geo  = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat  = new THREE.PointsMaterial({ color: 0xd97706, size: 0.1, transparent: true, opacity: 1 });
    const pts  = new THREE.Points(geo, mat);
    scene.add(pts);

    let frame = 0;
    const totalFrames = 50;

    function animateBurst() {
      if (frame >= totalFrames) { scene.remove(pts); geo.dispose(); mat.dispose(); return; }
      frame++;
      const arr = geo.attributes.position.array;
      for (let i = 0; i < count; i++) {
        arr[i * 3]     += vels[i].x;
        arr[i * 3 + 1] += vels[i].y;
        arr[i * 3 + 2] += vels[i].z;
        // Gravity
        vels[i].y -= 0.004;
      }
      geo.attributes.position.needsUpdate = true;
      mat.opacity = 1 - frame / totalFrames;
      mat.size    = 0.1 + frame * 0.003;
      requestAnimationFrame(animateBurst);
    }
    animateBurst();
  }

  /* ── Animation Loop ── */
  function animate() {
    requestAnimationFrame(animate);

    // Auto-rotate + inertia
    if (!isDragging) {
      velRotY     *= 0.94; // dampen
      targetRotY  += autoRotSpeed + velRotY;
    }
    panelGroup.rotation.y = THREE.MathUtils.lerp(panelGroup.rotation.y, targetRotY, 0.06);

    // Rings slow counter-rotation
    topRing.rotation.z    += 0.0008;
    bottomRing.rotation.z -= 0.0006;
    midRing.rotation.z    += 0.0003;

    // Background particles drift
    bgParticles.rotation.y += 0.0004;
    bgParticles.rotation.x += 0.0001;

    // Raycaster hover
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(panels);

    if (hits.length > 0) {
      const hit = hits[0].object;
      if (hoveredPanel !== hit) {
        // Un-highlight previous
        if (hoveredPanel) {
          gsap.to(hoveredPanel.material, { emissiveIntensity: 0, duration: 0.3 });
          gsap.to(hoveredPanel.userData.edge.material, { opacity: 0, duration: 0.3 });
        }
        hoveredPanel = hit;
        // Highlight new
        gsap.to(hoveredPanel.material, { emissiveIntensity: 0.25, duration: 0.3 });
        gsap.to(hoveredPanel.userData.edge.material, { opacity: 0.55, duration: 0.3 });
      }
      canvas.style.cursor = 'pointer';
      tooltip.style.opacity = '1';
    } else {
      if (hoveredPanel) {
        gsap.to(hoveredPanel.material, { emissiveIntensity: 0, duration: 0.3 });
        gsap.to(hoveredPanel.userData.edge.material, { opacity: 0, duration: 0.3 });
        hoveredPanel = null;
      }
      canvas.style.cursor = isDragging ? 'grabbing' : 'default';
      tooltip.style.opacity = '0';
    }

    renderer.render(scene, camera);
  }
  animate();
}

/* ──────────────────────────────────────────────────────────────────
   3.  CATEGORY FILTER
────────────────────────────────────────────────────────────────── */
function initCategoryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category;

      // Update active state
      filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected','true');

      // Filter cards with GSAP
      cards.forEach(card => {
        const match = cat === 'all' || card.dataset.category === cat;
        if (match) {
          card.classList.remove('hidden');
          gsap.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
        } else {
          gsap.to(card, {
            opacity:  0,
            y:       -20,
            duration: 0.3,
            onComplete: () => card.classList.add('hidden'),
          });
        }
      });
    });
  });
}

/* ──────────────────────────────────────────────────────────────────
   4.  PROJECT CARD — 3D TILT ON HOVER
────────────────────────────────────────────────────────────────── */
function initProjectCardTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left - rect.width  / 2;
      const y      = e.clientY - rect.top  - rect.height / 2;
      const rotX   = (y / rect.height) * -10;
      const rotY   = (x / rect.width)  *  10;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

/* ──────────────────────────────────────────────────────────────────
   5.  SCROLL ANIMATIONS (GSAP ScrollTrigger)
────────────────────────────────────────────────────────────────── */
function initScrollAnimations() {
  /* Project cards fade-rise */
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 70 },
      {
        opacity:  1,
        y:        0,
        duration: 0.75,
        delay:    (i % 2) * 0.15,
        ease:     'power3.out',
        scrollTrigger: {
          trigger: card,
          start:   'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* Experience entries */
  gsap.utils.toArray('.exp-entry').forEach((entry, i) => {
    gsap.fromTo(entry,
      { opacity: 0, x: -50 },
      {
        opacity:  1,
        x:        0,
        duration: 0.7,
        delay:    i * 0.12,
        ease:     'power2.out',
        scrollTrigger: {
          trigger: entry,
          start:   'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* Metric cards */
  gsap.utils.toArray('.exp-metric-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40 },
      {
        opacity:  1,
        y:        0,
        duration: 0.55,
        delay:    i * 0.1,
        ease:     'power2.out',
        scrollTrigger: {
          trigger: card,
          start:   'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* Section headers */
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.fromTo(header,
      { opacity: 0, y: 30 },
      {
        opacity:  1,
        y:        0,
        duration: 0.8,
        ease:     'power2.out',
        scrollTrigger: {
          trigger: header,
          start:   'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

/* ──────────────────────────────────────────────────────────────────
   6.  SKILLS TABS
────────────────────────────────────────────────────────────────── */
const TECH_STACK = [
  {
    category: 'Frontend',
    tools: [
      { name: 'React / Next.js', level: 'Expert',   experience: '5 yrs', icon: '⚛' },
      { name: 'Three.js / R3F',  level: 'Expert',   experience: '4 yrs', icon: '◈' },
      { name: 'TypeScript',      level: 'Expert',   experience: '5 yrs', icon: '⬡' },
      { name: 'WebGL / WebGPU',  level: 'Advanced', experience: '3 yrs', icon: '◉' },
      { name: 'GSAP / Framer',   level: 'Advanced', experience: '4 yrs', icon: '▸' },
    ],
  },
  {
    category: 'Backend',
    tools: [
      { name: 'C# / .NET Core', level: 'Expert',   experience: '6 yrs', icon: '⬢' },
      { name: 'Node.js',        level: 'Expert',   experience: '5 yrs', icon: '⬡' },
      { name: 'Go (Golang)',    level: 'Advanced', experience: '3 yrs', icon: '◈' },
      { name: 'Python / FastAPI',level: 'Advanced',experience: '4 yrs', icon: '⬧' },
      { name: 'GraphQL / gRPC', level: 'Expert',   experience: '4 yrs', icon: '◉' },
    ],
  },
  {
    category: 'Databases',
    tools: [
      { name: 'PostgreSQL',    level: 'Expert',   experience: '6 yrs', icon: '▣' },
      { name: 'Redis Cluster', level: 'Expert',   experience: '5 yrs', icon: '⬡' },
      { name: 'MongoDB',       level: 'Advanced', experience: '4 yrs', icon: '◈' },
      { name: 'TimescaleDB',   level: 'Advanced', experience: '3 yrs', icon: '⬧' },
      { name: 'Elasticsearch', level: 'Advanced', experience: '3 yrs', icon: '◉' },
    ],
  },
  {
    category: 'DevOps',
    tools: [
      { name: 'Docker',          level: 'Expert',   experience: '5 yrs', icon: '▣' },
      { name: 'Kubernetes (EKS)',level: 'Expert',   experience: '4 yrs', icon: '⬢' },
      { name: 'Terraform',       level: 'Advanced', experience: '3 yrs', icon: '◈' },
      { name: 'GitHub Actions',  level: 'Expert',   experience: '5 yrs', icon: '⬡' },
      { name: 'Apache Kafka',    level: 'Advanced', experience: '3 yrs', icon: '◉' },
    ],
  },
  {
    category: 'Cloud & Infra',
    tools: [
      { name: 'AWS (EKS, Lambda, RDS)', level: 'Expert',   experience: '4 yrs', icon: '☁' },
      { name: 'Cloudflare Workers',     level: 'Advanced', experience: '3 yrs', icon: '⬡' },
      { name: 'Helm Charts',            level: 'Advanced', experience: '3 yrs', icon: '◈' },
      { name: 'Prometheus / Grafana',   level: 'Advanced', experience: '3 yrs', icon: '◉' },
      { name: 'Apache Flink',           level: 'Proficient',experience:'2 yrs', icon: '▸' },
    ],
  },
];

function initSkillsTabs() {
  const tabs  = document.querySelectorAll('.tab-btn');
  const grid  = document.getElementById('skills-grid');
  if (!grid) return;

  function renderTab(idx) {
    const group = TECH_STACK[idx];
    grid.innerHTML = group.tools.map(tool => `
      <div class="skill-card">
        <div class="skill-card-top">
          <span class="skill-icon">${tool.icon}</span>
          <span class="skill-level">${tool.level}</span>
        </div>
        <div class="skill-name">${tool.name}</div>
        <div class="skill-exp">EXP: <strong>${tool.experience}</strong></div>
      </div>
    `).join('');

    // Animate in
    gsap.fromTo(grid.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
    );
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderTab(i);
    });
  });

  renderTab(0); // render default tab
}

/* ──────────────────────────────────────────────────────────────────
   7.  TERMINAL MODE SWITCHER
────────────────────────────────────────────────────────────────── */
function initTerminalModeSwitcher() {
  const btnTerminal   = document.getElementById('btn-mode-terminal');
  const btnForm       = document.getElementById('btn-mode-form');
  const termBody      = document.getElementById('terminal-body');
  const formBody      = document.getElementById('contact-form-body');

  if (!btnTerminal || !btnForm) return;

  btnTerminal.addEventListener('click', () => {
    btnTerminal.classList.add('active');
    btnForm.classList.remove('active');
    gsap.to(formBody, { opacity: 0, duration: 0.2, onComplete: () => {
      formBody.style.display = 'none';
      termBody.style.display = 'flex';
      gsap.fromTo(termBody, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    }});
  });

  btnForm.addEventListener('click', () => {
    btnForm.classList.add('active');
    btnTerminal.classList.remove('active');
    gsap.to(termBody, { opacity: 0, duration: 0.2, onComplete: () => {
      termBody.style.display = 'none';
      formBody.style.display = 'block';
      gsap.fromTo(formBody, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    }});
  });
}

/* ──────────────────────────────────────────────────────────────────
   8.  INTERACTIVE TERMINAL
────────────────────────────────────────────────────────────────── */
const TERMINAL_COMMANDS = {
  help: `
┌─────────────────────────────────────────────────────────┐
│       ATIF ARCHITECT CLI — AVAILABLE COMMANDS           │
├────────────────────┬────────────────────────────────────┤
│  help              │ Show this command reference         │
│  skills            │ Print full technical skill set      │
│  projects          │ List production projects            │
│  experience        │ Career timeline & metrics           │
│  architecture      │ System design philosophy            │
│  github            │ GitHub profile & repos              │
│  contact           │ Contact information                 │
│  sudo hire         │ [ELEVATED] Initiate hire sequence   │
│  clear             │ Clear terminal output               │
└────────────────────┴────────────────────────────────────┘`,

  skills: `
[SKILLS] Muhammad Atif — Technical Stack Matrix

FRONTEND ──────────────────────────────────────────────
  ✦ React / Next.js / TypeScript        [Expert  · 5yrs]
  ✦ Three.js / React Three Fiber / WebGL [Expert  · 4yrs]
  ✦ GSAP / Framer Motion / CSS Anim     [Advanced· 4yrs]

BACKEND ────────────────────────────────────────────────
  ✦ C# .NET Core / ASP.NET Web API      [Expert  · 6yrs]
  ✦ Node.js / Express / Fastify         [Expert  · 5yrs]
  ✦ Go (Golang) / gRPC                  [Advanced· 3yrs]
  ✦ Python / FastAPI / Celery           [Advanced· 4yrs]

DATABASES ──────────────────────────────────────────────
  ✦ PostgreSQL / TimescaleDB            [Expert  · 6yrs]
  ✦ Redis Cluster / Sentinel            [Expert  · 5yrs]
  ✦ MongoDB / Elasticsearch             [Advanced· 4yrs]

DEVOPS & CLOUD ─────────────────────────────────────────
  ✦ Docker / Kubernetes (EKS)           [Expert  · 4yrs]
  ✦ Terraform / Helm / GitHub Actions   [Advanced· 3yrs]
  ✦ AWS / Cloudflare / Kafka / Flink    [Advanced· 3yrs]`,

  projects: `
[PROJECTS] Muhammad Atif — Real GitHub Projects (Muhammadatif153700)

01. Capstone Project (TypeScript) — LIVE on Vercel
    ↳ Stack:   TypeScript, Vercel
    ↳ Demo:    https://capstone-project-henna-five.vercel.app

02. Global Country Explorer — LIVE on Netlify
    ↳ Stack:   HTML, CSS, REST Countries API
    ↳ Demo:    https://global-country-explorer0.netlify.app/

03. TradeVault — Finance & Portfolio Tracker
    ↳ Stack:   HTML, CSS, JavaScript
    ↳ GitHub:  github.com/Muhammadatif153700/TradeVault

04. BiteCraft Website
    ↳ Stack:   HTML, CSS
    ↳ GitHub:  github.com/Muhammadatif153700/bitecraft-website

05. Meal Monkey App — Food Delivery (37MB+ codebase)
    ↳ Stack:   JavaScript, HTML, CSS
    ↳ GitHub:  github.com/Muhammadatif153700/Meal-Monkey-App

06. Noor Al Falaah Islamic App (Flutter)
    ↳ Stack:   Flutter, Dart, Material 3
    ↳ GitHub:  github.com/Muhammadatif153700/Noor-al-Falaah-Islamic-App

07. QR Studio Flutter — QR Generator & Scanner
    ↳ Stack:   Flutter, Dart
    ↳ GitHub:  github.com/Muhammadatif153700/QR-studio-flutter

08. Smart Traffic Management System ⭐ 1 Star
    ↳ Stack:   C++, Graphs, Dijkstra
    ↳ GitHub:  github.com/Muhammadatif153700/SMART-TRAFFIC-MANAGEMENT-SYSTEM

09. ATM Simulator — C++ OOP Bank System
    ↳ Stack:   C++, OOP, Inheritance
    ↳ GitHub:  github.com/Muhammadatif153700/ATM-Simulator`,
  experience: `
[EXPERIENCE] Muhammad Atif — Career Milestones

● Lead Systems Architect · CloudCore Technologies (2022–Present)
  Remote · Full-Time
  ↳ Designed multi-region K8s clusters with zero-downtime deployments
  ↳ Reduced AWS costs by 42% · Scaled team from 4 → 18 engineers
  ↳ Kafka event pipeline: 100k events/sec · Uptime 99.5% → 99.999%

● Senior Full Stack Engineer · Veloce Systems (2020–2022)
  London, UK · Full-Time
  ↳ Built WebGL 60 FPS trading dashboard with React Three Fiber
  ↳ Monte Carlo risk engine: $1.2B simulated volume (Python/FastAPI)
  ↳ Migrated Rails monolith → microservices architecture

● Software Engineer · TechFoundry Labs (2018–2020)
  Karachi, PK · Full-Time
  ↳ 12+ .NET Core microservices · 500k+ req/day · 65% query speedup
  ↳ CI/CD automation: GitHub Actions · Docker · Terraform`,

  architecture: `
[ARCHITECTURE] Muhammad Atif — System Design Philosophy

CORE PRINCIPLES ─────────────────────────────────────────
  ✦ Event-Driven Decoupling via Apache Kafka / NATS JetStream
  ✦ CQRS & Event Sourcing for immutable, auditable ledgers
  ✦ Zero-Trust Security: mTLS · OAuth2 PKCE · JWT rotation
  ✦ Horizontal pod autoscaling with Kubernetes HPA + KEDA

RELIABILITY PATTERNS ────────────────────────────────────
  ✦ Circuit breakers · retry with exponential backoff
  ✦ Multi-AZ database replication with failover automation
  ✦ Distributed tracing: OpenTelemetry + Jaeger
  ✦ SRE practices: error budgets · SLOs · runbooks

PERFORMANCE TARGETS ─────────────────────────────────────
  ✦ P99 API latency:    < 12ms
  ✦ WebGL render:       60 FPS sustained
  ✦ Throughput:         120k QPS peak
  ✦ Platform uptime:    99.999%`,

  github: `
[GITHUB] Muhammad Atif — Open Source Profile

  Profile:   https://github.com/Muhammadatif153700
  Username:  Muhammadatif153700
  Repos:     15 public repositories
  Stars:     ⭐ 1 (SMART-TRAFFIC-MANAGEMENT-SYSTEM)

  Top Repos:
    • capstone-project      (TypeScript · Vercel)
    • global-country-explorer (CSS · Netlify)
    • Meal-Monkey-App       (JavaScript)
    • Noor-al-Falaah-Islamic-App (Flutter)
    • SMART-TRAFFIC-MANAGEMENT-SYSTEM (C++ ⭐)
    • ATM-Simulator         (C++ OOP)
    • TradeVault            (HTML/JS)
    • bitecraft-website     (CSS)`,
  contact: `
[CONTACT] Muhammad Atif — Get in Touch

  GitHub:   https://github.com/Muhammadatif153700
  Email:    ati.here15@gmail.com
  LinkedIn: https://linkedin.com/in/muhammadatif153700

  Open to:  Web Dev Projects · Flutter Mobile Apps · Freelance Work
  Location: Pakistan
  
  ↳ Type "sudo hire" to initiate collaboration protocol...`,
  'sudo hire': `
[ELEVATED ACCESS GRANTED] ██████████████████ 100%

  ✦ Initiating hire sequence for Muhammad Atif...
  ✦ Qualifications verified: 6+ years · 24+ projects shipped
  ✦ Specializations confirmed: Systems Architecture · WebGL · Cloud

  NEXT STEPS:
  ══════════════════════════════════════════════════════
  1. Send project brief to: muhammad.atif@example.com
  2. Switch to VISUAL FORM tab for structured proposal
  3. Connect on LinkedIn: linkedin.com/in/muhammadatif

  Expected response: < 24 hours ✓
  ══════════════════════════════════════════════════════`,
};

function initTerminal() {
  const form    = document.getElementById('terminal-input-form');
  const input   = document.getElementById('terminal-input');
  const output  = document.getElementById('terminal-output');
  if (!form || !input || !output) return;

  // Welcome message
  const welcome = `
  ┌─────────────────────────────────────────────┐
  │  ATIF ARCHITECT CLI v2.0.0                  │
  │  Muhammad Atif · Senior Full Stack Engineer │
  │  Type 'help' to see available commands      │
  └─────────────────────────────────────────────┘
  `;
  appendOutput(welcome, 'term-amber');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const cmd = input.value.trim().toLowerCase();
    if (!cmd) return;

    appendOutput(`atif@architect:~$ ${input.value}`, 'term-input');

    if (cmd === 'clear') {
      output.innerHTML = '';
      input.value = '';
      return;
    }

    const response = TERMINAL_COMMANDS[cmd];
    if (response) {
      typewriterOutput(response);
    } else {
      appendOutput(
        `Command not recognized: '${cmd}'. Type 'help' for available commands.`,
        'term-err'
      );
    }

    input.value = '';
    output.scrollTop = output.scrollHeight;
  });

  function appendOutput(text, className = 'term-output') {
    const div = document.createElement('div');
    div.className = `term-line ${className}`;
    div.textContent = text;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  function typewriterOutput(text) {
    const div = document.createElement('div');
    div.className = 'term-line term-output';
    output.appendChild(div);

    let i = 0;
    const speed = 4; // ms per char — fast for code output
    const interval = setInterval(() => {
      div.textContent += text[i];
      i++;
      output.scrollTop = output.scrollHeight;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }

  // Auto-focus terminal input when section is visible
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) input.focus();
  }, { threshold: 0.5 });
  const contactSection = document.getElementById('contact');
  if (contactSection) observer.observe(contactSection);
}

/* ──────────────────────────────────────────────────────────────────
   9.  CONTACT FORM
────────────────────────────────────────────────────────────────── */
function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form || !success) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        gsap.to(form, {
          opacity:  0,
          y:       -20,
          duration: 0.4,
          onComplete: () => {
            form.style.display = 'none';
            success.style.display = 'block';
            gsap.fromTo(success,
              { opacity: 0, scale: 0.9 },
              { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }
            );
            setTimeout(() => {
              gsap.to(success, {
                opacity:  0,
                duration: 0.3,
                onComplete: () => {
                  success.style.display = 'none';
                  form.style.display = 'block';
                  form.reset();
                  if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                  }
                  gsap.fromTo(form,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y:  0, duration: 0.4 }
                  );
                },
              });
            }, 6000);
          },
        });
      } else {
        const data = await response.json();
        alert(data.errors ? data.errors.map(err => err.message).join(', ') : 'Oops! There was a problem submitting your form.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    } catch (err) {
      alert('Oops! There was a network problem sending your message.');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  });
}
