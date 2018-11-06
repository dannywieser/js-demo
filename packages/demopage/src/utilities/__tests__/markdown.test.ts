import * as markdownUtils from '../markdown';

beforeEach(() => {
  window.fetch = jest.fn();
});

function generateFetchMock(ok: boolean = true, responseText: string = '') {
  const textPromise = {
    ok,
    text: () => Promise.resolve(responseText),
  };
  const fetchMock = window.fetch as jest.Mock;
  fetchMock.mockReturnValue(Promise.resolve(textPromise));
  return fetchMock;
}
function generateFailedFetchMock() {
  const fetchMock = window.fetch as jest.Mock;
  fetchMock.mockReturnValue(Promise.reject());
  return fetchMock;
}

it('should return the result of fetch on a call to loadMarkdown', async () => {
  const fetchMock = generateFetchMock(true, 'loaded markdown');
  const result = await markdownUtils.loadMarkdown('/path/to/markdown.md');
  expect(fetchMock).toHaveBeenCalledWith('/path/to/markdown.md');
  expect(result).toEqual('loaded markdown');
});
it('should return the string "error" on a failure to load markdown', async () => {
  const fetchMock = generateFailedFetchMock();
  const result = await markdownUtils.loadMarkdown('/path/to/markdown.md');
  expect(fetchMock).toHaveBeenCalledWith('/path/to/markdown.md');
  expect(result).toEqual('error');
});
it('should return the provided error string on a failure to load markdown', async () => {
  const fetchMock = generateFailedFetchMock();
  const result = await markdownUtils.loadMarkdown('/path/to/markdown.md', 'my error string');
  expect(fetchMock).toHaveBeenCalledWith('/path/to/markdown.md');
  expect(result).toEqual('my error string');
});
it('should build options for the call to markdown based on the component list and active component', () => {
  const testComponents = {
    ComponentOne: (): any => null,
    ComponentTwo: (): any => null,
  };
  const options = markdownUtils.buildOpts(testComponents);
  expect(options).toEqual({
    overrides: {
      ComponentOne: testComponents.ComponentOne,
      ComponentTwo: testComponents.ComponentTwo,
    },
  });
});

describe('findDocumentedComponents', () => {
  const components = {
    a: jest.fn(),
    b: jest.fn(),
    c: jest.fn(),
  };

  it('should flag all components as documented if the fetch of the README is successful', async () => {
    generateFetchMock(true);
    const result = await markdownUtils.findDocumentedComponents(components, 'path/to/components');
    expect(window.fetch).toHaveBeenCalledWith('path/to/components/a/README.md');
    expect(window.fetch).toHaveBeenCalledWith('path/to/components/b/README.md');
    expect(window.fetch).toHaveBeenCalledWith('path/to/components/c/README.md');
    expect(result).toContain('a');
    expect(result).toContain('b');
    expect(result).toContain('c');
  });

  it('should flag all components as undocumented if a README cannot be located', async () => {
    generateFetchMock(false);
    const result = await markdownUtils.findDocumentedComponents(components, 'path/to/components');
    expect(window.fetch).toHaveBeenCalledWith('path/to/components/a/README.md');
    expect(window.fetch).toHaveBeenCalledWith('path/to/components/b/README.md');
    expect(window.fetch).toHaveBeenCalledWith('path/to/components/c/README.md');
    expect(result).toEqual([]);
  });
});
