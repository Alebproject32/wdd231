// scripts/discover.js

// Uncomment this line for testing – it clears the localStorage each time:
// localStorage.clear();

// 1. Load places from JSON and create cards
async function loadPlaces() {
  try {
    const response = await fetch("data/places.json");
    const places = await response.json();
    const container = document.getElementById("cards-container");

    places.forEach((place) => {
      const card = document.createElement("section");
      card.classList.add("card");

      const title = document.createElement("h2");
      title.textContent = place.name;

      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.src = place.image;
      img.alt = `Image of ${place.name}`;
      img.loading = "lazy";
      figure.appendChild(img);

      const address = document.createElement("address");
      address.textContent = place.address;

      const desc = document.createElement("p");
      desc.textContent = place.description;

      const button = document.createElement("button");
      button.textContent = "More Info";

      card.append(title, figure, address, desc, button);
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading JSON:", err);
  }
}

// 2. Handle visit message using localStorage
function handleVisitMessage() {
  const messageEl = document.getElementById("visitMessage");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    messageEl.textContent = "Welcome! If you have any questions, contact us.";
  } else {
    const diffMs = now - Number(lastVisit);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      messageEl.textContent = "Welcome back! That was quick!";
    } else if (diffDays === 1) {
      messageEl.textContent = "Your last visit was 1 day ago.";
    } else {
      messageEl.textContent = `Your last visit was ${diffDays} days ago.`;
    }
  }

  localStorage.setItem("lastVisit", now);
}

// 3. Hover effect for non-mobile
function setupHoverEffect() {
  const isMobile = window.innerWidth < 641;
  if (!isMobile) {
    document.querySelectorAll(".card img").forEach((img) => {
      img.addEventListener("mouseover", () => {
        img.style.transform = "scale(1.05)";
      });
      img.addEventListener("mouseout", () => {
        img.style.transform = "scale(1)";
      });
    });
  }
}

// Run when page is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadPlaces().then(setupHoverEffect);
  handleVisitMessage();
});
