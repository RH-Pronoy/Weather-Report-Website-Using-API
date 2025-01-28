const apiKey = 'b4ebd83d8947450ea81122052252801';
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function getWeatherData(city) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`);
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        alert('City not found! Please try again.');
    }
}

function updateWeatherUI(data) {
    document.getElementById('city').textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById('date-time').textContent = data.location.localtime;
    document.getElementById('temperature').textContent = `${data.current.temp_c}°C`;
    document.getElementById('condition').textContent = data.current.condition.text;
    document.getElementById('weather-icon').src = 'https:' + data.current.condition.icon;
    document.getElementById('wind').textContent = `${data.current.wind_kph} km/h`;
    document.getElementById('humidity').textContent = `${data.current.humidity}%`;
    document.getElementById('feels-like').textContent = `${data.current.feelslike_c}°C`;
}

searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

// Load default city (London) when page loads
window.addEventListener('load', () => {
    getWeatherData('London');
}); 