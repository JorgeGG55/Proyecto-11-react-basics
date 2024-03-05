import { useEffect, useReducer } from 'react';
import weatherReducer, { initialState } from './weatherReducer';
import { fetchWeatherData, fetchCitieForecast } from './weatherAPI';

const useWeatherData = (fetchWeather, fetchForecast) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch({ type: 'SET_LOCATION', payload: { latitude, longitude } });
        },
        (error) => {
          console.error(error);
          dispatch({
            type: 'SET_ERROR',
            payload:
              'Geolocation permission denied. Please enable geolocation to use the application.'
          });
        }
      );
    };

    getLocation();
  }, []);

  useEffect(() => {
    const { latitude, longitude } = state;
    if (latitude !== null && longitude !== null) {
      fetchWeather(latitude, longitude)
        .then((weatherData) => dispatch({ type: 'SET_WEATHER_DATA', payload: weatherData }))
        .catch((error) => dispatch({ type: 'SET_ERROR', payload: 'Error fetching weather data.' }));

      fetchForecast(latitude, longitude)
        .then((forecastData) => {
          dispatch({ type: 'SET_DAILY_FORECAST', payload: forecastData.dailyForecast });
          dispatch({ type: 'SET_LOCATION_INFO', payload: forecastData.locationInfo });
        })
        .catch((error) =>
          dispatch({ type: 'SET_ERROR', payload: 'Error fetching forecast data.' })
        );
    }
  }, [state.latitude, state.longitude]);

  return { ...state };
};

const fetchWeatherAndForecast = async (latitude, longitude, setWeatherData, setForecastData) => {
  try {
    const weatherData = await fetchWeatherData(latitude, longitude);
    const forecastData = await fetchCitieForecast(latitude, longitude);

    setWeatherData(weatherData);
    setForecastData(forecastData);
  } catch (error) {
    console.error(error);
  }
};

export { useWeatherData, fetchWeatherAndForecast };
