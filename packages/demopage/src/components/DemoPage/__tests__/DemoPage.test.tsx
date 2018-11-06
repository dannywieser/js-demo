import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { DemoPageBase, IDemoPageProps, IDemoPageState } from '../DemoPage';
import { loadMarkdown, buildOpts } from '../../../utilities';
import { styles} from '../DemoPage.styles';

jest.mock('../DemoAppBar', () => ({
  DemoAppBar: (): any => null,
}));
jest.mock('../DemoNavDrawer', () => ({
  DemoNavDrawer: (): any => null,
}));
jest.mock('../DemoViewSourceDrawer', () => ({
  DemoViewSourceDrawer: (): any => null,
}));
jest.mock('../DemoMarkdown', () => ({
  DemoMarkdown: (): any => null,
}));
jest.mock('../../../utilities/markdown', () => ({
  loadMarkdown: jest.fn(),
  buildOpts: jest.fn(),
}));

const loadMarkdownMock = loadMarkdown as jest.Mock;
const buildOptsMock = buildOpts as jest.Mock;

const testComponents = {};
const srcFolderTest = '../src/components';
const markDownText = 'some markdown text';
const demoTitle = 'My Demo Title';
const demoOpts = { MyComponentName: (): any => null };

const mountComponent = (href = ''): ReactWrapper<IDemoPageProps, IDemoPageState, DemoPageBase> => {
  return mount(<DemoPageBase
    components={testComponents}
    srcFolder={srcFolderTest}
    readme={'./README.md'}
    title={demoTitle}
    classes={styles as any}
  />);
};

let mdPromise;
beforeEach(() => {
  mdPromise = Promise.resolve(markDownText);
  loadMarkdownMock.mockReturnValue(mdPromise);
  buildOptsMock.mockReturnValue(demoOpts);
});

test('something', () => {

});

// describe('component initialization and markdown loading', () => {
//   it('should load the markdown for the project README if no component is specified in the URL', () => {
//     mountComponent();
//     expect(loadMarkdownMock).toHaveBeenCalledWith('./README.md');
//   });
//   it('should load the markdown for the component specified in the URL', () => {
//     mountComponent('MyComponentName');
//     expect(loadMarkdownMock).toHaveBeenCalledWith(`${srcFolderTest}/MyComponentName/README.md`);
//   });
//   it('should set the markdown text in the component state', async (done) => {
//     const wrapper = await mountComponent('MyComponentName');
//     const { markdown } = wrapper.state();
//     done();
//     expect(markdown).toEqual(markDownText);
//   });
//   it('should set the markdown options in the component state', async (done) => {
//     const wrapper = await mountComponent('MyComponentName');
//     const { options } = wrapper.state();
//     done();
//     expect(options).toEqual(demoOpts);
//   });
// });
// it('should set the Component Demo title', () => {
//   const wrapper = mountComponent();
//   expect(wrapper.find('h1').text()).toEqual(demoTitle);
// });
// it('should toggle the sourceVisible flag on invocation of the toggleEdit function', () => {
//   const wrapper = mountComponent();
//   expect(wrapper.state().editOpen).toBeFalsy();
//   wrapper.instance().toggleEdit();
//   expect(wrapper.state().editOpen).toBeTruthy();
// });
// it('should update the markdown state on invocation of the handleMarkdownChange function', () => {
//   const wrapper = mountComponent();
//   const mockEvent = { target: { value: 'new markdown text' } } as any;
//   wrapper.instance().handleMarkdownChange(mockEvent);
//   expect(wrapper.state().markdown).toEqual('new markdown text');
// });
