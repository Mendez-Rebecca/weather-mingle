export default function CurrentWeather({ currentWeather }) {
    const weatherStatus = {
        1000: 'Sunny',
        1100: 'Mostly Clear',
        1101: 'Partly Cloudy',
        1102: 'Mostly Cloudy',
        1001: 'Cloudy',
        8000: 'Thunderstorms',
        4000: 'Rain',
        4200: 'Rain',
        4001: 'Rain',
        4201: 'Rain',
        5001: 'Snow',
        5100: 'Snow',
        5000: 'Snow',
        5101: 'Snow',
        2000: 'Fog',
        2100: 'Fog',
        6000: 'Freezing Rain',
        6200: 'Freezing Rain',
        6001: 'Freezing Rain',
        6201: 'Freezing Rain',
        7102: 'Hail',
        7000: 'Hail',
        7101: 'Hail'
    }

    const weatherCondition = weatherStatus[currentWeather[23]] || 'Unknown';

    return (
        <div className="CurrentWeather">
            <p>{weatherCondition}</p>
        </div>
    );
}
