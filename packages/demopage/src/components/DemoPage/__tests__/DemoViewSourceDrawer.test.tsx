import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { styles } from '../DemoPage.styles';
import { DemoViewSourceDrawerBase, IDemoViewSourceDrawerProps } from '../DemoViewSourceDrawer';

const markdownChangeMock = jest.fn();
const toggleEditMock = jest.fn();
const testMarkdown = '## some testing markdown';

function mountComponent(): ReactWrapper<IDemoViewSourceDrawerProps> {
  return mount(
      <DemoViewSourceDrawerBase
        toggleEdit={toggleEditMock}
        markdownChange={markdownChangeMock}
        markdown={testMarkdown}
        editOpen={true}
        classes={styles as any}
      />
  );
}

it('should populate the text area with the provided markdown', () => {
  const wrapper = mountComponent();
  expect(wrapper.find('textarea').props().value).toBe('## some testing markdown')
});
it('should trigger the toggleEdit handler on click of the close button', () => {
  const wrapper = mountComponent();
  expect(toggleEditMock).not.toHaveBeenCalled();
  wrapper.find('button').simulate('click');
  expect(toggleEditMock).toHaveBeenCalled();
});
it('should trigger the on change handler when the markdown is updated', () => {
  const wrapper = mountComponent();
  wrapper.find('textarea').simulate('change', { target: { value: 'Hello' } });
  expect(markdownChangeMock).toHaveBeenCalled();
});
