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

const CARLETON_LACROSSE_SITE = {
  subtitle: "Men's lacrosse team website",
  summary: [
    "carletonlacrosse.ca is the official website of the Carleton Ravens Men's Lacrosse club, which competes in the CUFLA East Division. I designed and built it as a single, fast, mobile-friendly site that gives players, recruits, families and fans one place to find everything about the team. It was prototyped in Figma Make and is published on GitHub Pages at www.carletonlacrosse.ca.",
    "The live site is embedded below. Scroll and click through it exactly as a visitor would."
  ],
  demo: {
    src: "https://www.carletonlacrosse.ca",
    title: "carletonlacrosse.ca live website",
    address: "www.carletonlacrosse.ca",
    label: "Live Website",
    hint: "this is the real, running site. Scroll and click through it to explore."
  },
  features: {
    heading: "Features",
    items: [
      ["Home page with photo slideshow", "The top of the site shows action photos from games. The pictures rotate on their own, like a slideshow, so the page always feels fresh."],
      ["Six tabs", "Overview, Roster, Stats, Schedule, Staff and Recruiting. Tapping a tab swaps the content instantly without reloading the page, like flipping between pages of a binder."],
      ["Overview", "Tells the story of the program (founded in 1986), shows quick facts like the number of games and weekly practices, and has shortcut buttons to join the team or see the season."],
      ["Roster", "A list of every player and their jersey number. It pulls from the league's official stats website (Gamesheet), so when the league changes something, the site follows."],
      ["Stats", "Team record, goals scored and allowed, and a table of every player's goals, assists and points. Tap a column heading like Goals or Points to sort the table. Goalie numbers are shown separately."],
      ["Schedule", "Every game with the date, opponent, home or away, the result or start time, and the location. Beside it is the team's Google Calendar showing practices and travel."],
      ["Staff", "Photos, roles and email addresses for the coaches and team staff, plus a general contact email."],
      ["Recruiting form", "Prospective players fill out a short form (name, position, height, highlight link and more). When they press submit, the info is sent to a Google Sheet the coaches read. The form only allows one submission per browser to prevent duplicates."],
      ["Quick-link buttons", "Icons over the photo link to the team's Instagram, the Google Calendar and the Carleton giving page for donations."],
      ["Updates itself", "A robot (a scheduled GitHub job) visits the league's stats site every 30 minutes, copies the newest roster, stats and schedule, and republishes the website. Nobody has to edit it by hand."],
      ["Works on phones and is findable", "The layout adjusts to phone, tablet or computer screens, and the site includes the extra files search engines like Google use to find and list it."]
    ]
  }
};

const CARLETON_LACROSSE_GALLERY_IMAGE = "assets/Personal/carletonlacrosse.ca/HERO.webp";

const FOOTWEAR_STYLES = [
  ["Aster", 6],
  ["Beacon", 4],
  ["Cinder", 3],
  ["Dapple", 4],
  ["Ember", 4],
  ["Fable", 7],
  ["Grove", 5],
  ["Harbor", 12],
  ["Indigo", 4],
  ["Juniper", 2],
  ["Kestrel", 5],
  ["Lantern", 8],
  ["Morrow", 1],
  ["Nimbus", 1],
  ["Orbit", 3],
  ["Pebble", 4],
  ["Quartz", 1],
  ["Raven", 1],
  ["Solstice", 1],
  ["Thistle", 1],
  ["Umber", 5]
];

const FOOTWEAR_PROJECTS = FOOTWEAR_STYLES.map(([codename, imageCount]) => {
  const slug = codename.toLowerCase();
  const gallery = Array.from({ length: imageCount }, (_, index) =>
    `assets/Footwear/${codename}/${slug}-${String(index + 1).padStart(2, "0")}.webp`
  );
  return {
    id: `footwear-${slug}`,
    category: "footwear",
    title: `Style ${codename}`,
    subtitle: "Footwear style gallery",
    specCode: "STYLE ARCHIVE",
    summary: [],
    boards: [],
    thumb: gallery[0],
    gallery
  };
});

const PROJECTS = [
  ...FOOTWEAR_PROJECTS,
  {
    id: "rrcrc-connection",
    category: "industrial-design",
    title: "RRCRC Connection",
    subtitle: "IDES3302B Projects IIB (STU) Winter 2026",
    specCode: "SCHOOL PROJECT",
    thumb: "assets/School/RRCRC Connection/ThumbnailPictureRRCRC.webp",
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
  {
    id: "ikuyo",
    category: "industrial-design",
    title: "Ikuyo",
    subtitle: "Compact stovetop steamer",
    specCode: "SCHOOL PROJECT",
    thumb: "assets/School/IKUYO/ikuyo-board-1.webp",
    summary: [
      "New cooks in small kitchens often feel intimidated by hot cookware, steam, and multi-step setups. Cramped drawers limit what can be stored, and many steaming products leak steam, heat up unpredictably, and are awkward to handle, which leads to hesitation and unsafe habits.",
      "Ikuyo is a compact, large-capacity stovetop steamer for beginner cooks. It collapses into a single nested unit for easy storage and expands into multi-tiered baskets for steaming a full meal. Co-moulded gaskets prevent steam leakage and temperature fluctuation, heat-safe silicone grips reduce the risk of burns, and smooth interior surfaces make cleanup fast."
    ],
    tools: "PCTG co-polyester baskets, 304 stainless steel pot and lid ring, tempered borosilicate glass lid, food-grade silicone grips and gaskets",
    model: {
      src: "assets/School/IKUYO/ikuyo.glb",
      poster: "assets/School/IKUYO/ikuyo-board-1.webp",
      label: "Interactive 3D Model",
      finish: "ikuyo"
    },
    boards: Array.from({ length: 8 }, (_, i) => `assets/School/IKUYO/ikuyo-board-${i + 1}.webp`),
    documents: [
      { label: "Presentation Boards (PDF)", src: "assets/School/IKUYO/IKUYOFINALBOARDS.pdf" }
    ],
    books: [
      {
        label: "Process Booklet",
        aspect: "612 / 396",
        pdf: "assets/School/IKUYO/IKUYOPROCESSBOOKFINAL - Reduced.pdf",
        pages: Array.from({ length: 25 }, (_, i) => `assets/School/IKUYO/ikuyo-process-${String(i + 1).padStart(2, "0")}.webp`)
      }
    ]
  },
  {
    id: "armor-core",
    category: "industrial-design",
    title: "Armor-Core",
    subtitle: "Zippo ArmorCore tactical helmet",
    specCode: "SCHOOL PROJECT",
    thumb: "assets/School/Armor-Core/armor-core-board-1.webp",
    summary: [
      "ArmorCore extends the Zippo brand into a tactical helmet. The design carries the timeless, strong-edged look of the original windproof lighter, and the ear ventilation holes echo the signature holes found throughout Zippo products.",
      "The form was developed through sketching, CAD surfacing with section views, and a final clay model. The helmet is finished with the Zippo mark of authenticity as a stamped detail, reflecting the lifetime guarantee."
    ],
    tools: "UHMWPE panel shell, memory EVA foam pads, adjustable strap and chin cup, clay modelling",
    boards: Array.from({ length: 5 }, (_, i) => `assets/School/Armor-Core/armor-core-board-${i + 1}.webp`),
    documents: [
      { label: "Final Boards (PDF)", src: "assets/School/Armor-Core/Zippo Helmet Boards - Reduced.pdf" }
    ]
  },
  {
    id: "torus",
    category: "industrial-design",
    title: "Torus",
    subtitle: "Ambient table lamp",
    specCode: "SCHOOL PROJECT",
    thumb: "assets/School/Torus/RenderHero.webp",
    summary: "Project details and presentation materials will be added here.",
    model: {
      src: "assets/School/Torus/torus.glb",
      poster: "assets/School/Torus/RenderHero.webp",
      label: "Interactive 3D Model"
    },
    boards: [],
    books: [
      {
        label: "Presentation Boards",
        aspect: "792 / 612",
        pdf: "assets/School/Torus/LabP1 - Torus - PG-JR-JS-WW.pdf",
        pages: Array.from({ length: 10 }, (_, i) => `assets/School/Torus/torus-board-${String(i + 1).padStart(2, "0")}.webp`)
      }
    ]
  },
  {
    id: "school-project-2",
    category: "industrial-design",
    title: "Keystone",
    subtitle: "Sculptural wine rack",
    specCode: "SCHOOL PROJECT",
    thumb: "assets/School/Keystone/DoisedMoneyshot.webp",
    summary: "Keystone is a sculptural wine rack designed to hold up to six bottles. Intersecting arches distribute their weight to the outer edges, creating a stable structure that also serves as a visual centerpiece when not in use.",
    model: {
      src: "assets/School/Keystone/keystone.glb",
      poster: "assets/School/Keystone/DoisedMoneyshot.webp",
      label: "Interactive 3D Model",
      finish: "orange-plastic"
    },
    boards: Array.from({ length: 5 }, (_, i) => `assets/School/Keystone/keystone-board-${i + 1}.webp`),
    documents: [
      { label: "Presentation Boards (PDF)", src: "assets/School/Keystone/KeystoneBoards.pdf" }
    ]
  },
  {
    id: "school-project-3",
    category: "industrial-design",
    title: "Worm at the Disco",
    subtitle: "Hand-cranked dancing automaton",
    specCode: "SCHOOL PROJECT",
    thumb: "assets/School/Worm at the Disco/worm-gallery.webp",
    summary: [
      "Worm at the Disco is a 3D-printed and laser-cut automaton inspired by the worm dance. Turning the handle makes the figure dance while the disco ball spins, transforming a simple rotation into a playful performance.",
      "The mechanism evolved from an initial push-rod and lobe-cam prototype to circular cams and gears that drive the axles and create smoother movement."
    ],
    heroVideo: {
      src: "assets/School/Worm at the Disco/GIZMO_1_1.mp4",
      poster: "assets/School/Worm at the Disco/worm-gallery.webp",
      title: "Worm at the Disco automaton in motion"
    },
    animatedModel: {
      src: "assets/School/Worm at the Disco/gizmo.glb",
      poster: "assets/School/Worm at the Disco/worm-gallery.webp"
    },
    videoAfterBoards: true,
    boards: Array.from({ length: 2 }, (_, i) => `assets/School/Worm at the Disco/worm-board-${i + 1}.webp`),
    documents: [
      { label: "Presentation Boards (PDF)", src: "assets/School/Worm at the Disco/WormAtTheDiscoFinalBoards.pdf" }
    ]
  },
  {
    id: "school-project-4",
    category: "industrial-design",
    title: "Concepts (various concepts)",
    subtitle: "School project",
    specCode: "SCHOOL PROJECT",
    summary: "Project details and presentation materials will be added here.",
    isConcept: true,
    boards: []
  },
  {
    id: "hoode",
    category: "personal",
    title: "Hoode",
    subtitle: "Jointed fishing lure concept",
    specCode: "PERSONAL PROJECT",
    thumb: "assets/Personal/Hoode/hoode-board-1.webp",
    summary: [
      "Hoode is a self-directed jointed swimbait concept for bass fishing. Two articulated body sections let the lure swim with a lifelike side-to-side action, and the hardware is arranged to keep the hooks clear of the body.",
      "The concept was modelled in CAD and rendered in context, shown here alongside a largemouth bass in its habitat."
    ],
    boards: Array.from({ length: 4 }, (_, i) => `assets/Personal/Hoode/hoode-board-${i + 1}.webp`)
  },
  ...["carletonlacrosse.ca", "Carleton Lacrosse Helmet Decals", "Lacrosse Stick Rack"]
    .map((title, index) => ({
      id: `personal-project-${index + 2}`,
      category: "personal",
      title,
      subtitle: "Personal project",
      specCode: "PERSONAL PROJECT",
      summary: "Project details and presentation materials will be added here.",
      boards: [],
      ...(title === "carletonlacrosse.ca" && {
        ...CARLETON_LACROSSE_SITE,
        thumb: CARLETON_LACROSSE_GALLERY_IMAGE,
        boards: [CARLETON_LACROSSE_GALLERY_IMAGE]
      }),
      ...(title === "Lacrosse Stick Rack" && {
        thumb: "assets/Personal/Lacrosse Stick Rack/stick-rack-hero.jpg",
        inProgress: true
      })
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
const lacrosseExperience = document.getElementById("lacrosseExperience");
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
    const card = document.createElement(project.inProgress ? "article" : "a");
    card.className = "artboard-card";
    if (project.inProgress) {
      card.tabIndex = 0;
    } else {
      const url = new URL(window.location.href);
      url.search = "";
      url.searchParams.set("project", project.id);
      url.hash = "";
      card.href = `${url.pathname}${url.search}`;
    }
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

    if (project.inProgress) {
      card.classList.add("in-progress");
      card.removeAttribute("tabindex");
      card.setAttribute("aria-disabled", "true");
      card.querySelector(".artboard-stage").insertAdjacentHTML("beforeend", '<span class="in-progress-overlay">In Progress</span>');
      card.querySelector(".card-arrow").remove();
      gridEl.appendChild(card);
      return;
    }

    gridEl.appendChild(card);
  });
}

let activeProject = null;

function openProject(project) {
  activeProject = project;
  const hasGallery = Array.isArray(project.gallery);
  modalCategory.textContent = project.tools ? `${project.specCode} // ${project.tools}` : project.specCode;
  modalTitle.textContent = project.title;

  const summaries = Array.isArray(project.summary) ? project.summary : [project.summary];
  modalIntro.hidden = hasGallery;
  modalIntro.innerHTML = hasGallery ? "" : `
    <div class="project-details">
      ${summaries.map(summary => `<p>${summary}</p>`).join("")}
    </div>
    ${project.tools ? `<div>
      <span class="step-badge">Tools & Specs</span>
      <p style="font-weight:600;">${project.tools}</p>
    </div>` : ""}
  `;

  const demoHtml = project.demo ? `
    <div class="demo-label"><span class="demo-badge">${project.demo.label || "Live Demo"}</span> ${project.demo.hint ? project.demo.hint.charAt(0).toUpperCase() + project.demo.hint.slice(1) : "Interactive prototype: hover over the window and click through it to explore."}</div>
    <div class="project-demo">
      <div class="demo-browser-chrome" aria-hidden="true">
        <div class="demo-window-controls"><span></span><span></span><span></span></div>
        <div class="demo-address-bar"><span class="demo-address-icon">⌕</span><span>${project.demo.address || "Search Google or type a URL"}</span></div>
        <span class="demo-browser-menu">⋮</span>
      </div>
      <div class="project-demo-viewport">
        <iframe src="${project.demo.src}" title="${project.demo.title}" loading="lazy"
          allow="fullscreen" allowfullscreen></iframe>
      </div>
    </div>` : "";

  const featuresHtml = project.features ? `
    <section class="project-features">
      <h2>${project.features.heading}</h2>
      <ol>
        ${project.features.items.map(([name, text]) => `<li><strong>${name}</strong><span>${text}</span></li>`).join("")}
      </ol>
    </section>` : "";

  const modelHtml = project.model ? `
    <div class="model-viewer">
      <div class="flipbook-head">
        <span class="step-badge">${project.model.label}</span>
        <button type="button" class="doc-link model-reset" hidden>Reset View</button>
      </div>
      <div class="model-stage" role="group" aria-label="${project.title} interactive 3D model">
        <img class="model-poster" src="${project.model.poster}" alt="${project.title} render">
        <span class="model-status">Loading 3D model…</span>
      </div>
      <p class="model-hint">Drag to orbit · scroll or pinch to zoom</p>
    </div>` : "";

  const animatedModelHtml = project.animatedModel ? `
    <section class="model-viewer worm-hero-model" aria-label="Animated 3D preview">
      <div class="flipbook-head">
        <span class="step-badge">Animated 3D Preview</span>
      </div>
      <div class="model-stage animated-model-stage" role="group" aria-label="${project.title} animated 3D model">
        <img class="model-poster" src="${project.animatedModel.poster}" alt="${project.title} model render">
        <span class="model-status">Loading animated model…</span>
        <div class="worm-preview-heading">
          <h3>${project.title}</h3>
          <p>Interactive mechanical study</p>
        </div>
        <p class="worm-preview-hint">Drag to rotate · Scroll to zoom</p>
        <div class="worm-controls" aria-label="Animation controls">
          <button type="button" class="worm-play" data-animation-toggle aria-label="Pause animation">Ⅱ</button>
          <label class="worm-speed-control">
            <span>Speed</span>
            <input data-animation-speed type="range" min="0.4" max="1.8" step="0.1" value="1" aria-label="Animation speed">
          </label>
          <button type="button" data-animation-reset aria-label="Reset camera">↺</button>
          <button type="button" data-animation-fullscreen aria-label="Enter fullscreen">⛶</button>
        </div>
      </div>
    </section>` : "";

  const heroVideoHtml = project.heroVideo ? `
    <div class="project-hero-video">
      <video src="${project.heroVideo.src}" poster="${project.heroVideo.poster}" aria-label="${project.heroVideo.title}"
        controls muted loop playsinline preload="metadata"${matchMedia("(prefers-reduced-motion: reduce)").matches ? "" : " autoplay"}></video>
    </div>` : "";

  const docsHtml = project.documents ? `
    <div class="project-documents">
      ${project.documents.map(doc => `<a class="doc-link" href="${encodeURI(doc.src)}" target="_blank" rel="noopener">${doc.label}</a>`).join("")}
    </div>` : "";

  const galleryHtml = hasGallery ? `
    <div class="footwear-gallery" aria-label="${project.title} images">
      ${project.gallery.map((imageSrc, index) => `
        <figure class="footwear-gallery-item">
          <img src="${imageSrc}" alt="${project.title}, image ${index + 1}" loading="lazy" decoding="async">
          <figcaption>${project.title} / ${String(index + 1).padStart(2, "0")}</figcaption>
        </figure>
      `).join("")}
    </div>` : "";

  const boardsHtml = (project.boards.length ? project.boards.map((boardSrc, index) => `
    <figure class="presentation-board">
      <img src="${boardSrc}" alt="${project.title} - Board ${index + 1}" loading="lazy" decoding="async">
    </figure>
  `).join("") : "") + (project.books || []).map((_, i) => `<div data-book="${i}"></div>`).join("");
  modalBoards.innerHTML = galleryHtml + animatedModelHtml +
    (project.videoAfterBoards ? "" : heroVideoHtml) +
    modelHtml + demoHtml + featuresHtml + docsHtml + boardsHtml +
    (project.videoAfterBoards ? heroVideoHtml : "");
  if (project.animatedModel) modalBoards.querySelector(".worm-hero-model").after(modalIntro);

  (project.books || []).forEach((book, i) => createFlipbook(modalBoards.querySelector(`[data-book="${i}"]`), book, project.title));

  modal.showModal();
  document.body.style.overflow = "hidden";
  modal.scrollTop = 0;
  if (project.model) mountWhenNear(modalBoards.querySelector(".model-stage"), () => mountModel(project.model));
  if (project.animatedModel) mountWhenNear(modalBoards.querySelector(".animated-model-stage"), () => mountAnimatedModel(project.animatedModel));
  openFloatingVideo(project.video);
}

let activeViewer = null;
let viewerToken = 0;
let viewerObserver = null;

function mountWhenNear(stage, mount) {
  viewerObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    viewerObserver.disconnect();
    viewerObserver = null;
    mount();
  }, { root: modal, rootMargin: "300px" });
  viewerObserver.observe(stage);
}

async function mountModel(model) {
  const token = ++viewerToken;
  const stage = modalBoards.querySelector(".model-stage");
  const status = stage.querySelector(".model-status");
  const poster = stage.querySelector(".model-poster");
  const reset = modalBoards.querySelector(".model-reset");
  try {
    const { createModelViewer } = await import("./model-viewer.js");
    if (token !== viewerToken) return;
    activeViewer = createModelViewer(stage, {
      src: model.src,
      finish: model.finish,
      onReady: () => {
        stage.classList.add("ready");
        poster.remove();
        status.remove();
        reset.hidden = false;
        reset.addEventListener("click", () => activeViewer?.reset());
      },
      onError: err => {
        console.error("Could not load 3D preview", err);
        status.textContent = "3D preview unavailable";
      }
    });
  } catch (err) {
    if (token === viewerToken) {
      console.error("Could not initialize 3D preview", err);
      status.textContent = "3D preview unavailable";
    }
  }
}

async function mountAnimatedModel(model) {
  const token = ++viewerToken;
  const stage = modalBoards.querySelector(".animated-model-stage");
  const status = stage.querySelector(".model-status");
  const poster = stage.querySelector(".model-poster");
  const toggle = stage.querySelector("[data-animation-toggle]");
  const speed = stage.querySelector("[data-animation-speed]");
  let playing = true;

  toggle.addEventListener("click", () => {
    playing = !playing;
    activeViewer?.setPlaying(playing);
    toggle.textContent = playing ? "Ⅱ" : "▶";
    toggle.setAttribute("aria-label", playing ? "Pause animation" : "Play animation");
  });
  speed.addEventListener("input", () => activeViewer?.setSpeed(Number(speed.value)));
  stage.querySelector("[data-animation-reset]").addEventListener("click", () => activeViewer?.reset());
  stage.querySelector("[data-animation-fullscreen]").addEventListener("click", () => activeViewer?.requestFullscreen());

  try {
    const { createWormViewer } = await import("./worm-viewer.js");
    if (token !== viewerToken) return;
    activeViewer = createWormViewer(stage, {
      src: model.src,
      onReady: () => {
        if (token !== viewerToken) return;
        stage.classList.add("ready");
        poster.remove();
        status.remove();
      },
      onError: err => {
        if (token === viewerToken) {
          console.error("Could not load animated 3D preview", err);
          status.textContent = "3D preview unavailable";
        }
      }
    });
    activeViewer.setPlaying(playing);
    activeViewer.setSpeed(Number(speed.value));
  } catch (err) {
    if (token === viewerToken) {
      console.error("Could not initialize animated 3D preview", err);
      status.textContent = "3D preview unavailable";
    }
  }
}

function disposeModel() {
  viewerToken++;
  viewerObserver?.disconnect();
  viewerObserver = null;
  activeViewer?.dispose();
  activeViewer = null;
}

function createFlipbook(host, book, projectTitle) {
  const total = book.pages.length;
  let index = 0;
  let busy = false;
  let touchX = null;
  host.className = "flipbook";
  host.innerHTML = `
    <div class="flipbook-head">
      <span class="step-badge">${book.label}</span>
      <a class="doc-link" href="${encodeURI(book.pdf)}" target="_blank" rel="noopener">Open PDF</a>
    </div>
    <div class="flipbook-stage" style="aspect-ratio:${book.aspect}" tabindex="0" role="group" aria-label="${projectTitle} ${book.label}">
      <img class="flip-page flip-base" alt="${projectTitle} ${book.label} page 1" decoding="async">
      <img class="flip-page flip-leaf" alt="" decoding="async" hidden>
      <button type="button" class="flip-nav flip-prev" aria-label="Previous page">‹</button>
      <button type="button" class="flip-nav flip-next" aria-label="Next page">›</button>
    </div>
    <div class="flipbook-foot"><span class="flip-count"></span></div>`;
  const stage = host.querySelector(".flipbook-stage");
  const base = host.querySelector(".flip-base");
  const leaf = host.querySelector(".flip-leaf");
  const prev = host.querySelector(".flip-prev");
  const next = host.querySelector(".flip-next");
  const count = host.querySelector(".flip-count");

  const preload = i => { if (book.pages[i]) new Image().src = book.pages[i]; };
  const show = i => {
    base.src = book.pages[i];
    base.alt = `${projectTitle} ${book.label} page ${i + 1}`;
    count.textContent = `${i + 1} / ${total}`;
    prev.disabled = i === 0;
    next.disabled = i === total - 1;
    preload(i + 1);
    preload(i - 1);
  };

  function turn(dir) {
    const to = index + dir;
    if (busy || to < 0 || to >= total) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      index = to;
      show(index);
      return;
    }
    busy = true;
    const done = () => {
      leaf.hidden = true;
      leaf.className = "flip-page flip-leaf";
      busy = false;
    };
    // Forward: current page lifts away to reveal the next. Back: previous page lays down over the current.
    const leafSrc = dir > 0 ? book.pages[index] : book.pages[to];
    if (dir > 0) base.src = book.pages[to];
    leaf.src = leafSrc;
    leaf.className = `flip-page flip-leaf ${dir > 0 ? "turn-forward" : "turn-back"}`;
    leaf.hidden = false;
    index = to;
    count.textContent = `${index + 1} / ${total}`;
    prev.disabled = index === 0;
    next.disabled = index === total - 1;
    leaf.addEventListener("animationend", () => {
      if (dir < 0) base.src = book.pages[index];
      base.alt = `${projectTitle} ${book.label} page ${index + 1}`;
      preload(index + 1);
      preload(index - 1);
      done();
    }, { once: true });
  }

  prev.addEventListener("click", () => turn(-1));
  next.addEventListener("click", () => turn(1));
  stage.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") { e.preventDefault(); turn(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); turn(-1); }
  });
  stage.addEventListener("pointerdown", e => { touchX = e.clientX; });
  stage.addEventListener("pointerup", e => {
    if (touchX === null) return;
    const dx = e.clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 40) turn(dx < 0 ? 1 : -1);
  });
  show(0);
}

function closeProject() {
  closeFloatingVideo();
  disposeModel();
  if (modal.open) modal.close();
  modalBoards.before(modalIntro);
  modalBoards.innerHTML = "";
  document.body.style.overflow = "";

  const url = new URL(window.location.href);
  if (url.searchParams.has("project")) {
    const hashPage = url.hash.slice(1);
    const pageKey = CATEGORIES[hashPage] ? hashPage : activeProject?.category || "home";
    url.searchParams.delete("project");
    url.hash = pageKey === "home" ? "" : pageKey;
    history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    renderPage(pageKey);
    document.title = "Will Wingrove — Industrial Design & Footwear CAD";
  }
  activeProject = null;
}

const FLOAT_MARGIN = 16;
const floatEl = document.getElementById("floatingVideo");
const floatFrame = document.getElementById("floatingVideoFrame");
const floatHandle = document.getElementById("floatingVideoHandle");
let floatCorner = "bottom-left";
let floatDrag = null;
let floatSnapFrame = null;

function floatBounds() {
  const width = floatEl.offsetWidth;
  const height = floatEl.offsetHeight;
  const bar = modal.querySelector(".drawer-bar").getBoundingClientRect();
  const intro = modalIntro.getBoundingClientRect();
  const maxTop = Math.max(FLOAT_MARGIN, window.innerHeight - height - FLOAT_MARGIN);
  const minTop = Math.min(Math.max(bar.bottom, intro.bottom) + FLOAT_MARGIN, maxTop);
  return {
    width, height, minTop,
    maxTop,
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
  floatEl.style.height = "";
  floatEl.hidden = false;
  snapFloatingVideo();
}

function closeFloatingVideo() {
  if (floatSnapFrame !== null) cancelAnimationFrame(floatSnapFrame);
  floatSnapFrame = null;
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
function scheduleFloatSnap() {
  if (floatSnapFrame !== null || floatEl.hidden || floatDrag || floatSize) return;
  floatSnapFrame = requestAnimationFrame(() => {
    floatSnapFrame = null;
    if (!floatEl.hidden && !floatDrag && !floatSize) snapFloatingVideo();
  });
}
modal.addEventListener("scroll", scheduleFloatSnap, { passive: true });
window.addEventListener("resize", scheduleFloatSnap);

function renderLacrossePage() {
  lacrosseExperience.innerHTML = LACROSSE_EXPERIENCE.map(place => `<li>${place}</li>`).join("");
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
  if (new URLSearchParams(window.location.search).has("project")) {
    closeProject();
    return;
  }
  renderPage(hash);
});

closeModalBtn.addEventListener("click", closeProject);
modal.addEventListener("close", closeProject);
modal.addEventListener("click", e => {
  if (e.target === modal) closeProject();
});

const startHash = window.location.hash.replace("#", "") || "home";
const requestedProjectId = new URLSearchParams(window.location.search).get("project");
const requestedProject = PROJECTS.find(project => project.id === requestedProjectId && !project.inProgress);
if (requestedProject) {
  renderPage("home");
  document.title = `${requestedProject.title} — Will Wingrove`;
  openProject(requestedProject);
} else {
  renderPage(startHash);
}
