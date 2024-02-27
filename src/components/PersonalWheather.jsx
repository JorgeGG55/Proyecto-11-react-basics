import React from 'react';
import useWeatherData from '../hooks/useWeatherData';

const API_KEY = '8aa9acc3df268e90c8c4e6457d3254ab';

const ElementoTabla = ({ label, value }) => (
  <tr>
    <td className="tableLabel">{label}:</td>
    <td>{value}</td>
  </tr>
);

const PersonalWeather = () => {
  const { weatherData, error } = useWeatherData(API_KEY);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {weatherData && (
            <div className="personalTempContainer">
              <h2>
                {weatherData.name}, {weatherData.sys.country}
              </h2>
              <div className="tempContainer">
                <img
                  src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
                <p className="localTemp">{(weatherData.main.temp - 273).toFixed(0)}°C</p>
              </div>
              <div>
                <table className="weatherTable">
                  <tbody>
                    <ElementoTabla
                      label="Feels like"
                      value={(weatherData.main.feels_like - 273).toFixed(2) + '°C'}
                    />
                    <ElementoTabla label="Humidity" value={weatherData.main.humidity + '%'} />
                    <ElementoTabla label="Pressure" value={weatherData.main.pressure + ' hPa'} />
                    <ElementoTabla
                      label="Max Temperature"
                      value={(weatherData.main.temp_max - 273).toFixed(2) + '°C'}
                    />
                    <ElementoTabla
                      label="Min Temperature"
                      value={(weatherData.main.temp_min - 273).toFixed(2) + '°C'}
                    />
                    <ElementoTabla label="Wind Speed" value={weatherData.wind.speed + ' m/s'} />
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PersonalWeather;
