// backend/services/weatherService.js
const axios = require("axios");

/**
 * Fetch weather forecast for a destination using OpenWeather API.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} travelDate - ISO date string (e.g. "2025-07-15")
 * @returns {Object} Weather info object
 */
async function getWeather(lat, lon, travelDate) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) throw new Error("OPENWEATHER_API_KEY is not set in .env");

  // Use the 5-day / 3-hour forecast endpoint (free tier)
  const url = `https://api.openweathermap.org/data/2.5/forecast`;

  const response = await axios.get(url, {
    params: {
      lat,
      lon,
      appid: apiKey,
      units: "metric",
    },
  });

  const forecastList = response.data.list;

  // Try to find forecast closest to travel date
  const targetDate = new Date(travelDate).toISOString().split("T")[0];
  const filtered = forecastList.filter((item) =>
    item.dt_txt.startsWith(targetDate)
  );

  // If travel date is beyond 5-day forecast, use the latest available
  const sample = filtered.length > 0 ? filtered[0] : forecastList[0];

  const condition = sample.weather[0].main.toLowerCase(); // e.g. "rain", "clear", "clouds"
  const description = sample.weather[0].description;
  const temp = sample.main.temp;
  const feelsLike = sample.main.feels_like;
  const humidity = sample.main.humidity;
  const windSpeed = sample.wind.speed;

  // Determine weather category for planning
  let category = "good"; // good | rain | heat | storm
  if (condition.includes("storm") || condition.includes("thunder")) {
    category = "storm";
  } else if (condition.includes("rain") || condition.includes("drizzle") || condition.includes("snow")) {
    category = "rain";
  } else if (temp >= 36) {
    category = "heat";
  } else {
    category = "good";
  }

  // Safety status
  let safetyStatus = "safe";
  let safetyMessage = "Weather looks good for travel!";
  if (category === "storm") {
    safetyStatus = "danger";
    safetyMessage = "⚠️ Storm/thunderstorm expected. Consider rescheduling or stay in safe locations.";
  } else if (category === "rain") {
    safetyStatus = "caution";
    safetyMessage = "🌧️ Rain expected. Carry rain gear and prefer covered activities.";
  } else if (category === "heat") {
    safetyStatus = "caution";
    safetyMessage = "☀️ High heat expected. Plan outdoor activities in morning or evening only.";
  }

  return {
    temperature: temp,
    feelsLike,
    humidity,
    windSpeed,
    condition,
    description,
    category,
    safetyStatus,
    safetyMessage,
    icon: sample.weather[0].icon,
  };
}

module.exports = { getWeather };