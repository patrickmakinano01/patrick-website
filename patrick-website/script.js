const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const currentYear = document.querySelector('#current-year');

const setMenuState = (isOpen) => {
  if (!menuToggle || !siteNav) return;
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  siteNav.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
};

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  setMenuState(!isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setMenuState(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuState(false);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('is-active', isCurrent);
        if (isCurrent) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    });
  },
  { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));

if (currentYear) currentYear.textContent = new Date().getFullYear();
