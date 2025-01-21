const axios = require('axios');

const getCoordinatesFromAddress = async (address) => {
  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: address,
        format: "json",
        addressdetails: 1,
        limit: 1
      }
    });

    if (response.data.length === 0) {
      return null; // Tidak ditemukan
    }

    const { lat, lon } = response.data[0];
    return `${lat},${lon}`; // Format untuk disimpan dalam VARCHAR
  } catch (error) {
    console.error('Error fetching geocode:', error.message);
    throw new Error('Failed to fetch geocode');
  }
};

module.exports = getCoordinatesFromAddress;
