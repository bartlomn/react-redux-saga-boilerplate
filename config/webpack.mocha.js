const path = require( 'path' );

const merge = require( 'webpack-merge' );

const dev = require( './dev.part' );
const scripts = require( './scripts.part' );

module.exports = merge([
  {
    entry: {
      tests: [ 'babel-polyfill', path.join( __dirname, '..', 'tests' ) ],
    },
  },
  // todo: expose testing port on ENV
  // todo: add source maps
  scripts.transpileJavaScript({ include: path.join( __dirname, '..', 'app' ) }),
  dev.devServer({ host: process.env.HOST, port: 9999 }),
  dev.page({
    title: 'Mocha tests',
  }),
]);
