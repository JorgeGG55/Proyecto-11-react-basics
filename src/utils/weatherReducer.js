export const initialState = {
  latitude: null,
  longitude: null,
  weatherData: null,
  dailyForecast: [],
  locationInfo: {},
  error: null
};

const weatherReducer = (state, action) => {
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

export default weatherReducer;
