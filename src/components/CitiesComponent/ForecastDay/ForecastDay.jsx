import React from 'react';

const ForecastDay = ({ date, items }) => (
  <div className="dayColumn">
    <h3>{date}</h3>
    <div className="citieTempContainer">
      {items.map((item) => (
        <div key={item.dt_txt} className="tempCard">
          <p className="tempTime">{item.dt_txt.split(' ')[1]}</p>
          <div className="citieTempContainer">
            <img
              src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
              alt="Weather Icon"
            />
            <p className="citieTemp">{(item.main.temp - 273).toFixed(0)}°C</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ForecastDay;
