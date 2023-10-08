const fetch = require("node-fetch");

const APIkey = process.env.REACT_APP_API_KEY;
const getTimelineURL = "https://api.tomorrow.io/v4/weather/forecast";

module.exports = {
    index
};

async function index(req, res) {
    try {
        const latitude = req.query.latitude;
        const longitude = req.query.longitude;

        const url = `${getTimelineURL}?location=${latitude},${longitude}&apikey=${APIkey}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const weatherData = await response.json();

        res.json({ weatherData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching weather data.' });
    }
}
