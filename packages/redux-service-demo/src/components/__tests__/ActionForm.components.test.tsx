import { shallow, ShallowWrapper } from 'enzyme';
import * as components from '../ActionForm.components';
import services from '../../__tests__/example-services';

test('returns the correct active action form fields, given a service object, service name and action type', () => {
  const result = components.getActiveActionForm(services, 'serviceA', 'typeB');
  expect(result).toEqual(['fieldC', 'fieldD']);
});

test('provides a state object with default field values, given an array of fields', () => {
  const result = components.getDefaultFormValues(['fieldA', 'fieldB', 'fieldC']);
  expect(result).toEqual({
    fieldA: '',
    fieldB: '',
    fieldC: '',
  });
});

test('provides a state object populated with field values; if provided', () => {
  const result = components.getDefaultFormValues(['fieldA', 'fieldB', 'fieldC'], {
    fieldA: 'defaultA', fieldB: 'defaultB',
  });
  expect(result).toEqual({
    fieldA: 'defaultA',
    fieldB: 'defaultB',
    fieldC: '',
  });
});

test('getDefaultFormValues handles the case where no form fields are defined', () => {
  const result = components.getDefaultFormValues(null);
  expect(result).toEqual({});
});

test('returns a blank array of fields, given an undefined service name and type', () => {
  const result = components.getActiveActionForm(services, undefined, undefined);
  expect(result).toEqual([]);
});

test('returns a blank array of fields, given an defined service name and type with no form definition', () => {
  const result = components.getActiveActionForm(services, 'serviceB', 'typeF');
  expect(result).toEqual([]);
});

describe('rendering a form input field', () => {
  let wrapper: ShallowWrapper;
  let updateFunction: jest.Mock;
  beforeEach(() => {
    updateFunction = jest.fn();
    wrapper = shallow(components.formInput('fieldName', 'fieldVal', updateFunction));
  });

  test('adds a key of the field name', () => {
    expect(wrapper.find('div').at(0).key()).toBe('fieldName');
  });

  test('sets the input ID to the field name', () => {
    expect(wrapper.find('input').prop('id')).toBe('fieldName');
  });

  test('sets the input placeholder to the field name', () => {
    expect(wrapper.find('input').prop('placeholder')).toBe('fieldName');
  });

  test('sets the value of the field', () => {
    expect(wrapper.find('input').props().value).toBe('fieldVal');
  });

  test('sets the the update function as the onChange handler', () => {
    expect(wrapper.find('input').prop('onChange')).toBe(updateFunction);
  });
});

describe('rendering the action form button', () => {
  test('sets the the function as the onClick handler', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(components.ActionSubmitButton({ handleSubmit }));
    expect(wrapper.find('button').prop('onClick')).toBe(handleSubmit);
  });
});
