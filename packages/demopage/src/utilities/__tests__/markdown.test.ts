import * as markdownUtils from '../markdown';

beforeEach(() => {
  window.fetch = jest.fn();
});

function generateFetchMock(responseText: string) {
  const textPromise = {
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
  const fetchMock = generateFetchMock('loaded markdown');
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
  const options = markdownUtils.buildOpts(testComponents, 'ComponentTwo');
  expect(options).toEqual({
    overrides: { ComponentTwo: testComponents.ComponentTwo },
  });
});
