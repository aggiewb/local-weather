import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      tempCelsius: 0,
      tempFahrenheit: 0,
      currentTempUnit: '',
      location: '',
      type: '',
      errorMessage: ''
    }
    this.calculateFahrenheit = this.calculateFahrenheit.bind(this);
  }

  componentDidMount(){
    window.addEventListener('load', () => this.handleLoad());
  }

  handleLoad(){
    navigator.geolocation.getCurrentPosition(position => this.success(position));
  }

  handleTempUnitToggle(){
    this.setState({currentTempUnit: this.state.currentTempUnit === 'C' ? 'F' : 'C'})
  }

  calculateFahrenheit(celsiusTemp){
    return celsiusTemp / 5 * 9 + 32;
  } 

  success(position){
    const coordinates = position.coords;
    const longitude = coordinates.longitude;
    const latitude = coordinates.latitude;
    fetch(`https://www.aggiewb.com/local-weather-server/${longitude}/${latitude}`, {
      method: 'GET',
    })
    .then(response => {
      if(response.ok){
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then(weatherJSON => {
      const weatherJSONKeys = Object.keys(weatherJSON);
      for(let i = 0; i < weatherJSONKeys.length; i++){
        this.setState({[weatherJSONKeys[i]]: weatherJSON[weatherJSONKeys[i]]});
      }
      this.setState({tempFahrenheit: this.calculateFahrenheit(this.state.tempCelsius)})
      this.setState({currentTempUnit: 'C'})
    })
    .catch(error => this.setState({errorMessage: error.message}));
  }

  render(){
    const error = <p>{this.state.errorMessage}</p>;
    const content = <section>
      <h1>freeCodeCamp Take Home Projects - Show the Local Weather</h1>
      <CurrentLocation location={this.state.location}/>
      <Temp tempCelsius={this.state.tempCelsius} tempFahrenheit={this.state.tempFahrenheit} unit={this.state.currentTempUnit}/>
      <TempUnit unit={this.state.currentTempUnit} unitToggle={() => this.handleTempUnitToggle()}/>
      <WeatherDescription type={this.state.type}/>
      <Footer />
      <Attributions />
    </section>;
    return this.state.errorMessage ? error : content;
  }
}

export const LOADING_MESSAGE = 'Loading weather...';
export const CurrentLocation = props => {
  return <h2>
    {props.location ? props.location : LOADING_MESSAGE}
  </h2>;
}

export const Temp = props => {
  return <span>
    {props.unit && <p className="temp">{Math.round(props.unit === 'C' ? props.tempCelsius : props.tempFahrenheit)}&deg;</p>}
  </span>;
}

export const TempUnit = props => {
  return <span onClick={props.unitToggle}>
    {props.unit && <button>{props.unit}</button>}
  </span>;
}

export const WeatherDescription = props => {
  const weatherImages = {};

  ['Thunderstorm', 'Drizzle', 'Rain', 'Snow', 'Tornado', 'Squall', 'Dust', 'Smoke', 'Clear', 'Clouds'].forEach(type => {
    weatherImages[type] = `/local-weather/weather_icons/${type.toLowerCase()}.png`;
  });

  ['Mist', 'Haze', 'Fog', 'Sand', 'Ash'].forEach(type => {
    weatherImages[type] = '/local-weather/weather_icons/atmosphere.png';
  });
  
  return <div>
    <div><img src={weatherImages[props.type]} alt={props.type}/></div>
    {props.type && <p>{props.type}</p>}
  </div>;
}

const Attributions = () => {
  return <aside>
    <h3>Images By</h3>
    <p><a href="https://commons.wikimedia.org/wiki/File:Weather_Icons.png" rel="noreferrer noopener" target="_blank">Matthew Petroff</a></p>
    <p><a href="https://thenounproject.com/search/?creator=307441&q=weather&i=1346984" rel="noreferrer noopener" target="_blank">Atif Arshad</a></p>
    <p>License: <a href="https://en.wikipedia.org/wiki/Creative_Commons" rel="noreferrer noopener" target="_blank">Creative Commons</a></p>
  </aside>;
}

const Footer = () => {
  return <footer>
    <a href="https://www.aggiewb.com" rel="noreferrer noopener" target="_blank">Aggie Wheeler Bateman</a> &copy; {new Date().getFullYear()}
  </footer>;
}