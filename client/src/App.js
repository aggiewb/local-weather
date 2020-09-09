import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tempCelsius: 0,
      tempFahrenheit: 0,
      currentTempUnit: 'C',
      location: '',
      type: '',
    }
  }

  componentDidMount(){
    window.addEventListener('load', () => this.handleLoad());
  }

  handleLoad(){
    navigator.geolocation.getCurrentPosition(position => this.success(position));
  }

  handleTempToggle(){

  }

  success(position){
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
      const stateKeys = Object.keys(this.state);
      for(let i = 0; i < stateKeys.length; i++){
        this.setState({[stateKeys[i]]: weatherJSON[stateKeys[i]]});
      }
    })
    .catch(error => console.log(error));
  }

  render(){
    return <section>
      <h1>freeCodeCamp Take Home Projects - Show the Local Weather</h1>
      <CurrentTemp tempCelsius={this.state.tempCelsius} location={this.state.location} unit={this.state.currentTempUnit} tempToggle={() => this.handleTempToggle()}/>
      <WeatherDescription type={this.state.type}/>
    </section>
  }
}

const CurrentTemp = props => {
return <div>
  <h2>{props.location ? props.location : 'Loading weather...'}</h2>
  {props.location 
  && <p class="temp">{props.tempCelsius}&deg;<span><TempUnit unit={props.unit}/></span></p>}
</div>;
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

const TempUnit = props => {
  
}

export default App;