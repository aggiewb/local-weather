import React from 'react';
import './App.css';

class App extends React.Component {
  componentDidMount(){
    window.addEventListener('load', () => this.handleLoad());
  }

  handleLoad(){
    navigator.geolocation.getCurrentPosition(position => this.success(position))
  }

  //TODO: fetch api in ./server which fetches the freeCodeCamp api
  success(position){
    const coordinates = position.coords;
    const longitude = coordinates.longitude;
    const latitude = coordinates.latitude;
  }

  render(){
    return <Hello />
  }
}

const Hello = () => {
return <div>
  <h1>Hello World</h1>
</div>;
}

export default App;