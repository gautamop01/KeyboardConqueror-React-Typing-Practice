import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/*
The entry point for the React application. This file is responsible for rendering the App component into the DOM.
*/

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render App component within React.StrictMode
root.render( // eslint-disable-line
  <React.StrictMode> 
    <App />
  </React.StrictMode>
);

// Log performance metrics to console
reportWebVitals();
