document.addEventListener("DOMContentLoaded", function () {
  
  const lastModifiedElement = document.getElementById("lastModified");
  if (lastModifiedElement) {
    lastModifiedElement.textContent = document.lastModified;
  }

  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  
  const menuBtn = document.getElementById("menuBtn");
  const navigation = document.querySelector(".navigation");

  if (menuBtn && navigation) {
    menuBtn.addEventListener("click", () => {
      navigation.classList.toggle("open");
      menuBtn.classList.toggle("open");
    });
  }

  // --- Logic to parse URL parameters and display form data ---
  const urlParams = new URLSearchParams(window.location.search);

  // Retrieve and display data from required form fields
  document.getElementById("displayFirstName").textContent =
    urlParams.get("applicantName") || "N/A";
  document.getElementById("displayLastName").textContent =
    urlParams.get("applicantLastName") || "N/A";
  document.getElementById("displayEmail").textContent =
    urlParams.get("email") || "N/A";
  document.getElementById("displayPhone").textContent =
    urlParams.get("phone") || "N/A";
  document.getElementById("displayOrgName").textContent =
    urlParams.get("orgName") || "N/A";

  // Handle the timestamp field
  const timestampRaw = urlParams.get("timestamp");
  if (timestampRaw) {
    try {
      const date = new Date(timestampRaw);
      // Format the date and time for a user-friendly display
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true, // For AM/PM format
      };
      document.getElementById("displayTimestamp").textContent =
        date.toLocaleString("en-US", options);
    } catch (e) {
      document.getElementById("displayTimestamp").textContent = "Invalid Date";
      console.error("Error parsing timestamp:", e);
    }
  } else {
    document.getElementById("displayTimestamp").textContent = "N/A";
  }
});