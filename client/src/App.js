import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tempCelsius: 0,
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
      console.log(this.state.type, this.state.icon);
    })
    .catch(error => console.log(error));
  }

  render(){
    return <section>
      <h1>freeCodeCamp Take Home Projects - Show the Local Weather</h1>
      <CurrentTemp tempCelsius={this.state.tempCelsius} location={this.state.location}/>
      <WeatherDescription type={this.state.type}/>
    </section>
  }
}

const CurrentTemp = props => {
return <div>
  <h2>{props.location ? props.location : 'Loading weather...'}</h2>
  {props.location && <p>{props.tempCelsius}&deg;C</p>}
</div>;
}

const WeatherDescription = props => {
  return <div>
    <p>{props.type}</p>
  </div>;
}

export default App;