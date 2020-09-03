import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tempCelsius: 0,
      location: ''
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
      if(response.ok){
        return response.json();
      } else {
        throw new Error(Response.statusText);
      }
    })
    .then(weatherJSON => {
      this.setState({tempCelsius: weatherJSON.tempCelsius});
      this.setState({location: weatherJSON.location})
    })
    .catch(error => console.log(error));
  }

  render(){
    return <section>
      <h1>freeCodeCamp Take Home Projects - Show the Local Weather</h1>
      <CurrentTemp tempCelsius={this.state.tempCelsius} location={this.state.location}/>
    </section>
  }
}

const CurrentTemp = (props) => {
return <div>
  <h2>{props.location}</h2>
  <p>{props.tempCelsius}&deg;C</p>
</div>;
}

export default App;