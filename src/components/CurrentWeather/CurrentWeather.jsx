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
        let backgroundColor;
        let windowColor;
        let buttonColor;

        switch (weatherCondition) {
            case 'Sunny':
                backgroundImage = `url(${sunnyBackground})`;
                backgroundColor = '#EAB269';
                windowColor = 'rgba(154, 146, 110, 0.7)';
                buttonColor = '#EAB269';
                break;
            case 'Mostly Clear':
                backgroundImage = `url(${mostlyClearBackground})`;
                backgroundColor = '#8F9FA6';
                windowColor = 'rgb(143, 159, 166, 0.7)';
                buttonColor = '#8F9FA6';
                break;
            case 'Partly Cloudy':
                backgroundImage = `url(${partlyCloudyBackground})`;
                backgroundColor = '#B7B5B2';
                windowColor = 'rgb(131, 130, 128, 0.7)';
                buttonColor = '#B7B5B2';
                break;
            case 'Mostly Cloudy':
                backgroundImage = `url(${mostlyCloudyBackground})`;
                backgroundColor = '#55666E';
                windowColor = 'rgb(85, 102, 110, 0.7)';
                buttonColor = '#55666E';
                break;
            case 'Cloudy':
                backgroundImage = `url(${cloudyBackground})`;
                backgroundColor = '#364247';
                windowColor = 'rgb(54, 66, 71, 0.7)';
                buttonColor = '#364247';
                break;
            case 'Thunderstorms':
                backgroundImage = `url(${thunderstormsBackground})`;
                backgroundColor = '#8a63a5'
                windowColor = 'rgba(124, 110, 154, 0.7)';
                buttonColor = '#8a63a5';
                break;
            case 'Rain':
                backgroundImage = `url(${rainBackground})`;
                backgroundColor = '#788584';
                windowColor = 'rgb(120, 133, 132, 0.7)';
                buttonColor = '#788584';
                break;
            case 'Snow':
                backgroundImage = `url(${snowBackground})`;
                backgroundColor = '#364247';
                windowColor = 'rgb(34, 30, 32, 0.7)';
                buttonColor = '#364247';
                break;
            case 'Fog':
                backgroundImage = `url(${fogBackground})`;
                backgroundColor = '#899189';
                windowColor = 'rgb(137, 145, 137, 0.7)';
                buttonColor = '#899189';
                break;
            case 'Freezing Rain':
                backgroundImage = `url(${freezingRainBackground})`;
                backgroundColor = '#9393A5';
                windowColor = 'rgb(147, 147, 165, 0.7)';
                buttonColor = '#9393A5';
                break;
            case 'Hail':
                backgroundImage = `url(${hailBackground})`;
                backgroundColor = '#536512';
                windowColor = 'rgb(83, 101, 18, 0.7)';
                buttonColor = '#536512';
                break;
            default:
                backgroundImage = `url(${rainBackground})`;
        }

        const backgroundContainer = document.querySelector('.BackgroundContainer');
        const forecastContainer = document.querySelector('.ForecastContainer');
        const weatherInfoContainer = document.querySelector('.WeatherInfoContainer');
        const chatButton = document.querySelector('.messageInput button');

        if (backgroundContainer) {
            backgroundContainer.style.backgroundImage = backgroundImage;
            backgroundContainer.style.backgroundColor = backgroundColor;
            backgroundContainer.style.backgroundRepeat = 'no-repeat';
            backgroundContainer.style.backgroundPosition = 'center center';
            backgroundContainer.style.backgroundAttachment = 'fixed';
            backgroundContainer.style.backgroundSize = '70%';
            backgroundContainer.style.borderRadius = '20px';
        }

        if (forecastContainer && weatherInfoContainer) {
            forecastContainer.style.backgroundColor = windowColor;
            weatherInfoContainer.style.backgroundColor = windowColor;
        }

        if (chatButton) {
            chatButton.style.backgroundColor = buttonColor;
        }
        document.body.style.backgroundColor = backgroundColor;
    }, [weatherCondition]);

    return (
        <div className="CurrentWeather">
            <p>{weatherCondition}</p>
        </div>
    );
}
