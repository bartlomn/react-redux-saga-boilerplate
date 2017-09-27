const path = require( 'path' );

const merge = require( 'webpack-merge' );

const dev = require( './dev.part' );

module.exports = merge([
  {
    entry: {
      tests: path.join( __dirname, '..', 'tests' ),
    },
  },
  // todo: expose testing port on ENV
  dev.devServer({ host: process.env.HOST, port: 9999 }),
  dev.page({
    title: 'Mocha tests',
  }),
]);
