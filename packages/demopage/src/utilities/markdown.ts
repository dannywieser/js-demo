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

export const mdPathForComponent = (componentName: string, srcFolder: string) => `${srcFolder}/${componentName}/README.md`;

export const buildOpts = (components: IComponentModule): IMarkdownOpts => {
  const componentsReducer = (overrides: IComponentOverrides, component: string) => ({ ...overrides, [component]: components[component] });
  const overrides = Object.keys(components).reduce(componentsReducer, {});
  return { overrides };
};

async function asyncForEach(array: any[], callback: Function) {
  while (array.length > 0) {
    await callback(array.pop());
  }
}

export const findDocumentedComponents = async (components: IComponentModule, srcFolder: string): Promise<string[]> => {
  const documented: string[] = [];
  await asyncForEach(Object.keys(components), async (component: string) => {
    const { ok } = await fetch(mdPathForComponent(component, srcFolder));
    if (ok) {
      documented.push(component);
    }
  });
  return documented.sort();
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
