import React from 'react';

const LandingPageContainer = ({ children }) => (
  <div className="app public">
    THIS IS PUBLIC AREA.
    { children }
  </div>
);

LandingPageContainer.propTypes = {
  children: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default LandingPageContainer;
