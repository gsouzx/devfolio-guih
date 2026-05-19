/* =============================================
   OdontoOS Portfolio — main.js
   Parallax · Reveal on Scroll · Typed Text
   Tema Claro/Escuro · Navbar Scroll · Modal
   ============================================= */

// ── TEMA ─────────────────────────────────────
const html    = document.documentElement;
const btnTema = document.getElementById('btnTema');
const TEMA_KEY = 'guih_tema';

function aplicarTema(tema) {
  html.classList.remove('tema-escuro', 'tema-claro');
  html.classList.add(tema);
  localStorage.setItem(TEMA_KEY, tema);
}

// carrega tema salvo ou escuro por padrão
aplicarTema(localStorage.getItem(TEMA_KEY) || 'tema-escuro');

btnTema && btnTema.addEventListener('click', () => {
  const atual = html.classList.contains('tema-escuro') ? 'tema-escuro' : 'tema-claro';
  aplicarTema(atual === 'tema-escuro' ? 'tema-claro' : 'tema-escuro');
});

// ── NAVBAR SCROLL ─────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── PARALLAX ──────────────────────────────────
const orbA = document.querySelector('.orb-a');
const orbB = document.querySelector('.orb-b');
const heroGrid = document.querySelector('.hero-grid');
const skillsBg = document.querySelector('.skills-parallax-bg');
const aboutBg  = document.querySelector('.about-parallax-bg');

window.addEventListener('scroll', () => {
  const y = window.scrollY;

  // Hero orbs
  if (orbA)     orbA.style.transform     = `translate(${y * 0.12}px, ${y * 0.18}px)`;
  if (orbB)     orbB.style.transform     = `translate(${-y * 0.08}px, ${y * 0.12}px)`;
  if (heroGrid) heroGrid.style.transform = `translateY(${y * 0.06}px)`;

  // Skills section parallax
  if (skillsBg) {
    const sec = document.getElementById('skills');
    if (sec) {
      const off = y - sec.offsetTop + window.innerHeight;
      skillsBg.style.transform = `translateY(${off * 0.07}px)`;
    }
  }

  // About section parallax
  if (aboutBg) {
    const sec = document.getElementById('aboutMe');
    if (sec) {
      const off = y - sec.offsetTop + window.innerHeight;
      aboutBg.style.transform = `translateY(${off * 0.06}px)`;
    }
  }
}, { passive: true });

// ── REVEAL ON SCROLL ──────────────────────────
const revealEls = document.querySelectorAll('.reveal');

// Força visível imediatamente se já está na viewport (inclui hero)
function checkRevealOnLoad() {
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 60) {
      el.classList.add('visible');
    }
  });
}

// Roda imediatamente + após pequeno delay para garantir layout estável
checkRevealOnLoad();
setTimeout(checkRevealOnLoad, 120);
setTimeout(checkRevealOnLoad, 400);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

revealEls.forEach(el => {
  if (!el.classList.contains('visible')) {
    revealObserver.observe(el);
  }
});

// ── TYPED TEXT ────────────────────────────────
const typedEl  = document.querySelector('.typed-text');
const cursorEl = document.querySelector('.cursor-blink');
const words    = ['Front-End', 'Back-End', 'UI / UX', 'Full Stack'];
let wi = 0, ci = 0, deleting = false;

function type() {
  if (!typedEl) return;
  const word = words[wi];

  if (!deleting) {
    typedEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      deleting = true;
      setTimeout(type, 1600);
      return;
    }
    setTimeout(type, 90);
  } else {
    typedEl.textContent = word.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, 45);
  }
}
setTimeout(type, 800);

// ── SCROLL INDICATOR HIDE ─────────────────────
const scrollDot = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
  if (!scrollDot) return;
  scrollDot.style.opacity = window.scrollY > 80 ? '0' : '1';
}, { passive: true });

// ── MODAL PLENAX ──────────────────────────────


// ── MENU MOBILE ───────────────────────────────
const btnMenu = document.querySelector('.button-menu-toggle');
const menuNav = document.querySelector('.menu-toggle');


function fecharMenu() {
  menuNav && menuNav.classList.remove('ativo');
  overlay && overlay.classList.remove('ativo');
  btnMenu && btnMenu.setAttribute('aria-expanded', 'false');
}

btnMenu && btnMenu.addEventListener('click', () => {
  const aberto = menuNav.classList.toggle('ativo');
  overlay && overlay.classList.toggle('ativo');
  btnMenu.setAttribute('aria-expanded', String(aberto));
});
overlay && overlay.addEventListener('click', fecharMenu);

// fecha menu ao clicar em um link
document.querySelectorAll('.menu-toggle a').forEach(a =>
  a.addEventListener('click', fecharMenu)
);

// ── ACTIVE NAV LINK on scroll ──────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.menu-icons a, .menu-toggle a');

const secObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('nav-active'));
      const active = document.querySelectorAll(`a[href="#${entry.target.id}"]`);
      active.forEach(l => l.classList.add('nav-active'));
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => secObserver.observe(s));

const section = document.querySelector('.tecnologias');
let mx = 0, my = 0;

section.addEventListener('mousemove', e => {
  const r = section.getBoundingClientRect();
  mx = (e.clientX - r.left - r.width / 2)  / (r.width / 2);
  my = (e.clientY - r.top  - r.height / 2) / (r.height / 2);

  document.querySelectorAll('.skill').forEach(skill => {
    const d = parseFloat(skill.dataset.depth) || 0.6;
    const tx = mx * 10 * d;
    const ty = my * 7  * d;
    const rx = my * -7 * d;
    const ry = mx *  7 * d;
    skill.style.transition = 'transform .08s linear';
    skill.style.transform = `translate(${tx}px,${ty}px) perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
});

section.addEventListener('mouseleave', () => {
  document.querySelectorAll('.skill').forEach(skill => {
    skill.style.transition = 'transform .55s cubic-bezier(.34,1.4,.64,1)';
    skill.style.transform = 'translate(0,0) perspective(600px) rotateX(0deg) rotateY(0deg)';
  });
});