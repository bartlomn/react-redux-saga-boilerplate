require('dotenv').config();

const path = require('path');

const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const merge = require('webpack-merge');

const assets = require('./assets.part');
const dev = require('./dev.part');
const linters = require('./linters.part');
const styles = require('./styles.part');

const PATHS = {
  app: path.join(__dirname, '..', 'app'),
  build: path.join(__dirname, '..', 'build'),
};

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
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
  assets.loadFonts({ options: { limit: 15000 }}),
]);

const productionConfig = merge([
  linters.lintJavaScript({ include: PATHS.app, failOnWarning: true, failOnError: true }),
  styles.extractCSS(),
  styles.purifyCSS({
    paths: glob.sync(`${ PATHS.app }/**/*.js`, { nodir: true }),
  }),
  assets.loadImages({ options: { limit: 15000 }}),
]);

const developmentConfig = merge([
  linters.lintJavaScript({ include: PATHS.app }),
  styles.loadSCSS(),
  assets.loadImages(),
  dev.devServer({ host: process.env.HOST, port: process.env.PORT }),
]);

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
