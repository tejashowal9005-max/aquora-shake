/* ============================================
   AQUORA SHAKE · script.js
   Premium interactions · GSAP animations
   Smooth scroll · Floating particles
   Formspree email form
   ============================================ */

// --------------------------------------------
// 1. LOADING SCREEN
// --------------------------------------------
(function initLoader() {
  let progress = 0;
  const bar = document.getElementById('loaderBar');
  const pct = document.getElementById('loaderPercent');
  const loader = document.getElementById('loader');

  if (!bar || !pct || !loader) return;

  const interval = setInterval(() => {
    const increment = Math.random() * 8 + 4;
    progress = Math.min(progress + increment, 100);
    bar.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hide');
        initAnimations();
        initParticles();
      }, 500);
    }
  }, 180);
})();

// --------------------------------------------
// 2. NAVIGATION
// --------------------------------------------
(function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.mobile-menu a, .nav-links a');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.remove('open');
        if (hamburger) hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }
})();

// --------------------------------------------
// 3. SMOOTH SCROLL
// --------------------------------------------
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        const navHeight = document.querySelector('nav')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
})();

// --------------------------------------------
// 4. GSAP ANIMATIONS
// --------------------------------------------
function initAnimations() {
  // Fallback: simple CSS transitions for reveal if GSAP isn't available
  if (typeof gsap === 'undefined') {
    const revealEls = document.querySelectorAll(
      '.flavour-card, .gallery-item, .story-text, .story-image, .contact-form-wrap, .footer-col, .section-title, .section-sub'
    );
    revealEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.8s ease ${i * 0.06}s, transform 0.8s ease ${i * 0.06}s`;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100 + i * 60);
    });
    return;
  }

  let hasScrollTrigger = false;
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    hasScrollTrigger = true;
  }

  // Section titles & subtitles
  const titles = document.querySelectorAll('.section-title, .section-sub');
  titles.forEach((el, i) => {
    gsap.from(el, {
      duration: 1.0,
      opacity: 0,
      y: 30,
      ease: 'power2.out',
      delay: i * 0.1,
      scrollTrigger: hasScrollTrigger ? { trigger: el, start: 'top 85%' } : null,
    });
  });

  // Flavour cards
  const flavourCards = document.querySelectorAll('.flavour-card');
  flavourCards.forEach((card, i) => {
    gsap.from(card, {
      duration: 0.9,
      opacity: 0,
      y: 50,
      scale: 0.95,
      ease: 'power3.out',
      delay: i * 0.12,
      scrollTrigger: hasScrollTrigger ? { trigger: card, start: 'top 88%' } : null,
    });
  });

  // Gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item, i) => {
    gsap.from(item, {
      duration: 0.7,
      opacity: 0,
      scale: 0.92,
      ease: 'power2.out',
      delay: i * 0.06,
      scrollTrigger: hasScrollTrigger ? { trigger: item, start: 'top 90%' } : null,
    });
  });

  // Hero elements
  gsap.from('.hero-badge', { duration: 1.0, opacity: 0, y: 20, delay: 0.2 });
  gsap.from('.hero-title', { duration: 1.2, opacity: 0, y: 40, delay: 0.3 });
  gsap.from('.hero-sub', { duration: 1.0, opacity: 0, y: 30, delay: 0.5 });
  gsap.from('.hero-cta', { duration: 0.9, opacity: 0, y: 20, delay: 0.7 });
  gsap.from('.hero-image-card', { duration: 1.4, opacity: 0, scale: 0.9, delay: 0.4 });

  // Story section
  gsap.from('.story-image', {
    duration: 1.0,
    opacity: 0,
    x: -40,
    ease: 'power2.out',
    scrollTrigger: hasScrollTrigger ? { trigger: '.story-image', start: 'top 80%' } : null,
  });
  gsap.from('.story-text', {
    duration: 1.0,
    opacity: 0,
    x: 40,
    ease: 'power2.out',
    scrollTrigger: hasScrollTrigger ? { trigger: '.story-text', start: 'top 80%' } : null,
  });

  // Contact form
  gsap.from('.contact-form-wrap', {
    duration: 1.0,
    opacity: 0,
    y: 40,
    ease: 'power2.out',
    scrollTrigger: hasScrollTrigger ? { trigger: '.contact-form-wrap', start: 'top 85%' } : null,
  });

  // Footer columns
  const footerCols = document.querySelectorAll('.footer-col');
  footerCols.forEach((col, i) => {
    gsap.from(col, {
      duration: 0.8,
      opacity: 0,
      y: 30,
      ease: 'power2.out',
      delay: i * 0.08,
      scrollTrigger: hasScrollTrigger ? { trigger: col, start: 'top 90%' } : null,
    });
  });
}

// --------------------------------------------
// 5. FLOATING 2D PARTICLES
// --------------------------------------------
function initParticles() {
  const container = document.body;
  const count = 25;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle-gold';
    const size = 2 + Math.random() * 6;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = 5 + Math.random() * 10;
    const delay = Math.random() * 8;
    const tx = (Math.random() - 0.5) * 80;
    const ty = (Math.random() - 0.5) * 80 - 30;

    particle.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      --tx: ${tx}px;
      --ty: ${ty}px;
      opacity: ${0.1 + Math.random() * 0.25};
      filter: blur(${1 + Math.random() * 2}px);
    `;
    container.appendChild(particle);
  }
}

// --------------------------------------------
// 6. FLAVOUR SWITCHING (UI feedback)
// --------------------------------------------
window.switchFlavour = function (flavourName) {
  const cards = document.querySelectorAll('.flavour-card');
  cards.forEach((card) => {
    const title = card.querySelector('h3')?.textContent;
    if (title === flavourName) {
      card.style.borderColor = 'var(--color-accent)';
      card.style.boxShadow = '0 0 50px rgba(212, 175, 55, 0.3)';
      setTimeout(() => {
        card.style.borderColor = '';
        card.style.boxShadow = '';
      }, 800);
    }
  });
  showNotification(`Discovering: ${flavourName}`);
};

// --------------------------------------------
// 7. NOTIFICATION TOAST
// --------------------------------------------
function showNotification(message) {
  const existing = document.querySelector('.luxury-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'luxury-toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(8, 19, 33, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(212, 175, 55, 0.2);
    padding: 0.8rem 2rem;
    border-radius: 60px;
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.05em;
    z-index: 9999;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    opacity: 0;
    transition: opacity 0.5s ease, transform 0.5s ease;
    transform: translateX(-50%) translateY(20px);
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 500);
  }, 2500);
}

// --------------------------------------------
// 8. CONTACT FORM SUBMISSION (Formspree)
// --------------------------------------------
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Disable button + show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        showNotification('Thank you! Your message has been sent.');
        form.reset();
      } else {
        const data = await response.json();
        const errorMsg =
          data?.errors?.map((err) => err.message).join(', ') ||
          'Oops! Something went wrong. Please try again.';
        showNotification(errorMsg);
      }
    } catch (error) {
      showNotification('Network error. Please check your connection.');
    } finally {
      // Restore button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
})();

// --------------------------------------------
// 9. INTERSECTION OBSERVER (fallback)
// --------------------------------------------
(function initIntersectionObserver() {
  if (typeof ScrollTrigger !== 'undefined') return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  document
    .querySelectorAll('.flavour-card, .gallery-item, .section-title, .contact-form-wrap, .story-text, .story-image')
    .forEach((el) => {
      el.classList.add('observe-me');
      observer.observe(el);
    });

  const style = document.createElement('style');
  style.textContent = `
    .observe-me {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .observe-me.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
})();

// --------------------------------------------
// 10. KEYBOARD ACCESSIBILITY
// --------------------------------------------
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const menu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');
    if (menu?.classList.contains('open')) {
      menu.classList.remove('open');
      if (hamburger) hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// --------------------------------------------
// 11. EXPOSE API
// --------------------------------------------
window.__aquora = {
  version: '2.1.0',
  showNotification,
  switchFlavour: window.switchFlavour,
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('AQUORA SHAKE · Luxury experience loaded');
});
