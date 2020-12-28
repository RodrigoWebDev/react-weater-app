import React from "react"
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="luxbar">
      <input type="checkbox" id="luxbar-checkbox" className="luxbar-checkbox" />
      <div className="luxbar-menu luxbar-menu-right luxbar-menu-dark">
        <ul className="luxbar-navigation">
          <li className="luxbar-header">
            <a className="luxbar-brand" href="#">Weather App</a>
            <label className="luxbar-hamburger"
              htmlFor="luxbar-checkbox"> <span></span> </label>
          </li>
          <li className="luxbar-item"><a href="https://github.com/RodrigoWebDev/react-wheater-app-builders" target="_blank">Código Fonte</a></li>
          <li className="luxbar-item"><a href="https://github.com/RodrigoWebDev/" target="_blank">Autor</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar