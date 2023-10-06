export default function WeatherInfo({ temperature }) {
    return (
        <div>
            <h2>Current Temperature</h2>
            {temperature !== null ? (
                <p>{temperature}°C</p>
            ) : (
                <p>Loading temperature data...</p>
            )}
        </div>
    );
};
