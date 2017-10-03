const path = require('path');
const merge = require( 'webpack-merge' );
const assets = require( './../.webpack/assets.part');
const dev = require( './../.webpack/dev.part');
const styles = require( './../.webpack/styles.part');

module.exports = merge([
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
  },
  assets.loadFonts({
    include: path.resolve( __dirname, '../', 'app' ),
    options: { limit: 15000, name: '[name].[hash:8].[ext]' }
  }),
  assets.loadImages({ include: path.resolve( __dirname, '../', 'app' )}),
  dev.sourceMaps({ type: 'cheap-module-eval-source-map' }),
  dev.attachRevision(),
  dev.friendlyErrorsPlugin(),
  styles.loadSCSS({ include: path.resolve( __dirname, '../' )}),
]);
