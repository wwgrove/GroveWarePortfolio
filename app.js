const CATEGORIES = {
  "home": {
    step: "Home",
    title: "Home",
    desc: ""
  },
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
    step: "04 // Lacrosse Profile",
    title: "Lacrosse, Coaching & Community",
    desc: "My experience in lacrosse spans coaching, team environments, and the wider lacrosse community."
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
    title: "CRCRR Connection",
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
  ...[
    "IKUYO",
    "Torus",
    "JoAnne",
    "Armor-Core",
    "Keystone",
    "Worm at the Disco",
    "Concepts (various concepts)"
  ].map((title, index) => ({
    id: `school-project-${index + 1}`,
    category: "industrial-design",
    title,
    subtitle: "School project",
    specCode: "SCHOOL PROJECT",
    summary: "Project details and presentation materials will be added here.",
    isConcept: title === "Concepts (various concepts)",
    boards: []
  })),
  ...["Hoode", "carletonlacrosse.com", "Carleton Lacrosse Helmet Decals", "Stick Rack"]
    .map((title, index) => ({
      id: `personal-project-${index + 1}`,
      category: "personal",
      title,
      subtitle: "Personal project",
      specCode: "PERSONAL PROJECT",
      summary: "Project details and presentation materials will be added here.",
      boards: []
    }))
];

const LACROSSE_EXPERIENCE = [
  "Lax.com",
  "Lacrosse Unlimited",
  "Greenwich Youth Lacrosse",
  "Lax Factory",
  "Carleton Men's Lacrosse",
  "GCDS Varsity Lacrosse"
];

const LACROSSE_GALLERY = [
  {
    src: "./assets/projects/lacrosse/board-01.webp",
    alt: "Lacrosse rebounder project presentation board",
    caption: "Lacrosse rebounder project"
  }
];

const gridEl = document.getElementById("projectGrid");
const homeEl = document.getElementById("homePage");
const aboutEl = document.getElementById("aboutPage");
const lacrosseEl = document.getElementById("lacrossePage");
const schoolProjectTabs = document.getElementById("schoolProjectTabs");
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
const galleryModal = document.getElementById("galleryModal");
const galleryImage = document.getElementById("galleryImage");
const galleryCaption = document.getElementById("galleryCaption");
const previousGalleryImage = document.getElementById("previousGalleryImage");
const nextGalleryImage = document.getElementById("nextGalleryImage");
const lacrosseExperience = document.getElementById("lacrosseExperience");
const lacrosseGallery = document.getElementById("lacrosseGallery");
let activeGalleryImage = 0;
let galleryTouchStartX = null;
let activeSchoolFilter = "projects";

function renderPage(pageKey) {
  const activeKey = CATEGORIES[pageKey] ? pageKey : "home";
  const meta = CATEGORIES[activeKey];

  navTabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.page === activeKey);
  });

  homeEl.classList.toggle("hidden", activeKey !== "home");

  if (activeKey === "home" || activeKey === "about" || activeKey === "lacrosse") {
    schoolProjectTabs.classList.add("hidden");
    bannerEl.classList.add("hidden");
    gridEl.classList.add("hidden");
    aboutEl.classList.toggle("hidden", activeKey !== "about");
    lacrosseEl.classList.toggle("hidden", activeKey !== "lacrosse");
    if (activeKey === "lacrosse") renderLacrossePage();
    return;
  }

  aboutEl.classList.add("hidden");
  lacrosseEl.classList.add("hidden");
  schoolProjectTabs.classList.toggle("hidden", activeKey !== "industrial-design");
  bannerEl.classList.remove("hidden");
  gridEl.classList.remove("hidden");

  stepTagEl.textContent = meta.step;
  titleEl.textContent = meta.title;
  descEl.textContent = meta.desc;

  gridEl.innerHTML = "";
  const items = PROJECTS.filter(p => p.category === activeKey &&
    (activeKey !== "industrial-design" ||
      (activeSchoolFilter === "concepts" ? p.isConcept : !p.isConcept)));

  items.forEach(project => {
    const card = document.createElement("article");
    card.className = "artboard-card";
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="artboard-stage">
        <span class="corner-tag top-left">Will Wingrove</span>
        ${project.thumb
          ? `<img src="${project.thumb}" alt="${project.title}" class="artboard-img" loading="lazy" decoding="async">`
          : `<div class="project-placeholder" aria-hidden="true">${project.title}</div>`}
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
  modalCategory.textContent = project.tools ? `${project.specCode} // ${project.tools}` : project.specCode;
  modalTitle.textContent = project.title;

  modalIntro.innerHTML = `
    <div>
      <h3 style="margin-bottom:0.4rem;">Project Overview</h3>
      <p style="color:var(--ink-charcoal);">${project.summary}</p>
    </div>
    ${project.tools ? `<div>
      <span class="step-badge">Tools & Specs</span>
      <p style="font-weight:600;">${project.tools}</p>
    </div>` : ""}
  `;

  modalBoards.innerHTML = project.boards.length ? project.boards.map((boardSrc, index) => `
    <figure class="presentation-board">
      <img src="${boardSrc}" alt="${project.title} - Board ${index + 1}" loading="lazy" decoding="async">
    </figure>
  `).join("") : "";

  modal.showModal();
  document.body.style.overflow = "hidden";
}

function closeProject() {
  modal.close();
  modalBoards.innerHTML = "";
  document.body.style.overflow = "";
}

function renderLacrossePage() {
  lacrosseExperience.innerHTML = LACROSSE_EXPERIENCE.map(place => `<li>${place}</li>`).join("");
  lacrosseGallery.innerHTML = LACROSSE_GALLERY.map((photo, index) => `
    <button class="gallery-card" type="button" data-gallery-index="${index}" aria-label="Open photo: ${photo.caption}">
      <img src="${photo.src}" alt="${photo.alt}" loading="lazy" decoding="async">
      <span>${photo.caption}</span>
    </button>
  `).join("");
  lacrosseGallery.querySelectorAll(".gallery-card").forEach(card => {
    card.addEventListener("click", () => openGallery(Number(card.dataset.galleryIndex)));
  });
}

function showGalleryImage() {
  const photo = LACROSSE_GALLERY[activeGalleryImage];
  galleryImage.src = photo.src;
  galleryImage.alt = photo.alt;
  galleryCaption.textContent = `${photo.caption} (${activeGalleryImage + 1} of ${LACROSSE_GALLERY.length})`;
  const hasMultipleImages = LACROSSE_GALLERY.length > 1;
  previousGalleryImage.hidden = !hasMultipleImages;
  nextGalleryImage.hidden = !hasMultipleImages;
}

function openGallery(index) {
  activeGalleryImage = index;
  showGalleryImage();
  galleryModal.showModal();
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  if (galleryModal.open) galleryModal.close();
  galleryImage.removeAttribute("src");
  document.body.style.overflow = "";
}

function moveGalleryImage(direction) {
  activeGalleryImage = (activeGalleryImage + direction + LACROSSE_GALLERY.length) % LACROSSE_GALLERY.length;
  showGalleryImage();
}

navTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    window.location.hash = tab.dataset.page;
  });
});

schoolProjectTabs.querySelectorAll(".school-project-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    activeSchoolFilter = tab.dataset.schoolFilter;
    schoolProjectTabs.querySelectorAll(".school-project-tab").forEach(filterTab => {
      const selected = filterTab === tab;
      filterTab.classList.toggle("active", selected);
      filterTab.setAttribute("aria-selected", String(selected));
    });
    renderPage("industrial-design");
  });
});

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.replace("#", "") || "home";
  renderPage(hash);
});

closeModalBtn.addEventListener("click", closeProject);
modal.addEventListener("close", closeProject);
modal.addEventListener("click", e => {
  if (e.target === modal) closeProject();
});

document.getElementById("closeGalleryBtn").addEventListener("click", closeGallery);
galleryModal.addEventListener("close", closeGallery);
galleryModal.addEventListener("click", event => {
  if (event.target === galleryModal) closeGallery();
});
previousGalleryImage.addEventListener("click", () => moveGalleryImage(-1));
nextGalleryImage.addEventListener("click", () => moveGalleryImage(1));
galleryImage.addEventListener("touchstart", event => {
  galleryTouchStartX = event.changedTouches[0].clientX;
}, { passive: true });
galleryImage.addEventListener("touchend", event => {
  if (galleryTouchStartX === null) return;
  const swipeDistance = event.changedTouches[0].clientX - galleryTouchStartX;
  galleryTouchStartX = null;
  if (Math.abs(swipeDistance) > 40 && LACROSSE_GALLERY.length > 1) {
    moveGalleryImage(swipeDistance > 0 ? -1 : 1);
  }
}, { passive: true });
galleryModal.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") moveGalleryImage(-1);
  if (event.key === "ArrowRight") moveGalleryImage(1);
});

const startHash = window.location.hash.replace("#", "") || "home";
renderPage(startHash);
