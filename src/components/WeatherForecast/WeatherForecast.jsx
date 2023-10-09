import sunny from '../../images/sunny.png';
import mostlyClear from '../../images/mostly_clear.png';
import partlyCloudy from '../../images/partly_cloudy.png';
import mostlyCloudy from '../../images/mostly_cloudy.png';
import cloudy from '../../images/cloudy.png';
import thunderstorms from '../../images/thunderstorms.png';
import rain from '../../images/rainy.png';
import snow from '../../images/snow.png';
import fog from '../../images/fog.png';
import freezingRain from '../../images/freezing_rain.png';
import hail from '../../images/hail.png';

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
        <div className="ForecastContainer">
            <table>
                <thead>
                    <tr>
                        <th>Forecast</th>
                        <th>Hi</th>
                        <th>Lo</th>
                    </tr>
                </thead>
                <tbody>
                    {forecastData.map((data, index) => (
                        <tr key={index}>
                            <td>
                                {data.weatherStatus === 'Sunny' && (
                                    <>
                                        <img src={sunny} alt="Sunny" />
                                        Sunny
                                    </>
                                )}
                                {data.weatherStatus === 'Mostly Clear' && (
                                    <>
                                        <img src={mostlyClear} alt="Mostly Clear" />
                                        Mostly Clear
                                    </>
                                )}
                                {data.weatherStatus === 'Partly Cloudy' && (
                                    <>
                                        <img src={partlyCloudy} alt="Partly Cloudy" />
                                        Partly Cloudy
                                    </>
                                )}
                                {data.weatherStatus === 'Mostly Cloudy' && (
                                    <>
                                        <img src={mostlyCloudy} alt="Mostly Cloudy" />
                                        Mostly Cloudy
                                    </>
                                )}
                                {data.weatherStatus === 'Cloudy' && (
                                    <>
                                        <img src={cloudy} alt="Cloudy" />
                                        Cloudy
                                    </>
                                )}
                                {data.weatherStatus === 'Thunderstorms' && (
                                    <>
                                        <img src={thunderstorms} alt="Thunderstorms" />
                                        Thunderstorms
                                    </>
                                )}
                                {data.weatherStatus === 'Rain' && (
                                    <>
                                        <img src={rain} alt="Rain" />
                                        Rain
                                    </>
                                )}
                                {data.weatherStatus === 'Snow' && (
                                    <>
                                        <img src={snow} alt="Snow" />
                                        Snow
                                    </>
                                )}
                                {data.weatherStatus === 'Fog' && (
                                    <>
                                        <img src={fog} alt="Fog" />
                                        Fog
                                    </>
                                )}
                                {data.weatherStatus === 'Freezing Rain' && (
                                    <>
                                        <img src={freezingRain} alt="Freezing Rain" />
                                        Freezing Rain
                                    </>
                                )}
                                {data.weatherStatus === 'Hail' && (
                                    <>
                                        <img src={hail} alt="Hail" />
                                        Hail
                                    </>
                                )}
                            </td>
                            <td>{toFahrenheit(forecast[11 + index * 2]).toFixed(0)}°F</td>
                            <td>{toFahrenheit(forecast[12 + index * 2]).toFixed(0)}°F</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
