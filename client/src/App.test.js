import React from 'react';
import { shallow, mount } from 'enzyme';
import App, { Temp, TempUnit } from './App';

const EXPECTED_LOCATION = 'Seattle, WA';
const EXPECTED_CELSIUS = 30;
const EXPECTED_FAHRENHEIT = 86;
const CELSIUS_TEMP_UNIT = 'C';
const FAHRENHEIT_TEMP_UNIT = 'F';
const EXPECTED_TYPE = 'Haze';

//recreate events listeners added to the window object to control when it gets called
const eventListeners = {};
window.addEventListener = (eventName, callback) => {
  eventListeners[eventName] = callback;
};

//recreate geolocation and getCurrentPosition objects normally on the navigator object
//but does not exist in global
const geolocation = {};
const getCurrentPosition = (callback) => {
  callback({coords: {longitude: 0, latitude: 0}});
};
geolocation.getCurrentPosition = getCurrentPosition;
navigator.geolocation = geolocation;

//smoke test for rendering of the App
it('renders', () => {
  mount(<App />);
});

//shallow renders the component but none of the React child components
it('should shallow render all child components, and initialize their props', () => {
  const component = shallow(<App />);
  const header = component.find('h1');
  expect(header.exists()).toEqual(true);
  expect(header.text()).toEqual('freeCodeCamp Take Home Projects - Show the Local Weather');
  
  const currentLocation = component.find('CurrentLocation');
  expect(currentLocation.exists()).toEqual(true);
  expect(currentLocation.prop('location')).toEqual('');

  const temp = component.find('Temp');
  expect(temp.exists()).toEqual(true);
  expect(temp.prop('tempCelsius')).toEqual(0);
  expect(temp.prop('tempFahrenheit')).toEqual(0);
  expect(temp.prop('unit')).toEqual('');

  const tempUnit = component.find('TempUnit');
  expect(tempUnit.exists()).toEqual(true);
  expect(tempUnit.prop('unit')).toEqual('');
  expect(tempUnit.prop('unitToggle')).toBeDefined();

  const weatherDescription = component.find('WeatherDescription');
  expect(weatherDescription.exists()).toEqual(true);
  expect(weatherDescription.prop('type')).toEqual('');

  const footer = component.find('Footer');
  expect(footer.exists()).toEqual(true);
});

it('should update child component props after load', (done) => {
  const component = shallow(<App />);
 
  //recreate fetch response to control the data that is to be tested
  const json = () => {
    return new Promise((resolve) => {
      const weatherJSON = {
        tempCelsius: EXPECTED_CELSIUS,
        currentTempUnit: CELSIUS_TEMP_UNIT,
        location: EXPECTED_LOCATION,
        type: EXPECTED_TYPE,
      };
      resolve(weatherJSON);
    });
  };
  
  const response = {
    ok: true,
    json
  };

  fetch = () => {
    return new Promise((resolve) => {
      resolve(response);
    });
  };
  eventListeners.load();
  process.nextTick(() => {
    expect(component.find('CurrentLocation').prop('location')).toEqual(EXPECTED_LOCATION);
    const temp = component.find('Temp');
    expect(temp.prop('unit')).toEqual(CELSIUS_TEMP_UNIT);
    expect(temp.prop('tempFahrenheit')).toEqual(EXPECTED_FAHRENHEIT);
    expect(temp.prop('tempCelsius')).toEqual(EXPECTED_CELSIUS);
    expect(component.find('TempUnit').prop('unit')).toEqual(CELSIUS_TEMP_UNIT);
    expect(component.find('WeatherDescription').prop('type')).toEqual(EXPECTED_TYPE);
    done();
  });
});

it('should change temp unit from C to F and back when the unit toggle function is called', () => {
  const component = shallow(<App />);
  component.setState({currentTempUnit: CELSIUS_TEMP_UNIT});
  const tempUnit = component.find('TempUnit');
  const unitToggle = tempUnit.prop('unitToggle');
  expect(unitToggle).not.toBeUndefined();
  unitToggle();
  expect(component.find('TempUnit').prop('unit')).toEqual(FAHRENHEIT_TEMP_UNIT);
  unitToggle();
  expect(component.find('TempUnit').prop('unit')).toEqual(CELSIUS_TEMP_UNIT);
});

it('should render the error element if the response is falsey', (done) => {
  const component = shallow(<App />);

  //recreate fetch response to control the data that is to be tested
  const EXPECTED_STATUS = 'Something went wrong!'
  const response = {
    ok: false,
    statusText: EXPECTED_STATUS
  };

  fetch = () => {
    return new Promise((resolve) => {
      resolve(response);
    });
  };
  eventListeners.load();
  process.nextTick(() => {
    const error = component.find('p');
    expect(error.exists()).toEqual(true);
    expect(error.text()).toEqual(EXPECTED_STATUS);
    done();
  });
});

it('should render Celsius temperature if the temp unit is C', () => {
  const component = shallow(<Temp unit={CELSIUS_TEMP_UNIT} tempCelsius={EXPECTED_CELSIUS}/>);
  const temperature = component.find('p');
  expect(temperature.exists()).toEqual(true);
  expect(temperature.text()).toEqual(`${EXPECTED_CELSIUS}°`); 
});

it('should render Fahrenheit temperature if the temp unit is F', () => {
  const component = shallow(<Temp unit={FAHRENHEIT_TEMP_UNIT} tempFahrenheit={EXPECTED_FAHRENHEIT}/>);
  const temperature = component.find('p');
  expect(temperature.exists()).toEqual(true);
  expect(temperature.text()).toEqual(`${EXPECTED_FAHRENHEIT}°`); 
});

it('should not render a p tag if no unit is assigned to props', () => {
  const component = shallow(<Temp />);
  expect(component.find('p').exists()).toEqual(false);
});