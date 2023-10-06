const fetch = require("node-fetch");

const APIkey = process.env.APIkey;
const getTimelineURL = "https://api.tomorrow.io/v4/timelines";

module.exports = {
    getWeatherData
};

async function getWeatherData(req, res) {
    try {
        const latitude = req.query.latitude; // Pass latitude as a query parameter
        const longitude = req.query.longitude; // Pass longitude as a query parameter

        // Define the query parameters
        const queryParams = {
            apikey: APIkey,
            location: `${latitude},${longitude}`,
            fields: "temperature",
            units: "imperial",
            timesteps: ["current"],
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
            timezone: "America/New_York"
        };

        // Construct the URL with query parameters
        const url = `${getTimelineURL}?${new URLSearchParams(queryParams)}`;

        // Make an HTTP GET request to the weather API using fetch
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        // Parse the JSON response
        const weatherData = await response.json();
        const latestTemperature = weatherData.data.timelines[0].intervals[0].values.temperature.value;

        res.json({ temperature: latestTemperature });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching weather data.' });
    }
}
