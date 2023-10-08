import { useState, useEffect } from 'react';
import CurrentTemp from '../../components/CurrentTemp/CurrentTemp';
import HiLoTemp from '../../components/HiLoTemp/HiLoTemp';
import WeatherInfo from '../../components/WeatherInfo/WeatherInfo';
import WeatherForecast from '../../components/WeatherForecast/WeatherForecast';
import pindrop from '../../images/pindrop.png';

const getTimelineURL = "https://api.tomorrow.io/v4/weather/forecast";
const googleURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng";

export default function WeatherPage() {
    const [currentTemp, setCurrentTemp] = useState(null);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [weatherData, setWeatherData] = useState([]);
    const [userAddress, setUserAddress] = useState(null);

    const APIKey = process.env.REACT_APP_API_KEY;
    const googleAPIKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

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

    const fetchUserAddress = () => {
        if (location.latitude !== null && location.longitude !== null) {
            fetch(`${googleURL}=${location.latitude},${location.longitude}&key=${googleAPIKey}`)
                .then(response => response.json())
                .then(data => {
                    const results = data.results[0];
                    const locality = results.address_components[3].long_name;
                    const state = results.address_components[5].long_name;

                    const fullAddress = `${locality}, ${state}`;
                    setUserAddress(fullAddress);
                })
                .catch(error => {
                    console.error("Error fetching user address:", error);
                });
        }
    };

    useEffect(() => {
        userLocation();
    }, []);

    useEffect(() => {
        if (location.latitude !== null && location.longitude !== null) {
            fetchUserAddress();
            fetch(`${getTimelineURL}?location=${location.latitude},${location.longitude}&apikey=${APIKey}`)
                .then(response => response.json())
                .then(data => {
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
        <div className='WeatherPage'>
            <div className='LocationContainer'>
                <img src={pindrop} />
                <p className='Location'>{userAddress}</p>
            </div>
            <CurrentTemp currentTemp={currentTemp} />
            <HiLoTemp temps={weatherData} />
            <WeatherInfo weatherData={weatherData} />
            <WeatherForecast forecast={weatherData} />
        </div>
    );
};
