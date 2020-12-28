import React from 'react';
import './WheaterInfo.css';

function getCurrentDay() {
  let date = new Date();
  let options = { weekday: 'long' };
  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

const WheaterInfo = ({ currentLocation, temperatureData, weatherInfo, updateWeather }) => {
  const _currentLocation = `${currentLocation.city_district}, ${currentLocation.city}`
  const weatherDescription = `${getCurrentDay()} • ${weatherInfo.description}`
  const wheaterIcon = `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`
  const temperature = temperatureData.temp ? `${temperatureData.temp.toFixed(0)}` : ""

  return (
    <div className="weather-info">
      <div className="weather-info-header">
        <h2>{_currentLocation}</h2>
        <p className="wheater-description">{weatherDescription}</p>
      </div>

      <div className="weather-info-body">
        <div className="weather-info-body-left">
          <img src={wheaterIcon} />
          <div className="weather-info-temperature">
            <div>{temperature}</div>
            <div>ºC</div>
          </div>

        </div>

        <div>
          <div>Umidade: {temperatureData.humidity}%</div>
          <div>Pressão: {temperatureData.pressure}</div>
        </div>
      </div>

      <div className="weather-info-Footer">
        <button
          className="btn btn-light"
          onClick={() => updateWeather()}
        >
          Atualizar
        </button>
      </div>
    </div>
  );
}

export default WheaterInfo

