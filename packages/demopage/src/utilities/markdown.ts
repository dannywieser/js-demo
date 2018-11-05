export interface IComponentModule {
  [moduleName: string]: Function;
}

export interface IComponentOverrides {
  [component: string]: Function;
}

export interface IMarkdownOpts {
  overrides: {
    [component: string]: Function;
  };
}

export const buildOpts = (components: IComponentModule): IMarkdownOpts => {
  const componentsReducer = (overrides: IComponentOverrides, component: string) => ({ ...overrides, [component]: components[component] });
  const overrides = Object.keys(components).reduce(componentsReducer, {});
  return { overrides };
};

export const fetchText = async (path: string, errorString = 'error') => {
  let text = '';
  try {
    const result = await fetch(path);
    text = await result.text();
  } catch (e) {
    text = errorString;
  }
  return text;
};

export const loadMarkdown = async (path: string, error: string = undefined) => await(fetchText(path, error));
