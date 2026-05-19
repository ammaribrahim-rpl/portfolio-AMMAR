/* =============================================
   AMMAR PORTFOLIO — MAIN JAVASCRIPT
   =============================================
   Features:
   - Sticky navbar with scroll shadow
   - Hamburger menu toggle
   - Active nav link detection
   - Progress bar animation (Skills page)
   - Project filter (Projects page)
   - Contact form handler
   - Scroll-in animations (IntersectionObserver)
============================================= */

/* ── Helper: get current page filename ── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

/* ══════════════════════════════════════════
   1. NAVBAR — Active Link + Hamburger
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* Mark active nav link */
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || href.endsWith(currentPage))) {
      link.classList.add('active');
    }
    // Special case: root or index
    if ((currentPage === '' || currentPage === 'index.html') && href === '../index.html') {
      link.classList.add('active');
    }
  });

  /* Hamburger toggle */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      // Animate bars
      hamburger.classList.toggle('menu-open');
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('menu-open');
      });
    });
  }

  /* Navbar scroll shadow */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.classList.add('shadow-md');
      } else {
        navbar.classList.remove('shadow-md');
      }
    });
  }

  /* ── 2. SCROLL-IN ANIMATIONS ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  /* ── 3. PROGRESS BARS (Skills page) ── */
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute('data-width');
        fill.style.width = targetWidth + '%';
        progressObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.progress-fill').forEach(el => {
    progressObserver.observe(el);
  });

  /* ── 4. PROJECT FILTER (Projects page) ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ── 5. CONTACT FORM ── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = '✓ Message Sent!';
      btn.disabled = true;
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = '';
        contactForm.reset();
      }, 3500);
    });
  }
});

/* ══════════════════════════════════════════
   6. SMOOTH SCROLL for anchor links
══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
