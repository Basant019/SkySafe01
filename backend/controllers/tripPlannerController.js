const geoService = require('../services/geoService');
const weatherService = require('../services/weatherService');
const placeService = require('../services/placeService');

// Interest to OpenTripMap kinds mapping
const interestMapping = {
  mountains: 'natural.mountain_peaks,natural.volcanoes',
  beaches: 'beaches',
  spiritual: 'religion',
  food: 'foods,cafes,restaurants',
  adventure: 'diving,climbing,kitesurfing,surfing,tubing',
  nature: 'natural,national_parks,water_parks,gardens_and_parks',
  historical: 'historic,historic_architecture,fortified,castles',
  family: 'amusement_parks,zoos,aquariums,water_parks'
};

function getPackingSuggestions(weather) {
  const suggestions = ['Clothes for ' + weather.days + ' days'];
  if (weather.hasRain) suggestions.push('Umbrella/Raincoat', 'Waterproof bag');
  if (weather.hasHeat) suggestions.push('Sunscreen', 'Sunglasses', 'Hat', 'Light cotton clothes');
  if (weather.hasCold) suggestions.push('Warm jacket', 'Thermal wear', 'Gloves');
  if (weather.hasStorm) suggestions.push('Emergency flashlight', 'Power bank', 'First aid kit');
  suggestions.push('Comfortable walking shoes', 'ID/Travel documents', 'Medications');
  return suggestions;
}

function getSafetySuggestions(weather, destination) {
  const tips = [`Check local guidelines for ${destination}`];
  if (weather.hasStorm) {
    tips.push('⚠️ Storm warning: Stay indoors, avoid open areas and water bodies');
    tips.push('Keep emergency contacts handy');
  }
  if (weather.hasHeat) {
    tips.push('Stay hydrated, avoid midday sun exposure (11 AM - 3 PM)');
    tips.push('Carry ORS/electrolyte drinks');
  }
  if (weather.hasRain) {
    tips.push('Watch for slippery roads and waterlogged areas');
    tips.push('Avoid trekking during heavy rain');
  }
  tips.push('Share your itinerary with family/friends');
  tips.push('Keep digital copies of important documents');
  return tips;
}

function estimateBudget(days, people, level) {
  const perDayPerPerson = { low: 1500, medium: 3500, high: 8000 };
  const daily = perDayPerPerson[level] || perDayPerPerson.medium;
  const total = daily * days * people;
  return {
    level: level,
    perPersonPerDay: daily,
    totalEstimated: total,
    breakdown: {
      accommodation: Math.round(total * 0.35),
      food: Math.round(total * 0.25),
      transport: Math.round(total * 0.20),
      activities: Math.round(total * 0.15),
      miscellaneous: Math.round(total * 0.05)
    }
  };
}

function generateItinerary(places, days, weather) {
  const itinerary = [];
  const indoorKinds = ['museums,other_buildings_and_structures,theatres_and_entertainments,shops'];
  let sortedPlaces = [...places];
  
  if (weather.hasRain || weather.hasStorm) {
    sortedPlaces.sort((a, b) => {
      const aIndoor = indoorKinds.some(k => a.kinds?.includes(k)) ? 1 : 0;
      const bIndoor = indoorKinds.some(k => b.kinds?.includes(k)) ? 1 : 0;
      return bIndoor - aIndoor;
    });
  }
  
  const placesPerDay = Math.max(3, Math.ceil(sortedPlaces.length / days));
  
  for (let day = 1; day <= days; day++) {
    const startIdx = (day - 1) * placesPerDay;
    const dayPlaces = sortedPlaces.slice(startIdx, startIdx + placesPerDay);
    
    const dayPlan = {
      day: day,
      theme: getDayTheme(day, weather),
      places: dayPlaces.map(p => ({
        name: p.name,
        type: p.kinds?.split(',')[0] || 'place',
        coordinates: [p.point?.lat, p.point?.lon],
        description: p.description || `Visit ${p.name}`,
        isIndoor: indoorKinds.some(k => p.kinds?.includes(k))
      }))
    };
    
    if (weather.hasHeat && !weather.hasRain) {
      dayPlan.timingTip = 'Schedule outdoor visits before 11 AM or after 4 PM to avoid heat';
    } else if (weather.hasRain) {
      dayPlan.timingTip = 'Carry rain gear; prioritize covered attractions';
    } else if (weather.hasStorm) {
      dayPlan.timingTip = '⚠️ Stay alert for weather updates; have backup indoor plans';
    } else {
      dayPlan.timingTip = 'Great weather for outdoor exploration all day';
    }
    
    itinerary.push(dayPlan);
  }
  
  return itinerary;
}

function getDayTheme(day, weather) {
  const themes = ['Arrival & Local Exploration', 'Cultural Deep Dive', 'Nature & Adventure', 'Relaxation & Leisure', 'Historical Journey', 'Food & Local Life', 'Hidden Gems'];
  if (weather.hasStorm) return 'Weather-Adaptive Indoor Exploration';
  return themes[(day - 1) % themes.length];
}

const planTrip = async (req, res) => {
  try {
    const { currentLocation, destination, travelDate, days, people, budget, interests } = req.body;

    if (!destination || !days || !people || !interests || interests.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: destination, days, people, interests' 
      });
    }

    const coords = await geoService.getCoordinates(destination);
    if (!coords) {
      return res.status(404).json({
        success: false,
        error: `Could not find coordinates for "${destination}". Please check the spelling.`
      });
    }

    const weather = await weatherService.getWeather(coords.lat, coords.lon, days);
    const kinds = interests.map(i => interestMapping[i]).filter(Boolean).join(',');
    const places = await placeService.getPlaces(coords.lat, coords.lon, kinds);

    if (!places || places.length === 0) {
      return res.status(404).json({
        success: false,
        error: `No tourist places found near ${destination} for your interests.`
      });
    }

    const itinerary = generateItinerary(places, parseInt(days), weather);
    const budgetEstimate = estimateBudget(parseInt(days), parseInt(people), budget || 'medium');
    const packing = getPackingSuggestions(weather);
    const safety = getSafetySuggestions(weather, destination);

    let safetyStatus = 'safe';
    let safetyMessage = 'Conditions look good for your trip!';
    
    if (weather.hasStorm) {
      safetyStatus = 'danger';
      safetyMessage = 'Severe weather alert! Consider postponing or staying indoors.';
    } else if (weather.hasRain) {
      safetyStatus = 'caution';
      safetyMessage = 'Rain expected. Plan for indoor alternatives.';
    } else if (weather.hasHeat) {
      safetyStatus = 'caution';
      safetyMessage = 'High temperatures expected. Stay hydrated and plan accordingly.';
    }

    res.json({
      success: true,
      destination: {
        name: destination,
        coordinates: [coords.lat, coords.lon],
        currentLocation: currentLocation || 'Not specified'
      },
      travelDate: travelDate || new Date().toISOString().split('T')[0],
      weather: {
        summary: weather.summary,
        temperature: weather.temperature,
        condition: weather.condition,
        humidity: weather.humidity,
        windSpeed: weather.windSpeed,
        dailyForecast: weather.dailyForecast
      },
      safetyStatus: safetyStatus,
      safetyMessage: safetyMessage,
      itinerary: itinerary,
      budget: budgetEstimate,
      packingSuggestions: packing,
      safetySuggestions: safety,
      mapData: {
        center: [coords.lat, coords.lon],
        markers: places.slice(0, 20).map(p => ({
          name: p.name,
          coordinates: [p.point?.lat, p.point?.lon],
          type: p.kinds?.split(',')[0] || 'place'
        }))
      }
    });

  } catch (error) {
    console.error('Trip planning error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to plan trip. Please try again later.',
      details: error.message
    });
  }
};

module.exports = { planTrip };