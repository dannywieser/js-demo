import * as React from 'react';
import { shallow } from 'enzyme';
import { DemoApp, ReduxDemoApp } from '../DemoApp';

jest.mock('../DemoPage', () => ({
  DemoPage: (): any => null,
}));

const mockStore = {
  subscribe: jest.fn(),
  dispatch: jest.fn(),
  getState: jest.fn(),
};
const testComponents = {};

it('should render the DemoApp component with no errors', () => {
  const wrapper = shallow(
    <DemoApp
      components={testComponents}
      readme={'README.md'}
      srcFolder={'src'}
      title={'my title'}
    />
  );
  expect(wrapper.html()).not.toBeUndefined();
});

it('should render the ReduxDemoApp component with no errors', () => {
  const wrapper = shallow(
    <ReduxDemoApp
      components={testComponents}
      readme={'README.md'}
      srcFolder={'src'}
      title={'my title'}
      store={mockStore}
    />
  );
  expect(wrapper.html()).not.toBeUndefined();
});
