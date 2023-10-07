const fetch = require("node-fetch");

const APIkey = process.env.REACT_APP_API_KEY;
const getTimelineURL = "https://api.tomorrow.io/v4/timelines";

module.exports = {
    getWeatherData
};

async function getWeatherData(req, res) {
    try {
        const latitude = req.query.latitude;
        const longitude = req.query.longitude;
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

        const url = `${getTimelineURL}?${new URLSearchParams(queryParams)}`;
        // ${getTimelineURL}?location=${location.latitude},${location.longitude}&fields=temperature&timesteps=1h&units=metric&apikey=${APIKey}

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const weatherData = await response.json();
        const latestTemperature = weatherData.data.timelines[0].intervals[0].values.temperature.value;

        res.json({ temperature: latestTemperature });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching weather data.' });
    }
}
