const WEATHER_API_KEY = '07f59f9a5642c55b4a4cbb235b155409';
const CITY = 'Caracas';
const LATITUDE = 10.4806;
const LONGITUDE = -66.9036;
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${WEATHER_API_KEY}&units=metric&lang=es`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${WEATHER_API_KEY}&units=metric&lang=es`;
async function getWeatherData() {
    try {
        const [weatherResponse, forecastResponse] = await Promise.all([fetch(WEATHER_URL), fetch(FORECAST_URL)]);
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
function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');
    if (!currentWeatherDiv) {
        console.warn('Element with ID "current-weather" not found.');
        return;
    }
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    currentWeatherDiv.innerHTML = `<p>Temperature: ${temp.toFixed(1)}°C</p><p>Condition: <img src="${iconUrl}" alt="${description}" style="vertical-align: middle;"> ${description}</p>`;
}
function displayWeatherForecast(data) {
    const weatherForecastDiv = document.getElementById('weather-forecast');
    if (!weatherForecastDiv) {
        console.warn('Element with ID "weather-forecast" not found.');
        return;
    }
    const forecastList = data.list;
    const dailyForecasts = {};
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        const hour = date.getHours();
        if (!dailyForecasts[day] || (hour >= 11 && hour <= 14 && !dailyForecasts[day].hasMidday)) {
            dailyForecasts[day] = {
                temp: item.main.temp,
                description: item.weather[0].description,
                icon: item.weather[0].icon,
                hasMidday: hour >= 11 && hour <= 14
            };
        }
    });
    let forecastHTML = '';
    const daysToShow = Object.keys(dailyForecasts).slice(1, 4);
    if (daysToShow.length === 0) {
        forecastHTML = '<p>Could not retrieve 3-day forecast.</p>';
    } else {
        daysToShow.forEach(day => {
            const forecast = dailyForecasts[day];
            const iconUrl = `http://openweathermap.org/img/wn/${forecast.icon}@2x.png`;
            forecastHTML += `<p><strong>${day}</strong>: ${forecast.temp.toFixed(1)}°C <img src="${iconUrl}" alt="${forecast.description}" style="vertical-align: middle; width: 30px; height: 30px;"></p>`;
        });
    }
    weatherForecastDiv.innerHTML = forecastHTML;
}
document.addEventListener('DOMContentLoaded', getWeatherData);
const MEMBERS_DATA_URL = 'data/members.json';
const SPOTLIGHT_COUNT = 3;
async function loadSpotlights() {
    try {
        const response = await fetch(MEMBERS_DATA_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const members = await response.json();
        displaySpotlights(members);
    } catch (error) {
        console.error('Error loading members data for spotlights:', error);
        document.getElementById('spotlight-container').innerHTML = '<p class="error">Failed to load member spotlights.</p>';
    }
}
function displaySpotlights(members) {
    const spotlightContainer = document.getElementById('spotlight-container');
    if (!spotlightContainer) {
        console.warn('Element with ID "spotlight-container" not found.');
        return;
    }
    const eligibleMembers = members.filter(member => member.membershipLevel === 3 || member.membershipLevel === 2);
    const selectedSpotlights = [];
    if (eligibleMembers.length > 0) {
        const shuffledMembers = [...eligibleMembers];
        for (let i = shuffledMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledMembers[i], shuffledMembers[j]] = [shuffledMembers[j], shuffledMembers[i]];
        }
        for (let i = 0; i < Math.min(SPOTLIGHT_COUNT, shuffledMembers.length); i++) {
            selectedSpotlights.push(shuffledMembers[i]);
        }
    }
    spotlightContainer.innerHTML = '';
    if (selectedSpotlights.length === 0) {
        spotlightContainer.innerHTML = '<p>No eligible members found for spotlights. Check member data and levels.</p>';
        return;
    }
    selectedSpotlights.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');
        let membershipText = '';
        if (member.membershipLevel === 3) {
            membershipText = 'Gold Member';
        } else if (member.membershipLevel === 2) {
            membershipText = 'Silver Member';
        }
        memberCard.innerHTML = `<h3>${member.name}</h3><img src="images/${member.image}" alt="${member.name} Logo"><p>${member.address}</p><p>Phone: ${member.phone}</p><p><a href="${member.website}" target="_blank">${member.website.replace(/(^\w+:|^)\/\//, '')}</a></p><p>Membership Level: <strong>${membershipText}</strong></p><p>${member.description}</p>`;
        spotlightContainer.appendChild(memberCard);
    });
}
document.addEventListener('DOMContentLoaded', loadSpotlights);