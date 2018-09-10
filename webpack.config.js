const path = require('path');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, 'public/javascript'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,//keeping react files around, but we're not going to use them for now
        use: {
          loader: "babel-loader"
        }
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  watch: true,
  mode: 'development',
  devtool: 'source-map'
};