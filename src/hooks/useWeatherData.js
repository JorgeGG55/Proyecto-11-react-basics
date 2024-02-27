import { useEffect, useReducer } from 'react';
import axios from 'axios';

const initialState = {
  latitude: null,
  longitude: null,
  weatherData: null,
  dailyForecast: [],
  locationInfo: {},
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude
      };
    case 'SET_WEATHER_DATA':
      return {
        ...state,
        weatherData: action.payload
      };
    case 'SET_DAILY_FORECAST':
      return {
        ...state,
        dailyForecast: action.payload
      };
    case 'SET_LOCATION_INFO':
      return {
        ...state,
        locationInfo: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

const useWeatherData = (API_KEY) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
    const fetchWeather = async () => {
      try {
        const { latitude, longitude } = state;
        if (latitude && longitude) {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
          );
          dispatch({ type: 'SET_WEATHER_DATA', payload: response.data });
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: 'SET_ERROR', payload: 'Error fetching weather data.' });
      }
    };

    const fetchForecast = async () => {
      try {
        const { latitude, longitude } = state;
        if (latitude && longitude) {
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

          dispatch({ type: 'SET_DAILY_FORECAST', payload: Object.values(filteredForecast) });
          dispatch({
            type: 'SET_LOCATION_INFO',
            payload: {
              name: response.data.city.name,
              country: response.data.city.country
            }
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: 'SET_ERROR', payload: 'Error fetching forecast data.' });
      }
    };

    fetchWeather();
    fetchForecast();
  }, [state.latitude, state.longitude, API_KEY]);

  return { ...state };
};

export default useWeatherData;
