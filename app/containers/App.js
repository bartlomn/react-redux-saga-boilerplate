import React from 'react';

const AppContainer = ({ children }) => children;

AppContainer.propTypes = {
  children: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default AppContainer;
