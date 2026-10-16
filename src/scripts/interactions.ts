const root = document.documentElement;
const themes = {
  crimson: { name: 'Crimson', background: '#090909' },
  violet: { name: 'Violet', background: '#090909' },
  paper: { name: 'Paper', background: '#ede7dc' },
  midnight: { name: 'Midnight', background: '#0a131d' },
};
type Theme = keyof typeof themes;
const appearance = document.querySelector<HTMLElement>('.appearance');
const toggle = document.querySelector<HTMLButtonElement>('.appearance-toggle');
const panel = document.querySelector<HTMLElement>('.appearance-panel');
const options = [...document.querySelectorAll<HTMLButtonElement>('[data-color]')];

function syncTheme() {
  const theme = (root.dataset.theme ?? 'crimson') as Theme;
  const current = themes[theme] ?? themes.crimson;
  document.querySelector('.appearance-name')?.replaceChildren(current.name);
  toggle?.setAttribute('aria-label', `Choose appearance. Current palette: ${current.name}`);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', current.background);
  options.forEach(option => option.setAttribute('aria-pressed', String(option.dataset.color === theme)));
}

function closeAppearance(restoreFocus = false) {
  if (panel) panel.hidden = true;
  toggle?.setAttribute('aria-expanded', 'false');
  if (restoreFocus) toggle?.focus();
}

syncTheme();
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  if (panel) panel.hidden = !open;
  if (open) options.find(option => option.getAttribute('aria-pressed') === 'true')?.focus();
});

options.forEach((option, index) => {
  option.addEventListener('click', () => {
    const theme = option.dataset.color as Theme;
    if (!(theme in themes)) return;
    root.dataset.theme = theme;
    try { localStorage.setItem('portfolio-appearance-v2', theme); } catch {}
    syncTheme();
    closeAppearance(true);
  });
  option.addEventListener('keydown', event => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const direction = event.key === 'ArrowDown' ? 1 : -1;
    options[(index + direction + options.length) % options.length]?.focus();
  });
});
document.addEventListener('pointerdown', event => {
  if (event.target instanceof Node && !appearance?.contains(event.target)) closeAppearance();
});
appearance?.addEventListener('focusout', event => {
  if (event.relatedTarget instanceof Node && !appearance.contains(event.relatedTarget)) closeAppearance();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && panel && !panel.hidden) closeAppearance(true);
});
window.addEventListener('storage', event => {
  if (event.key !== 'portfolio-appearance-v2') return;
  root.dataset.theme = event.newValue && event.newValue in themes ? event.newValue : 'crimson';
  syncTheme();
});

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll<HTMLElement>('.showcase-card').forEach((card, index) => {
  card.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`);
});

// A single frame per pointer update keeps the depth effect smooth.
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
function pointerDepth(element: HTMLElement, apply: (x: number, y: number) => void, reset: () => void) {
  let frame = 0;
  element.addEventListener('pointermove', event => {
    if (reduced.matches || !finePointer.matches) return;
    const bounds = element.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => apply(x, y));
  });
  const clear = () => { cancelAnimationFrame(frame); reset(); };
  element.addEventListener('pointerleave', clear);
  reduced.addEventListener('change', clear);
  finePointer.addEventListener('change', clear);
}
document.querySelectorAll<HTMLElement>('.showcase-link').forEach(link => {
  pointerDepth(link, (x, y) => {
    link.style.setProperty('--tilt-x', `${(.5 - y) * 4}deg`);
    link.style.setProperty('--tilt-y', `${(x - .5) * 5}deg`);
    link.style.setProperty('--shine-x', `${x * 100}%`);
    link.style.setProperty('--shine-y', `${y * 100}%`);
  }, () => {
    ['--tilt-x', '--tilt-y', '--shine-x', '--shine-y'].forEach(property => link.style.removeProperty(property));
  });
});
document.querySelectorAll('.gallery-item, .gallery-heading, .detail-heading, .detail-meta, .detail-visual-wrap, .next-project').forEach(el => el.classList.add('reveal'));
if (!reduced.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('will-reveal');
    observer.observe(el);
  });
  document.addEventListener('focusin', event => {
    if (event.target instanceof Element) event.target.closest('.will-reveal')?.classList.add('is-visible');
  });
  reduced.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    document.querySelectorAll('.will-reveal').forEach(el => el.classList.add('is-visible'));
    document.getAnimations().forEach(animation => animation.cancel());
  });
}

const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-section]')];
const sections = navLinks.map(link => document.getElementById(link.dataset.section ?? '')).filter(Boolean) as HTMLElement[];
let pending = false;
function updateNav() {
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
  requestAnimationFrame(updateNav);
}, { passive: true });
updateNav();

document.querySelector<HTMLButtonElement>('.copy-email')?.addEventListener('click', async event => {
  const button = event.currentTarget as HTMLButtonElement;
  const status = document.querySelector('.copy-status');
  try {
    await navigator.clipboard.writeText(button.dataset.email ?? '');
    if (status) status.textContent = 'Email copied.';
  } catch {
    if (status) status.textContent = 'Use the email link above.';
  }
});
