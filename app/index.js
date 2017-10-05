import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from './store';
import routes from './routes';


const initialState = {};
const store = configureStore( initialState, browserHistory );

ReactDOM.render(
  <Provider store={ store }>
    { routes }
  </Provider>, document.getElementById( 'root' ),
);
