var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
if (debug) console.log("DEBUG MODE")

const outputFolder = debug ? "/bundles" : "/dist"

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  
  entry: "./src/ChessState.ts",
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
    minimize: !debug
  },
  resolve: {
     extensions: ['.ts', '.js']
  },
  output: {
    path: __dirname + outputFolder,
    filename: "ChessState.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
