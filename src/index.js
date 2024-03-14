import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

import { hydrate, render } from "react-dom";


const APP = (<React.StrictMode>
  <HelmetProvider>
    <App />
  </HelmetProvider>
</React.StrictMode>
);
 
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(APP, rootElement);
} else {
  render( APP, rootElement);
}




