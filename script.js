// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Nav: shrink on scroll =====
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ===== Mobile menu =====
const burger = document.getElementById('burger');
const links = document.querySelector('.nav__links');
burger.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// ===== Scroll reveal =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 5) * 60}ms`;
  io.observe(el);
});

// ===== Count-up stats =====
const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.textContent.replace(/[0-9]/g, '');
  const dur = 1400;
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const statObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCount(e.target); statObs.unobserve(e.target); }
  });
}, { threshold: 0.6 });
document.querySelectorAll('.stat__num').forEach(el => statObs.observe(el));

// ===== Scroll progress bar =====
const progress = document.getElementById('progress');
const onProgress = () => {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  progress.style.width = `${max > 0 ? (h.scrollTop / max) * 100 : 0}%`;
};
onProgress();
window.addEventListener('scroll', onProgress, { passive: true });

// ===== Back to top =====
const totop = document.getElementById('totop');
const onTop = () => totop.classList.toggle('show', window.scrollY > 600);
onTop();
window.addEventListener('scroll', onTop, { passive: true });
totop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== Typing effect (hero role) =====
const typedEl = document.getElementById('typed');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (typedEl && !reduceMotion) {
  const phrases = [
    'Senior Software Engineer',
    'Distributed-systems builder',
    'AI-integrated backend dev',
    'Go & Kotlin enthusiast'
  ];
  let pi = 0, ci = phrases[0].length, deleting = true;
  const tick = () => {
    const word = phrases[pi];
    typedEl.textContent = word.slice(0, ci);
    let delay = deleting ? 34 : 62;
    if (!deleting && ci === word.length) { delay = 2600; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 350; }
    ci += deleting ? -1 : 1;
    setTimeout(tick, delay);
  };
  setTimeout(tick, 2200); // let the hero settle first
}

// ===== Project card spotlight =====
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});
