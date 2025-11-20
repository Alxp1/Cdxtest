const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced && window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero__copy h1', {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.hero__visual .orb', {
    scale: 0.92,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
  });

  gsap.utils.toArray('.card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      delay: i * 0.02,
      ease: 'power2.out'
    });
  });

  gsap.utils.toArray('.section__header').forEach((header) => {
    const parts = header.querySelectorAll('.pill, h2, p');
    gsap.from(parts, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%'
      },
      y: 18,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power2.out'
    });
  });

  gsap.utils.toArray('.symptom-card').forEach((card, i) => {
    const icon = card.querySelector('.icon');
    gsap.from(icon, {
      scrollTrigger: {
        trigger: card,
        start: 'top 82%'
      },
      scale: 0.85,
      opacity: 0,
      rotate: -6,
      duration: 0.8,
      delay: i * 0.05,
      ease: 'back.out(1.6)'
    });
  });

  gsap.to('.dial__needle', {
    rotate: 48,
    duration: 1.4,
    ease: 'elastic.out(1, 0.65)',
    delay: 0.4
  });
}

// Soft parallax for orb
const orb = document.querySelector('.orb');
if (orb && !prefersReduced) {
  let ticking = false;

  window.addEventListener('mousemove', (e) => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      orb.style.transform = `translate(${x}px, ${y}px)`;
      ticking = false;
    });
  });
}

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Открыть меню');
      }
    });
  });
}
