import React from 'react';
import './WeatherTableRow.css';

const WeatherTableRow = ({ label, value }) => (
  <tr>
    <td className="tableLabel">{label}:</td>
    <td>{value}</td>
  </tr>
);

export default WeatherTableRow;
