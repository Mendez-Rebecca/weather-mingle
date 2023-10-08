export default function WeatherInfo({ currentTemp }) {
    return (
        <div>
            <h2>Current Temperature</h2>
            {currentTemp !== null ? (
                <p>{(currentTemp * 9 / 5 + 32).toFixed(0)}°F</p>
            ) : (
                <p>Loading temperature data...</p>
            )}
        </div>
    );
};
