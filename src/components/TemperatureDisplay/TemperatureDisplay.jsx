import React from 'react';
import './TemperatureDisplay.css';

const TemperatureDisplay = ({ temperature, weatherIcon }) => (
  <div className="tempContainer">
    <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt="Weather Icon" />
    <p className="localTemp">{temperature.toFixed(0)}°C</p>
  </div>
);

export default TemperatureDisplay;
