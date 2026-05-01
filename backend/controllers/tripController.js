// backend/controllers/tripController.js
const { pool } = require("../config/db");
const { geocodeCity } = require("../services/geoService");
const { getWeather } = require("../services/weatherService");
const { getNearbyPlaces, getAmenities } = require("../services/placeService");

// Day theme rotation for variety
const DAY_THEMES = [
  "Arrival & Local Exploration",
  "Cultural Deep Dive",
  "Nature & Adventure",
  "Relaxation & Leisure",
  "Historical Journey",
  "Food & Local Life",
  "Hidden Gems & Offbeat Trails",
  "Panoramic Views & Sunset Spots",
  "Art & Architecture",
  "Shopping & Souvenirs",
];

/**
 * Generate day-wise itinerary from available places.
 * Cycles through places so ALL days are filled even if places < numDays * 3.
 */
function buildItinerary(places, numDays, weatherCategory) {
  const itinerary = [];

  // Ensure we always have enough places by cycling
  // We need up to 3 places per day
  const totalNeeded = numDays * 3;
  const extendedPlaces = [];
  if (places.length > 0) {
    for (let i = 0; i < totalNeeded; i++) {
      extendedPlaces.push(places[i % places.length]);
    }
  }

  for (let day = 1; day <= numDays; day++) {
    // Pick 3 places for this day from the extended list (with cycling)
    const startIdx = (day - 1) * 3;
    const dayPlaces = extendedPlaces.slice(startIdx, startIdx + 3);

    // Weather-based notes
    let morningNote, afternoonNote, eveningNote;

    if (weatherCategory === "heat") {
      morningNote = "Visit outdoor places early (6–10 AM) before heat peaks.";
      afternoonNote = "Stay indoors or find shaded/air-conditioned spots.";
      eveningNote = "Resume outdoor activities after 5 PM.";
    } else if (weatherCategory === "rain") {
      morningNote = "Check rain forecast before heading out.";
      afternoonNote = "Prefer covered/indoor attractions.";
      eveningNote = "Enjoy local indoor dining experiences.";
    } else if (weatherCategory === "storm") {
      morningNote = "Stay in safe shelter. Monitor alerts.";
      afternoonNote = "Visit only indoor, storm-safe venues.";
      eveningNote = "Rest at accommodation. Do not go out if warning continues.";
    } else {
      morningNote = "Start your day fresh with an early breakfast!";
      afternoonNote = "Explore and enjoy the local sights.";
      eveningNote = "Wind down and relax after a great day.";
    }

    // Day-specific theme (rotates for variety)
    const theme = DAY_THEMES[(day - 1) % DAY_THEMES.length];

    // Build timeline
    const timeline = [];

    // Day 1 gets a special hotel check-in note
    if (day === 1) {
      timeline.push({ time: "08:00 AM", type: "break", title: "Hotel Check-In & Freshen Up", note: "Settle in and prepare for your adventure." });
    } else {
      timeline.push({ time: "07:30 AM", type: "break", title: "Breakfast at Hotel", note: "Fuel up for the day ahead!" });
    }

    if (dayPlaces[0]) {
      timeline.push({ time: "09:30 AM", type: "activity", title: "Morning Visit", place: dayPlaces[0] });
    }

    timeline.push({ time: "11:30 AM", type: "break", title: "Tea & Rest Point", note: "Take a short break to refresh and hydrate." });

    timeline.push({ time: "01:00 PM", type: "break", title: "Lunch Break", note: "Enjoy local cuisine at a nearby restaurant." });

    if (dayPlaces[1]) {
      timeline.push({ time: "02:30 PM", type: "activity", title: "Afternoon Exploration", place: dayPlaces[1] });
    }

    if (dayPlaces[2]) {
      timeline.push({ time: "05:00 PM", type: "break", title: "Evening Snack & Rest", note: "Catch the evening breeze with a warm beverage." });
      timeline.push({ time: "06:30 PM", type: "activity", title: "Evening Visit", place: dayPlaces[2] });
    }

    timeline.push({ time: "08:30 PM", type: "break", title: "Dinner", note: "Wind down with a relaxing dinner and local delicacies." });

    // Last day gets a checkout reminder
    if (day === numDays) {
      timeline.push({ time: "10:00 AM", type: "break", title: "Hotel Check-Out & Departure", note: "Pack your bags, check out and head home safely." });
    }

    itinerary.push({
      day,
      theme,
      title: `Day ${day} — ${theme}`,
      morningNote,
      afternoonNote,
      eveningNote,
      timeline,
      places: dayPlaces,
    });
  }

  return itinerary;
}

/**
 * Estimate budget in INR based on people, days, and budget level.
 */
function estimateBudget(numPeople, numDays, budgetLevel) {
  // Per person per day estimates (INR)
  const rates = {
    low: { food: 300, stay: 600, transport: 200, activities: 300 },
    medium: { food: 800, stay: 1500, transport: 500, activities: 800 },
    high: { food: 2000, stay: 4000, transport: 1500, activities: 2000 },
  };

  const r = rates[budgetLevel] || rates.medium;

  const foodTotal = r.food * numPeople * numDays;
  const stayTotal = r.stay * numPeople * numDays;
  const transportTotal = r.transport * numPeople * numDays;
  const activitiesTotal = r.activities * numPeople * numDays;
  const total = foodTotal + stayTotal + transportTotal + activitiesTotal;

  return {
    food: foodTotal,
    stay: stayTotal,
    transport: transportTotal,
    activities: activitiesTotal,
    total,
    currency: "INR",
    perPersonPerDay: Math.round(total / (numPeople * numDays)),
  };
}

/**
 * Generate packing suggestions based on weather and interests.
 */
function getPackingSuggestions(weatherCategory, interests) {
  const base = [
    "Valid ID proof and travel documents",
    "Comfortable walking shoes",
    "Reusable water bottle",
    "Phone charger and power bank",
    "First aid kit",
    "Sunscreen (SPF 30+)",
  ];

  const weatherPack = {
    rain: ["Raincoat or umbrella", "Waterproof bag cover", "Extra pair of dry clothes"],
    heat: ["Light cotton clothes", "Hat/cap", "Electrolyte sachets", "Cooling towel"],
    storm: ["Emergency contact list", "Flashlight", "Extra medicines", "Waterproof document pouch"],
    good: ["Light jacket (for evenings)", "Sunglasses"],
  };

  const interestPack = {
    mountains: ["Warm layers", "Trekking poles", "Woollen socks", "Altitude sickness medicine"],
    beaches: ["Swimwear", "Beach towel", "Waterproof sandals", "Sunscreen SPF 50+"],
    spiritual: ["Modest clothing to cover shoulders/knees", "Socks for temple visits"],
    food: ["Antacid tablets", "Food allergy card"],
    adventure: ["Sports shoes", "Gloves", "Helmet (if needed)", "Knee pads"],
    nature: ["Insect repellent", "Binoculars", "Nature guide book"],
    historical: ["Notebook for notes", "Camera"],
    family: ["Snacks for kids", "Baby wipes", "Small backpack for kids"],
  };

  let packing = [...base, ...(weatherPack[weatherCategory] || weatherPack.good)];

  interests.forEach((interest) => {
    if (interestPack[interest]) {
      packing = packing.concat(interestPack[interest]);
    }
  });

  // Remove duplicates
  return [...new Set(packing)];
}

/**
 * Generate safety tips based on weather.
 */
function getSafetyTips(weatherCategory, destination) {
  const base = [
    `Research local emergency numbers in ${destination}.`,
    "Share your itinerary with a trusted contact back home.",
    "Keep digital and physical copies of important documents.",
    "Carry some cash — cards may not work everywhere.",
    "Stay hydrated throughout the day.",
  ];

  const weatherTips = {
    rain: [
      "Avoid trekking or hiking trails in heavy rain — risk of slipping.",
      "Do not cross flooded roads or streams.",
      "Check local flood alerts before heading out.",
    ],
    heat: [
      "Avoid direct sun between 11 AM and 4 PM.",
      "Wear loose, light-coloured clothing.",
      "Watch for signs of heat stroke: dizziness, nausea, rapid heartbeat.",
    ],
    storm: [
      "Follow all official storm warnings and advisories.",
      "Stay away from trees, open fields, and bodies of water.",
      "Keep your phone fully charged at all times.",
      "Do not drive during a storm unless absolutely necessary.",
    ],
    good: [
      "Wear sunscreen even on cloudy days.",
      "Carry a light jacket for cooler evenings.",
    ],
  };

  return [...base, ...(weatherTips[weatherCategory] || weatherTips.good)];
}

/**
 * Main controller: plan a trip.
 */
async function planTrip(req, res) {
  try {
    const {
      currentLocation,
      destination,
      travelDate,
      numDays,
      numPeople,
      budget,
      interests,
    } = req.body;

    // --- Input Validation ---
    if (!destination || !travelDate || !numDays || !numPeople || !budget) {
      return res.status(400).json({
        error: "Missing required fields: destination, travelDate, numDays, numPeople, budget.",
      });
    }

    const days = parseInt(numDays);
    const people = parseInt(numPeople);
    const selectedInterests = Array.isArray(interests) && interests.length > 0
      ? interests
      : ["historical", "nature"];

    // 1. Geocode destination
    const geo = await geocodeCity(destination);

    // 2. Fetch weather
    const weather = await getWeather(geo.lat, geo.lon, travelDate);

    // 3. Fetch nearby places from OpenTripMap
    const places = await getNearbyPlaces(geo.lat, geo.lon, selectedInterests, weather.category);

    // 3b. Fetch amenities (hotels, restaurants, transport)
    const amenities = await getAmenities(geo.lat, geo.lon);

    // 4. Build day-wise itinerary
    const itinerary = buildItinerary(places, days, weather.category);

    // 5. Budget estimation
    const budgetEstimate = estimateBudget(people, days, budget);

    // 6. Packing list
    const packingList = getPackingSuggestions(weather.category, selectedInterests);

    // 7. Safety tips
    const safetyTips = getSafetyTips(weather.category, destination);

    // 8. Build response
    const response = {
      success: true,
      trip: {
        from: currentLocation || "Your location",
        to: destination,
        destinationFull: geo.displayName,
        coordinates: { lat: geo.lat, lon: geo.lon },
        travelDate,
        endDate: (() => {
          const d = new Date(travelDate);
          d.setDate(d.getDate() + days - 1);
          return d.toISOString().split("T")[0];
        })(),
        numDays: days,
        numPeople: people,
        budget,
        interests: selectedInterests,
      },
      weather: {
        temperature: weather.temperature,
        feelsLike: weather.feelsLike,
        humidity: weather.humidity,
        windSpeed: weather.windSpeed,
        condition: weather.condition,
        description: weather.description,
        category: weather.category,
        icon: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
        safetyStatus: weather.safetyStatus,
        safetyMessage: weather.safetyMessage,
      },
      itinerary,
      nearbyPlaces: places.slice(0, 20).map((p) => ({
        name: p.name,
        lat: p.lat,
        lon: p.lon,
        description: p.description,
        address: p.address,
        image: p.image,
        kinds: p.kinds,
      })),
      amenities,
      budgetEstimate,
      packingList,
      safetyTips,
    };

    return res.json(response);
  } catch (error) {
    console.error("Trip planning error:", error.message);
    
    if (error.response && error.response.status === 429) {
      return res.status(429).json({
        error: "One of our external services (Maps/Weather) is busy. Please wait a moment and try again."
      });
    }

    return res.status(500).json({
      error: "Something went wrong: " + error.message,
    });
  }
}

/**
 * Save a generated trip plan to the database.
 */
async function saveTrip(req, res) {
  try {
    const {
      user_id, trip_name, source_location, destination_location,
      start_date, end_date, travel_mode, budget_level, interests, notes
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO trip_plans (user_id, trip_name, source_location, destination_location, start_date, end_date, travel_mode, budget_level, interests, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user_id, trip_name, source_location, destination_location, start_date, end_date, travel_mode, budget_level, interests, notes]
    );

    res.status(201).json({ success: true, message: "Trip saved successfully!", trip_id: result.insertId });
  } catch (error) {
    console.error("Save Trip Error:", error.message);
    res.status(500).json({ success: false, message: "Could not save trip: " + error.message });
  }
}

/**
 * Get all trips for a specific user.
 */
async function getUserTrips(req, res) {
  try {
    const { userId } = req.params;
    const [trips] = await pool.query(
      "SELECT * FROM trip_plans WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    res.json({ success: true, trips });
  } catch (error) {
    console.error("Get User Trips Error:", error.message);
    res.status(500).json({ success: false, message: "Could not fetch trips: " + error.message });
  }
}

/**
 * Admin: Get all trips across all users.
 */
async function getAllTrips(req, res) {
  try {
    const [trips] = await pool.query(
      `SELECT t.*, u.full_name as user_name 
       FROM trip_plans t 
       JOIN users u ON t.user_id = u.id 
       ORDER BY t.created_at DESC`
    );
    res.json({ success: true, trips });
  } catch (error) {
    console.error("Get All Trips Error:", error.message);
    res.status(500).json({ success: false, message: "Could not fetch all trips: " + error.message });
  }
}

/**
 * Add a log/update to a trip.
 */
async function addTripUpdate(req, res) {
  try {
    const { trip_id, user_id, update_type, title, content } = req.body;
    await pool.query(
      "INSERT INTO trip_updates (trip_id, user_id, update_type, title, content) VALUES (?, ?, ?, ?, ?)",
      [trip_id, user_id, update_type || 'note', title, content]
    );
    res.json({ success: true, message: "Update added successfully!" });
  } catch (error) {
    console.error("Add Trip Update Error:", error.message);
    res.status(500).json({ success: false, message: "Could not add update: " + error.message });
  }
}

/**
 * Get all updates/logs for a trip.
 */
async function getTripUpdates(req, res) {
  try {
    const { tripId } = req.params;
    const [updates] = await pool.query(
      "SELECT * FROM trip_updates WHERE trip_id = ? ORDER BY created_at DESC",
      [tripId]
    );
    res.json({ success: true, updates });
  } catch (error) {
    console.error("Get Trip Updates Error:", error.message);
    res.status(500).json({ success: false, message: "Could not fetch updates: " + error.message });
  }
}

module.exports = { 
  planTrip, 
  saveTrip, 
  getUserTrips, 
  getAllTrips, 
  addTripUpdate, 
  getTripUpdates 
};