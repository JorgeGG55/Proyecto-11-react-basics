import React from 'react';
import LocationHeader from '../LocationHeader/LocationHeader';
import WeatherCard from './WeatherCard/WeatherCard';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import { useWeatherData } from '../../utils/useWeatherData';
import { fetchWeatherData, fetchForecastData } from '../../utils/weatherAPI';
import './LocalForecast.css';

const LocalForecastComponent = () => {
  const { dailyForecast, locationInfo, error } = useWeatherData(
    fetchWeatherData,
    fetchForecastData
  );

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (!dailyForecast.length) {
    return null;
  }

  return (
    <div className="localForecastContainer">
      <div>
        <h2 className="forecastTitle">
          5-Day Local Forecast -{' '}
          <LocationHeader cityName={locationInfo.name} country={locationInfo.country} />
        </h2>
        <div className="cardContainer">
          {dailyForecast.map((item) => (
            <WeatherCard key={item.dt} weatherData={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalForecastComponent;
