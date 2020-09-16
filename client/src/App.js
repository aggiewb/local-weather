import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      tempCelsius: 0,
      tempFahrenheit: 0,
      currentTempUnit: '',
      location: '',
      type: '',
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
    console.log('in success')
    const coordinates = position.coords;
    const longitude = coordinates.longitude;
    const latitude = coordinates.latitude;
    fetch(`/${longitude}/${latitude}`, {
      method: 'GET',
    })
    .then(response => {
      if(response.ok){
        return response.json();
      } else {
        throw new Error(Response.statusText);
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
    .catch(error => console.log(error));
  }

  render(){
    return <section>
      <h1>freeCodeCamp Take Home Projects - Show the Local Weather</h1>
      <CurrentLocation location={this.state.location}/>
      <Temp tempCelsius={this.state.tempCelsius} tempFahrenheit={this.state.tempFahrenheit} unit={this.state.currentTempUnit}/>
      <TempUnit unit={this.state.currentTempUnit} unitToggle={() => this.handleTempUnitToggle()}/>
      <WeatherDescription type={this.state.type}/>
      <Footer />
    </section>
  }
}

const CurrentLocation = props => {
  return <h2>
    {props.location ? props.location : 'Loading weather...'}
  </h2>;
}

const Temp = props => {
  return <span>
    {props.unit && <p class="temp">{Math.round(props.unit === 'C' ? props.tempCelsius : props.tempFahrenheit)}&deg;</p>}
  </span>;
}

const TempUnit = props => {
  return <span onClick={props.unitToggle}>
    {props.unit && <button>{props.unit === 'C' ? 'C' : 'F'}</button>}
  </span>;
}

const WeatherDescription = props => {
  const weatherImages = {};

  ['Thunderstorm', 'Drizzle', 'Rain', 'Snow', 'Tornado', 'Squall', 'Dust', 'Smoke', 'Clear', 'Clouds'].forEach(type => {
    weatherImages[type] = `../weather_icons/${type.toLowerCase()}.png`;
  });

  ['Mist', 'Haze', 'Fog', 'Sand', 'Ash'].forEach(type => {
    weatherImages[type] = '../weather_icons/atmosphere.png';
  });
  
  return <div>
    <div><img src={weatherImages[props.type]} alt={props.type}/></div>
    {props.type && <p>{props.type}</p>}
  </div>;
}

const Footer = () => {
  return <footer>
    <a href="https://www.aggiewheelerbateman.com" rel="noreferrer noopener" target="_blank">Aggie Wheeler Bateman</a> &copy; {new Date().getFullYear()}
  </footer>;
}

export default App;