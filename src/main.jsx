import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Import Provider
import store from './features/store'; // Import the store you just created
import App from './App';
import './index.css'; // Import any global styles

// Render the app with the Provider, passing in the store
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') // Ensure this matches your HTML file's root element
);
