document.addEventListener('DOMContentLoaded', async () => {
    // Year and Date 
    const currentYearSpan = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;

    const lastModifiedElement = document.getElementById('lastModified');
    lastModifiedElement.textContent = "Last Modified: " + document.lastModified;

    // Members Directory 
    const members = await getMembers();
    let isGrid = true;

    displayMembers(members, isGrid);

    const toggleButton = document.getElementById('view-toggle');
    toggleButton.addEventListener('click', () => {
        isGrid = !isGrid;
        displayMembers(members, isGrid);
        toggleButton.textContent = isGrid ? "List View" : "Grid View";
    });

    // Climate 
    getCurrentWeather();
    getWeatherForecast();

    // Spotlight Members 
    const spotlightMembers = getSpotlightMembers(members);
    displaySpotlightMembers(spotlightMembers);


    console.log("Members data:", members);
    console.log("Spotlight members:", spotlightMembers);
});

async function getMembers() {
    try {
        const response = await fetch("members.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();
        return members;
    } catch (error) {
        console.error("Error fetching members:", error);
        document.getElementById('spotlight-container').innerHTML = "<p>Error loading member data. Please try again later.</p>"; // Target spotlight container
        return [];
    }
}

function displayMembers(members, isGrid) {
    const memberGrid = document.getElementById('member-grid');
    const memberList = document.getElementById('member-list');

    memberGrid.innerHTML = '';
    memberList.innerHTML = '';

    if (isGrid) {
        memberGrid.style.display = 'grid';
        memberList.style.display = 'none';

        const fragment = document.createDocumentFragment();

        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('member-card');
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} Logo" onerror="this.src='placeholder.png'" width="200" height="150">
                <div class="card-content">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>Phone: ${member.phone}</p>
                    <a href="${member.website}" target="_blank">Website</a>
                    <p>Membership: ${member.membershipLevel}</p>
                    ${member.otherInfo ? `<p>${member.otherInfo}</p>` : ''}
                </div>
            `;
            fragment.appendChild(card);
        });

        memberGrid.appendChild(fragment);
    } else {
        memberGrid.style.display = 'none';
        memberList.style.display = 'block';

        const fragment = document.createDocumentFragment();

        members.forEach(member => {
            const listItem = document.createElement('div');
            listItem.classList.add('member-list-item');
            listItem.innerHTML = `
                <img src="${member.image}" alt="${member.name} Logo" onerror="this.src='placeholder.png'" width="200" height="150">
                <h3>${member.name}</h3>
                <p>${member.address} | ${member.phone} | <a href="${member.website}" target="_blank">Website</a> | Membership: ${member.membershipLevel} ${member.otherInfo ? `| ${member.otherInfo}` : ''}</p>
            `;
            fragment.appendChild(listItem);
        });

        memberList.appendChild(fragment);
    }
}

const apiKey = '9ed3ce4ec093c6de16cf9259eddc4866';
const city = 'Caracas';

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
                    <div class="forecast-day">
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

function getSpotlightMembers(members) {
    
    const eligibleMembers = members.filter(member =>
        member.membershipLevel === 3 || member.membershipLevel === 2
    );

    const shuffledMembers = eligibleMembers.sort(() => Math.random() - 0.5);
    const numSpotlights = Math.floor(Math.random() * 2) + 2; 
    return shuffledMembers.slice(0, numSpotlights);
}

function displaySpotlightMembers(spotlightMembers) {
    const spotlightContainer = document.getElementById('spotlight-container');

    if (spotlightMembers.length === 0) {
        spotlightContainer.innerHTML = "<p>No spotlight members available.</p>";
        return;
    }

    let spotlightHTML = "";
    spotlightMembers.forEach(member => {
        spotlightHTML += `
            <div class="spotlight-card">
                <h3>${member.name}</h3>
                <img src="${member.image}" alt="${member.name} Logo" onerror="this.src='placeholder.png'" width="200" height="150">
                <p>${member.address}</p>
                <p>Phone: ${member.phone}</p>
                <a href="${member.website}" target="_blank">Website</a>
                <p>Membership: ${member.membershipLevel}</p>
                ${member.otherInfo ? `<p>${member.otherInfo}</p>` : ''} </div>
        `;
    });

    spotlightContainer.innerHTML = spotlightHTML;
    console.log("Spotlight container HTML:", document.getElementById('spotlight-container').innerHTML);
}