document.addEventListener("DOMContentLoaded", function () {
    // Set the current year
    const currentYearSpan = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;

    // Set the last modified date
    const lastModifiedElement = document.getElementaryById('lastModified');
    lastModifiedElement.textContent = "Last Modified: " + document.lastModified;});

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
