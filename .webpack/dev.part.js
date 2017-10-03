const path = require( 'path' );

const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const BabiliPlugin = require( 'babili-webpack-plugin' );
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;
const DuplicatePackageCheckerPlugin = require( 'duplicate-package-checker-webpack-plugin' );

const config = require( './../app/config' );

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

exports.attachRevision = ( revision = config.GIT_REVISION ) => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: `project revision: ${ revision }`,
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

exports.bundleAnalyserPlugin = () => ({
  plugins: [
    new BundleAnalyzerPlugin({
      // Can be `server`, `static` or `disabled`.
      // In `server` mode analyzer will start HTTP server to show bundle report.
      // In `static` mode single HTML file with bundle report will be generated.
      // In `disabled` mode you can use this plugin to just generate
      // Webpack Stats JSON file by setting `generateStatsFile` to `true`.
      analyzerMode: 'static',
      // Host that will be used in `server` mode to start HTTP server.
      analyzerHost: '127.0.0.1',
      // Port that will be used in `server` mode to start HTTP server.
      analyzerPort: 8888,
      // Path to bundle report file that will be generated in `static` mode.
      // Relative to bundles output directory.
      reportFilename: '../reports/BundleAnalyserReport.html',
      // Module sizes to show in report by default.
      // Should be one of `stat`, `parsed` or `gzip`.
      // See "Definitions" section for more information.
      defaultSizes: 'parsed',
      // Automatically open report in default browser
      openAnalyzer: false,
      // If `true`, Webpack Stats JSON file will be generated in bundles output directory
      generateStatsFile: true,
      // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
      // Relative to bundles output directory.
      statsFilename: 'stats.json',
      // Options for `stats.toJson()` method.
      // For example you can exclude sources of your modules
      // from stats file with `source: false` option.
      // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      statsOptions: null,
      // Log level. Can be 'info', 'warn', 'error' or 'silent'.
      logLevel: 'error',
    }),
  ],
});

exports.checkAgainstDuplicatePackages = () => ({
  plugins: [
    new DuplicatePackageCheckerPlugin({
      // Also show module that is requiring each duplicate package
      verbose: true,
      // Emit errors instead of warnings
      emitError: true,
    }),
  ],
});

exports.page = ({
  outPath = '',
  template = path.resolve( __dirname, '..', 'app', 'static', 'defaultIndexTemplate.ejs' ),
  title,
} = {}) => ({
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${ outPath && `${ outPath }/` }index.html`,
      template,
      title,
    }),
  ],
});
