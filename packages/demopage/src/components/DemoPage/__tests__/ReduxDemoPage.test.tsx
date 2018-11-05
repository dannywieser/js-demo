import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { ReduxDemoPage, IReduxDemoPageProps } from '../ReduxDemoPage';

const testComponents = {};
const srcFolderTest = '../src/components';
const demoTitle = 'My Demo Title';
const mockStore = {
  subscribe: jest.fn(),
  dispatch: jest.fn(),
  getState: jest.fn(),
};

const mountComponent = (): ReactWrapper<IReduxDemoPageProps> => {
  return mount(<ReduxDemoPage
    components={testComponents}
    srcFolder={srcFolderTest}
    readme={'./README.md'}
    title={demoTitle}
    store={mockStore}
  />);
};

it('should render DemoPage component wrapped in a provider HoC', () => {
  const wrapper = mountComponent();
  expect(wrapper.html()).not.toBeNull();
});
