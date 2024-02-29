import React from 'react';
import useWeatherData from '../../hooks/useWeatherData';
import './LocalForecast.css';

const API_KEY = '8aa9acc3df268e90c8c4e6457d3254ab';

const LocalForecast = () => {
  const { dailyForecast, locationInfo, error } = useWeatherData(API_KEY);

  return (
    <div className="localForecastContainer">
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {dailyForecast.length > 0 && (
            <div>
              <h2 className="forecastTitle">
                5-Day Local Forecast - {locationInfo.name}, {locationInfo.country}
              </h2>
              <div className="cardContainer">
                {dailyForecast.map((item) => (
                  <div key={item.dt} className="card">
                    <p className="date">{new Date(item.dt * 1000).toLocaleDateString()}</p>
                    <img
                      src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                      alt="Weather Icon"
                    />
                    <p>{(item.main.temp - 273).toFixed(0)}°C</p>
                    <p>{item.weather[0].description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LocalForecast;
