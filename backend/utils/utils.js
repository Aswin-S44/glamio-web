import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

export const getLatLngFromAddress = async (name, address) => {
  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    const res = await fetch(apiUrl);
    const data = await res.json();

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      let placeId = null;
      if (lat && lng) {
        placeId = await getPlaceIdFromName(name);
      }
      let totalRating = 0;
      if (placeId) {
        totalRating = await getTotalRating(placeId);
      }
      if (totalRating.rating) {
        totalRating = totalRating.rating;
      }

      return {
        coordinates: { latitude: lat, longitude: lng },
        placeId,
        totalRating,
      };
    }

    return {
      coordinates: null,
      placeId: null,
      totalRating: null,
    };
  } catch (error) {
    return error;
  }
};
