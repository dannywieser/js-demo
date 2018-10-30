export const rules = [
  { test: /\.tsx?$/, use: [{ loader: 'ts-loader' }] },
  { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
];
export const resolve = { extensions: ['.js', '.ts', '.tsx'] };
export interface IDemoConfig {
  entry: string;
  output: Object;
  devServer: Object;
}
export const config = ({ entry, output, devServer }: IDemoConfig) => ({ entry, output, resolve, devServer, module: { rules } });

export const demoConfig = (demoFolder: string = '_demo') => {
  const relativePath = `./${demoFolder}`;
  const entry = `${relativePath}/index`;
  const output = { filename: './demo.js' };
  const devServer = { historyApiFallback: { index: `${demoFolder}/index.html` } };
  return config({ entry, output, devServer });
};
