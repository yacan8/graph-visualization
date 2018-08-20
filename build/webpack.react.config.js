const path = require('path');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const happyLoaderId = 'happypack-for-react-babel-loader';

const isDebug = process.env.NODE_ENV !== 'production';

const babelLoader = {
  test: /\.jsx?$/,
  loader: 'babel-loader',
  include: [path.resolve(process.cwd(), 'src')],
  query: {
    cacheDirectory: true,
    babelrc: false,
    presets: [
      'react',
      'stage-0',
      [
        'env',
        {
          targets: {
            browsers: ["last 2 versions", "safari >= 7", "ie >= 9", 'chrome >= 52']
          },
          useBuiltIns: true,
          debug: false
        }
      ]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      ["import", { libraryName: "antd", style: true }]  // 引入td-ui组件
    ]
  }
}
if (isDebug) {
  babelLoader.query.presets = ['react-hmre'].concat(babelLoader.query.presets)
}
const reactConfig = {
  module: {
    rules: [{
      test: babelLoader.test,
      loader: 'happypack/loader',
      query: {
        id: happyLoaderId
      },
      include: babelLoader.include
    }]
  },
  plugins: [new HappyPack({
    id: happyLoaderId,
    threadPool: happyThreadPool,
    loaders: [babelLoader]
  })]
}

delete babelLoader.test;
delete babelLoader.include;

module.exports = reactConfig;
