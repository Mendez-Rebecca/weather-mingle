const http = require('http');
const APIkey = process.env.APIkey;

module.exports = {
    getWeatherData
};

async function getWeatherData(req, res) {
    try {
        const latitude = req.query.latitude; // Pass latitude as a query parameter
        const longitude = req.query.longitude; // Pass longitude as a query parameter

        // Define the API endpoint and query parameters
        const url = `https://api.tomorrow.io/v4/timelines?apiKey=${APIkey}&location=${latitude},${longitude}&fields=temperature_2m`;

        // Make an HTTP GET request to the weather API
        http.get(url, (response) => {
            let data = '';

            // Collect data as it arrives
            response.on('data', (chunk) => {
                data += chunk;
            });

            // When the response is complete, parse the JSON and send it to the client
            response.on('end', () => {
                const weatherData = JSON.parse(data);
                const temperatureData = weatherData.data.timelines[0].intervals;
                const latestTemperature = temperatureData[temperatureData.length - 1].values.temperature_2m;
                res.json({ temperature: latestTemperature });
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching weather data.' });
    }
}
