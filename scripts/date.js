document.addEventListener('DOMContentLoaded', function() {
  const currentYearSpan = document.getElementById('currentyear');
  const currentYear = new Date().getFullYear();
  const copyrightLink = document.createElement('a');
  copyrightLink.href = 'index.html';
  copyrightLink.textContent = currentYear;
  if (currentYearSpan) {
    currentYearSpan.innerHTML = '';
    currentYearSpan.appendChild(copyrightLink);
  }

  const lastModifiedParagraph = document.getElementById('lastModified');

  function updateLastModified() {
    const now = new Date();
    const lastModifiedText = `Last Update: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    if (lastModifiedParagraph) {
      lastModifiedParagraph.textContent = lastModifiedText;
    }
  }

  // Update the "Last Update" text immediately when the page loads
  updateLastModified();

  // Update the "Last Update" text every second (or any interval you prefer)
  setInterval(updateLastModified, 1000);

  function updateDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
      datetimeElement.textContent = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
  }

  if (document.getElementById('datetime')) {
    updateDateTime();
    setInterval(updateDateTime, 1000);
  }
});