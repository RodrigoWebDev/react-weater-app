import React from "react"
import heartIcon from "../assets/heart-solid.svg"
import "./Footer.css"

const Footer = () => (
  <footer className="footer">
    Desenvolvido com <img src={heartIcon} alt="Amor" /> e <a target="_blank" href="https://openweathermap.org/api">OpenWeather</a>
  </footer>
)

export default Footer