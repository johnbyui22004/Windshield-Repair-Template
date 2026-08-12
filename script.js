document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     MOBILE NAVIGATION
     ========================================================== */

  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");

  if (navToggle && primaryNav) {
    const closeMenu = () => {
      primaryNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("is-open");

      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }


  /* ==========================================================
     FAQ ACCORDION
     ========================================================== */

  document.querySelectorAll(".accordion-trigger").forEach((trigger) => {

    trigger.addEventListener("click", () => {
      const panel = trigger.nextElementSibling;
      const isOpen =
        trigger.getAttribute("aria-expanded") === "true";

      // Close all other FAQ panels.
      document.querySelectorAll(".accordion-trigger").forEach((other) => {
        other.setAttribute("aria-expanded", "false");

        const otherPanel = other.nextElementSibling;

        if (otherPanel) {
          otherPanel.style.maxHeight = null;
        }
      });

      // Open the selected panel if it was previously closed.
      if (!isOpen && panel) {
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });

  });


  /* ==========================================================
     QUOTE FORM
     ========================================================== */

  const quoteForm = document.getElementById("quoteForm");
  const formNote = document.getElementById("formNote");

  if (quoteForm) {

    quoteForm.addEventListener("submit", (event) => {

      const nameInput = document.getElementById("fullName");
      const phoneInput = document.getElementById("phone");

      const name = nameInput?.value.trim();
      const phone = phoneInput?.value.trim();

      // Name and phone number are required.
      if (!name || !phone) {
        event.preventDefault();

        if (formNote) {
          formNote.textContent =
            "Please fill out your Name and Phone Number so we can reach you.";

          formNote.style.color = "#e20684";
        }

        return;
      }

      // Allow Netlify to handle forms marked with data-netlify.
      if (quoteForm.hasAttribute("data-netlify")) {
        return;
      }

      // Demo/local form behavior.
      event.preventDefault();

      if (formNote) {
        formNote.textContent =
          `Thank you! We've received your repair quote request. ` +
          `We will call or text you shortly at ${phone}.`;

        formNote.style.color = "#333333";
      }

      quoteForm.reset();
    });

  }


  /* ==========================================================
     FOOTER COPYRIGHT YEAR
     ========================================================== */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* ==========================================================
     BEFORE & AFTER SLIDER
     ========================================================== */

  const slider = document.getElementById("beforeAfterSlider");

  if (slider) {

    const input = slider.querySelector(".slider-input");
    const beforeWrapper =
      slider.querySelector(".before-image-wrapper");
    const line =
      slider.querySelector(".slider-line");

    // Make sure all required slider elements exist.
    if (input && beforeWrapper && line) {

      const updateSlider = (value) => {
        beforeWrapper.style.width = `${value}%`;
        line.style.left = `${value}%`;
      };

      input.addEventListener("input", () => {
        updateSlider(input.value);
      });

      // Set the slider to its starting position.
      updateSlider(input.value);
    }
  }

});