const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: './src/client/client.js',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'public'),
  },
  mode: 'production',
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
      // {
      //   test: /\.(svg|png)$/,
      //   use: [
      //     { 
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name]-[hash].[ext]'
      //       }
      //     }
      //   ]
      // }
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
              comments: false,
          },
        },
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin()
    ],
  },
};