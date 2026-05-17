/* ============================================================
   THEYLINA BARBER — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Navbar: scroll state ---------- */
  var navbar      = document.getElementById('navbar');
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var mobileMenu  = document.getElementById('mobileMenu');

  function onScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    // Close mobile menu on scroll
    if (navbar.classList.contains('menu-open')) {
      closeMobileMenu();
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  /* ---------- Mobile menu toggle ---------- */
  function openMobileMenu() {
    navbar.classList.add('menu-open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    navbar.classList.remove('menu-open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  hamburgerBtn.addEventListener('click', function () {
    if (navbar.classList.contains('menu-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close menu when a mobile nav link is clicked
  var mobileLinks = document.querySelectorAll('.mobile-link');
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileMenu();
    });
  });

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var navHeight = navbar.offsetHeight;
      var targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  /* ---------- Scroll reveal (Intersection Observer) ---------- */
  var revealEls = document.querySelectorAll('.reveal, .fade-up');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Stagger cards in grids
            var parent = entry.target.parentElement;
            if (parent && (
              parent.classList.contains('services-grid') ||
              parent.classList.contains('reviews-grid') ||
              parent.classList.contains('contact-grid')
            )) {
              var siblings = Array.prototype.slice.call(
                parent.querySelectorAll('.reveal')
              );
              var idx = siblings.indexOf(entry.target);
              entry.target.style.transitionDelay = (idx * 0.1) + 's';
            }
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for old browsers
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- Hero: trigger fade-up on load ---------- */
  window.addEventListener('load', function () {
    var heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      setTimeout(function () {
        heroContent.classList.add('visible');
      }, 120);
    }
  });

})();
