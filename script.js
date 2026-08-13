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

      // Open the selected FAQ panel.
      if (!isOpen && panel) {
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });

  });


  /* ==========================================================
     QUESTION FORM — NETLIFY FORMS
     ========================================================== */

  const questionForm = document.getElementById("quoteForm");
  const formNote = document.getElementById("formNote");

  if (questionForm) {

    questionForm.addEventListener("submit", (event) => {

      const nameInput = document.getElementById("fullName");
      const messageInput = document.getElementById("message");

      const name = nameInput?.value.trim();
      const message = messageInput?.value.trim();

      // Make sure required information is present.
      if (!name || !message) {
        event.preventDefault();

        if (formNote) {
          formNote.textContent =
            "Please enter your name and your question.";

          formNote.style.color = "#e20684";
        }

        return;
      }

      /*
       * IMPORTANT:
       *
       * Do NOT call event.preventDefault() here.
       *
       * The HTML form uses:
       *
       *   data-netlify="true"
       *   method="POST"
       *   name="question-request"
       *
       * Therefore, once validation passes, the browser
       * submits the form normally and Netlify receives it.
       */

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