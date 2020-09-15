import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

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

it('should update the location of CurrentLocation when state location changes', () => {
  const component = shallow(<App />);
  const EXPECTED_LOCATION = 'Seattle, WA';
  component.setState({location: EXPECTED_LOCATION});
  expect(component.find('CurrentLocation').prop('location')).toEqual(EXPECTED_LOCATION);
});