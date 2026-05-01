const { pool } = require('../config/db');
const https = require('https');

// Get current weather (using external API)
const getCurrentWeather = async (req, res) => {
    try {
        const { city, lat, lon } = req.query;
        const apiKey = process.env.OPENWEATHER_API_KEY || process.env.WEATHER_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ success: false, message: 'OpenWeather API Key is not configured on the server.' });
        }

        let apiUrl;
        if (lat && lon) {
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        } else if (city) {
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        } else {
            return res.status(400).json({
                success: false,
                message: 'Please provide city name or coordinates (lat, lon)'
            });
        }

        // Make request to OpenWeatherMap
        https.get(apiUrl, (apiRes) => {
            let data = '';

            apiRes.on('data', (chunk) => {
                data += chunk;
            });

            apiRes.on('end', () => {
                const weatherData = JSON.parse(data);
                
                if (weatherData.cod !== 200) {
                    return res.status(404).json({
                        success: false,
                        message: weatherData.message || 'City not found'
                    });
                }

                res.status(200).json({
                    success: true,
                    data: {
                        city: weatherData.name,
                        country: weatherData.sys.country,
                        temperature: weatherData.main.temp,
                        feels_like: weatherData.main.feels_like,
                        humidity: weatherData.main.humidity,
                        pressure: weatherData.main.pressure,
                        weather: weatherData.weather[0].main,
                        description: weatherData.weather[0].description,
                        wind_speed: weatherData.wind.speed,
                        visibility: weatherData.visibility,
                        sunrise: new Date(weatherData.sys.sunrise * 1000),
                        sunset: new Date(weatherData.sys.sunset * 1000)
                    }
                });
            });
        }).on('error', (err) => {
            console.error('Weather API Error:', err);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch weather data'
            });
        });

    } catch (error) {
        console.error('Get Weather Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get 5-day forecast
const getWeatherForecast = async (req, res) => {
    try {
        const { city, lat, lon } = req.query;
        const apiKey = process.env.OPENWEATHER_API_KEY || process.env.WEATHER_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ success: false, message: 'OpenWeather API Key is not configured on the server.' });
        }

        let apiUrl;
        if (lat && lon) {
            apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        } else if (city) {
            apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        } else {
            return res.status(400).json({
                success: false,
                message: 'Please provide city name or coordinates'
            });
        }

        https.get(apiUrl, (apiRes) => {
            let data = '';

            apiRes.on('data', (chunk) => {
                data += chunk;
            });

            apiRes.on('end', () => {
                const forecastData = JSON.parse(data);

                if (forecastData.cod !== "200") {
                    return res.status(404).json({
                        success: false,
                        message: forecastData.message || 'Forecast not available'
                    });
                }

                // Process forecast data (group by day)
                const dailyForecasts = {};
                forecastData.list.forEach(item => {
                    const date = item.dt_txt.split(' ')[0];
                    if (!dailyForecasts[date]) {
                        dailyForecasts[date] = [];
                    }
                    dailyForecasts[date].push(item);
                });

                res.status(200).json({
                    success: true,
                    city: forecastData.city.name,
                    country: forecastData.city.country,
                    forecasts: dailyForecasts
                });
            });
        }).on('error', (err) => {
            console.error('Forecast API Error:', err);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch forecast data'
            });
        });

    } catch (error) {
        console.error('Get Forecast Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Save location for user
const saveLocation = async (req, res) => {
    try {
        const { user_id, location_name, latitude, longitude, is_default } = req.body;

        if (!user_id || !location_name) {
            return res.status(400).json({
                success: false,
                message: 'User ID and location name are required'
            });
        }

        const [result] = await pool.query(
            'INSERT INTO saved_locations (user_id, location_name, latitude, longitude, is_default) VALUES (?, ?, ?, ?, ?)',
            [user_id, location_name, latitude || null, longitude || null, is_default || false]
        );

        res.status(201).json({
            success: true,
            message: 'Location saved successfully',
            location_id: result.insertId
        });

    } catch (error) {
        console.error('Save Location Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get user's saved locations
const getSavedLocations = async (req, res) => {
    try {
        const { userId } = req.params;

        const [locations] = await pool.query(
            'SELECT * FROM saved_locations WHERE user_id = ? ORDER BY is_default DESC, created_at DESC',
            [userId]
        );

        res.status(200).json({
            success: true,
            locations: locations
        });

    } catch (error) {
        console.error('Get Locations Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = {
    getCurrentWeather,
    getWeatherForecast,
    saveLocation,
    getSavedLocations
};