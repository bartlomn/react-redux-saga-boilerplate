const webpack = require( 'webpack' );

exports.devServer = ({ host, port, quiet = true } = {}) => ({
  devServer: {
    historyApiFallback: true,
    quiet,
    host,
    port,
    overlay: {
      errors: true,
      warnings: true,
    },
  },
});

exports.sourceMaps = ({ type }) => ({
  devtool: type,
});

exports.extractBundles = bundles => ({
  plugins: bundles.map( bundle => (
    new webpack.optimize.CommonsChunkPlugin( bundle )
  )),
});
