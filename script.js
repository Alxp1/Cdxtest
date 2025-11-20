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

  gsap.to('.dial__needle', {
    rotate: 48,
    duration: 1.4,
    ease: 'elastic.out(1, 0.65)',
    delay: 0.4
  });
}

// Soft parallax for orb
const orb = document.querySelector('.orb');
if (orb) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
}
