import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weatherData }) => {
  return (
    <div key={weatherData.dt} className="card">
      <p className="date">{new Date(weatherData.dt * 1000).toLocaleDateString()}</p>
      <img
        src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
        alt="Weather Icon"
      />
      <p>{(weatherData.main.temp - 273).toFixed(0)}°C</p>
      <p>{weatherData.weather[0].description}</p>
    </div>
  );
};

export default WeatherCard;
