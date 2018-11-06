import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { DemoNavDrawerBase, IDemoNavDrawerProps, isSelected } from '../DemoNavDrawer';
import { styles} from '../DemoPage.styles';

const testComponents = {
  ComponentOne: (): any => null,
  ComponentTwo: (): any => null,
};
const toggleMenu = jest.fn();
const navOpen = false;

function mountComponent(): ReactWrapper<IDemoNavDrawerProps> {
  return mount(
    <Router>
      <DemoNavDrawerBase
        components={testComponents}
        toggleMenu={toggleMenu}
        navOpen={navOpen}
        classes={styles as any}
        active={'/ComponentOne'}
      />
    </Router>
  );
}

it('should render a list item for each component, +1 for the main README', () => {
  const wrapper = mountComponent();
  expect(wrapper.find('a')).toHaveLength(3);
});
it('should always setup a nav link for the main project README', () => {
  const wrapper = mountComponent();
  const firstItem = wrapper.find('a').at(0);
  expect(firstItem.text()).toBe('README');
  expect(firstItem.props().href).toBe('/');
});
it('should setup a nav link for each component with the href as the component name', () => {
  const wrapper = mountComponent();
  const firstComponent = wrapper.find('a').at(1);
  expect(firstComponent.text()).toBe('ComponentOne');
  expect(firstComponent.props().href).toBe('/ComponentOne');
  const secondComponent = wrapper.find('a').at(2);
  expect(secondComponent.text()).toBe('ComponentTwo');
  expect(secondComponent.props().href).toBe('/ComponentTwo');
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
