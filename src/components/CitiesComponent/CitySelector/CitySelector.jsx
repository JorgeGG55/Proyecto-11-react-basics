import React from 'react';

const initialCities = [
  { name: 'New York', latitude: 40.7128, longitude: -74.006, country: 'US' },
  { name: 'Saint-Jean-de-Luz', latitude: 43.3891, longitude: -1.6581, country: 'FR' },
  { name: 'Amsterdam', latitude: 52.374, longitude: 4.8897, country: 'NL' },
  { name: 'Gotha', latitude: 50.9482, longitude: 10.7019, country: 'DE' },
  { name: 'Helsinki', latitude: 60.1695, longitude: 24.9355, country: 'FI' }
];

const CitySelector = ({ onCitySelect }) => (
  <div className="selectContainer">
    <h2>Cities</h2>
    <select onChange={(e) => onCitySelect(e.target.value)}>
      <option value="">Select a city</option>
      {initialCities.map((city) => (
        <option key={city.name} value={JSON.stringify(city)}>
          {city.name}, {city.country}
        </option>
      ))}
    </select>
  </div>
);

export default CitySelector;
