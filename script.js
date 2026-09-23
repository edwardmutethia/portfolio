const root = document.documentElement;
const body = document.body;
const themeMeta = document.querySelector('meta[name="theme-color"]');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const header = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle');
const primaryNav = document.getElementById('primary-nav');
const pageLinks = [...document.querySelectorAll('[data-page-link]')];
const sections = [...document.querySelectorAll('main > section[id]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function syncSystemTheme() {
  const isDark = systemTheme.matches;
  root.dataset.theme = isDark ? 'dark' : 'light';
  themeMeta?.setAttribute('content', isDark ? '#090b0e' : '#f6f6f3');
}

function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
}

function closeMenu() {
  if (!header || !menuToggle) return;
  header.classList.remove('menu-open');
  body.classList.remove('nav-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}

function toggleMenu() {
  if (!header || !menuToggle) return;
  const willOpen = !header.classList.contains('menu-open');
  header.classList.toggle('menu-open', willOpen);
  body.classList.toggle('nav-open', willOpen);
  menuToggle.setAttribute('aria-expanded', String(willOpen));
  menuToggle.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
}

function setActiveLink(id) {
  pageLinks.forEach((link) => {
    const isActive = link.dataset.pageLink === id;
    link.classList.toggle('is-active', isActive);
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

syncSystemTheme();
if (systemTheme.addEventListener) systemTheme.addEventListener('change', syncSystemTheme);
else systemTheme.addListener?.(syncSystemTheme);

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 820) closeMenu();
});

menuToggle?.addEventListener('click', toggleMenu);
primaryNav?.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && header?.classList.contains('menu-open')) closeMenu();
});

const currentPage = body.dataset.page;
pageLinks.forEach((link) => {
  if (link.dataset.pageLink === currentPage) link.setAttribute('aria-current', 'page');
});

if (body.dataset.page === 'home' && sections.length) {
  const updateActiveSection = () => {
    const marker = window.scrollY + window.innerHeight * 0.28;
    let activeSection = sections[0].id;
    sections.forEach((section) => {
      if (section.offsetTop <= marker) activeSection = section.id;
    });
    setActiveLink(activeSection);
  };
  updateActiveSection();
  window.addEventListener('scroll', updateActiveSection, { passive: true });
}

/* Introduction video */
const videoDialog = document.getElementById('video-dialog');
const introductionVideo = document.getElementById('introduction-video');
const videoFallback = document.getElementById('video-fallback');

function formatDuration(seconds) {
  if (!Number.isFinite(seconds)) return 'Video';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function openVideo() {
  closeMenu();
  if (!videoDialog) return;
  videoFallback.hidden = true;
  videoDialog.showModal();
  body.classList.add('nav-open');
}

function closeVideo() {
  videoDialog?.close();
}

document.addEventListener('click', (event) => {
  if (event.target.closest('[data-open-video]')) openVideo();
  if (event.target.closest('[data-close-video]')) closeVideo();
});

videoDialog?.addEventListener('close', () => {
  body.classList.remove('nav-open');
  introductionVideo?.pause();
});

videoDialog?.addEventListener('click', (event) => {
  if (event.target === videoDialog) closeVideo();
});

function revealVideoError() {
  if (videoFallback) videoFallback.hidden = false;
}

if (introductionVideo) {
  introductionVideo.addEventListener('loadedmetadata', () => {
    const duration = formatDuration(introductionVideo.duration);
    document.querySelectorAll('[data-video-duration]').forEach((element) => {
      element.textContent = duration;
    });
  });
  introductionVideo.addEventListener('error', revealVideoError);
  introductionVideo.querySelector('source')?.addEventListener('error', revealVideoError);
  introductionVideo.addEventListener('play', () => {
    if (videoFallback) videoFallback.hidden = true;
  });
}

/* Contact form */
const contactForm = document.querySelector('[data-contact-form]');

if (contactForm) {
  const status = contactForm.querySelector('[data-form-status]');
  const submitButton = contactForm.querySelector('[data-submit-button]');
  const buttonLabel = contactForm.querySelector('[data-button-label]');
  const fields = [...contactForm.querySelectorAll('input[required], textarea[required]')];

  function getError(field) {
    if (field.validity.valueMissing) {
      return field.tagName === 'TEXTAREA' ? 'Please add a short project description.' : 'This field is required.';
    }
    if (field.validity.typeMismatch) return 'Enter a valid email address.';
    if (field.validity.tooShort) return `Please use at least ${field.minLength} characters.`;
    return 'Please check this field.';
  }

  function validateField(field) {
    const wrapper = field.closest('.form-field');
    const errorElement = contactForm.querySelector(`[data-error-for="${field.name}"]`);
    const isValid = field.checkValidity();

    wrapper?.classList.toggle('has-error', !isValid);
    field.setAttribute('aria-invalid', String(!isValid));
    if (errorElement) errorElement.textContent = isValid ? '' : getError(field);
    return isValid;
  }

  function setFormState(type, message) {
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('is-success', type === 'success');
    status.classList.toggle('is-error', type === 'error');
  }

  fields.forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-field')?.classList.contains('has-error')) validateField(field);
    });
  });

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const honeypot = contactForm.querySelector('input[name="company"]');
    if (honeypot?.value) return;

    const results = fields.map(validateField);
    if (results.includes(false)) {
      setFormState('error', 'Please correct the highlighted fields and try again.');
      fields.find((field) => !field.checkValidity())?.focus();
      return;
    }

    const endpoint = contactForm.dataset.endpoint?.trim();
    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

    submitButton?.classList.add('is-loading');
    submitButton?.setAttribute('aria-busy', 'true');
    if (submitButton instanceof HTMLButtonElement) submitButton.disabled = true;
    if (buttonLabel) buttonLabel.textContent = endpoint ? 'Sending…' : 'Preparing email…';
    setFormState('', '');

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        setFormState('success', 'Thanks—your message was sent. I’ll get back to you soon.');
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 280));
        const mailSubject = encodeURIComponent(`Portfolio inquiry: ${subject}`);
        const mailBody = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nProject context:\n${message}`,
        );
        window.location.href = `mailto:edwardmurithi.dev@gmail.com?subject=${mailSubject}&body=${mailBody}`;
        setFormState('success', 'Your email app should open with the project details prepared.');
      }

      contactForm.reset();
      fields.forEach((field) => {
        field.removeAttribute('aria-invalid');
        field.closest('.form-field')?.classList.remove('has-error');
        const errorElement = contactForm.querySelector(`[data-error-for="${field.name}"]`);
        if (errorElement) errorElement.textContent = '';
      });
    } catch {
      setFormState('error', 'Something went wrong. Please email edwardmurithi.dev@gmail.com directly.');
    } finally {
      submitButton?.classList.remove('is-loading');
      submitButton?.removeAttribute('aria-busy');
      if (submitButton instanceof HTMLButtonElement) submitButton.disabled = false;
      if (buttonLabel) buttonLabel.textContent = 'Start a conversation';
    }
  });
}

/* Case-study progress and section navigation */
const caseProgress = document.querySelector('.case-progress span');
const caseSections = [...document.querySelectorAll('.case-content > section[id]')];
const caseLinks = [...document.querySelectorAll('.case-sidebar a[href^="#"]')];

function updateCaseProgress() {
  if (!caseProgress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0;
  caseProgress.style.width = `${percentage}%`;
}

if (caseProgress) {
  updateCaseProgress();
  window.addEventListener('scroll', updateCaseProgress, { passive: true });
}

if (caseSections.length && caseLinks.length) {
  const caseObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
      if (!visible) return;
      caseLinks.forEach((link) => {
        link.classList.toggle('is-active', link.hash === `#${visible.target.id}`);
      });
    },
    { rootMargin: '-25% 0px -62% 0px', threshold: [0, 0.1, 0.3] },
  );
  caseSections.forEach((section) => caseObserver.observe(section));
}

/* Restrained reveal motion */
if (!reducedMotion.matches) {
  root.classList.add('reveal-ready');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -7% 0px', threshold: 0.08 },
  );
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

const currentYear = document.getElementById('current-year');
if (currentYear) currentYear.textContent = new Date().getFullYear();
