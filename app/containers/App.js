import PropTypes from 'prop-types';

const AppContainer = ({ children }) => children;

AppContainer.propTypes = {
  children: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default AppContainer;
