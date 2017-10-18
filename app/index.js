import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';

import './main.scss';
import configureStore from './store';
import RootContainer from './containers/Root';


const initialState = {};
const store = configureStore( initialState, browserHistory );

function renderApp( RootComponent ) {
  const target = document.getElementById( 'root' );
  if ( target ) {
    ReactDOM.render(
      <AppContainer>
        <RootComponent
          store={ store }
        />
      </AppContainer>,
      target,
    );
  }
}

renderApp( RootContainer );

if ( module.hot ) {
  module.hot.accept(
    './containers/Root',
    // eslint-disable-next-line global-require
    () => renderApp( require( './containers/Root' )),
  );
}
