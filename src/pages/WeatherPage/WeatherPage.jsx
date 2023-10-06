import { useState, useEffect } from 'react';
import WeatherInfo from '../../components/WeatherInfo/WeatherInfo';

export default function WeatherPage() {
    const [temperature, setTemperature] = useState(null);
    const [location, setLocation] = useState({ latitude: null, longitude: null });

    const userLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setLocation({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                });
            });
        } else {
            console.log("Location cannot be found");
        }
    };

    useEffect(() => {
        userLocation();
    }, []);

    useEffect(() => {
        // Fetch weather data when location changes
        if (location.latitude && location.longitude) {
            // Make a request to your backend to fetch weather data based on user's location
            fetch(`/api/weather?latitude=${location.latitude}&longitude=${location.longitude}`)
                .then((response) => response.json())
                .then((data) => {
                    // Set the temperature data in the state
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
