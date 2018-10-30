export interface IReduxServiceDemoConfig {
  useLogger: boolean;
  title?: string;
}

export const config = {
  useLogger: true,
  title: 'Redux Service Demo',
};

export function configure(opts: IReduxServiceDemoConfig) {
  config.useLogger = opts.useLogger;
  config.title = opts.title;
}
