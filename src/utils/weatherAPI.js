import axios from 'axios';

const API_KEY = '8aa9acc3df268e90c8c4e6457d3254ab';

export const fetchWeatherData = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching weather data.');
  }
};

export const fetchForecastData = async (latitude, longitude) => {
  try {
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

    return {
      dailyForecast: Object.values(filteredForecast),
      locationInfo: {
        name: response.data.city.name,
        country: response.data.city.country
      }
    };
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching forecast data.');
  }
};

export const fetchCitieForecast = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
