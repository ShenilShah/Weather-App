# Weatherly

A clean, minimalist, responsive weather web application built with HTML, CSS, and vanilla JavaScript. It uses the OpenWeatherMap API to retrieve live weather information for any city and country.

## Features

- Enter a city, country, and your OpenWeatherMap API key through the web interface
- Retrieve live weather data via the OpenWeatherMap API
- Display location name, current temperature, weather condition, and extra details (feels like, humidity, pressure, wind speed)
- Clean, modern, minimalist design with a responsive layout
- Useful error messages for missing input, invalid API key, and location not found
- OpenWeatherMap icon images rendered from the official API

## Project Structure

```
Weatherly/
├── index.html      # Main HTML structure
├── styles.css      # Styling and responsive design
├── script.js       # Weather fetching and UI logic
└── README.md       # This file
```

## How to Run

**Important:** This app must be served over **HTTP**, not opened directly as a `file://` URL. Opening `index.html` with a double-click blocks the `fetch()` call to OpenWeatherMap (browser CORS policy), which causes the page to freeze with no output.

Use one of these methods:

1. **Python (recommended):**
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000` in your browser.

2. **Node.js (if installed):**
   ```bash
   npx serve .
   ```
   Then visit the URL it prints.

3. **VS Code:** Install the "Live Server" extension and open `index.html` with it.

After the server is running:
- Get a free API key from [OpenWeatherMap](https://openweathermap.org/api) and enter it in the "OpenWeatherMap API Key" field.
- Enter a city (e.g., London) and country (e.g., GB), then click **Get Weather**.

## API Key

The API key is entered through the web interface and is never stored or hardcoded. It is sent with each request to the OpenWeatherMap API.

## Dependencies

- OpenWeatherMap API (free tier available)
- Google Fonts (Inter) for typography
- No build tools or frameworks required — pure static web app

## License

This project is for educational purposes.