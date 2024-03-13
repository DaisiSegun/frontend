import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'; // Import HashRouter
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter basename="/">
        <App />
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);