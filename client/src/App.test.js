import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//smoke test for rendering of the App
it('renders', () => {
  ReactDOM.render(<App />, document.createElement('div'));
});