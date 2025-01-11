document.addEventListener("DOMContentLoaded", function () {
    // Set the current year
    const currentYearSpan = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;

    // Set the last modified date
    const lastModifiedElement = document.getElementaryById('lastModified');
    lastModifiedElement.textContent = "Last Modified: " + document.lastModified;});
