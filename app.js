const CATEGORIES = {
  "footwear": {
    step: "01 // Footwear Portfolio",
    title: "Footwear CAD & Trend Spec",
    desc: "From 0.25pt Illustrator vector linework and 3D volume inflation to 2026 CMF trend boards and composite Vizcom renders."
  },
  "industrial-design": {
    step: "02 // School Project Portfolio",
    title: "Industrial Design Studio",
    desc: "Human-centered hardware, ecological habitat systems, user journey research, and physical studio prototypes developed at Carleton University."
  },
  "personal": {
    step: "03 // Personal Portfolio",
    title: "Personal Concepts & Fabrication",
    desc: "Self-directed CAD assemblies, FDM 3D print iterations, and rapid hardware experiments."
  },
  "lacrosse": {
    step: "04 // Lacrosse Portfolio",
    title: "Lacrosse Equipment & Engineering",
    desc: "Ball-trajectory rebounder mechanics, acoustic dampening systems, and custom pocket/head performance work."
  },
  "about": {
    step: "05 // Designer Profile",
    title: "About & Contact",
    desc: "Background, design methodology, and direct contact."
  }
};

const PROJECTS = [
  {
    id: "cad-render-workflow",
    category: "footwear",
    title: "CAD Render Workflows — GM: Alizon",
    subtitle: "0.25pt Vector Tracing, 3D Inflate & Vizcom Composite",
    specCode: "GM: Alizon",
    tools: "Illustrator / Photoshop / Vizcom",
    summary: "A 6-stage footwear illustration workflow transforming initial sketches into photorealistic renders while maintaining strict control over panel geometry, stitching, and design intent.",
    thumb: "./assets/thumbnails/gm-alizon-thumb.webp",
    boards: [
      "./assets/projects/cad-workflow/slide-01-title.webp",
      "./assets/projects/cad-workflow/slide-04-sketch.webp",
      "./assets/projects/cad-workflow/slide-05-tracing.webp",
      "./assets/projects/cad-workflow/slide-08-volume.webp",
      "./assets/projects/cad-workflow/slide-13-vizcom.webp",
      "./assets/projects/cad-workflow/slide-15-final-render.webp"
    ]
  },
  {
    id: "mff-cmf-trends-2026",
    category: "footwear",
    title: "Men's Footwear Trends 2026 (CMF)",
    subtitle: "Sandal, Dress & Casual Sneaker Material Forecasting",
    specCode: "MFF // CMF-26",
    tools: "CMF Research / Spec Callouts",
    summary: "Comprehensive material, hardware, and outsole color-material-finish analysis covering full-grain leathers, contoured cork, calf suede, and sculpted EVA soles.",
    thumb: "./assets/thumbnails/mff-trends-thumb.webp",
    boards: [
      "./assets/projects/mff-trends/board-01-cover.webp",
      "./assets/projects/mff-trends/board-02-sandals.webp",
      "./assets/projects/mff-trends/board-03-dress.webp",
      "./assets/projects/mff-trends/board-04-sneakers.webp"
    ]
  },
  {
    id: "crcrr-connection",
    category: "industrial-design",
    title: "CRCRR Connection — Community Hub",
    subtitle: "Service Design, UI/UX Architecture & User Journey Mapping",
    specCode: "IDES 3302B",
    tools: "Adobe XD / Illustrator / Systems",
    summary: "A centralized digital extension and space-booking architecture designed to unlock dormant community center rooms through frictionless event discovery and native group messaging.",
    thumb: "./assets/thumbnails/crcrr-thumb.webp",
    boards: [
      "./assets/projects/crcrr/board-01-dashboard.webp",
      "./assets/projects/crcrr/board-02-research.webp",
      "./assets/projects/crcrr/board-03-journey-map.webp"
    ]
  },
  {
    id: "modular-cookware-system",
    category: "industrial-design",
    title: "Stackable Modular Cookware System",
    subtitle: "Physical Prototyping, Ergonomics & CAD Exploded Views",
    specCode: "ID STUDIO",
    tools: "SolidWorks / Model Making",
    summary: "Multi-tiered cooking and steaming hardware designed for compact kitchens, featuring heat-resistant terracotta-accented handles and nesting geometry.",
    thumb: "./assets/thumbnails/cookware-thumb.webp",
    boards: [
      "./assets/projects/cookware/board-01.webp"
    ]
  },
  {
    id: "personal-fdm-prototyping",
    category: "personal",
    title: "Precision FDM Hardware & Shop Tooling",
    subtitle: "Functional Replacement Parts & Custom Enclosures",
    specCode: "LAB // P1S",
    tools: "SolidWorks / Bambu P1S (PLA & ABS)",
    summary: "Rapidly iterated mechanical components, tolerances, and custom fixtures fabricated in-house.",
    thumb: "./assets/thumbnails/personal-thumb.webp",
    boards: [
      "./assets/projects/personal/board-01.webp"
    ]
  },
  {
    id: "lacrosse-rebounder-system",
    category: "lacrosse",
    title: "Quiet Eye-Level Indoor Lacrosse Rebounder",
    subtitle: "Acoustic Dampening & Trajectory Physics Simulation",
    specCode: "LAX // R&D",
    tools: "CAD / Physics Modeling",
    summary: "An indoor wall-ball training system engineered to eliminate structural wall vibration while returning passes accurately across variable throwing speeds.",
    thumb: "./assets/thumbnails/lacrosse-thumb.webp",
    boards: [
      "./assets/projects/lacrosse/board-01.webp"
    ]
  }
];

const gridEl = document.getElementById("projectGrid");
const aboutEl = document.getElementById("aboutPage");
const bannerEl = document.getElementById("categoryBanner");
const stepTagEl = document.getElementById("pageStepTag");
const titleEl = document.getElementById("pageTitle");
const descEl = document.getElementById("pageDescription");
const navTabs = document.querySelectorAll(".nav-tab");

const modal = document.getElementById("projectModal");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalIntro = document.getElementById("modalIntro");
const modalBoards = document.getElementById("modalBoards");
const closeModalBtn = document.getElementById("closeModalBtn");

function renderPage(pageKey) {
  const activeKey = CATEGORIES[pageKey] ? pageKey : "footwear";
  const meta = CATEGORIES[activeKey];

  navTabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.page === activeKey);
  });

  if (activeKey === "about") {
    bannerEl.classList.add("hidden");
    gridEl.classList.add("hidden");
    aboutEl.classList.remove("hidden");
    return;
  }

  aboutEl.classList.add("hidden");
  bannerEl.classList.remove("hidden");
  gridEl.classList.remove("hidden");

  stepTagEl.textContent = meta.step;
  titleEl.textContent = meta.title;
  descEl.textContent = meta.desc;

  gridEl.innerHTML = "";
  const items = PROJECTS.filter(p => p.category === activeKey);

  items.forEach(project => {
    const card = document.createElement("article");
    card.className = "artboard-card";
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="artboard-stage">
        <span class="corner-tag top-left">Will Wingrove</span>
        <img src="${project.thumb}" alt="${project.title}" class="artboard-img" loading="lazy" decoding="async">
        <span class="corner-tag bottom-right">${project.specCode}</span>
      </div>
      <div class="card-footer">
        <div>
          <h2 class="card-title">${project.title}</h2>
          <p class="card-subtitle">${project.subtitle}</p>
        </div>
        <span class="card-arrow">→</span>
      </div>
    `;

    card.addEventListener("click", () => openProject(project));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProject(project);
      }
    });
    gridEl.appendChild(card);
  });
}

function openProject(project) {
  modalCategory.textContent = `${project.specCode} // ${project.tools}`;
  modalTitle.textContent = project.title;

  modalIntro.innerHTML = `
    <div>
      <h3 style="margin-bottom:0.4rem;">Project Overview</h3>
      <p style="color:var(--ink-charcoal);">${project.summary}</p>
    </div>
    <div>
      <span class="step-badge">Tools & Specs</span>
      <p style="font-weight:600;">${project.tools}</p>
    </div>
  `;

  modalBoards.innerHTML = project.boards.map((boardSrc, index) => `
    <figure class="presentation-board">
      <img src="${boardSrc}" alt="${project.title} - Board ${index + 1}" loading="lazy" decoding="async">
    </figure>
  `).join("");

  modal.showModal();
  document.body.style.overflow = "hidden";
}

function closeProject() {
  modal.close();
  modalBoards.innerHTML = "";
  document.body.style.overflow = "";
}

navTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    window.location.hash = tab.dataset.page;
  });
});

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.replace("#", "") || "footwear";
  renderPage(hash);
});

closeModalBtn.addEventListener("click", closeProject);
modal.addEventListener("close", closeProject);
modal.addEventListener("click", e => {
  if (e.target === modal) closeProject();
});

const startHash = window.location.hash.replace("#", "") || "footwear";
renderPage(startHash);
