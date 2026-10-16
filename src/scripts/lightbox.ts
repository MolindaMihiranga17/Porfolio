const dialog = document.querySelector<HTMLDialogElement>('.lightbox');
const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-lightbox]')];

if (dialog && links.length && typeof dialog.showModal === 'function') {
  const image = dialog.querySelector<HTMLImageElement>('.lightbox-image')!;
  const caption = dialog.querySelector<HTMLElement>('.lightbox-caption')!;
  const status = dialog.querySelector<HTMLElement>('.lightbox-status')!;
  const original = dialog.querySelector<HTMLAnchorElement>('.lightbox-original')!;
  const previous = dialog.querySelector<HTMLButtonElement>('.lightbox-prev')!;
  const next = dialog.querySelector<HTMLButtonElement>('.lightbox-next')!;
  const stage = dialog.querySelector<HTMLElement>('.lightbox-stage')!;
  const zoom = dialog.querySelector<HTMLButtonElement>('.lightbox-zoom')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let opener: HTMLAnchorElement | null = null;
  let touch: { x: number; y: number; id: number } | null = null;

  function setZoom(enabled: boolean) {
    stage.classList.toggle('is-zoomed', enabled);
    zoom.setAttribute('aria-pressed', String(enabled));
    zoom.textContent = enabled ? 'Fit image' : 'Zoom in';
    stage.scrollTo(0, 0);
    touch = null;
  }
  zoom.addEventListener('click', () => setZoom(!stage.classList.contains('is-zoomed')));

  function show(nextIndex: number) {
    setZoom(false);
    index = (nextIndex + links.length) % links.length;
    const link = links[index];
    image.style.opacity = '0';
    status.textContent = 'Loading screenshot…';
    image.alt = link.querySelector('img')?.alt ?? '';
    image.src = link.href;
    original.href = link.href;
    caption.textContent = `${index + 1} / ${links.length} — ${link.dataset.caption}`;
  }
  image.addEventListener('load', () => {
    status.textContent = '';
    image.style.opacity = '1';
  });
  image.addEventListener('error', () => {
    status.textContent = 'This screenshot could not load. Try “Open original”.';
  });
  previous.disabled = next.disabled = links.length < 2;
  previous.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  dialog.querySelector('.lightbox-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('lightbox-open');
    touch = null;
    opener?.focus({ preventScroll: true });
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      const controls = [...dialog.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]')];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
      return;
    }
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const destination = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: links.length - 1 }[event.key];
    if (destination !== undefined) { event.preventDefault(); show(destination); }
  });
  stage.addEventListener('pointerdown', event => {
    if (stage.classList.contains('is-zoomed')) return;
    if (event.pointerType === 'touch' && event.isPrimary) touch = { x: event.clientX, y: event.clientY, id: event.pointerId };
    else touch = null;
  });
  stage.addEventListener('pointerup', event => {
    if (!touch || touch.id !== event.pointerId) return;
    const dx = event.clientX - touch.x;
    const dy = event.clientY - touch.y;
    touch = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) show(index + (dx < 0 ? 1 : -1));
  });
  stage.addEventListener('pointercancel', () => { touch = null; });
  links.forEach((link, position) => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      show(position);
      dialog.showModal();
      document.documentElement.classList.add('lightbox-open');
      if (!reduced.matches) dialog.querySelector('.lightbox-panel')?.animate(
        [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
        { duration: 220, easing: 'ease-out' }
      );
    });
  });
}
