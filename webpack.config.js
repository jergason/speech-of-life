module.exports = {
  entry: './src/index.jsx',

  output: {
    path: './build/',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.json', '.jsx', 'index.jsx', 'index.js', '.styl']
  },

  module: {
    loaders: [
      { test: /\.jsx?$/,          loader: 'jsx-loader?harmony'                    },
      { test: /\.styl$/,          loader: 'style-loader!css-loader!stylus-loader' },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'                 }
    ]
  }
};
