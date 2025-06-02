document.addEventListener("DOMContentLoaded", function () {
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toISOString();
    }
    const learnMoreButtons = document.querySelectorAll(".learn-more-btn");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close-button");
    learnMoreButtons.forEach((button) => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            const modalId = this.dataset.modalTarget;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "flex";
                modal.focus();
            }
        });
    });
    closeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            this.closest(".modal").style.display = "none";
        });
    });
    modals.forEach((modal) => {
        modal.addEventListener("click", function (event) {
            if (event.target === this) {
                this.style.display = "none";
            }
        });
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            modals.forEach((modal) => {
                if (modal.style.display === "flex") {
                    modal.style.display = "none";
                }
            });
        }
    });
    const animatedCards = document.querySelectorAll('.animated-card');
    animatedCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
});