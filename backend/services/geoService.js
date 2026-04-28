// backend/services/geoService.js
const axios = require("axios");

/**
 * Convert a city name to latitude and longitude using Nominatim (free, no key needed).
 * @param {string} cityName - The destination city name
 * @returns {Object} { lat, lon, displayName }
 */
async function geocodeCity(cityName) {
  const url = `https://nominatim.openstreetmap.org/search`;

  const response = await axios.get(url, {
    params: {
      q: cityName,
      format: "json",
      limit: 1,
    },
    headers: {
      // Nominatim requires a User-Agent header
      "User-Agent": "SkySafe-TripPlanner/1.0 (contact@skysafe.app)",
    },
  });

  if (!response.data || response.data.length === 0) {
    throw new Error(`City not found: "${cityName}". Please check the spelling.`);
  }

  const place = response.data[0];
  return {
    lat: parseFloat(place.lat),
    lon: parseFloat(place.lon),
    displayName: place.display_name,
  };
}

module.exports = { geocodeCity };