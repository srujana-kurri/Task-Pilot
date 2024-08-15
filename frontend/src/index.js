import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { AppProviders } from './components/UserContext';
import {Provider} from "react-redux"
import {store} from "./reduxstore/store"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store = {store}>
      <App />
 </Provider>
  
);

