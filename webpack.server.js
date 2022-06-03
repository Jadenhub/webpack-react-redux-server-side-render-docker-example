const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  entry: "./src/server.js",
  mode: 'production',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
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
  externals: [webpackNodeExternals()],
};
