const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var plugins = [
  new HtmlWebpackPlugin(
    {
      template: "./web/app/index.html",
      inject: "body"
    }
  ),
  new webpack.HotModuleReplacementPlugin()
];

if (process.env.NODE_ENV === 'production') {
  console.log('*** PRODUCTION BUILD ***');

  plugins.push(
    new CleanWebpackPlugin(
      ["priv/static"], {
        verbose: true
      }
    )
  );

  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  );

  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  );
}

module.exports = {
  entry: "./web/app/index.tsx",
  output: {
    path: __dirname + "/priv/static",
    filename: "pastakone.js",
    chunkFilename: "pastakone.[id].js",
    publicPath: '/'
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
  },
  performance: {
    hints: false
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: [
          "style-loader",
          "css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]"
        ]
      }
    ]
  },
  devServer: {
    contentBase: "web/app/",
    historyApiFallback: true,
    proxy: {
      "/api": {
        "target": {
          "host": 'localhost',
          "protocol": 'http:',
          "port": 4000
        },
        changeOrigin: true
      },
      "/pastas/*/raw": {
        "target": {
          "host": 'localhost',
          "protocol": 'http:',
          "port": 4000
        },
        changeOrigin: true
      }
    }
  },
  plugins: plugins
};