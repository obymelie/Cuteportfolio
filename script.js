/* ============================================================
   OBIAGELI MELIE — CREATIVE MARKETING PORTFOLIO
   script.js
   ============================================================ */

/* ---------- CUSTOM CURSOR ---------- */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const dot    = document.getElementById('cursorDot');
  if (!cursor || !dot) return;

  let mx = -100, my = -100;
  let cx = -100, cy = -100;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Smooth cursor follows
  function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Scale on link hover
  const hoverTargets = document.querySelectorAll('a, button');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });
})();


/* ---------- NAVBAR SCROLL EFFECT ---------- */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
})();


/* ---------- MOBILE NAV TOGGLE ---------- */
(function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const isOpen = links.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      links.classList.remove('open');
    }
  });
})();


/* ---------- SCROLL REVEAL ---------- */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings within same parent
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 300);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
})();


/* ---------- ACTIVE NAV LINK HIGHLIGHT ---------- */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navLinks a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(section => observer.observe(section));

  // Add active link style
  const style = document.createElement('style');
  style.textContent = `#navLinks a.active { color: var(--gold) !important; }`;
  document.head.appendChild(style);
})();


/* ---------- HERO PARALLAX ---------- */
(function initParallax() {
  const heroBgText = document.querySelector('.hero-bg-text');
  if (!heroBgText) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.3}px))`;
  }, { passive: true });
})();


/* ---------- SMOOTH SCROLL (fallback for older browsers) ---------- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = document.getElementById('navbar')?.offsetHeight || 70;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();


/* ---------- COUNTER ANIMATION (optional numbers in About) ---------- */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        let count = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          count += step;
          if (count >= target) { count = target; clearInterval(timer); }
          el.textContent = count + (el.dataset.suffix || '');
        }, 20);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();


/* ---------- MARQUEE PAUSE ON HOVER ---------- */
(function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  const strip = track.closest('.marquee-strip');
  if (!strip) return;

  strip.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  strip.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
})();


/* ---------- FADE IN PAGE LOAD ---------- */
(function initPageLoad() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
})();


/* ---------- KEYBOARD ACCESSIBILITY: close nav on Escape ---------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const links = document.getElementById('navLinks');
    if (links) links.classList.remove('open');
  }
});
