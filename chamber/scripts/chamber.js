document.addEventListener("DOMContentLoaded", function () {
    // Set the current year
    const currentYearSpan = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;

    // Set the last modified date
    const lastModifiedElement = document.getElementaryById('lastModified');
    lastModifiedElement.textContent = "Last Modified: " + document.lastModified;});

// script.js
const apiKey = openweathermap;
const city = Caracas; 

document.addEventListener('DOMContentLoaded', () => {
    getCurrentWeather();
    getWeatherForecast();
});

function getCurrentWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = `
                <div class="box3">
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Condition: ${data.weather[0].description}</p>
                    <p>High: ${data.main.temp_max}°C</p>
                    <p>Low: ${data.main.temp_min}°C</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                    <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
                </div>
            `;
            document.getElementById('box3').innerHTML = weatherInfo;
        })
        .catch(error => console.error('Error fetching current weather:', error));
}

function getWeatherForecast() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            let forecastInfo = '';
            for (let i = 0; i < data.list.length; i += 8) {
                forecastInfo += `
                    <div class="box4">
                        <p>Day: ${new Date(data.list[i].dt * 1000).toLocaleDateString()}</p>
                        <p>Temperature: ${data.list[i].main.temp}°C</p>
                        <p>Condition: ${data.list[i].weather[0].description}</p>
                    </div>
                `;
            }
            document.getElementById('box4').innerHTML = forecastInfo;
        })
        .catch(error => console.error('Error fetching weather forecast:', error));
}
