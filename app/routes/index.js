import React from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './../store';
import AppContainer from './../containers/App';
import LandingPageContainer from './../containers/LandingPage';
import Home from './../containers/Home';
import NotFound from './../containers/NotFound';

const initialState = {};
const store = configureStore( initialState, browserHistory );
const history = syncHistoryWithStore( browserHistory, store );

const routes = (
  <Router history={ history }>
    <Route path="/" component={ AppContainer }>
      <Route component={ LandingPageContainer }>
        <IndexRoute component={ Home }/>
      </Route>
      <Route path="*" component={ NotFound }/>
    </Route>
  </Router>
);

export default routes;
