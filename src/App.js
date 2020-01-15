import React, { Component } from 'react';
import axios from "axios"
import './App.css';
import wheaterIcon from "./wheater.png"

/*
 API KEY -> 7664f5403c235171315453a76f72e8d8
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      weatherInfo: null,
      isFetching: false,
      fetch: false,
      error: false
    }

    this.handleChange = (e) => {
      console.log("handleChange");
      const value = e.target.value;

      this.setState({
        city: value
      })
    }

    this.openWeatherApi = (city) => {
      const apiKey = "7664f5403c235171315453a76f72e8d8";
      return `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;
    }

    this.handleSubmit = (e) => {
      e.preventDefault();
      const value = this.state.city
      const self = this;

      self.setState({ isFetching: true, error: false });

      axios.get(this.openWeatherApi(value))
      .then(function(res){
        console.log("response > ", res);
        
        let main = res.data.list[0].main
        let city = res.data.city

        self.setState({ 
          isFetching: false, 
          fetch: true ,
          weatherInfo: {
            temp: main.temp,
            temp_min: main.temp_min,
            temp_max: main.temp_max,
            wheater: res.data.list[0].weather[0].description,
            humidity: main.humidity,
            sunrise: self.formatTimeStamp(city.sunrise),
            sunset: self.formatTimeStamp(city.sunset),
            date: res.data.list[0].dt_txt
          }
        });
      })
      .catch(function(err){
        console.log("error > ", err);
        self.setState({ isFetching: false, error: true });
      })
      .finally(function(){
      })
    }

    this.formatTimeStamp = (timeStamp) => {
      let unix_timestamp = timeStamp;
      let date = new Date(unix_timestamp * 1000);
      let hours = date.getHours();
      let minutes = "0" + date.getMinutes();
      let seconds = "0" + date.getSeconds();

      let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      console.log(formattedTime);
      return formattedTime;
    }
  }

  render() {
    return (
      <div className="App">
        {!this.state.fetch &&
          <form onSubmit={this.handleSubmit} class="search">
              <input onChange={this.handleChange} type="text" placeholder="Busca por cidade" />
              <button className="button" type="submit">Procurar</button>
          </form>
        }

        {this.state.isFetching &&
          <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        }

        {this.state.fetch &&
          <div className="wheater">
            <h2 className="city">{this.state.city}</h2>
            <h3>{this.state.weatherInfo.date}</h3>

            <div className="whater-content">
              <div>
                <div>Mínima</div>
                <span>{this.state.weatherInfo.temp_min}ºC</span>
              </div>
              <div>
                <img src={wheaterIcon} alt="wheater icon"/>
                <span>{this.state.weatherInfo.temp}ºC</span>
                <div>{this.state.weatherInfo.wheater}</div>
              </div>
              <div>
                <div>Máxima</div>
                <span>{this.state.weatherInfo.temp_max}ºC</span>
              </div>
            </div>

            <div class="wheater-footer">
              <div>
                <span>Umidade</span>
                <span>{this.state.weatherInfo.humidity}%</span>
              </div>

              <div>
                <span>Nascer do Sol</span>
                <span>{this.state.weatherInfo.sunrise}</span>
              </div>

              <div>
                <span>Pôr do sol</span>
                <span>{this.state.weatherInfo.sunset}</span>
              </div>
            </div>
          </div>
        }

        {this.state.error && 
        <div className="error">
          <h2>Ops! Ocorreu um erro. Por favor, tente novamente</h2>
          </div>
        }

      </div>
    );
  }
}

export default App;
