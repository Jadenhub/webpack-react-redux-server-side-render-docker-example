const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/client/client.js',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'public'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(svg|png)$/,
        use: [
          {
            loader: 'url-loader',      
            options: {
                name: '[name]-[hash].[ext]',
                limit: 0,
                fallback: require.resolve('file-loader'),
              }
          }
        ]
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};