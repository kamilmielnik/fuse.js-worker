const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    FuseAdapter: './src/FuseAdapter.ts',
    FuseWorker: './src/FuseWorker.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/node_modules/],
      },
      {
        test: /Worker\.js$/,
        use: [
          { loader: 'worker-loader' },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    globalObject: 'this',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
  },
  stats: {
    children: true,
  },
};
