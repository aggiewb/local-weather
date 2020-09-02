import React from 'react';
import './App.css';

class App extends React.Component {
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
    .then(weatherJSON => console.log(weatherJSON.tempCelsius));
  }

  render(){
    return <Hello />;
  }
}

const Hello = () => {
return <div>
  <h1>Hello World</h1>
</div>;
}

export default App;