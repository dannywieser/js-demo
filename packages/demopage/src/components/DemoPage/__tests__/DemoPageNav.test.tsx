import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { DemoPageNav, IDemoPageNavProps } from '../DemoPageNav';

const testComponents = {
  ComponentOne: (): any => null,
  ComponentTwo: (): any => null,
};

function shallowComponent(): ShallowWrapper<IDemoPageNavProps, DemoPageNav> {
  return shallow(<DemoPageNav components={testComponents}/>);
}

it('should render a list item for each component, +1 for the main README', () => {
  const wrapper = shallowComponent();
  expect(wrapper.find('li')).toHaveLength(3);
});
it('should always setup a nav link for the main project README', () => {
  const wrapper = shallowComponent();
  const firstItem = wrapper.find('a').at(0);
  expect(firstItem.text()).toBe('README');
  expect(firstItem.props().href).toBe('/');
});
it('should setup a nav link for each component with the href as the component name', () => {
  const wrapper = shallowComponent();
  const firstComponent = wrapper.find('a').at(1);
  expect(firstComponent.text()).toBe('ComponentOne');
  expect(firstComponent.props().href).toBe('ComponentOne');
  const secondComponent = wrapper.find('a').at(2);
  expect(secondComponent.text()).toBe('ComponentTwo');
  expect(secondComponent.props().href).toBe('ComponentTwo');
});
