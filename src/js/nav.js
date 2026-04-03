/* Nav toggle + scroll effect — shared across all pages with full nav */
const nav = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('primary-nav');
const NAV_FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));
}

if (navToggle && navLinks) {
  let lastFocusedBeforeOpen = null;
  const getOpenNavFocusables = () => [navToggle, ...Array.from(navLinks.querySelectorAll(NAV_FOCUSABLE))].filter(el => !el.hidden && el.offsetParent !== null);
  const closeNav = ({ restoreFocus = false } = {}) => {
    const wasOpen = navLinks.classList.contains('nav-open');
    navLinks.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Menü öffnen');
    navLinks.setAttribute('aria-hidden', 'true');
    if (restoreFocus && wasOpen && lastFocusedBeforeOpen && typeof lastFocusedBeforeOpen.focus === 'function') {
      lastFocusedBeforeOpen.focus();
    }
  };
  const openNav = () => {
    lastFocusedBeforeOpen = document.activeElement;
    navLinks.classList.add('nav-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Menü schliessen');
    navLinks.setAttribute('aria-hidden', 'false');
    const [, firstLink] = getOpenNavFocusables();
    if (firstLink) firstLink.focus();
  };
  navLinks.setAttribute('aria-hidden', 'true');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('nav-open');
    if (isOpen) closeNav({ restoreFocus: true });
    else openNav();
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => {
    if (!navLinks.classList.contains('nav-open')) return;
    if (e.key === 'Escape') {
      closeNav({ restoreFocus: true });
      return;
    }
    if (e.key === 'Tab') {
      const focusable = getOpenNavFocusables();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  document.addEventListener('click', e => { if (!nav.contains(e.target)) closeNav(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeNav(); });
}
