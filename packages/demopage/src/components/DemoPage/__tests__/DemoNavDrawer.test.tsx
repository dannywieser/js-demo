import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { DemoNavDrawerBase, IDemoNavDrawerProps, isSelected } from '../DemoNavDrawer';
import { findDocumentedComponents } from '../../../utilities/markdown';
import { styles} from '../DemoPage.styles';

jest.mock('../../../utilities/markdown', () => ({
  findDocumentedComponents: jest.fn(),
}));

const testComponents = {
  ComponentOne: (): any => null,
  ComponentTwo: (): any => null,
};
const toggleMenu = jest.fn();
const navOpen = false;
const findDocumentedComponentsMock = findDocumentedComponents as jest.Mock;

function mountComponent(): ReactWrapper<IDemoNavDrawerProps> {
  return mount(
    <Router>
      <DemoNavDrawerBase
        components={testComponents}
        toggleMenu={toggleMenu}
        navOpen={navOpen}
        classes={styles as any}
        active={'/ComponentOne'}
        srcFolder={'src'}
      />
    </Router>
  );
}

let documentPromise: Promise<string[]>;
beforeEach(() => {
  documentPromise = Promise.resolve(['a', 'b', 'c', 'd']);
  findDocumentedComponentsMock.mockReturnValue(documentPromise);
});

it('should render a list item for each component, +1 for the main README', async () => {
  const wrapper = mountComponent();
  await documentPromise;
  wrapper.update();
  expect(wrapper.find('a')).toHaveLength(5);
});
it('should always setup a nav link for the main project README', async () => {
  const wrapper = mountComponent();
  await documentPromise;
  wrapper.update();
  const firstItem = wrapper.find('a').at(0);
  expect(firstItem.text()).toBe('README');
  expect(firstItem.props().href).toBe('/');
});
it('should setup a nav link for each component with the href as the component name', async () => {
  const wrapper = mountComponent();
  await documentPromise;
  wrapper.update();
  const firstComponent = wrapper.find('a').at(1);
  expect(firstComponent.text()).toBe('a');
  expect(firstComponent.props().href).toBe('/a');
  const secondComponent = wrapper.find('a').at(2);
  expect(secondComponent.text()).toBe('b');
  expect(secondComponent.props().href).toBe('/b');
});
it('should return true for isSelected if the active component matches the current component', () => {
  expect(isSelected('/ComponentOne', 'ComponentOne')).toBeTruthy();
});
it('should return false for isSelected if the active component does not match the current component', () => {
  expect(isSelected('/ComponentOne', 'ComponentTwo')).toBeFalsy();
});
it('should return true for isSelected if the active component is the default / path', () => {
  expect(isSelected('/')).toBeTruthy();
});
