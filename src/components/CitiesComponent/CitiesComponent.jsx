import React, { useState, useEffect } from 'react';
import { fetchWeatherAndForecast } from '../../utils/useWeatherData';
import CitySelector from './CitySelector/CitySelector';
import ForecastDay from './ForecastDay/ForecastDay';
import LocationHeader from '../LocationHeader/LocationHeader';
import './CitiesComponent.css';

const CitiesComponent = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    if (selectedCity) {
      const { latitude, longitude } = JSON.parse(selectedCity);
      fetchWeatherAndForecast(latitude, longitude, setWeatherData, setForecastData);
    }
  }, [selectedCity]);

  const groupForecastByDay = () => {
    const groupedByDay = {};
    if (forecastData && forecastData.list) {
      forecastData.list.forEach((item) => {
        const date = item.dt_txt.split(' ')[0];
        if (!groupedByDay[date]) {
          groupedByDay[date] = [];
        }
        groupedByDay[date].push(item);
      });
    }
    return groupedByDay;
  };

  return (
    <div>
      <CitySelector onCitySelect={setSelectedCity} />

      {forecastData && (
        <div className="forecastContainer">
          <h2 className="forecastTitle">
            5-Day Forecast -{' '}
            <LocationHeader cityName={weatherData.name} country={weatherData.sys.country} />
          </h2>
          <div className="forecastDays">
            {Object.entries(groupForecastByDay()).map(([date, items]) => (
              <ForecastDay key={date} date={date} items={items} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CitiesComponent;
