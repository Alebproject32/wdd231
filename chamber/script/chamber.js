document.addEventListener("DOMContentLoaded", function () {
    // Set the current year
    const currentYearSpan = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;

    // Set the last modified date
    const lastModifiedElement = document.getElementaryById('lastModified');
    lastModifiedElement.textContent = "Last Modified: " + document.lastModified;});

// Function to fetch member data from JSON
async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Check for HTTP errors
        }
        const members = await response.json();
        return members;
    } catch (error) {
        console.error("Error fetching members:", error);
        return []; // Return an empty array in case of error
    }
}

// Function to display members in either grid or list view
function displayMembers(members, isGrid) {
    const memberGrid = document.getElementById('member-grid');
    const memberList = document.getElementById('member-list');

    memberGrid.innerHTML = ''; // Clear existing content
    memberList.innerHTML = '';

    if (isGrid) {
        memberGrid.style.display = 'grid';
        memberList.style.display = 'none';

        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('member-card'); // Add a class for styling
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} Logo" onerror="this.src='placeholder.png'"> </img> </img>  </img> <div class="card-content">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>Phone: ${member.phone}</p>
                <a href="${member.website}" target="_blank">Website</a>
                <p>Membership: ${member.membershipLevel}</p>
                ${member.otherInfo ? `<p>${member.otherInfo}</p>` : ''} </div>
            `;
            memberGrid.appendChild(card);
        });
    } else {
        memberGrid.style.display = 'none';
        memberList.style.display = 'block';

        members.forEach(member => {
            const listItem = document.createElement('div');
            listItem.classList.add('member-list-item'); // Add a class for styling
            listItem.innerHTML = `
                <h3>${member.name}</h3>
                <p>${member.address} | ${member.phone} | <a href="${member.website}" target="_blank">Website</a> | Membership: ${member.membershipLevel}  ${member.otherInfo ? `| ${member.otherInfo}` : ''}</p>
            `;
            memberList.appendChild(listItem);
        });
    }
}


// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', async () => {
    const members = await getMembers();
    let isGrid = true; // Initial view is grid

    displayMembers(members, isGrid); // Display initial view

    const toggleButton = document.getElementById('view-toggle');
    toggleButton.addEventListener('click', () => {
        isGrid = !isGrid;
        displayMembers(members, isGrid);
        toggleButton.textContent = isGrid ? "List View" : "Grid View"; // Toggle button text
    });
});

// script.js
const apiKey = '9ed3ce4ec093c6de16cf9259eddc4866';
const city = 'Caracas'; 

document.addEventListener('DOMContentLoaded', () => {
    getCurrentWeather();
    getWeatherForecast();
});

async function getCurrentWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        const weatherInfo = `
            <div id="weather-info">
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Condition: ${data.weather[0].description}</p>
                <p>High: ${data.main.temp_max}°C</p>
                <p>Low: ${data.main.temp_min}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
        `;
        document.getElementById('weather-info').innerHTML = weatherInfo;
    } catch (error) {
        console.error('Error fetching current weather:', error);
    }
}

async function getWeatherForecast() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        let forecastInfo = '';
        for (let i = 0; i < data.list.length; i += 8) {
            if (i <= 16) {
            forecastInfo += `
                <div id="forecast-info">
                    <p>Day: ${new Date(data.list[i].dt * 1000).toLocaleDateString()}</p>
                    <p>Temperature: ${data.list[i].main.temp}°C</p>
                </div>
            `;
            }
        }
        document.getElementById('forecast-info').innerHTML = forecastInfo;
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
    }
}
