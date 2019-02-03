var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  
  entry: "./lib/src/ChessState.js",
  module: {
     rules: [
     {
        test: "/\.ts?$",
        use: 'ts-loader',
        exclude: /node_modules/
     }
     ]
  },
  optimization: {
    minimize: false
  },
  resolve: {
     extensions: ['.ts', '.js']
  },
  output: {
    path: __dirname + "/bundles",
    filename: "ChessState.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
