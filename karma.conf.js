const karmaMocha = require( 'karma-mocha' );
const pjsLauncher = require( 'karma-phantomjs-launcher' );
const karmaWebpack = require( 'karma-webpack' );
const karmaCover = require( 'karma-coverage' );

const webpack = require( './config/webpack.mocha' );

module.exports = ( config ) => {
  process.env.BABEL_ENV = 'karma';

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
    plugins: [ karmaMocha, pjsLauncher, karmaCover, karmaWebpack ],
    reporters: [ 'coverage' ],
    coverageReporter: {
      dir: 'build',
      reporters: [
        { type: 'html' },
        { type: 'lcov' },
      ],
    },
  });
};
