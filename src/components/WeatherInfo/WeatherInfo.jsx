export default function WeatherInfo({ currentTemp }) {
    return (
        <div>
            <h2>Current Temperature</h2>
            {currentTemp !== null ? (
                <p>{currentTemp}°F</p>
            ) : (
                <p>Loading temperature data...</p>
            )}
        </div>
    );
};
