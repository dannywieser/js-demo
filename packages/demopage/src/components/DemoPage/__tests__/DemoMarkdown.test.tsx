import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { DemoMarkdownBase, IDemoMarkdownProps } from '../DemoMarkdown';

const testOptions = {
  overrides: {}
};

const testMarkdown = '## this is some markdown';
const testClasses = {
  content: 'content',
  contentShiftMenu: 'contentShiftMenu',
  contentShiftSource: 'contentShiftSource',
  contentShiftBoth: 'contentShiftBoth',
};

function mountComponent(editOpen: boolean = false, navOpen: boolean = false): ReactWrapper<IDemoMarkdownProps> {
  return mount(
      <DemoMarkdownBase
        markdown={testMarkdown}
        options={testOptions}
        editOpen={editOpen}
        navOpen={navOpen}
        classes={testClasses}
      />
  );
}

it('should render the provided markdown', () => {
  const wrapper = mountComponent();
  const h2 = wrapper.find('h2');
  expect(h2).toHaveLength(1);
  expect(h2.text()).toEqual('this is some markdown');
});
it('should apply the content class if nav and edit are closed', () => {
  const wrapper = mountComponent();
  expect(wrapper.find('main').hasClass(testClasses.content)).toBe(true);
  expect(wrapper.find('main').hasClass(testClasses.contentShiftMenu)).toBe(false);
  expect(wrapper.find('main').hasClass(testClasses.contentShiftSource)).toBe(false);
  expect(wrapper.find('main').hasClass(testClasses.contentShiftBoth)).toBe(false);
});
it('should apply the contentShiftMenu class if nav is open/edit closed', () => {
  const wrapper = mountComponent(false, true);
  expect(wrapper.find('main').hasClass(testClasses.content)).toBe(true);
  expect(wrapper.find('main').hasClass(testClasses.contentShiftMenu)).toBe(true);
  expect(wrapper.find('main').hasClass(testClasses.contentShiftSource)).toBe(false);
  expect(wrapper.find('main').hasClass(testClasses.contentShiftBoth)).toBe(false);
});
it('should apply the contentShiftSource class if nav is closed/edit open', () => {
  const wrapper = mountComponent(true, false);
  expect(wrapper.find('main').hasClass(testClasses.content)).toBe(true);
  expect(wrapper.find('main').hasClass(testClasses.contentShiftMenu)).toBe(false);
  expect(wrapper.find('main').hasClass(testClasses.contentShiftSource)).toBe(true);
  expect(wrapper.find('main').hasClass(testClasses.contentShiftBoth)).toBe(false);
});
it('should apply the contentShiftBoth class if nav is open and edit open', () => {
  const wrapper = mountComponent(true, true);
  expect(wrapper.find('main').hasClass(testClasses.content)).toBe(true);
  expect(wrapper.find('main').hasClass(testClasses.contentShiftMenu)).toBe(false);
  expect(wrapper.find('main').hasClass(testClasses.contentShiftSource)).toBe(false);
  expect(wrapper.find('main').hasClass(testClasses.contentShiftBoth)).toBe(true);
});
