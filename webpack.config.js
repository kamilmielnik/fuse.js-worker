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
    publicPath: '/',
    filename: 'index.js',
    path: path.resolve(__dirname, 'build/'),
  },
  stats: {
    children: true,
  },
};
