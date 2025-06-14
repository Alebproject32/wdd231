document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("subscriberFirstName");
  const lastname = localStorage.getItem("subscriberLastName");

  if (name && lastname) {
    const header = document.querySelector("header");
    const userTag = document.createElement("div");
    userTag.textContent = `👋 Welcome, ${name} ${lastname}`;
    userTag.style.position = "absolute";
    userTag.style.top = "20px";
    userTag.style.right = "20px";
    userTag.style.background = "#c9a017";
    userTag.style.padding = "8px 14px";
    userTag.style.borderRadius = "8px";
    userTag.style.color = "#fff";
    userTag.style.fontWeight = "bold";
    header.style.position = "relative";
    header.appendChild(userTag);
  }
});
