export default function WeatherInfo({ weatherData }) {
    return (
        <div>
            <h2>WeatherInfo</h2>
            <p>Humidity: {weatherData[0] !== undefined ? weatherData[0] + '%' : 'N/A'}</p>
            <p>Pressure: {weatherData[1] !== undefined ? (weatherData[1] / 33.863886666667).toFixed(2) + ' inHg' : 'N/A'}</p>
            <p>Visibility: {weatherData[2] !== undefined ? weatherData[2].toFixed(0) + ' mi' : 'N/A'}</p>
            <p>Wind Speed: {weatherData[3] !== undefined ? (weatherData[3] * 2.237).toFixed(0) + ' mph' : 'N/A'}</p>
            <p>Dew Point: {weatherData[4] !== undefined ? weatherData[4] + '°' : 'N/A'}</p>
            <p>UV Index: {weatherData[5] !== undefined ? weatherData[5] : 'N/A'}</p>
        </div>
    )
}
