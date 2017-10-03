const StyleLintPlugin = require( 'stylelint-webpack-plugin' );

exports.lintJavaScript = ({ include, failOnWarning = false, failOnError = false } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          cache: true,
          failOnWarning,
          failOnError,
        },
      },
    ],
  },
});

exports.lintStyles = () => ({
  plugins: [
    new StyleLintPlugin({ configFile: './.stylelintrc' }),
  ],
});
