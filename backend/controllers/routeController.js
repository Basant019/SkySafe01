const axios = require('axios');
const { pool } = require('../config/db');
const { geocodeCity } = require('../services/geoService');

// Haversine formula to calculate distance between two coordinates in kilometers
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// POST /api/safe-route
// Find a safe route from source to destination avoiding active disasters
const getSafeRoute = async (req, res) => {
    try {
        const { source, destination } = req.body;

        if (!source || !destination) {
            return res.status(400).json({ success: false, message: 'Source and destination are required.' });
        }

        // 1. Geocode Source and Destination
        const srcGeo = await geocodeCity(source);
        const destGeo = await geocodeCity(destination);

        // 2. Fetch Active Disasters from DB
        // Get active alerts
        const [alerts] = await pool.query('SELECT * FROM disaster_alerts WHERE is_active = TRUE');
        // Get verified reports
        const [reports] = await pool.query("SELECT * FROM disaster_reports WHERE status = 'verified'");

        const allDisasters = [
            ...alerts.filter(a => a.latitude && a.longitude).map(a => ({ lat: a.latitude, lon: a.longitude, desc: a.description, severity: a.severity })),
            ...reports.filter(r => r.latitude && r.longitude).map(r => ({ lat: r.latitude, lon: r.longitude, desc: r.description, severity: r.severity }))
        ];

        // 3. Fetch Routes from Open Source Routing Machine (OSRM)
        // Request alternatives to find at least one safe route
        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${srcGeo.lon},${srcGeo.lat};${destGeo.lon},${destGeo.lat}?alternatives=true&geometries=geojson&overview=full`;
        const response = await axios.get(osrmUrl);

        if (!response.data || !response.data.routes || response.data.routes.length === 0) {
            return res.status(404).json({ success: false, message: 'Could not find a route between these locations.' });
        }

        const routes = response.data.routes;
        let safeRoute = null;
        let warning = null;
        const DANGER_RADIUS_KM = 30; // 30 km safety buffer

        // 4. Algorithm: Distance Filtering
        // Iterate over alternatives to find the first one that does not cross any disaster zone
        for (const route of routes) {
            let isRouteSafe = true;
            let conflictDisaster = null;

            // OSRM returns geometry as an array of [lon, lat] coordinates
            const coordinates = route.geometry.coordinates;

            // Check every Nth coordinate to speed up calculation
            for (let i = 0; i < coordinates.length; i += 5) {
                const [rLon, rLat] = coordinates[i];

                for (const disaster of allDisasters) {
                    const dist = getDistanceFromLatLonInKm(rLat, rLon, disaster.lat, disaster.lon);
                    if (dist < DANGER_RADIUS_KM) {
                        isRouteSafe = false;
                        conflictDisaster = disaster;
                        break;
                    }
                }
                if (!isRouteSafe) break;
            }

            if (isRouteSafe) {
                safeRoute = route;
                break;
            } else {
                // If it's unsafe, record the warning for the primary route
                if (!warning) {
                    warning = `Primary route passes within ${DANGER_RADIUS_KM}km of a disaster zone (${conflictDisaster.desc}).`;
                }
            }
        }

        // 5. Output Suggestion
        if (safeRoute) {
            res.status(200).json({
                success: true,
                message: 'Safe route found.',
                warning: warning ? warning + ' An alternative safe route was selected.' : null,
                source: srcGeo,
                destination: destGeo,
                route: safeRoute,
                disastersAvoided: allDisasters.length
            });
        } else {
            res.status(200).json({
                success: false,
                message: 'NO SAFE ROUTE FOUND.',
                warning: `All available routes pass within ${DANGER_RADIUS_KM}km of an active disaster zone. Travel is highly discouraged.`,
                source: srcGeo,
                destination: destGeo,
                route: routes[0], // Send the primary route anyway so the user sees it, but mark as unsafe
                disastersAvoided: allDisasters.length
            });
        }

    } catch (error) {
        console.error('Route Finder Error:', error.message);
        res.status(500).json({ success: false, message: error.message || 'Server error while calculating safe route.' });
    }
};

module.exports = { getSafeRoute };
