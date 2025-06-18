document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("courses-container");
  const modal = createModal();
  document.body.appendChild(modal);

  try {
    const response = await fetch("scripts/courses.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const courses = await response.json();

    courses.forEach((course) => {
      const card = document.createElement("div");
      card.className = "course-card";

      card.innerHTML = `
        <h3>${course.name}</h3>
        <img src="${course.image}" alt="${course.name}" class="course-image"/>
        <p><strong>${course.title}</strong></p>
        <p>Date: ${course.date}</p>
        <button class="open-modal">Join</button>
      `;

      card.querySelector(".open-modal").addEventListener("click", () => {
        openModal(course.name);
      });

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading courses:", error);
    container.innerHTML = "<p>Error loading courses. Please try again later.</p>";
  }
});

function createModal() {
  const modal = document.createElement("div");
  modal.id = "form-modal";
  modal.style.display = "none";
  modal.innerHTML = `
    <div class="modal-backdrop" onclick="closeModal()"></div>
    <div class="modal-content">
      <button class="modal-close" onclick="closeModal()">&times;</button>
      <h3>Engineering and future Professionals in this area, fill out the form for a personalized experience.</h3>
      <form id="subscription-form" onsubmit="handleSubmit(event)">
        <input type="text" name="fname" placeholder="First Name" required /><br />
        <input type="text" name="lname" placeholder="Last Name" required /><br />
        <label>Role:</label>
        <select name="role">
          <option>Telecommunication Student</option>
          <option>Professional Engineer</option>
          <option>Other</option>
        </select><br />
        <input type="email" name="email" placeholder="Email Address" required /><br />
        <input type="tel" name="phone" placeholder="Phone Number" required /><br />
        <input type="text" name="organization" placeholder="Please type your name of Study University or Job Organization" required /><br />
        <button type="submit" class="subscribe-btn">Join</button>
      </form>
    </div>
  `;
  return modal;
}

function openModal(courseName) {
  document.getElementById("form-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("form-modal").style.display = "none";
}

function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const fname = form.fname.value;
  const lname = form.lname.value;
  const email = form.email.value;
  const phone = form.phone.value;
  const role = form.role.value;
  const org = form.organization.value;

  alert(`Thank you ${fname} ${lname} for subscribing as a ${role}.\nEmail: ${email}\nPhone: ${phone}\nOrganization: ${org}\n\nCongratulations on your decision to join the course!`);

  form.reset();
  closeModal();
}

// Exponer funciones al alcance global
window.handleSubmit = handleSubmit;
window.openModal = openModal;
window.closeModal = closeModal;
