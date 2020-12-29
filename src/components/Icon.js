import React, { useContext } from "react"
import { Context } from "./Context"
import "./Icon.css"

const Icon = ({ className }) => {
  const { weatherInfo } = useContext(Context)
  const [_weatherInfo] = weatherInfo
  const wheaterIcon = `https://openweathermap.org/img/wn/${_weatherInfo.icon}@2x.png`
  return (
    <img className={`icon ${className}`} src={wheaterIcon} />
  )
}

export default Icon