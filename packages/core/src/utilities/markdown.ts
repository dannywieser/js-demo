export interface IComponentModule {
  [moduleName: string]: Function;
}

export interface IMarkdownOpts {
  overrides: {
    [component: string]: Function;
  };
}

// build markdown-to-jsx options based on an active component
export const buildOpts = (components: IComponentModule, activeComponent: string): IMarkdownOpts => ({
  overrides: { [activeComponent]: components[activeComponent] },
});

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
