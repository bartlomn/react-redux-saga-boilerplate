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
