import React, { createContext, useState } from "react"

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [weatherInfo, setWeatherInfo] = useState("");
  const [temperatureData, setTemperatureData] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  return (
    <Context.Provider value={{
      weatherInfo: [weatherInfo, setWeatherInfo],
      temperatureData: [temperatureData, setTemperatureData],
      currentLocation: [currentLocation, setCurrentLocation],
      isFetching: [isFetching, setIsFetching],
    }}>{children}</Context.Provider>
  )
}
