const NodeGeocoder = require('node-geocoder');

const googleAPIKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const options = {
    provider: 'google',
    apiKey: googleAPIKey
};

const geocoder = NodeGeocoder(options);

module.exports = {
    index
};

async function index(req, res) {
    try {
        const latitude = req.query.latitude;
        const longitude = req.query.longitude;

        const locationData = await geocoder.reverse({ lat: latitude, lon: longitude });

        if (!locationData || locationData.length === 0) {
            throw new Error('No location data found');
        }

        res.json({ locationData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching location data.' });
    }
}
