import React from 'react';
import LocationHeader from '../LocationHeader/LocationHeader';
import { useWeatherData } from '../../utils/useWeatherData';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import TemperatureDisplay from '../TemperatureDisplay/TemperatureDisplay';
import WeatherTable from '../WeatherTable/WeatherTable';
import { fetchWeatherData, fetchForecastData } from '../../utils/weatherAPI';
import './PersonalWheather.css';

const PersonalWeatherComponent = () => {
  const { weatherData, error } = useWeatherData(fetchWeatherData, fetchForecastData);

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (!weatherData) {
    return null;
  }

  return (
    <div className="personalTempContainer">
      <h2>
        <LocationHeader cityName={weatherData.name} country={weatherData.sys.country} />
      </h2>
      <TemperatureDisplay
        temperature={weatherData.main.temp - 273}
        weatherIcon={weatherData.weather[0].icon}
      />
      <WeatherTable weatherData={weatherData} />
    </div>
  );
};

export default PersonalWeatherComponent;
