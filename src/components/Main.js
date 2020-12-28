import React, { useState, useEffect } from "react"
import Loader from "./Loader";
import Error from "./Error";
import WheaterInfo from "./WheaterInfo";
import axios from "axios"
import Swal from 'sweetalert2'
import "./Main.css"

const Main = () => {
  const [weatherInfo, setWeatherInfo] = useState("");
  const [temperatureData, setTemperatureData] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [fetch, setFetch] = useState(false);
  const [error, setError] = useState(false);

  function getLocation(lat, long) {
    const locationIQToken = "pk.9603f39fdc0c5467f78b985c55349fb1";
    const locationIQApiUrl = `https://us1.locationiq.com/v1/reverse.php?key=${locationIQToken}&lat=${lat}&lon=${long}&format=json`;

    axios(locationIQApiUrl)
      .then(res => {
        setCurrentLocation(res.data.address)
        setIsFetching(false);
      })
  }

  function getWheaterData() {
    setIsFetching(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const wheaterApiKey = "7664f5403c235171315453a76f72e8d8";
      const wheaterApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${wheaterApiKey}`

      axios(wheaterApiUrl)
        .then(res => {
          setWeatherInfo(res.data.weather[0]);
          setTemperatureData(res.data.main);
          getLocation(latitude, longitude);
        }).catch(function (error) {
          console.log(error);
        })

    }, function (error) {
      Swal.fire({
        title: "Erro!",
        text: "Error Code = " + error.code + " - " + error.message,
        icon: "error",
        confirmButtonText: 'okay'
      })
    });
  }

  useEffect(() => {
    getWheaterData();
  }, [])

  return (
    <main className="main">
      <div className="main-inner">
        {
          isFetching === false &&
          <WheaterInfo
            currentLocation={currentLocation}
            temperatureData={temperatureData}
            weatherInfo={weatherInfo}
            updateWeather={getWheaterData}
          />
        }

        {
          isFetching && <Loader />
        }

        {error &&
          <Error />
        }
      </div>
    </main>
  )
}

export default Main