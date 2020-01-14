import React, { Component } from 'react';
import ajax from '@fdaciuk/ajax'
import './App.css';

/*
 API KEY -> 7664f5403c235171315453a76f72e8d8
*/

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      city: "",
      weatherInfo: null,
      isFetching: false
    }
  }

  openWeatherApi(city){
    return `api.openweathermap.org/data/2.5/forecast?q=${city}`;
  }

  handleSearch(e){
    e.preventDefault();
    const value = e.target.value;

    this.setState({
      city: value
    })
  }

  render() {
    return (
      <div className="App">
        <form>
          <input type="text" placeholder="Busca por cidade" />
          <button className="button">Procurar</button>
        </form>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>

        <div className="tempo">
          <h2 className="cidade">{this.state.city}</h2>
          <h3>Dia da semana 31 de Mês de 2019</h3>

          <div className="tempo-content">
            <div>
              <div>Mínima</div>
              <span>{this.state.weatherInfo.temp_min}</span>
            </div>
            <div>
              <div>{this.state.weatherInfo.temp}</div>
              <span>Parcialmente Nublado</span>
            </div>
            <div>
              <div>Mínima</div>
              <span>{this.state.weatherInfo.temp_max}</span>
            </div>
          </div>

          <div class="tempo-footer">
            <div>
              <span>Umidade</span>
              <span>20%</span>
            </div>

            <div>
              <span>Nascer do Sol</span>
              <span>6:30</span>
            </div>

            <div>
              <span>Pôr do sol</span>
              <span>20:10</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
