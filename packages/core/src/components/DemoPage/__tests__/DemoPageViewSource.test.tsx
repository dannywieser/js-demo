import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import * as styles from '../DemoPage.styles';
import { DemoPageViewSource, IDemoPageViewSourceProps } from '../DemoPageViewSource';

const markdownUpdateMock = jest.fn();
const toggleVisibleMock = jest.fn();
const testMarkdown = 'some markdown';

function shallowComponent(sourceVisible: boolean): ShallowWrapper<IDemoPageViewSourceProps, DemoPageViewSource> {
  return shallow(<DemoPageViewSource
    onChange={markdownUpdateMock}
    markdown={testMarkdown}
    sourceVisible={sourceVisible}
    toggleVisible={toggleVisibleMock}
  />);
}

describe('when source is visible', () => {
  let wrapper: ShallowWrapper<IDemoPageViewSourceProps, DemoPageViewSource>;
  beforeEach(() => {
    wrapper = shallowComponent(true);
  });
  it('should render the view source text area with the value of the markdown prop', () => {
    const textarea = wrapper.find('textarea');
    expect(textarea).toHaveLength(1);
    expect(textarea.prop('value')).toEqual(testMarkdown);
  });
  it('should set the label on the toggle button to "hide source"', () => {
    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual('hide source');
  });
  it('should add the demoSource class to the component container', () => {
    const div = wrapper.find('div').at(0);
    expect(div.hasClass(styles.demoSource)).toBeTruthy();
  });
});
describe('when source is hidden', () => {
  let wrapper: ShallowWrapper<IDemoPageViewSourceProps, DemoPageViewSource>;
  beforeEach(() => {
    wrapper = shallowComponent(false);
  });
  it('should not render the view source text area', () => {
    const textarea = wrapper.find('textarea');
    expect(textarea).toHaveLength(0);
  });
  it('should set the label on the toggle button to "view source"', () => {
    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual('view source');
  });
  it('should not add the demoSource class to the component container', () => {
    const div = wrapper.find('div').at(0);
    expect(div.hasClass(styles.demoSource)).toBeFalsy();
  });
});
it('should trigger the toggleVisible function on button click', () => {
  const wrapper = shallowComponent(false);
  const button = wrapper.find('button');
  button.simulate('click');
  expect(toggleVisibleMock).toHaveBeenCalled();
});
it('should trigger the onChange function on a text area change', () => {
  const wrapper = shallowComponent(true);
  const textarea = wrapper.find('textarea');
  const event = { target: { value: 'Hello' } };
  textarea.simulate('change', event);
  expect(markdownUpdateMock).toHaveBeenCalledWith(event);
});
