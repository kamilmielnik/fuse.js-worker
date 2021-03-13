const fs = require('fs');
const path = require('path');

const packageJson = fs.readFileSync('./package.json', 'utf-8');
const { peerDependencies } = JSON.parse(packageJson);

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  externals: Object.fromEntries(Object.keys(peerDependencies).map((name) => [name, name])),
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
