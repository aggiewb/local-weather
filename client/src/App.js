import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tempCelsius: 0
    }
  }

  componentDidMount(){
    window.addEventListener('load', () => this.handleLoad());
  }

  handleLoad(){
    navigator.geolocation.getCurrentPosition(position => this.success(position));
  }

  //TODO: Use weatherJSON to setState to a temp property
  success(position){
    const coordinates = position.coords;
    const longitude = coordinates.longitude;
    const latitude = coordinates.latitude;
    fetch(`/${longitude}/${latitude}`, {
      method: 'GET',
    })
    .then(response => {
      return response.json();
    })
    .then(weatherJSON => this.setState({tempCelsius: weatherJSON.tempCelsius}));
  }

  render(){
    return <CurrentTemp tempCelsius={this.state.tempCelsius} />;
  }
}

const CurrentTemp = (props) => {
return <div>
  <h2>Temperature in your location:</h2>
  <p>{props.tempCelsius}</p>
</div>;
}

export default App;