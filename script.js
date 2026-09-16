const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const UNITS = 'metric';

const weatherIcons = {
    '01d': '\u2600\ufe0f',
    '01n': '\uD83C\xDF19',
    '02d': '\u26C5',
    '02n': '\u26C5',
    '03d': '\u2601\ufe0f',
    '03n': '\u2601\ufe0f',
    '04d': '\u2601\ufe0f',
    '04n': '\u2601\ufe0f',
    '09d': '\uD83C\x99A8',
    '09n': '\uD83C\x99A8',
    '10d': '\uD83C\x99C6',
    '10n': '\uD83C\x99C6',
    '13d': '\u2744\xFE0F',
    '13n': '\u2744\xFE0F',
    '50d': '\uD83C\xDFBA',
    '50n': '\uD83C\xDFBA'
};

const getEmojifromIcon = (iconCode) => {
    return weatherIcons[iconCode] || '\u2600\ufe0f';
};

document.addEventListener('DOMContentLoaded', () => {
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const apiKeyInput = document.getElementById('api-key');
    const cityInput = document.getElementById('city');
    const countryInput = document.getElementById('country');

    const errorSection = document.getElementById('error-section');
    const errorMessageEl = document.getElementById('error-message');
    const loadingSection = document.getElementById('loading-section');
    const weatherResult = document.getElementById('weather-result');

    const locationNameEl = weatherResult.querySelector('.location-name');
    const weatherConditionEl = weatherResult.querySelector('.weather-condition');
    const temperatureEl = weatherResult.querySelector('.temperature');
    const weatherIconEl = weatherResult.querySelector('.weather-icon .icon');

    const detailValueEls = weatherResult.querySelectorAll('.detail-value');

    const hideAllSections = () => {
        errorSection.classList.add('hidden');
        loadingSection.classList.add('hidden');
        weatherResult.classList.add('hidden');
    };

    const showError = (message) => {
        hideAllSections();
        errorMessageEl.textContent = message;
        errorSection.classList.remove('hidden');
    };

    const showLoading = () => {
        hideAllSections();
        loadingSection.classList.remove('hidden');
    };

    const round = (num) => Math.round(num);

    const renderWeather = (data) => {
        const { name, sys, main, weather, wind, visibility } = data;

        const country = sys && sys.country ? sys.country : '';
        const locationDisplay = country ? `${name}, ${country}` : name;
        const condition = weather && weather.length > 0 ? weather[0].description : 'Unknown';
        const iconCode = weather && weather.length > 0 ? weather[0].icon : '';

        const temp = main ? main.temp : 0;
        const feelsLike = main ? main.feels_like : 0;
        const humidity = main ? main.humidity : 0;
        const pressure = main ? main.pressure : 0;
        const windSpeed = wind ? wind.speed : 0;
        const visibilityKm = visibility ? (visibility / 1000).toFixed(1) : '0';

        locationNameEl.textContent = locationDisplay;
        weatherConditionEl.textContent = condition;
        temperatureEl.textContent = `${round(temp)}°C`;
        weatherIconEl.textContent = getEmojifromIcon(iconCode);

        const detailValues = [
            `${humidity}%`,
            `${windSpeed.toFixed(1)} m/s`,
            `${pressure} hPa`,
            `${round(feelsLike)}°C`,
            `${visibilityKm} km`
        ];

        detailValueEls.forEach((el, index) => {
            if (index < detailValues.length) {
                el.textContent = detailValues[index];
            }
        });

        hideAllSections();
        weatherResult.classList.remove('hidden');
    };

    const fetchWeather = async (apiKey, city, country) => {
        const query = country ? `${city},${country}` : city;
        const url = `${API_BASE_URL}?q=${encodeURIComponent(query)}&appid=${encodeURIComponent(apiKey)}&units=${UNITS}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

                if (response.status === 401) {
                    throw new Error('Invalid API key. Please check your OpenWeatherMap API key and try again.');
                }

                if (response.status === 404) {
                    throw new Error('Location not found. Please check the city and country and try again.');
                }

                if (response.status === 400) {
                    throw new Error('Invalid request. Please make sure you have entered both a city and an API key.');
                }

                const apiMessage = errorData.message;
                throw new Error(apiMessage || 'An unexpected error occurred. Please try again.');
            }

            const data = await response.json();
            renderWeather(data);
        } catch (error) {
            if (error instanceof TypeError) {
                showError('Network error. Please check your internet connection and try again.');
            } else {
                showError(error.message);
            }
        } finally {
            loadingSection.classList.add('hidden');
        }
    };

    const getWeather = () => {
        const apiKey = apiKeyInput.value.trim();
        const city = cityInput.value.trim();
        const country = countryInput.value.trim();

        if (!apiKey) {
            showError('Please enter your OpenWeatherMap API key.');
            apiKeyInput.focus();
            return;
        }

        if (!city) {
            showError('Please enter a city.');
            cityInput.focus();
            return;
        }

        showLoading();
        fetchWeather(apiKey, city, country);
    };

    getWeatherBtn.addEventListener('click', getWeather);

    apiKeyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') cityInput.focus();
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') countryInput.focus();
    });

    countryInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') getWeather();
    });
});
