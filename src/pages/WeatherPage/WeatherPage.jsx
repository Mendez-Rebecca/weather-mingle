import { useState, useEffect } from 'react';
import WeatherInfo from '../../components/WeatherInfo/WeatherInfo';

const getTimelineURL = "https://api.tomorrow.io/v4/timelines";

export default function WeatherPage() {
    const [temperature, setTemperature] = useState(null);
    const [location, setLocation] = useState({ latitude: null, longitude: null });

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
        if (location.latitude && location.longitude) {
            fetch(`${getTimelineURL}?location=${location.latitude},${location.longitude}&fields=temperature&timesteps=1h&units=metric&apikey=${APIKey}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Request failed with status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    setTemperature(data.temperature);
                })
                .catch((error) => {
                    console.error("Error fetching weather data:", error);
                });
        }
    }, [location]);

    return (
        <div>
            <h1>Weather App</h1>
            <WeatherInfo temperature={temperature} />
        </div>
    );
};
