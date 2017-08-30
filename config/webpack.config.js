require( 'dotenv' ).config();

const path = require( 'path' );

const glob = require( 'glob' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' );
const DashboardPlugin = require( 'webpack-dashboard/plugin' );
const merge = require( 'webpack-merge' );

const assets = require( './assets.part' );
const dev = require( './dev.part' );
const linters = require( './linters.part' );
const scripts = require( './scripts.part' );
const styles = require( './styles.part' );

const PATHS = {
  app: path.join( __dirname, '..', 'app' ),
  build: path.join( __dirname, '..', 'build' ),
};

const commonConfig = merge([
  {
    entry: {
      app: [ 'babel-polyfill', PATHS.app ],
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new DashboardPlugin({ port: process.env.PORT }),
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
      }),
    ],
  },
  linters.lintStyles(),
  scripts.loadJavaScript({ include: PATHS.app }),
  assets.loadFonts({ options: { limit: 15000 }}),
]);

const productionConfig = merge([
  dev.extractBundles([{
    name: 'vendor',
    minChunks: ({ resource }) => (
      resource &&
      resource.indexOf( 'node_modules' ) >= 0 &&
      resource.match( /\.js$/ )
    ),
  }]),
  linters.lintJavaScript({ include: PATHS.app, failOnWarning: true, failOnError: true }),
  styles.extractCSS(),
  styles.purifyCSS({
    paths: glob.sync( `${ PATHS.app }/**/*.js`, { nodir: true }),
  }),
  assets.loadImages({ options: { limit: 15000 }}),
  dev.sourceMaps({ type: 'source-map' }),
]);

const developmentConfig = merge([
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
  },
  dev.sourceMaps({ type: 'cheap-module-eval-source-map' }),
  linters.lintJavaScript({ include: PATHS.app }),
  styles.loadSCSS(),
  assets.loadImages(),
  dev.devServer({ host: process.env.HOST, port: process.env.PORT }),
]);

module.exports = ( env ) => {
  process.env.BABEL_ENV = env;

  if ( env === 'production' ) {
    return merge( commonConfig, productionConfig );
  }

  return merge( commonConfig, developmentConfig );
};
