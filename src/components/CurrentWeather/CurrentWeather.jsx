import { useEffect } from 'react';
import sunnyBackground from '../../images/sunny_bg.png'
import mostlyClearBackground from '../../images/mostly_clear_bg.png'
import partlyCloudyBackground from '../../images/partly_cloudy_bg.png'
import mostlyCloudyBackground from '../../images/mostly_cloudy_bg.png'
import cloudyBackground from '../../images/cloudy_bg.png'
import thunderstormsBackground from '../../images/lightning_bg.png'
import rainBackground from '../../images/rain_bg.png'
import snowBackground from '../../images/snow_bg.png'
import fogBackground from '../../images/fog_bg.png'
import freezingRainBackground from '../../images/freezing_rain_bg.png'
import hailBackground from '../../images/hail_bg.png'

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

    useEffect(() => {
        let backgroundImage;

        switch (weatherCondition) {
            case 'Sunny':
                backgroundImage = `url(${sunnyBackground})`;
                break;
            case 'Mostly Clear':
                backgroundImage = `url(${mostlyClearBackground})`;
                break;
            case 'Partly Cloudy':
                backgroundImage = `url(${partlyCloudyBackground})`;
                break;
            case 'Mostly Cloudy':
                backgroundImage = `url(${mostlyCloudyBackground})`;
                break;
            case 'Cloudy':
                backgroundImage = `url(${cloudyBackground})`;
                break;
            case 'Thunderstorms':
                backgroundImage = `url(${thunderstormsBackground})`;
                break;
            case 'Rain':
                backgroundImage = `url(${rainBackground})`;
                break;
            case 'Snow':
                backgroundImage = `url(${snowBackground})`;
                break;
            case 'Fog':
                backgroundImage = `url(${fogBackground})`;
                break;
            case 'Freezing Rain':
                backgroundImage = `url(${freezingRainBackground})`;
                break;
            case 'Hail':
                backgroundImage = `url(${hailBackground})`;
                break;
            default:
                backgroundImage = `url(${rainBackground})`;
        }

        document.body.style.backgroundImage = backgroundImage;
    }, [weatherCondition]);

    return (
        <div className="CurrentWeather">
            <p>{weatherCondition}</p>
        </div>
    );
}
