import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

const EXPECTED_LOCATION = 'Seattle, WA';
const EXPECTED_CELSIUS = 30;
const EXPECTED_CURRENT_TEMP_UNIT = 'C';
const EXPECTED_TYPE = 'Haze';

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

it('should update the location property of CurrentLocation when state location changes', () => {
  const component = shallow(<App />);
  component.setState({location: EXPECTED_LOCATION});
  expect(component.find('CurrentLocation').prop('location')).toEqual(EXPECTED_LOCATION);
});

it.only('should update the tempCelsius, tempFahrenheit, and unit properties of Temp when state tempCelsius, tempFahrenheit, and currentTempUnit changes', () => {
  const eventListeners = {};
  window.addEventListener = (eventName, callback) => {
    eventListeners[eventName] = callback;
  };

  const component = shallow(<App />);

  const geolocation = {};
  const getCurrentPosition = (callback) => {
    callback({coords: {longitude: 0, latitude: 0}});
  };
  geolocation.getCurrentPosition = getCurrentPosition;
  navigator.geolocation = geolocation;

  //TODO: explanation of fetch and Promises
  fetch = () => {
    return new Promise((resolve) => {
      const response = {};
      response.ok = true;
      response.json = () => {
        return new Promise((success) => {
          const weatherJSON = {
            tempCelsius: EXPECTED_CELSIUS,
            currentTempUnit: EXPECTED_CURRENT_TEMP_UNIT,
            location: EXPECTED_LOCATION,
            type: EXPECTED_TYPE,
          };
          success(weatherJSON);
        });
      }
      resolve(response);
    });
  };
  eventListeners.load();
});