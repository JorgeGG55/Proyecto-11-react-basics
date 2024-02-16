import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

const API_KEY = '8aa9acc3df268e90c8c4e6457d3254ab';

const initialState = {
  latitude: null,
  longitude: null,
  dailyForecast: [],
  locationInfo: {},
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_COORDINATES':
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude
      };
    case 'SET_FORECAST':
      return {
        ...state,
        dailyForecast: action.payload.forecast,
        locationInfo: action.payload.locationInfo
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload.error
      };
    default:
      return state;
  }
};

const LocalForecast = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch({ type: 'SET_COORDINATES', payload: { latitude, longitude } });
        },
        (error) => {
          console.error(error);
          dispatch({
            type: 'SET_ERROR',
            payload: {
              error:
                'Geolocation permission denied. Please enable geolocation to use the application.'
            }
          });
        }
      );
    };

    getLocation();
  }, []);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const { latitude, longitude } = state;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
        );

        const filteredForecast = response.data.list.reduce((acc, item) => {
          const date = item.dt_txt.split(' ')[0];
          if (!acc[date]) {
            acc[date] = item;
          }
          return acc;
        }, {});

        dispatch({
          type: 'SET_FORECAST',
          payload: {
            forecast: Object.values(filteredForecast),
            locationInfo: {
              name: response.data.city.name,
              country: response.data.city.country
            }
          }
        });
      } catch (error) {
        console.error(error);
        dispatch({ type: 'SET_ERROR', payload: { error: 'Error fetching forecast data.' } });
      }
    };

    if (state.latitude && state.longitude) {
      fetchForecast();
    }
  }, [state.latitude, state.longitude]);

  return (
    <div className="localForecastContainer">
      {state.error ? (
        <p>{state.error}</p>
      ) : (
        <>
          {state.dailyForecast.length > 0 && (
            <div>
              <h2 className="forecastTitle">
                5-Day Local Forecast - {state.locationInfo.name}, {state.locationInfo.country}
              </h2>
              <div className="cardContainer">
                {state.dailyForecast.map((item) => (
                  <div key={item.dt} className="card">
                    <p className="date">{new Date(item.dt * 1000).toLocaleDateString()}</p>
                    <img
                      src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                      alt="Weather Icon"
                      className="icon"
                    />
                    <p className="temperature">{(item.main.temp - 273).toFixed(0)}°C</p>
                    <p className="weatherDescription">{item.weather[0].description}</p>
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
