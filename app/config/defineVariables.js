const config = require( './index' );

/* eslint-disable quote-props */
module.exports = {
  '__APP_REVISION__': config.GIT_REVISION,
};
/* eslint-enable quote-props */
