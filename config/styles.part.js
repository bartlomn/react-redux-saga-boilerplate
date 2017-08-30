const autoprefixer = require( 'autoprefixer' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const PurifyCSSPlugin = require( 'purifycss-webpack' );

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
        this.autoprefix( true ) ],
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
        this.autoprefix( true ),
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

exports.autoprefix = ( sourceMap = false ) => ({
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
