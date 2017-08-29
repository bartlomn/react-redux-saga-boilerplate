require('dotenv').config();

const path = require('path');

const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

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
      new StyleLintPlugin({ configFile: './.stylelintrc' }),
      new FriendlyErrorsWebpackPlugin(),
      new DashboardPlugin({ port: process.env.PORT }),
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
      }),
    ],
  },
  parts.lintJavaScript({ include: PATHS.app, options: { emitWarning: true }}),
  parts.loadAssets(),
]);

const productionConfig = merge([
  parts.extractCSS(),
  parts.purifyCSS({
    paths: glob.sync(`${ PATHS.app }/**/*.js`, { nodir: true }),
  }),
]);

const developmentConfig = merge([
  parts.loadSCSS(),
  parts.devServer({ host: process.env.HOST, port: process.env.PORT }),
]);

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
