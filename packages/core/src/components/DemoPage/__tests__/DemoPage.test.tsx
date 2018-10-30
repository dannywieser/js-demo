import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { DemoPage, IDemoPageProps, IDemoPageState } from '../DemoPage';
import { loadMarkdown, buildOpts, getComponentHref } from '../../../utilities';

jest.mock('../DemoPageNav', () => ({
  DemoPageNav: (): any => null,
}));
jest.mock('../DemoPageViewSource', () => ({
  DemoPageViewSource: (): any => null,
}));
jest.mock('../../../utilities/markdown', () => ({
  loadMarkdown: jest.fn(),
  buildOpts: jest.fn(),
  getComponentHref: jest.fn(),
}));

const loadMarkdownMock = loadMarkdown as jest.Mock;
const buildOptsMock = buildOpts as jest.Mock;
const getComponentHrefMock = getComponentHref as jest.Mock;

const testComponents = {};
const srcFolderTest = '../src/components';
const markDownText = 'some markdown text';
const demoTitle = 'My Demo Title';
const demoOpts = { MyComponentName: (): any => null };

const mountComponent = (href = ''): ReactWrapper<IDemoPageProps, IDemoPageState, DemoPage> => {
  getComponentHrefMock.mockReturnValue(href);
  return mount(<DemoPage
    components={testComponents}
    srcFolder={srcFolderTest}
    readme={'./README.md'}
    title={demoTitle}
  />);
};

let mdPromise;
beforeEach(() => {
  mdPromise = Promise.resolve(markDownText);
  loadMarkdownMock.mockReturnValue(mdPromise);
  buildOptsMock.mockReturnValue(demoOpts);
});

describe('component initialization and markdown loading', () => {
  it('should load the markdown for the project README if no component is specified in the URL', () => {
    mountComponent();
    expect(loadMarkdownMock).toHaveBeenCalledWith('./README.md');
  });
  it('should load the markdown for the component specified in the URL', () => {
    mountComponent('MyComponentName');
    expect(loadMarkdownMock).toHaveBeenCalledWith(`${srcFolderTest}/MyComponentName/README.md`);
  });
  it('should set the markdown text in the component state', async () => {
    const wrapper = await mountComponent('MyComponentName');
    const { markdown } = wrapper.state();
    expect(markdown).toEqual(markDownText);
  });
  it('should set the markdown options in the component state', async () => {
    const wrapper = await mountComponent('MyComponentName');
    const { options } = wrapper.state();
    expect(options).toEqual(demoOpts);
  });
});
it('should set the Component Demo title', () => {
  const wrapper = mountComponent();
  expect(wrapper.find('h1').text()).toEqual(demoTitle);
});
it('should toggle the sourceVisible flag on invocation of the toggleSource function', () => {
  const wrapper = mountComponent();
  expect(wrapper.state().sourceVisible).toBeFalsy();
  wrapper.instance().toggleSource();
  expect(wrapper.state().sourceVisible).toBeTruthy();
});
it('should update the markdown state on invocation of the handleMarkdownChange function', () => {
  const wrapper = mountComponent();
  const mockEvent = { target: { value: 'new markdown text' } } as any;
  wrapper.instance().handleMarkdownChange(mockEvent);
  expect(wrapper.state().markdown).toEqual('new markdown text');
});
