# Weatherly

A clean, modern, and responsive weather web application that fetches live weather data from the OpenWeatherMap API.

## Features

- **Live Weather Data** - Fetch real-time weather for any city worldwide
- **API Key Management** - Enter your OpenWeatherMap API key securely through the web interface (never hard-coded)
- **Detailed Display**
  - Location name with country
  - Current temperature (in Celsius)
  - Weather condition description
  - Animated weather emoji icons
  - Humidity, wind speed, pressure, feels-like temperature, and visibility
- **Responsive Design** - Fully responsive layout that works on mobile, tablet, and desktop
- **Error Handling**
  - Invalid or missing API key
  - City or country not found
  - Network connectivity issues
  - General request failures

## Project Structure

```
Weather App/
├── index.html          # Application markup
├── style.css           # Styling and responsive design
├── script.js           # Application logic and API integration
└── README.md           # This file
```

## Getting Started

### Prerequisites

You need an **OpenWeatherMap API key** to use the application. The key is entered at runtime through the web interface — no server-side code is required.

### Obtain an API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/) and create a free account.
2. Navigate to the [API keys](https://home.openweathermap.org/api_keys) page.
3. Copy your API key. Free-tier keys are sufficient for this application.

### Running the Application

No build step or server is required. Simply open the app in your browser:

**Method 1 - Double-click:**
- Open `index.html` directly in your browser.

**Method 2 - Local server (recommended):**
- Start a simple HTTP server in the project directory and open `http://localhost:8000`:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .
```

### Usage

1. Enter your **OpenWeatherMap API key** in the first input field.
2. Enter a **City** (e.g., `London`).
3. Enter a **Country code** (e.g., `UK` — optional 2-letter code).
4. Click **Get Weather** to fetch and display the current weather.

You can also press `Enter` to move between fields or submit the form.

## API Reference

This application uses the [OpenWeatherMap Current Weather API](https://openweathermap.org/current):

```
GET https://api.openweathermap.org/data/2.5/weather
```

| Parameter | Description                              | Example        |
| --------- | ---------------------------------------- | -------------- |
| `q`       | City name and optional country code      | `London,UK`    |
| `appid`   | Your OpenWeatherMap API key              | *(your key)*   |
| `units`   | Unit system (`metric` for Celsius)       | `metric`       |

## Technologies Used

- **HTML** - Structure and semantic markup
- **CSS** - Styling with CSS variables, Flexbox, and Grid
- **JavaScript (ES6+)** - DOM manipulation and `fetch` API for HTTP requests

## Design

Weatherly follows a **clean, modern, minimalist** design principle:

- Soft color palette with a light background
- Card-based layout with subtle shadows
- Responsive typography and spacing
- Smooth transitions and hover effects
- Mobile-first responsive design

## License

This project is provided as-is for educational purposes.
