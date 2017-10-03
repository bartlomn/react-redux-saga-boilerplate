require( 'dotenv' ).config();

const path = require( 'path' );

const glob = require( 'glob' );
const merge = require( 'webpack-merge' );
const webpack = require( 'webpack' );

const assets = require( './assets.part' );
const dev = require( './dev.part' );
const linters = require( './linters.part' );
const scripts = require( './scripts.part' );
const styles = require( './styles.part' );

const PATHS = {
  app: path.join( __dirname, '..', 'app' ),
  build: path.join( __dirname, '..', 'build' ),
};

const commonConfig = () => merge([
  {
    entry: {
      app: [ 'babel-polyfill', PATHS.app ],
    },
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js',
    },
  },
  dev.page({ title: 'Webpack playground' }),
  dev.attachRevision(),
  linters.lintStyles(),
  scripts.transpileJavaScript({ include: PATHS.app }),
  assets.loadFonts({ options: { limit: 15000, name: '[name].[hash:8].[ext]' }}),
]);

const productionConfig = () => merge([
  {
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
    ],
  },
  dev.clean( PATHS.build ),
  dev.recommendChunkSizeLimits({ maxEntrypointSize: 250000 }),
  dev.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf( 'node_modules' ) >= 0 &&
        resource.match( /\.js$/ )
      ),
    },
    {
      name: 'manifest',
      minChunks: Infinity,
    },
  ]),
  dev.minifyJavaScript(),
  dev.bundleAnalyserPlugin(),
  dev.checkAgainstDuplicatePackages(),
  linters.lintJavaScript({ include: PATHS.app, failOnWarning: true, failOnError: true }),
  styles.extractCSS(),
  styles.purifyCSS({
    paths: glob.sync( `${ PATHS.app }/**/*.js`, { nodir: true }),
  }),
  styles.minifyCSS(),
  assets.loadImages({ options: { limit: 15000, name: '[name].[hash:8].[ext]' }}),
]);

const developmentConfig = () => merge([
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
  dev.friendlyErrorsPlugin(),
  dev.dashboardPlugin( process.env.NODE_ENV, process.env.PORT ),
]);

module.exports = ( env ) => {
  process.env.BABEL_ENV = process.env.NODE_ENV = env;

  if ( env === 'production' ) {
    return merge( commonConfig(), productionConfig());
  }

  return merge( commonConfig(), developmentConfig());
};
