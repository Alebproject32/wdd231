
const WEATHER_API_KEY = '07f59f9a5642c55b4a4cbb235b155409';
const CITY = 'Caracas'; // City for weather data
const LATITUDE = 10.4806; // Latitude for Caracas
const LONGITUDE = -66.9036; // Longitude for Caracas


const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${WEATHER_API_KEY}&units=metric&lang=es`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${WEATHER_API_KEY}&units=metric&lang=es`;

/**
 * Fetches current weather and 3-day forecast data from OpenWeatherMap API.
 */
async function getWeatherData() {
    try {
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(WEATHER_URL),
            fetch(FORECAST_URL)
        ]);

        if (!weatherResponse.ok) throw new Error(`HTTP error! status: ${weatherResponse.status} for current weather.`);
        if (!forecastResponse.ok) throw new Error(`HTTP error! status: ${forecastResponse.status} for forecast.`);

        
        const currentWeatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        
        displayCurrentWeather(currentWeatherData);
        displayWeatherForecast(forecastData);

    } catch (error) {
        
        console.error('Error fetching weather data:', error);
        document.getElementById('current-weather').innerHTML = '<p class="error">Failed to load current weather. Please check your API key and internet connection.</p>';
        document.getElementById('weather-forecast').innerHTML = '<p class="error">Failed to load weather forecast.</p>';
    }
}

/**
 * Displays the current temperature and weather description on the page.
 * @param {object} data - The current weather data object from OpenWeatherMap.*/
function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');
    // Ensure the target element exists
    if (!currentWeatherDiv) {
        console.warn('Element with ID "current-weather" not found.');
        return;
    }

    const temp = data.main.temp;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    // URL for the weather icon
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Populate the HTML element with weather information
    currentWeatherDiv.innerHTML = `
        <p>Temperature: ${temp.toFixed(1)}°C</p>
        <p>Condition: <img src="${iconUrl}" alt="${description}" style="vertical-align: middle;"> ${description}</p>
    `;
}

/**
 * Displays a 3-day temperature forecast on the page.
 * @param {object} data - The forecast data object from OpenWeatherMap.*/
function displayWeatherForecast(data) {
    const weatherForecastDiv = document.getElementById('weather-forecast');
    
    if (!weatherForecastDiv) {
        console.warn('Element with ID "weather-forecast" not found.');
        return;
    }

    const forecastList = data.list;
    const dailyForecasts = {}; // Object to store one forecast entry per day

    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000); 
        // Format date for display (e.g., "Mon, May 27")
        const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const hour = date.getHours();

        // OpenWeatherMap provides data every 3 hours. We aim to pick a representative point (e.g., around noon).
        // If a forecast for a day doesn't exist yet, or if we find a better (midday) forecast for that day, update it.
        if (!dailyForecasts[day] || (hour >= 11 && hour <= 14 && !dailyForecasts[day].hasMidday)) {
            dailyForecasts[day] = {
                temp: item.main.temp,
                description: item.weather[0].description,
                icon: item.weather[0].icon,
                hasMidday: hour >= 11 && hour <= 14 // Flag to indicate if we've captured a midday forecast
            };
        }
    });

    let forecastHTML = '';
    // Get the next 3 days of forecast, excluding the current day if it's the first entry
    const daysToShow = Object.keys(dailyForecasts).slice(1, 4);

    if (daysToShow.length === 0) {
        forecastHTML = '<p>Could not retrieve 3-day forecast.</p>';
    } else {
        daysToShow.forEach(day => {
            const forecast = dailyForecasts[day];
            const iconUrl = `http://openweathermap.org/img/wn/${forecast.icon}@2x.png`;
            forecastHTML += `
                <p><strong>${day}</strong>: ${forecast.temp.toFixed(1)}°C <img src="${iconUrl}" alt="${forecast.description}" style="vertical-align: middle; width: 30px; height: 30px;"></p>
            `;
        });
    }

    weatherForecastDiv.innerHTML = forecastHTML;
}

// Call the function to fetch weather data when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', getWeatherData);

// Path to your JSON data source for chamber members
const MEMBERS_DATA_URL = 'data/members.json';
// Number of members to display in the spotlight section (2 or 3)
const SPOTLIGHT_COUNT = 3;

async function loadSpotlights() {
    try {
        const response = await fetch(MEMBERS_DATA_URL);
        // Check if the response is OK
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const members = await response.json(); // Parse JSON data

        displaySpotlights(members); // Call function to display spotlights

    } catch (error) {
        console.error('Error loading members data for spotlights:', error);
        document.getElementById('spotlight-container').innerHTML = '<p class="error">Failed to load member spotlights.</p>';
    }
}

/**
 * Filters, randomly selects, and displays "gold" or "silver" members as spotlights.
 * @param {Array<Object>} members - An array of member objects from the JSON data.
 */
function displaySpotlights(members) {
    const spotlightContainer = document.getElementById('spotlight-container');
    // Ensure the target element exists
    if (!spotlightContainer) {
        console.warn('Element with ID "spotlight-container" not found.');
        return;
    }

    // 2.2 Filter members to include only Gold (level 3) or Silver (level 2)
    const eligibleMembers = members.filter(member => member.membershipLevel === 3 || member.membershipLevel === 2);

    // 2.3 Randomly select 'SPOTLIGHT_COUNT' members
    const selectedSpotlights = [];
    if (eligibleMembers.length > 0) {
       
        const shuffledMembers = [...eligibleMembers]; // Create a shallow copy
        for (let i = shuffledMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledMembers[i], shuffledMembers[j]] = [shuffledMembers[j], shuffledMembers[i]];
        }

        // Take the first 'SPOTLIGHT_COUNT' members from the shuffled array
        for (let i = 0; i < Math.min(SPOTLIGHT_COUNT, shuffledMembers.length); i++) {
            selectedSpotlights.push(shuffledMembers[i]);
        }
    }

    // Clear any existing content in the spotlight container
    spotlightContainer.innerHTML = '';

    if (selectedSpotlights.length === 0) {
        spotlightContainer.innerHTML = '<p>No eligible members found for spotlights. Check member data and levels.</p>';
        return;
    }

    // 2.4 Display selected member information
    selectedSpotlights.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');

        let membershipText = '';
        if (member.membershipLevel === 3) {
            membershipText = 'Gold Member';
        } else if (member.membershipLevel === 2) {
            membershipText = 'Silver Member';
        }

        // Populate the card with member details
        memberCard.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name} Logo">
            <p>${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">${member.website.replace(/(^\w+:|^)\/\//, '')}</a></p>
            <p>Membership Level: <strong>${membershipText}</strong></p>
            <p>${member.description}</p>
        `;
        spotlightContainer.appendChild(memberCard);
    });
}

// Call the function to load spotlights when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadSpotlights);