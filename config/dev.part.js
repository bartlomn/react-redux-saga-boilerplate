const path = require( 'path' );

const webpack = require( 'webpack' );
const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const GitRevisionPlugin = require( 'git-revision-webpack-plugin' );
const BabiliPlugin = require( 'babili-webpack-plugin' );

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

exports.recommendChunkSizeLimits = ({ maxEntrypointSize = 100000, maxAssetSize = 500000 }) => ({
  performance: {
    hints: 'warning', // 'error' or false are valid too
    maxEntrypointSize, // in bytes
    maxAssetSize, // in bytes
  },
});

exports.minifyJavaScript = () => ({
  plugins: [
    new BabiliPlugin(),
  ],
});

exports.dashboardPlugin = ( env, port ) => {
  if ( env === 'development' ) {
    const DashboardPlugin = require( 'webpack-dashboard/plugin' ); // eslint-disable-line
    return {
      plugins: [
        new DashboardPlugin({ port }),
      ],
    };
  }
  return {};
};

exports.friendlyErrorsPlugin = () => ({
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
  ],
});
