const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    quiet: true,
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true,
    },
  },
});

exports.loadAssets = () => ({
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|jpg|jpeg)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
});

exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'eslint-loader',
        options,
      },
    ],
  },
});

exports.loadSCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: [ 'style-loader', {
          loader: 'css-loader',
        },
        this.autoprefix(true) ],
      },
      {
        test: /\.(scss|sass)$/,
        include,
        exclude,
        use: [ 'style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: true,
            importLoaders: 2,
          },
        },
        this.autoprefix(true),
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }],
      },
    ],
  },
});

exports.extractCSS = () => {
  const plugin = new ExtractTextPlugin({
    filename: '[name].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: plugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
            },
            this.autoprefix() ],
          }),
        },
        {
          test: /\.(scss|sass)$/,
          use: plugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: false,
                importLoaders: 2,
                localIdentName: 'purify_[hash:base64:5]',
              },
            },
            this.autoprefix(),
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
              },
            }],
          }),
        },
      ],
    },
    plugins: [ plugin ],
  };
};

exports.autoprefix = (sourceMap = false) => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      autoprefixer(),
    ]),
    sourceMap,
  },
});

exports.purifyCSS = ({ paths, minimize = true }) => ({
  plugins: [
    new PurifyCSSPlugin({ paths, minimize, purifyOptions: { whitelist: [ '*purify*' ]}}),
  ],
});
