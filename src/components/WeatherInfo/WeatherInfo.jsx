export default function WeatherInfo({ weatherData }) {
    return (
        <div>
            <h2>WeatherInfo</h2>
            <p>Humidity: {weatherData[0]}%</p>
            <p>Pressure: {(weatherData[1] / 33.863886666667).toFixed(2)} inHg</p>
            <p>Visibility: {(weatherData[2]).toFixed(0)} mi</p>
            <p>Wind Speed: {(weatherData[3] * 2.237).toFixed(0)} mph</p>
            <p>Dew Point: {weatherData[4]}°</p>
            <p>UV Index: {weatherData[5]}</p>
        </div>
    )
}
