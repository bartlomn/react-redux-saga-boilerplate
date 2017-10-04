import React from 'react';
import PropTypes from 'prop-types';

const RevisionDisplay = ({ strRev }) => (
  <div className="pure-button">Current revision: { strRev }</div>
);

RevisionDisplay.propTypes = {
  strRev: PropTypes.string,
};

RevisionDisplay.defaultProps = {
  strRev: __APP_REVISION__,
};

export default RevisionDisplay;
