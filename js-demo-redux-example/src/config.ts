export interface IDataServiceConfig {
  apiBasePath: string;
}

const currentConfig = {
  apiBasePath: null as string,
};

export function configure(newConfig: IDataServiceConfig) {
  Object.assign(currentConfig, newConfig);
}

export const config = currentConfig;
