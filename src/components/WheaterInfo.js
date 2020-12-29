import React, { useContext, useEffect } from 'react';
import Loader from "./Loader";
import Icon from "./Icon";
import { Context } from "./Context"
import axios from "axios"
import Swal from 'sweetalert2'
import './WheaterInfo.css';

function getCurrentDay() {
  let date = new Date();
  let options = { weekday: 'long' };
  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

const WheaterInfo = () => {
  const {
    weatherInfo,
    temperatureData,
    currentLocation,
    isFetching,
  } = useContext(Context)

  const [_weatherInfo, _setWeatherInfo] = weatherInfo;
  const [_temperatureData, _setTemperatureData] = temperatureData;
  const [_currentLocation, _setCurrentLocation] = currentLocation;
  const [_isFetching, _setIsFetching] = isFetching;
  const currentLocationText = `${_currentLocation.city_district}, ${_currentLocation.city}`
  const weatherDescription = `${getCurrentDay()} • ${_weatherInfo.description}`
  const temperature = _temperatureData.temp ? `${_temperatureData.temp.toFixed(0)}` : ""

  function getLocation(lat, long) {
    const locationIQToken = "pk.9603f39fdc0c5467f78b985c55349fb1";
    const locationIQApiUrl = `https://us1.locationiq.com/v1/reverse.php?key=${locationIQToken}&lat=${lat}&lon=${long}&format=json`;

    axios(locationIQApiUrl)
      .then(res => {
        console.log("res.data.address =>", res.data.address)
        _setCurrentLocation(res.data.address)
        _setIsFetching(false);
        console.log("_currentLocation =>", _currentLocation)
      })
  }

  function getWheaterData() {
    _setIsFetching(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const wheaterApiKey = "7664f5403c235171315453a76f72e8d8";
      const wheaterApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${wheaterApiKey}`

      axios(wheaterApiUrl)
        .then(res => {
          _setWeatherInfo(res.data.weather[0]);
          _setTemperatureData(res.data.main);
          getLocation(latitude, longitude);
        }).catch(function (error) {
          console.log(error);
        })

    }, function (error) {
      Swal.fire({
        title: "Erro!",
        text: `Error Code = ${error.code} - ${error.message}`,
        icon: "error",
        confirmButtonText: 'Okay'
      })
    });
  }

  function renderWeatherInfo() {
    return (
      <>
        <div className="weather-info-header">
          <h2>{currentLocationText}</h2>
          <p className="wheater-description">{weatherDescription}</p>
        </div>

        <div className="weather-info-body">
          <div className="weather-info-body-left">
            <Icon />
            <div className="weather-info-temperature">
              <div>{temperature}</div>
              <div>ºC</div>
            </div>
          </div>

          <div>
            <div>Umidade: {_temperatureData.humidity}%</div>
            <div>Pressão: {_temperatureData.pressure}</div>
          </div>
        </div>

        <div className="weather-info-Footer">
          {/*<button
          className="btn btn-light"
          onClick={() => updateWeather()}
        >
          Atualizar
        </button>*/}
        </div>
      </>
    )
  }

  useEffect(() => {
    getWheaterData();
  }, [])

  return (
    <div className="weather-info">
      {
        _isFetching && <Loader />
      }

      {
        _isFetching === false && renderWeatherInfo()
      }
    </div>
  );
}

export default WheaterInfo

