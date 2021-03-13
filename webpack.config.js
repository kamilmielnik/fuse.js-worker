const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
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
    filename: 'index.js',
    globalObject: 'this',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  stats: {
    children: true,
  },
};
