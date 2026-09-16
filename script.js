/* Weatherly - Script */
document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city');
    const countryInput = document.getElementById('country');
    const apiKeyInput = document.getElementById('apiKey');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const messageEl = document.getElementById('message');
    const weatherResult = document.getElementById('weatherResult');
    const locationName = document.getElementById('locationName');
    const temperature = document.getElementById('temperature');
    const condition = document.getElementById('condition');
    const weatherIcon = document.getElementById('weatherIcon');
    const extraInfo = document.getElementById('extraInfo');

    // OpenWeatherMap icon URL mapping
    const ICON_BASE = 'https://openweathermap.org/img/wn';
    const iconMap = {
        '01d': '01d', '01n': '01n',
        '02d': '02d', '02n': '02n',
        '03d': '03d', '03n': '03n',
        '04d': '04d', '04n': '04n',
        '09d': '09d', '09n': '09n',
        '10d': '10d', '10n': '10n',
        '11d': '11d', '11n': '11n',
        '13d': '13d', '13n': '13n',
        '14d': '14d', '14n': '14n'
    };

    function showMessage(text, type = 'error') {
        messageEl.textContent = text;
        messageEl.className = `message show ${type}`;
    }

    function clearMessage() {
        messageEl.textContent = '';
        messageEl.className = 'message';
    }

    function showWeatherResult() {
        weatherResult.classList.remove('hidden');
    }

    function hideWeatherResult() {
        weatherResult.classList.add('hidden');
    }

    function kelvinToCelsius(k) {
        return Math.round(k - 273.15);
    }

    function buildExtraInfo(data) {
        const items = [
            { label: 'Feels like', value: `${kelvinToCelsius(data.main.feels_like)}°C` },
            { label: 'Humidity', value: `${data.main.humidity}%` },
            { label: 'Pressure', value: `${data.main.pressure} hPa` },
            { label: 'Wind', value: `${data.wind.speed} m/s` }
        ];
        extraInfo.innerHTML = items
            .map(item => `
                <div class="info-item">
                    <div class="info-label">${item.label}</div>
                    <div class="info-value">${item.value}</div>
                </div>
            `)
            .join('');
    }

    async function fetchWeather(city, country, apiKey) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},${encodeURIComponent(country)}&appid=${apiKey}&units=metric`;

        // AbortController so a hung request can't freeze the button forever
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        let response;
        try {
            response = await fetch(url, { signal: controller.signal });
        } catch (err) {
            clearTimeout(timeoutId);
            if (err.name === 'AbortError') {
                throw new Error('Request timed out. Please try again.');
            }
            // Network/CORS failures (e.g. opening via file://) never get a status
            throw new Error('Network error: could not reach the weather service. If you opened this file directly, please serve it over HTTP (see README).');
        }

        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Location not found. Please check the city and country.');
            } else if (response.status === 401) {
                throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
            } else {
                throw new Error(`Request failed (HTTP ${response.status}). Please try again later.`);
            }
        }

        return await response.json();
    }

    function getWeather() {
        const city = cityInput.value.trim();
        const country = countryInput.trim();
        const apiKey = apiKeyInput.value.trim();

        // Validation
        if (!city) {
            showMessage('Please enter a city.', 'error');
            cityInput.focus();
            return;
        }
        if (!country) {
            showMessage('Please enter a country.', 'error');
            countryInput.focus();
            return;
        }
        if (!apiKey) {
            showMessage('Please enter your OpenWeatherMap API key.', 'error');
            apiKeyInput.focus();
            return;
        }

        clearMessage();
        hideWeatherResult();
        getWeatherBtn.disabled = true;
        getWeatherBtn.textContent = 'Loading...';

        fetchWeather(city, country, apiKey)
            .then(data => {
                locationName.textContent = `${data.name}, ${countryInput.value.trim()}`;
                temperature.textContent = `${Math.round(data.main.temp)}°`;
                condition.textContent = data.weather[0].description;
                const iconCode = data.weather[0].icon;
                weatherIcon.src = `${ICON_BASE}/${iconCode}.png`;
                weatherIcon.alt = data.weather[0].description;
                buildExtraInfo(data);
                showWeatherResult();
                clearMessage();
            })
            .catch(err => {
                hideWeatherResult();
                showMessage(err.message, 'error');
            })
            .finally(() => {
                getWeatherBtn.disabled = false;
                getWeatherBtn.textContent = 'Get Weather';
            });
    }

    getWeatherBtn.addEventListener('click', getWeather);

    // Allow Enter key to submit
    [cityInput, countryInput, apiKeyInput].forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                getWeather();
            }
        });
    });
});