import { useState, useEffect } from 'react';
import CurrentTemp from '../../components/CurrentTemp/CurrentTemp';
import HiLoTemp from '../../components/HiLoTemp/HiLoTemp';
import WeatherInfo from '../../components/WeatherInfo/WeatherInfo';
import WeatherForecast from '../../components/WeatherForecast/WeatherForecast';

const getTimelineURL = "https://api.tomorrow.io/v4/weather/forecast";

export default function WeatherPage() {
    const [currentTemp, setCurrentTemp] = useState(null);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [weatherData, setWeatherData] = useState([]);

    const APIKey = process.env.REACT_APP_API_KEY;

    const userLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setLocation({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    });
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.log("Geolocation is not supported");
        }
    };

    useEffect(() => {
        userLocation();
    }, []);

    useEffect(() => {
        if (location.latitude !== null && location.longitude !== null) {
            fetch(`${getTimelineURL}?location=${location.latitude},${location.longitude}&apikey=${APIKey}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setCurrentTemp(data.timelines.hourly[0].values.temperature);
                    setWeatherData([
                        data.timelines.hourly[0].values.humidity,
                        data.timelines.hourly[0].values.pressureSurfaceLevel,
                        data.timelines.hourly[0].values.visibility,
                        data.timelines.hourly[0].values.windSpeed,
                        data.timelines.hourly[0].values.dewPoint,
                        data.timelines.hourly[0].values.uvIndex,
                        data.timelines.daily[1].values.weatherCodeMax,
                        data.timelines.daily[2].values.weatherCodeMax,
                        data.timelines.daily[3].values.weatherCodeMax,
                        data.timelines.daily[4].values.weatherCodeMax,
                        data.timelines.daily[5].values.weatherCodeMax,
                        data.timelines.daily[1].values.temperatureMax,
                        data.timelines.daily[1].values.temperatureMin,
                        data.timelines.daily[2].values.temperatureMax,
                        data.timelines.daily[2].values.temperatureMin,
                        data.timelines.daily[3].values.temperatureMax,
                        data.timelines.daily[3].values.temperatureMin,
                        data.timelines.daily[4].values.temperatureMax,
                        data.timelines.daily[4].values.temperatureMin,
                        data.timelines.daily[5].values.temperatureMax,
                        data.timelines.daily[5].values.temperatureMin,
                        data.timelines.daily[0].values.temperatureMax, /* 21 */
                        data.timelines.daily[0].values.temperatureMin  /* 22 */
                    ])
                })
                .catch(error => {
                    console.error("Error fetching weather data:", error);
                });
        }
    }, [location]);

    return (
        <div>
            <h1>Weather App</h1>
            <CurrentTemp currentTemp={currentTemp} />
            <HiLoTemp temps={weatherData} />
            <WeatherInfo weatherData={weatherData} />
            <WeatherForecast forecast={weatherData} />
        </div>
    );
};
