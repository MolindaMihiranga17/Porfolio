const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

// Scroll reveals
document.querySelectorAll('.gallery-item, .gallery-heading, .detail-heading, .detail-meta, .detail-visual-wrap, .next-project').forEach(el => el.classList.add('reveal'));
if (!reduced.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal').forEach(el => { el.classList.add('will-reveal'); observer.observe(el); });
  document.addEventListener('focusin', event => {
    if (event.target instanceof Element) event.target.closest('.will-reveal')?.classList.add('is-visible');
  });
}

// Progress bar and current nav item
const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-section]')];
const sections = navLinks.map(link => document.getElementById(link.dataset.section ?? '')).filter(Boolean) as HTMLElement[];
let pending = false;
function update() {
  const scrollable = root.scrollHeight - innerHeight;
  root.style.setProperty('--scroll-progress', String(scrollable > 0 ? scrollY / scrollable : 0));
  let active: string | undefined;
  for (const section of sections) if (section.getBoundingClientRect().top < innerHeight * 0.4) active = section.id;
  navLinks.forEach(link => {
    if (link.dataset.section === active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  pending = false;
}
window.addEventListener('scroll', () => {
  if (pending) return;
  pending = true;
  requestAnimationFrame(update);
}, { passive: true });
update();

// Copy email
document.querySelector<HTMLButtonElement>('.copy-email')?.addEventListener('click', async event => {
  const button = event.currentTarget as HTMLButtonElement;
  const status = document.querySelector('.copy-status');
  try {
    await navigator.clipboard.writeText(button.dataset.email ?? '');
    if (status) status.textContent = 'Copied';
  } catch {
    if (status) status.textContent = 'Use the link above';
  }
});
