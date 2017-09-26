const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: './src/app.module.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [path.resolve(__dirname, 'node_modules')],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        loaders: 'html-loader',
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.tsx?$/,
        loader: ['ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.scss', '.ts', '.tsx'],
    alias: {
      '~': path.resolve('src'),
    },
  },
  plugins: [HtmlWebpackPluginConfig],
  devtool:
    process.env.NODE_ENV === 'testing' ? 'inline-source-map' : 'source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
};
