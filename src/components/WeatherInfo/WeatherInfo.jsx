export default function WeatherInfo({ weatherData }) {
    return (
        <div className='WeatherInfoContainer'>
            <table className='WeatherInfoTable'>
                <tbody>
                    <tr>
                        <th className='Label'>Humidity</th>
                        <td>{weatherData[0] !== undefined ? weatherData[0] + '%' : 'N/A'}</td>
                        <th className='Label'>Wind Speed</th>
                        <td>{weatherData[3] !== undefined ? (weatherData[3] * 2.237).toFixed(0) + ' mph' : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th className='Label'>Pressure</th>
                        <td>{weatherData[1] !== undefined ? (weatherData[1] / 33.863886666667).toFixed(2) + ' inHg' : 'N/A'}</td>
                        <th className='Label'>Dew Point</th>
                        <td>{weatherData[4] !== undefined ? weatherData[4] + '°' : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th className='Label'>Visibility</th>
                        <td>{weatherData[2] !== undefined ? weatherData[2].toFixed(0) + ' mi' : 'N/A'}</td>
                        <th className='Label'>UV Index</th>
                        <td>{weatherData[5] !== undefined ? weatherData[5] : 'N/A'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
