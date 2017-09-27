const karmaMocha = require( 'karma-mocha' );
const pjsLauncher = require( 'karma-phantomjs-launcher' );
const karmaWebpack = require( 'karma-webpack' );

const webpack = require( './config/webpack.mocha' );

module.exports = ( config ) => {
  const tests = 'app/**/*.test.js';
  const src = 'app/**/*.js';

  config.set({
    frameworks: [ 'mocha' ],
    files: [
      {
        pattern: tests,
      },
    ],
    preprocessors: {
      [src]: [ 'webpack' ],
    },
    singleRun: true,
    browsers: [ 'PhantomJS' ],
    webpack,
    webpackMiddleware: {
      noInfo: false,
    },
    plugins: [ karmaMocha, pjsLauncher, karmaWebpack ],
  });
};
