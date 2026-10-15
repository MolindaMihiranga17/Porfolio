const root = document.documentElement;
const themeButton = document.querySelector<HTMLButtonElement>('.theme-toggle');
function syncTheme() {
  const dark = root.dataset.theme === 'dark';
  themeButton?.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
  themeButton?.setAttribute('aria-pressed', String(dark));
  document.querySelector('.theme-label')?.replaceChildren(`${dark ? 'LIGHT' : 'DARK'} MODE`);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#161616':'#f2efe8');
}
syncTheme();
themeButton?.addEventListener('click',()=>{
  root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
  try{localStorage.setItem('portfolio-theme',root.dataset.theme);}catch{}
  syncTheme();
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',event=>{
  let saved=null;try{saved=localStorage.getItem('portfolio-theme');}catch{}
  if(!saved){root.dataset.theme=event.matches?'dark':'light';syncTheme();}
});
const menuButton=document.querySelector<HTMLButtonElement>('.menu-toggle');
const menu=document.querySelector<HTMLElement>('.mobile-menu');
function closeMenu(){if(menu)menu.hidden=true;menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Open menu');}
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';if(menu)menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');});
menu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
if(!reduced.matches&&'IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('will-reveal');observer.observe(el);});
}
const entries=[...document.querySelectorAll<HTMLDetailsElement>('.work-entry')];
entries.forEach(entry=>entry.addEventListener('toggle',()=>{
  if(!entry.open)return;
  entries.forEach(other=>{if(other!==entry)other.open=false;});
  if(!reduced.matches)entry.querySelector('.entry-panel')?.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'ease-out'});
}));
const navLinks=[...document.querySelectorAll<HTMLAnchorElement>('[data-section]')];
const sections=navLinks.map(link=>document.getElementById(link.dataset.section??'')).filter(Boolean) as HTMLElement[];
const progress=document.querySelector<HTMLElement>('.reading-progress');
let pending=false;
function updateScroll(){
  const total=root.scrollHeight-innerHeight;
  progress?.style.setProperty('--progress',String(total>0?scrollY/total:0));
  let active=sections[0]?.id;
  for(const section of sections)if(section.getBoundingClientRect().top<innerHeight*.4)active=section.id;
  navLinks.forEach(link=>{if(link.dataset.section===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
  pending=false;
}
window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(updateScroll);}},{passive:true});
updateScroll();
document.querySelector<HTMLButtonElement>('.copy-email')?.addEventListener('click',async event=>{
  const button=event.currentTarget as HTMLButtonElement;const status=document.querySelector('.copy-status');
  try{await navigator.clipboard.writeText(button.dataset.email??'');if(status)status.textContent='Copied to clipboard.';}catch{if(status)status.textContent='Use the email link to get in touch.';}
});
