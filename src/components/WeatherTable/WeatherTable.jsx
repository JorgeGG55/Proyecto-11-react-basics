import React from 'react';
import WeatherTableRow from '../WeatherTableRow/WeatherTableRow';
import './WeatherTable.css';

const WeatherTable = ({ weatherData }) => (
  <div>
    <table className="weatherTable">
      <tbody>
        <WeatherTableRow label="Feels like" value={`${weatherData.main.feels_like}°C`} />
        <WeatherTableRow label="Humidity" value={`${weatherData.main.humidity}%`} />
        <WeatherTableRow label="Pressure" value={`${weatherData.main.pressure} hPa`} />
        <WeatherTableRow label="Max Temperature" value={`${weatherData.main.temp_max}°C`} />
        <WeatherTableRow label="Min Temperature" value={`${weatherData.main.temp_min}°C`} />
        <WeatherTableRow label="Wind Speed" value={`${weatherData.wind.speed} m/s`} />
      </tbody>
    </table>
  </div>
);

export default WeatherTable;
