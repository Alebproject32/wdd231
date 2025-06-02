document.addEventListener("DOMContentLoaded", function () {
  // Set the timestamp for the hidden input field
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    const now = new Date();
    // Format the date and time to a string suitable for passing in URL (ISO format is good)
    timestampField.value = now.toISOString();
  }

  // --- Modal Logic ---
  const learnMoreButtons = document.querySelectorAll(".learn-more-btn");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close-button");

  // Open modal
  learnMoreButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default link behavior
      const modalId = this.dataset.modalTarget;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "flex"; 
      }
    });
  });

  // Close modal when clicking on the close button
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.closest(".modal").style.display = "none";
    });
  });

  // Close modal when clicking outside of the modal content
  modals.forEach((modal) => {
    modal.addEventListener("click", function (event) {
      if (event.target === this) {
        this.style.display = "none";
      }
    });
  });

  // Close modal when pressing the Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      modals.forEach((modal) => {
        if (modal.style.display === "flex") {
          modal.style.display = "none";
        }
      });
    }
  });

  // --- Card Animation on Load ---
  const animatedCards = document.querySelectorAll('.animated-card');
  animatedCards.forEach((card, index) => {
      // Stagger the animation by delaying each card's animation
      card.style.animationDelay = `${index * 0.15}s`; // 0.15s delay between each card
      // 
  });

});