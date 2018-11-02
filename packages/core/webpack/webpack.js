const CopyWebpackPlugin = require('copy-webpack-plugin')

const plugins = [
  new CopyWebpackPlugin([
    { from: 'README.md' },
    { from: 'src', to: 'src' },
    { from: '_demo/index.html' }
  ])
];

const rules = [
  { test: /\.md?$/, use: [{ loader: 'raw-loader' }] },
  { test: /\.tsx?$/, use: [{ loader: 'ts-loader', options: { transpileOnly: true } }] },
  { test: /\.svg$/, use: 'svg-inline-loader' },
  { test: /\.css/, use: 'css-loader' },
  { test: /globalize|moment-cldr/, loader: 'imports-loader?define=>false' }
];
const performance = { hints: false };
const resolve = { extensions: ['.js', '.ts', '.tsx', '.md'] };
const config = config => ({ ...config, resolve, plugins, performance, module: { rules } });

module.exports = {
  demoConfig: (demoFolder = '_demo') => {
    const relativePath = `./${demoFolder}`;
    // demo index file entry point
    const entry = `${relativePath}/index`;
    // location of output file
    const output = { filename: './demo.js' };
    const devServer = {
      historyApiFallback: {
        index: `${demoFolder}/index.html`
      }
    };
    return config({ entry, output, devServer });
  }
};
