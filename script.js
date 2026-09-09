/* =========================
   SITE CONFIGURATION
   Replace placeholders only with your real links/details.
   ========================= */
const siteConfig = {
  email: "riteshpethkar1001@gmail.com",
  phone: "+91 7744892798",
  github: "https://github.com/VishalPethkar",
  linkedin: "https://www.linkedin.com/in/vishal-pethkar-6635522a8/",
  canonical: "YOUR_CANONICAL_URL"
};

const CONTACT_EMAIL = siteConfig.email;

const projectLinks = {
  project1: { github: "", live: "" },
  project2: { github: "", live: "" },
  project3: { github: "", live: "" },
  project4: { github: "", live: "" }
};

const certificateLinks = {
  cert1: "",
  cert2: ""
};

const projectData = {
  project1: {
    category: "01 / ANALYTICS",
    title: "Customer Shopping Behavior Analysis",
    image: "assets/img/project-1.jpg",
    description: "Analyze customer shopping behavior and generate meaningful business insights using Python, SQL and Power BI.",
    tech: ["Python", "MySQL", "Power BI"],
    features: [
      "Data cleaning and transformation",
      "Exploratory analysis and KPI development",
      "Customer and sales trend analysis",
      "Interactive Power BI dashboard"
    ]
  },
  project2: {
    category: "02 / SOFTWARE",
    title: "Cloud-Ready Billing Software for Retail Shop",
    image: "assets/img/project-2.jpg",
    description: "A retail billing application designed to manage products, billing and customer transactions.",
    tech: ["Python", "MySQL", "HTML", "CSS", "JavaScript"],
    features: [
      "Billing and invoice generation",
      "Inventory and stock management",
      "Sales and payment tracking",
      "Database-integrated retail workflow"
    ]
  },
  project3: {
    category: "03 / ANALYTICS",
    title: "Netflix Data Analysis",
    image: "assets/img/project-3.jpg",
    description: "Performed data cleaning, exploratory analysis and visualization on Netflix content data.",
    tech: ["Python", "Pandas", "Matplotlib"],
    features: [
      "Data cleaning",
      "Exploratory data analysis",
      "Content-focused visualization",
      "Insight generation"
    ]
  },
  project4: {
    category: "04 / SQL",
    title: "SQL Retail Store Analytics System",
    image: "assets/img/project-4.jpg",
    description: "Database analytics project using SQL joins, aggregations, filtering and business queries.",
    tech: ["MySQL", "SQL"],
    features: [
      "SQL joins",
      "Aggregations and GROUP BY",
      "Filtering and sorting",
      "Business-oriented database queries"
    ]
  }
};

/* =========================
   HELPERS
   ========================= */
function isConfigured(value, placeholders = []) {
  if (!value || typeof value !== "string") return false;
  return !placeholders.some(item => value.includes(item));
}

function setSafeLink(element, url, options = {}) {
  if (!element) return;
  const valid = isConfigured(url, ["YOUR_GITHUB_URL", "YOUR_LIVE_DEMO_URL", "YOUR_LINKEDIN_URL", "YOUR_EMAIL"]);
  if (!valid) {
    element.hidden = true;
    element.removeAttribute("href");
    return;
  }
  element.href = url;
  if (options.show) element.hidden = false;
}

function showImageFallback(image, fallbackParent) {
  if (!image) return;
  image.addEventListener("error", () => {
    fallbackParent?.classList.add("image-error");
  });
}

/* =========================
   CONTACT / SOCIAL CONFIG
   ========================= */
function setupSiteConfig() {
  document.querySelectorAll("[data-email-link]").forEach(link => {
    link.href = `mailto:${CONTACT_EMAIL}`;
  });
  document.querySelectorAll("[data-email-text]").forEach(el => {
    el.textContent = CONTACT_EMAIL;
  });
  document.querySelectorAll("[data-phone-link]").forEach(link => {
    link.href = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;
  });
  document.querySelectorAll("[data-phone-text]").forEach(el => {
    el.textContent = siteConfig.phone;
  });

  document.querySelectorAll('[data-social="github"]').forEach(link => setSafeLink(link, siteConfig.github, { show: true }));
  document.querySelectorAll('[data-social="linkedin"]').forEach(link => setSafeLink(link, siteConfig.linkedin, { show: true }));
}

/* =========================
   BROKEN LINK / FILE HANDLING
   ========================= */
function handleOptionalFile(linkSelector, statusSelector, label) {
  const link = document.querySelector(linkSelector);
  if (!link) return;
  fetch(link.getAttribute("href"), { method: "HEAD" })
    .then(response => {
      if (!response.ok) throw new Error("File unavailable");
      link.hidden = false;
      if (statusSelector) {
        const status = document.querySelector(statusSelector);
        if (status) status.textContent = `${label} available.`;
      }
    })
    .catch(() => {
      link.hidden = true;
    });
}

function setupResumeAndFiles() {
  const resumePath = "Vishal_Pethkar_Resume.pdf";
  document.querySelectorAll("[data-resume-link], [data-resume-view]").forEach(link => {
    link.href = resumePath;
    link.addEventListener("error", () => link.hidden = true);
  });

  handleOptionalFile("[data-cover-link]", "[data-cover-status]", "Cover letter");
  const coverView = document.querySelector("[data-cover-view]");
  const coverDownload = document.querySelector("[data-cover-link]");
  if (coverView && coverDownload) {
    fetch(coverDownload.href, { method: "HEAD" })
      .then(r => {
        if (!r.ok) throw new Error();
        coverView.hidden = false;
        coverDownload.hidden = false;
        const status = document.querySelector("[data-cover-status]");
        if (status) status.textContent = "Cover letter available.";
      })
      .catch(() => {
        coverView.hidden = true;
        coverDownload.hidden = true;
      });
  }
}

/* =========================
   MOBILE NAVIGATION
   ========================= */
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle?.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

document.querySelectorAll(".nav-link, .nav-cta").forEach(link => {
  link.addEventListener("click", () => {
    navMenu?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open menu");
  });
});

/* =========================
   STICKY NAVBAR / ACTIVE SECTION
   ========================= */
const header = document.querySelector(".site-header");
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = navLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);

function updateScrollUI() {
  header?.classList.toggle("scrolled", window.scrollY > 20);
  document.querySelector("#back-to-top")?.classList.toggle("show", window.scrollY > 550);

  const position = window.scrollY + 160;
  let current = "home";
  sections.forEach(section => {
    if (section.offsetTop <= position) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

/* =========================
   SCROLL REVEAL
   ========================= */
const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach(item => revealObserver.observe(item));

/* =========================
   ANIMATED COUNTERS
   ========================= */
function animateCounter(element) {
  const target = Number(element.dataset.target);
  const suffix = element.dataset.suffix || "";
  const duration = 1100;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(target * eased);
    element.textContent = value.toLocaleString() + (progress >= 1 ? suffix : "");
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll(".counter").forEach(counter => counterObserver.observe(counter));

/* =========================
   PROJECT LINKS
   ========================= */
function configureProjectLinks() {
  document.querySelectorAll("[data-project-link]").forEach(button => {
    const project = button.dataset.projectLink;
    const type = button.dataset.type;
    const url = projectLinks[project]?.[type] || "";
    setSafeLink(button, url, { show: true });
  });
}

/* =========================
   PROJECT MODAL
   ========================= */
const modal = document.querySelector("#project-modal");
const modalImage = document.querySelector("#modal-image");
const modalCategory = document.querySelector("#modal-category");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const modalTech = document.querySelector("#modal-tech");
const modalFeatures = document.querySelector("#modal-features");
const modalGithub = document.querySelector("#modal-github");
const modalLive = document.querySelector("#modal-live");
let lastFocusedElement = null;

function openProjectModal(projectId) {
  const data = projectData[projectId];
  if (!data || !modal) return;
  lastFocusedElement = document.activeElement;

  modalImage.src = data.image;
  modalImage.alt = `${data.title} project visual`;
  modalCategory.textContent = data.category;
  modalTitle.textContent = data.title;
  modalDescription.textContent = data.description;
  modalTech.innerHTML = data.tech.map(item => `<span>${item}</span>`).join("");
  modalFeatures.innerHTML = data.features.map(item => `<li>${item}</li>`).join("");

  const links = projectLinks[projectId] || {};
  setSafeLink(modalGithub, links.github, { show: true });
  setSafeLink(modalLive, links.live, { show: true });

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close")?.focus();
}

function closeProjectModal() {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastFocusedElement?.focus();
}

document.querySelectorAll(".view-project").forEach(button => {
  button.addEventListener("click", () => openProjectModal(button.dataset.project));
});
document.querySelectorAll("[data-modal-close]").forEach(element => {
  element.addEventListener("click", closeProjectModal);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal?.classList.contains("open")) closeProjectModal();
});

/* =========================
   CONTACT MAILTO FORM
   ========================= */
const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

contactForm?.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !subject || !message) {
    formMessage.textContent = "Please complete all required fields.";
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formMessage.textContent = "Please enter a valid email address.";
    return;
  }

  const mailSubject = encodeURIComponent(`${subject} — Portfolio Contact`);
  const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`;
  formMessage.textContent = "Your email client should open with the message prepared. Please press Send there.";
});

/* =========================
   BACK TO TOP
   ========================= */
document.querySelector("#back-to-top")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =========================
   IMAGE FALLBACKS
   ========================= */
document.querySelectorAll("[data-profile-image]").forEach(img => {
  showImageFallback(img, img.closest(".image-frame"));
});
document.querySelectorAll("[data-project-image], [data-resume-preview]").forEach(img => {
  img.addEventListener("error", () => {
    img.style.visibility = "hidden";
    img.parentElement.style.background = "linear-gradient(145deg,#222,#111)";
  });
});

/* =========================
   INITIALIZE
   ========================= */
setupSiteConfig();
setupResumeAndFiles();
configureProjectLinks();
