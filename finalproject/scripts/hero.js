const modal = document.getElementById("formModal");
const closeBtn = document.getElementById("closeModal");
const subscribeBtn = document.getElementById("subscribeBtn");
const form = document.getElementById("subscribeForm");
const welcomeDiv = document.getElementById("welcomeMessage");

subscribeBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Tomar datos del formulario
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const role = document.getElementById("role").value;

  // Guardar en localStorage para uso en otras páginas
  localStorage.setItem("subscriberFirstName", firstName);
  localStorage.setItem("subscriberLastName", lastName);
  localStorage.setItem("subscriberRole", role);

  // Cerrar el formulario (ocultar modal)
  modal.classList.add("hidden");

  // Mostrar mensaje de bienvenida personalizado
  const message = `Welcome ${firstName} ${lastName}, ${role}`;
  welcomeDiv.textContent = message;
  welcomeDiv.classList.remove("hidden");
});
