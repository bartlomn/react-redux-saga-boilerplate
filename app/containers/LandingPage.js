import PropTypes from 'prop-types';
import React from 'react';

const LandingPageContainer = ({ children }) => (
  <div className="app public">
    THIS IS PUBLIC AREA.
    { children }
  </div>
);

LandingPageContainer.propTypes = {
  children: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default LandingPageContainer;
