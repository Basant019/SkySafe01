// backend/services/placeService.js
const axios = require("axios");

// Valid OpenTripMap "kinds" per interest (only tested-working values)
const interestToKinds = {
  mountains: "natural",
  beaches: "beaches",
  spiritual: "religion",
  food: "foods",
  adventure: "sport,amusements",
  nature: "natural,nature_reserves",
  historical: "historic,museums",
  family: "amusements,tourist_facilities",
};

// Non-tourist kinds to filter OUT
const BAD_KINDS = ["banks", "atms", "post_offices", "shops", "pharmacies", "hospitals", "police", "supermarkets", "car_repair"];

/**
 * Fetch real nearby tourist places from OpenTripMap API.
 */
async function getNearbyPlaces(lat, lon, interests, weatherCategory) {
  const apiKey = process.env.OPENTRIPMAP_API_KEY;
  if (!apiKey) throw new Error("OPENTRIPMAP_API_KEY is not set in .env");

  // Build kinds from interests
  const interestKindsArr = interests
    .map((i) => interestToKinds[i] || "")
    .filter(Boolean)
    .join(",");

  // Always include these tourist-relevant categories
  const kindSet = new Set([
    "interesting_places",
    "tourist_facilities",
    "historic",
    "religion",
    "natural",
    "museums",
    "amusements",
    ...(interestKindsArr ? interestKindsArr.split(",") : []),
  ]);

  // Bad weather — push indoor options
  if (weatherCategory === "rain" || weatherCategory === "storm") {
    kindSet.add("cultural");
    kindSet.add("museums");
  }

  const kinds = [...kindSet].join(",");

  // --- First pass: rate=3 (top-rated only) ---
  let places = await fetchPlaces(lat, lon, kinds, apiKey, 3, 30000, 40);

  // --- If not enough, second pass: rate=2, wider radius ---
  if (places.length < 12) {
    const more = await fetchPlaces(lat, lon, kinds, apiKey, 2, 50000, 50);
    // Merge, avoiding duplicates by xid
    const xids = new Set(places.map((p) => p.xid));
    places = [...places, ...more.filter((p) => !xids.has(p.xid))];
  }

  if (places.length === 0) return [];

  // Fetch details for up to 25 places
  const detailed = await Promise.allSettled(
    places.slice(0, 25).map((p) => getPlaceDetails(p.xid, apiKey))
  );

  return detailed
    .filter((r) => r.status === "fulfilled" && r.value !== null)
    .map((r) => r.value)
    .filter((p) => {
      // Remove non-tourist spots
      const k = (p.kinds || "").toLowerCase();
      return !BAD_KINDS.some((bad) => k.includes(bad));
    });
}

/** Helper: fetch a list of places with given params */
async function fetchPlaces(lat, lon, kinds, apiKey, rate, radius, limit) {
  try {
    const res = await axios.get(
      "https://api.opentripmap.com/0.1/en/places/radius",
      {
        params: { apikey: apiKey, radius, lon, lat, kinds, rate, format: "json", limit },
      }
    );
    return res.data || [];
  } catch {
    return [];
  }
}

/**
 * Get full details for a single place by xid.
 * Only return places that have a meaningful description.
 */
async function getPlaceDetails(xid, apiKey) {
  try {
    const res = await axios.get(
      `https://api.opentripmap.com/0.1/en/places/xid/${xid}`,
      { params: { apikey: apiKey } }
    );

    const d = res.data;
    if (!d || !d.name || d.name.trim().length < 2) return null;

    // Skip places with no useful description (generic banks, shops, etc.)
    const hasDescription =
      d.wikipedia_extracts?.text ||
      d.info?.descr;

    // Only skip description requirement for top-rated places (rate >= 3)
    if (!hasDescription && (d.rate || 0) < 3) return null;

    const description = d.wikipedia_extracts?.text
      ? d.wikipedia_extracts.text.slice(0, 280) + "..."
      : d.info?.descr
        ? d.info.descr.slice(0, 280) + "..."
        : "A popular local landmark worth visiting.";

    return {
      xid: d.xid,
      name: d.name,
      kinds: d.kinds || "",
      lat: d.point?.lat || null,
      lon: d.point?.lon || null,
      description,
      image: d.preview?.source || null,
      address: d.address
        ? [d.address.road, d.address.city, d.address.country]
          .filter(Boolean)
          .join(", ")
        : "Address not available",
      rating: d.rate || 1,
    };
  } catch {
    return null;
  }
}

module.exports = { getNearbyPlaces };