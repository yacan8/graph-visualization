const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const isDebug = process.env.NODE_ENV !== 'production';
const host = 'localhost';
const port = '8080';

const releasePath = path.resolve(__dirname, '../dist');
const base = {
  entry: [path.join(process.cwd(), 'src/index')],
  mode: isDebug ? 'development' : 'production',
  output: {
    publicPath: '/',
    path: releasePath,
    chunkFilename: '[name].[chunkhash].chunk.js'
  },
  devServer: {
    contentBase: [path.join(process.cwd(), './vendor-dev/'), path.join(process.cwd(), './vendor/')],
    hot: true,
    compress: false,
    historyApiFallback: true,
    open: true,
    host: host,
    port: port,
    disableHostCheck: true,
    stats: { colors: true },
    filename: '[name].chunk.js',
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  resolve: {
    extensions: [".js", ".json"],
  },
  module: {
    rules: [{
      test: /\.(woff|woff2|ttf|eot|png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/i, // 图片加载
      loader: 'url-loader',
      query: {
        limit: 10000
      }
    }]
  },
  optimization: {
    minimize: !isDebug,
    minimizer: !isDebug ? [new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        comments: false,
        warnings: false,
        compress: {
          unused: true,
          dead_code: true,
          collapse_vars: true,
          reduce_vars: true
        },
        output: {
          comments: false
        }
      }
    })] : [],
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': isDebug
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8889,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './index.html')
    })
  ],
  stats: {  // 打印信息控制
    all: undefined,
    timings: true,
    publicPath: true,
    assets: true,
    entrypoints: true,
    modules: false,
    chunks: true,
    chunkGroups: true,
    chunkModules: false,
    children: false
  },
};

if (isDebug) {
  base.entry.unshift(`webpack-dev-server/client?http://${host}:${port}`, 'webpack/hot/dev-server');
  base.plugins.unshift(new webpack.HotModuleReplacementPlugin());
  base.devtool = 'source-map';
} else {
  base.entry.unshift('babel-polyfill');
  base.plugins.push(new CleanWebpackPlugin(
    "*",
    {
      root: releasePath,                      //根目录
      verbose: true,        　　　　　　　　　　//开启在控制台输出信息
      dry: false        　　　　　　　　　　//启用删除文件
    }
  ))
}

module.exports = base;
