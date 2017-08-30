const path = require( 'path' );

const webpack = require( 'webpack' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const GitRevisionPlugin = require( 'git-revision-webpack-plugin' );

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

exports.clean = strPath => ({
  plugins: [
    new CleanWebpackPlugin([ strPath ], { root: path.resolve( __dirname, '..' ), verbose: true }),
  ],
});

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: `project revision: ${ new GitRevisionPlugin().version() }`,
    }),
  ],
});
