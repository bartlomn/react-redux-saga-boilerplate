import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';

import routes from './../routes';

const RootContainer = ({ store }) => (
  <Provider store={ store }>
    { routes }
  </Provider>
);

RootContainer.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default RootContainer;
