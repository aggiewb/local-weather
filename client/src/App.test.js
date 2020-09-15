import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

//smoke test for rendering of the App
it('renders', () => {
  mount(<App />);
});

//shallow renders the component but none of the React child components
it('shallow render', () => {
  shallow(<App />);
});