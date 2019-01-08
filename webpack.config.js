// File needed to setup webpack for project

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// Create a config object
const config = {
  // Requires 2 min properties
  // Entry property (The root of the application/ first file to execute)
  entry: './src/index.js',
  // Output property (Where to save all combined modules to)
  output: {
    //path directory where file is saved (saves to absolute current path)
    path: path.resolve(__dirname, 'build'),
    // name of the file
    filename: 'bundle.js',
    // prepends url to public assets
    publicPath: 'build/'
  },
  // Allows webpack to use babel loaders/rules
  module: {
    // Rules for when to use loaders
    rules: [
      // use the babel loader
      {
        use: 'babel-loader',
        // Looks for js files and applies babel
        test: /\.js$/
      },
      // use css loaders
      {
        // Makes sure css files are not put into bundle.js
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader'
        }),
        test: /\.css$/
      },
      // Rule for what to do with images
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          // if the image is less than 40kb save into bundle.js
          { loader: 'url-loader', options: { limit: 40000 } },
          'image-webpack-loader'
        ]
      }
    ]
  },
  // saves any files from extract tect plugin to style.css
  plugins: [new ExtractTextPlugin('style.css')]
};

// Export config object

module.exports = config;
