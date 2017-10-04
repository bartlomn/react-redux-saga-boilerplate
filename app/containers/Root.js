import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import createRoutes from './../routes';

const routes = createRoutes();

const RootContainer = ({ store, history }) => (
  <Provider store={ store }>
    <Router history={ history } routes={ routes }/>
  </Provider>
);

RootContainer.propTypes = {
  history: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  store: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default RootContainer;
