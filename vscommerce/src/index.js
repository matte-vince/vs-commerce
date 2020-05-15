import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

// import i reducers che mi sono andato a creare e li passo al createStore
import reducers from './redux/reducers';
const Store = createStore(reducers);
// ci serve un provider redux con cui wrappiamo la nostra app
// il provider ha bisogno che gli passiamoo uno store che abbiamo creato sopra
// lo store contiene il nostro data tramite i reducers
ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
