import React, { useContext } from "react"
import WheaterInfo from "./WheaterInfo";
import "./Main.css"

const Main = () => {
  return (
    <main className="main">
      <div className="main-inner">
        <WheaterInfo />
      </div>
    </main>
  )
}

export default Main