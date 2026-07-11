// Cursor following effect
const cursorGlow = document.querySelector(".cursor-glow");
const bgPattern = document.querySelector(".bg-pattern");
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Track mouse position
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Show cursor glow
  cursorGlow.classList.add("active");

  // Create parallax effect on grid
  const xOffset = (e.clientX / window.innerWidth - 0.5) * 20;
  const yOffset = (e.clientY / window.innerHeight - 0.5) * 20;
  bgPattern.style.backgroundPosition = `${xOffset}px ${yOffset}px`;

  // Move the background orb
  if (bgPattern.style.setProperty) {
    const afterX = (e.clientX / window.innerWidth) * 100;
    const afterY = (e.clientY / window.innerHeight) * 100;
    requestAnimationFrame(() => {
      bgPattern.style.setProperty("--mouse-x", `${afterX}%`);
      bgPattern.style.setProperty("--mouse-y", `${afterY}%`);
    });
  }
});

// Hide cursor glow when mouse leaves window
document.addEventListener("mouseleave", () => {
  cursorGlow.classList.remove("active");
});

// Smooth cursor glow animation
function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.1;
  cursorY += (mouseY - cursorY) * 0.1;

  cursorGlow.style.transform = `translate(${cursorX - 200}px, ${
    cursorY - 200
  }px)`;

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Update CSS custom properties for background orb
const style = document.createElement("style");
style.textContent = `
            .bg-pattern::after {
                left: var(--mouse-x, 50%);
                top: var(--mouse-y, 50%);
                transform: translate(-50%, -50%);
            }
        `;
document.head.appendChild(style);

// Menu Toggle
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  const menuToggle = document.querySelector(".menu-toggle");
  const isActive = navLinks.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", isActive);
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      document.querySelector(".nav-links").classList.remove("active");
      document
        .querySelector(".menu-toggle")
        .setAttribute("aria-expanded", "false");
    }
  });
});

// Scroll Effects
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollProgress = (scrollTop / scrollHeight) * 100;

  // Update progress bar
  document.querySelector(".scroll-progress").style.width = scrollProgress + "%";

  // Header scroll effect
  if (scrollTop > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Scroll to top button
  const scrollTopBtn = document.querySelector(".scroll-top");
  if (scrollTop > 500) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }

  lastScroll = scrollTop;
});

// Scroll to Top Function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Project Filters
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
  });
});

// Form Submission
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  // Show success message
  alert("Thank you for your message! I will get back to you soon.");
  form.reset();
}

// Stats Counter Animation
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + "+";
  }, 30);
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");

      // Animate stats counters
      if (entry.target.classList.contains("stat-number")) {
        const target = parseInt(entry.target.textContent);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".stat-number").forEach((stat) => {
  observer.observe(stat);
});

document
  .querySelectorAll(".skill-card, .project-card, .blog-card, .timeline-item")
  .forEach((el) => {
    observer.observe(el);
  });

// Prevent animations on page load
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Handle reduced motion preference
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("*").forEach((el) => {
    el.style.animation = "none";
    el.style.transition = "none";
  });
}

// Keyboard navigation enhancement
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const navLinks = document.querySelector(".nav-links");
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      document
        .querySelector(".menu-toggle")
        .setAttribute("aria-expanded", "false");
    }
  }
});

// Focus management for accessibility
const focusableElements = "a[href], button, textarea, input, select";
const modal = document.querySelector(".nav-links");

document.querySelector(".menu-toggle")?.addEventListener("click", function () {
  const isExpanded = this.getAttribute("aria-expanded") === "true";
  if (isExpanded) {
    const firstFocusable = modal.querySelectorAll(focusableElements)[0];
    firstFocusable?.focus();
  }
});

// Lazy loading images (if you add real images later)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      }
    });
  });

  document
    .querySelectorAll("img.lazy")
    .forEach((img) => imageObserver.observe(img));
}

// Performance monitoring
if ("PerformanceObserver" in window) {
  const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log("Performance:", entry.name, entry.duration);
    }
  });
  perfObserver.observe({ entryTypes: ["measure", "navigation"] });
}

// Service Worker registration for PWA (optional enhancement)
if ("serviceWorker" in navigator && location.protocol === "https:") {
  window.addEventListener("load", () => {
    // Uncomment when you create a service worker
    // navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed'));
  });
}
