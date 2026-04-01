/* Nav toggle + scroll effect — shared across all pages with full nav */
const nav = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('primary-nav');

if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));
}

if (navToggle && navLinks) {
  const closeNav = () => {
    navLinks.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Menü öffnen');
  };
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    navToggle.setAttribute('aria-label', isOpen ? 'Menü schliessen' : 'Menü öffnen');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
  document.addEventListener('click', e => { if (!nav.contains(e.target)) closeNav(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeNav(); });
}
