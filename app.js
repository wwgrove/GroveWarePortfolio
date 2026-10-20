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
    id: "rrcrc-connection",
    category: "industrial-design",
    title: "RRCRC Connection",
    subtitle: "IDES3302B Projects IIB (STU) Winter 2026",
    specCode: "SCHOOL PROJECT",
    thumb: "assets/School/RRCRC Connection/ThumbnailPictureRRCRC.png",
    summary: [
      "Field research at the Rideau-Rockcliffe Community Resource Centre (CRCRR) revealed that key facilities like the Multi-Use Theatre Hub (MUTH) were significantly underutilized due to low visibility, fragmented web navigation, and a high-friction booking process. Rather than building an isolated site for a single room, the project pivoted to a scalable, low-budget digital extension for the entire community center that lowers the barrier to entry and maximizes local engagement.",
      "CRCRR Connection serves as a centralized digital hub where residents can seamlessly discover spaces, join local groups, and register for community events. Featuring a persistent navigation menu and a unified directory, the platform replaces cumbersome, multi-channel registration steps with a single, intuitive interface tailored for an inclusive demographic—from older adults and newcomers to Canada to digital natives."
    ],
    video: {
      src: "https://player.vimeo.com/video/1237430161?badge=0&autopause=0&player_id=0&app_id=58479",
      title: "RRCRC Connection video"
    },
    demo: {
      src: "https://xd.adobe.com/embed/d482f135-2f08-41e9-8c1a-e0bf56cad81f-81d1/?fullscreen&hints=off",
      title: "RRCRC Connection Adobe XD live demo"
    },
    boards: ["assets/School/RRCRC Connection/rrcrc-board-1.webp"]
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
  ...["Hoode", "carletonlacrosse.com", "Carleton Lacrosse Helmet Decals", "Lacrosse Stick Rack"]
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

const LACROSSE_GALLERY = [];

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

  const summaries = Array.isArray(project.summary) ? project.summary : [project.summary];
  modalIntro.innerHTML = `
    <div class="project-details">
      ${summaries.map(summary => `<p>${summary}</p>`).join("")}
    </div>
    ${project.tools ? `<div>
      <span class="step-badge">Tools & Specs</span>
      <p style="font-weight:600;">${project.tools}</p>
    </div>` : ""}
  `;

  const demoHtml = project.demo ? `
    <div class="demo-label"><span class="demo-badge">Live Demo</span> Interactive prototype: hover over the window and click through it to explore.</div>
    <div class="project-demo">
      <div class="demo-browser-chrome" aria-hidden="true">
        <div class="demo-window-controls"><span></span><span></span><span></span></div>
        <div class="demo-address-bar"><span class="demo-address-icon">⌕</span><span>Search Google or type a URL</span></div>
        <span class="demo-browser-menu">⋮</span>
      </div>
      <div class="project-demo-viewport">
        <iframe src="${project.demo.src}" title="${project.demo.title}" loading="lazy"
          allow="fullscreen" allowfullscreen></iframe>
      </div>
    </div>` : "";

  modalBoards.innerHTML = demoHtml + (project.boards.length ? project.boards.map((boardSrc, index) => `
    <figure class="presentation-board">
      <img src="${boardSrc}" alt="${project.title} - Board ${index + 1}" loading="lazy" decoding="async">
    </figure>
  `).join("") : "");

  modal.showModal();
  document.body.style.overflow = "hidden";
  modal.scrollTop = 0;
  openFloatingVideo(project.video);
}

function closeProject() {
  closeFloatingVideo();
  modal.close();
  modalBoards.innerHTML = "";
  document.body.style.overflow = "";
}

const FLOAT_MARGIN = 16;
const floatEl = document.getElementById("floatingVideo");
const floatFrame = document.getElementById("floatingVideoFrame");
const floatHandle = document.getElementById("floatingVideoHandle");
let floatCorner = "bottom-left";
let floatDrag = null;

function floatBounds() {
  const width = floatEl.offsetWidth;
  const height = floatEl.offsetHeight;
  const bar = modal.querySelector(".drawer-bar").getBoundingClientRect();
  const intro = modalIntro.getBoundingClientRect();
  const minTop = Math.max(bar.bottom, intro.bottom) + FLOAT_MARGIN;
  return {
    width, height, minTop,
    maxTop: Math.max(minTop, window.innerHeight - height - FLOAT_MARGIN),
    maxLeft: Math.max(FLOAT_MARGIN, window.innerWidth - width - FLOAT_MARGIN)
  };
}

function snapFloatingVideo() {
  const b = floatBounds();
  const [v, h] = floatCorner.split("-");
  floatEl.style.top = `${v === "top" ? b.minTop : b.maxTop}px`;
  floatEl.style.left = `${h === "left" ? FLOAT_MARGIN : b.maxLeft}px`;
}

function openFloatingVideo(video) {
  if (!video) return closeFloatingVideo();
  floatFrame.innerHTML = `<iframe src="${video.src}" title="${video.title}" loading="lazy"
    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  floatCorner = "bottom-left";
  floatEl.style.width = "";
  floatEl.hidden = false;
  snapFloatingVideo();
}

function closeFloatingVideo() {
  floatEl.hidden = true;
  floatFrame.innerHTML = "";
}

floatHandle.addEventListener("pointerdown", event => {
  if (event.target.closest("button")) return;
  const rect = floatEl.getBoundingClientRect();
  floatDrag = { dx: event.clientX - rect.left, dy: event.clientY - rect.top };
  floatHandle.setPointerCapture(event.pointerId);
  floatEl.classList.add("dragging");
});

floatHandle.addEventListener("pointermove", event => {
  if (!floatDrag) return;
  const b = floatBounds();
  const left = Math.min(Math.max(event.clientX - floatDrag.dx, FLOAT_MARGIN), b.maxLeft);
  const top = Math.min(Math.max(event.clientY - floatDrag.dy, b.minTop), b.maxTop);
  floatEl.style.left = `${left}px`;
  floatEl.style.top = `${top}px`;
});

function endFloatDrag(event) {
  if (!floatDrag) return;
  floatDrag = null;
  floatEl.classList.remove("dragging");
  if (event && floatHandle.hasPointerCapture(event.pointerId)) floatHandle.releasePointerCapture(event.pointerId);
  const rect = floatEl.getBoundingClientRect();
  floatCorner = `${rect.top + rect.height / 2 < window.innerHeight / 2 ? "top" : "bottom"}-${rect.left + rect.width / 2 < window.innerWidth / 2 ? "left" : "right"}`;
  snapFloatingVideo();
}

floatHandle.addEventListener("pointerup", endFloatDrag);
floatHandle.addEventListener("pointercancel", endFloatDrag);
let floatSize = null;

floatEl.querySelectorAll("[data-resize]").forEach(handle => handle.addEventListener("pointerdown", event => {
  event.preventDefault();
  const rect = floatEl.getBoundingClientRect();
  floatSize = {
    direction: handle.dataset.resize,
    x: event.clientX,
    y: event.clientY,
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height
  };
  handle.setPointerCapture(event.pointerId);
  floatEl.classList.add("resizing");
}));

floatEl.addEventListener("pointermove", event => {
  if (!floatSize) return;
  const { direction, x, y, left, top, width, height } = floatSize;
  const deltaX = event.clientX - x;
  const deltaY = event.clientY - y;
  const resizingWest = direction.includes("w");
  const resizingNorth = direction.includes("n");
  const right = left + width;
  const bottom = top + height;
  const minTop = floatBounds().minTop;
  const minWidth = 200;
  const minHeight = 140;
  const maxWidth = Math.max(minWidth, Math.min(900, window.innerWidth - FLOAT_MARGIN * 2));
  const maxHeight = Math.max(minHeight, window.innerHeight - minTop - FLOAT_MARGIN);
  let nextWidth = width;
  let nextHeight = height;
  let nextLeft = left;
  let nextTop = top;

  if (direction.includes("e")) {
    nextWidth = Math.min(Math.max(width + deltaX, minWidth), Math.min(maxWidth, window.innerWidth - FLOAT_MARGIN - left));
  } else if (resizingWest) {
    nextWidth = Math.min(Math.max(width - deltaX, minWidth), Math.min(maxWidth, right - FLOAT_MARGIN));
    nextLeft = right - nextWidth;
  }

  if (direction.includes("s")) {
    nextHeight = Math.min(Math.max(height + deltaY, minHeight), Math.min(maxHeight, window.innerHeight - FLOAT_MARGIN - top));
  } else if (resizingNorth) {
    nextHeight = Math.min(Math.max(height - deltaY, minHeight), Math.min(maxHeight, bottom - minTop));
    nextTop = bottom - nextHeight;
  }

  floatEl.style.left = `${nextLeft}px`;
  floatEl.style.top = `${nextTop}px`;
  floatEl.style.width = `${nextWidth}px`;
  floatEl.style.height = `${nextHeight}px`;
});

function endFloatResize(event) {
  if (!floatSize) return;
  floatSize = null;
  floatEl.classList.remove("resizing");
  const handle = event?.target.closest("[data-resize]");
  if (handle?.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
  const rect = floatEl.getBoundingClientRect();
  floatCorner = `${rect.top + rect.height / 2 < window.innerHeight / 2 ? "top" : "bottom"}-${rect.left + rect.width / 2 < window.innerWidth / 2 ? "left" : "right"}`;
  snapFloatingVideo();
}

floatEl.addEventListener("pointerup", endFloatResize);
floatEl.addEventListener("pointercancel", endFloatResize);
document.getElementById("closeFloatingVideo").addEventListener("click", closeFloatingVideo);
modal.addEventListener("scroll", () => { if (!floatEl.hidden && !floatDrag && !floatSize) snapFloatingVideo(); }, { passive: true });
window.addEventListener("resize", () => { if (!floatEl.hidden && !floatDrag && !floatSize) snapFloatingVideo(); });

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
