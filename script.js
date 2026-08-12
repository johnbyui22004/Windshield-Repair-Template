/* =============================================================
   PRECISION AUTO GLASS — APPLICATION SCRIPT
   Vanilla JavaScript, responsive, fast, dependency-free.
   ============================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------------
     MOBILE NAV TOGGLE
     ----------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    var navLinks = primaryNav.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  /* -----------------------------------------------------------
     FAQ ACCORDION
     ----------------------------------------------------------- */
  var accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var panel = trigger.nextElementSibling;
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close other open panels for single accordion experience
      accordionTriggers.forEach(function (otherTrigger) {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherTrigger.nextElementSibling) {
            otherTrigger.nextElementSibling.style.maxHeight = null;
          }
        }
      });

      if (isOpen) {
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* -----------------------------------------------------------
     QUOTE FORM SUBMISSION & NETLIFY HANDLER
     ----------------------------------------------------------- */
  var quoteForm = document.getElementById('quoteForm');
  var formNote = document.getElementById('formNote');

  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      var nameInput = document.getElementById('fullName');
      var phoneInput = document.getElementById('phone');

      if (!nameInput || !nameInput.value.trim() || !phoneInput || !phoneInput.value.trim()) {
        e.preventDefault();
        if (formNote) {
          formNote.textContent = 'Please fill out your Name and Phone Number so we can reach you.';
          formNote.style.color = '#e20684';
        }
        return;
      }

      // If submitted via Netlify or AJAX:
      if (quoteForm.hasAttribute('data-netlify')) {
        // Let standard Netlify form submission process or handle via fetch if preferred
      } else {
        e.preventDefault();
        if (formNote) {
          formNote.style.color = '#333333';
          formNote.textContent = "Thank you! We've received your repair quote request. We will call or text you shortly at " + phoneInput.value.trim() + ".";
        }
        quoteForm.reset();
      }
    });
  }

  /* -----------------------------------------------------------
     FOOTER COPYRIGHT YEAR
     ----------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});



/* -------------------------------------------------------------
   BEFORE & AFTER SLIDER
   ------------------------------------------------------------- */

const beforeAfterSlider = document.getElementById('beforeAfterSlider');

if (beforeAfterSlider) {
  const sliderInput = beforeAfterSlider.querySelector('.slider-input');
  const beforeWrapper = beforeAfterSlider.querySelector('.before-image-wrapper');
  const sliderLine = beforeAfterSlider.querySelector('.slider-line');

  function updateSlider(value) {
    beforeWrapper.style.width = `${value}%`;
    sliderLine.style.left = `${value}%`;
  }

  sliderInput.addEventListener('input', function () {
    updateSlider(this.value);
  });

  updateSlider(sliderInput.value);
}