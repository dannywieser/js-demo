import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { DemoAppBarBase, IDemoAppBarProps } from '../DemoAppBar';

const toggleMenuMock = jest.fn();
const toggleEditMock = jest.fn();
const testClasses = {
  appBar: 'appBar',
  appBarShift: 'appBarShift',
  menuButton: 'menuButton',
  editButton: 'editButton',
  hide: 'hide',
};

function mountComponent(editOpen: boolean = false, navOpen: boolean = false): ReactWrapper<IDemoAppBarProps> {
  return mount(
      <DemoAppBarBase
        toggleEdit={toggleEditMock}
        toggleMenu={toggleMenuMock}
        editOpen={editOpen}
        navOpen={navOpen}
        classes={testClasses}
        title={'my app title'}
      />
  );
}

it('should render the application title', () => {
  const wrapper = mountComponent();
  const h6 = wrapper.find('h6');
  expect(h6).toHaveLength(1);
  expect(h6.text()).toEqual('my app title');
});
it('should not apply the appBarShift class if the nav is closed', () => {
  const wrapper = mountComponent(false, false);
  expect(wrapper.find('header').hasClass(testClasses.appBar)).toBe(true);
  expect(wrapper.find('header').hasClass(testClasses.appBarShift)).toBe(false);
});
it('should apply the appBarShift class if the nav is open', () => {
  const wrapper = mountComponent(false, true);
  expect(wrapper.find('header').hasClass(testClasses.appBar)).toBe(true);
  expect(wrapper.find('header').hasClass(testClasses.appBarShift)).toBe(true);
});
it('should not hide the menu button if the menu is closed', () => {
  const wrapper = mountComponent(false, false);
  const menuButton = wrapper.find('button').at(0);
  expect(menuButton.hasClass(testClasses.menuButton)).toBe(true);
  expect(menuButton.hasClass(testClasses.hide)).toBe(false);
});
it('should hide the menu button if the menu is open', () => {
  const wrapper = mountComponent(false, true);
  const menuButton = wrapper.find('button').at(0);
  expect(menuButton.hasClass(testClasses.menuButton)).toBe(true);
  expect(menuButton.hasClass(testClasses.hide)).toBe(true);
});
it('should not hide the edit button if the edit drawer is closed', () => {
  const wrapper = mountComponent(false, false);
  const editButton = wrapper.find('button').at(1);
  expect(editButton.hasClass(testClasses.editButton)).toBe(true);
  expect(editButton.hasClass(testClasses.hide)).toBe(false);
});
it('should hide the edit button if the edit drawer is open', () => {
  const wrapper = mountComponent(true, false);
  const editButton = wrapper.find('button').at(1);
  expect(editButton.hasClass(testClasses.editButton)).toBe(true);
  expect(editButton.hasClass(testClasses.hide)).toBe(true);
});
