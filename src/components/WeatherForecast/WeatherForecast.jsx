export default function WeatherForecast({ forecast }) {
    const weatherStatus = {
        1000: 'Sunny',
        1100: 'Mostly Clear',
        1101: 'Partly Cloudy',
        1102: 'Mostly Cloudy',
        1001: 'Cloudy',
        8000: 'Thunderstorms',
        4000: 'Rain',
        4200: 'Rain',
        4001: 'Rain',
        4201: 'Rain',
        5001: 'Snow',
        5100: 'Snow',
        5000: 'Snow',
        5101: 'Snow',
        2000: 'Fog',
        2100: 'Fog',
        6000: 'Freezing Rain',
        6200: 'Freezing Rain',
        6001: 'Freezing Rain',
        6201: 'Freezing Rain',
        7102: 'Hail',
        7000: 'Hail',
        7101: 'Hail'
    }

    const toFahrenheit = (celsius) => {
        return (celsius * 9 / 5) + 32;
    }

    const generateForecast = () => {
        const forecastData = [];
        for (let i = 6; i <= 10; i++) {
            const code = forecast[i];
            const dayIndex = i - 6 + 1;

            const dayForecast = {
                dayIndex,
                weatherStatus: weatherStatus[code] || 'Unknown',
            };

            forecastData.push(dayForecast);
        }
        return forecastData;
    }

    const forecastData = generateForecast();

    return (
        <div>
            <h1>Weather Forecast</h1>
            <ul>
                {forecastData.map((data, index) => (
                    <li key={index}>
                        Day {data.dayIndex}: {data.weatherStatus}{' '}
                        (High Temp: {toFahrenheit(forecast[11 + index * 2]).toFixed(2)}°F /
                        Low Temp: {toFahrenheit(forecast[12 + index * 2]).toFixed(2)}°F)
                    </li>
                ))}
            </ul>
        </div>
    )
}
