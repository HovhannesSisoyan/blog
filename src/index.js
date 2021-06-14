import React from 'react';
import ReactDOM from 'react-dom';
import { createOvermind } from 'overmind'
import { config } from './overmind'
import { createHook, Provider } from "overmind-react";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const overmind = createOvermind(config)

ReactDOM.render(
  <React.StrictMode>
    <Provider value={overmind}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
