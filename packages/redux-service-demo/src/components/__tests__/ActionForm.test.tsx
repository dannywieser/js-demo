import * as React from 'react';
import { Store } from 'redux';
import { mount, ReactWrapper } from 'enzyme';
import { ActionFormBase, IActionFormProps, IActionFormState } from '../ActionForm';
import services from '../../__tests__/example-services';
import { getActiveActionForm, getDefaultFormValues, parseFieldValue } from '../../utilities';
import { styles } from '../ReduxServiceDemo.styles';

jest.mock('../../utilities', () => ({
  getActiveActionForm: jest.fn(),
  getDefaultFormValues: jest.fn(),
  fieldValueForDisplay: jest.fn(),
  parseFieldValue: jest.fn(),
}));
const getActiveActionFormMock = getActiveActionForm as jest.Mock;
const getDefaultFormValuesMock = getDefaultFormValues as jest.Mock;
const parseFieldValueMock = parseFieldValue as jest.Mock;
const handleActionSelectMock = jest.fn();
let store: Store<any>;

beforeEach(() => {
  global.console = { info: jest.fn() } as any;
  store = {
    getState: jest.fn(),
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    replaceReducer: jest.fn(),
  };
});

function createChangeEvent(id: string, value: any): React.ChangeEvent<HTMLInputElement> {
  return { target: { id, value } } as React.ChangeEvent<HTMLInputElement>;
}

function mountComponent(params = {}): ReactWrapper<IActionFormProps, IActionFormState, ActionFormBase> {
  return mount(
    <ActionFormBase
      services={services}
      params={params}
      activeService="serviceA"
      activeAction="typeA"
      store={store}
      handleActionSelect={handleActionSelectMock}
      classes={styles as any}
    />,
  );
}

describe('the ActionForm class', () => {
  beforeEach(() => {
    getActiveActionFormMock.mockReturnValue(['firstField', 'secondField']);
    getDefaultFormValuesMock.mockReturnValue({ firstField: '', secondField: '' });
  });

  test('properly initializes the form fields for the active service and type', () => {
    const wrapper = mountComponent();
    expect(wrapper.state().formFields).toEqual(['firstField', 'secondField']);
  });

  test('will update the form fields when the activeService prop is updated', () => {
    getActiveActionFormMock.mockReturnValue(['newFieldOne', 'newFieldTwo']);
    const wrapper = mountComponent();
    wrapper.setProps({ activeService: 'serviceB' });
    expect(wrapper.state().formFields).toEqual(['newFieldOne', 'newFieldTwo']);
  });

  test('will update the state field values on a call to handleFieldUpdate', () => {
    const wrapper = mountComponent();
    expect(wrapper.state().formValues.firstField).toBe('');
    parseFieldValueMock.mockReturnValue('parsedFieldValue1');
    const changeEventOne = createChangeEvent('firstField', 'changedValue');
    wrapper.instance().handleFieldUpdate(changeEventOne);

    parseFieldValueMock.mockReturnValue('parsedFieldValue2');
    const changeEventTwo = createChangeEvent('secondField', 'AnotherChangedValue');
    wrapper.instance().handleFieldUpdate(changeEventTwo);

    expect(parseFieldValueMock).toHaveBeenCalledWith('changedValue');
    expect(parseFieldValueMock).toHaveBeenCalledWith('AnotherChangedValue');
    expect(wrapper.state().formValues.firstField).toEqual('parsedFieldValue1');
    expect(wrapper.state().formValues.secondField).toEqual('parsedFieldValue2');
  });

  test('handles the scenario when the value entered in a field can be converted to an object', () => {
    const wrapper = mountComponent();
    expect(wrapper.state().formValues.firstField).toBe('');
    parseFieldValueMock.mockReturnValue({ foo: 'bar' });
    const changeEventOne = createChangeEvent('firstField', { "foo": "bar" });
    wrapper.instance().handleFieldUpdate(changeEventOne);

    expect(wrapper.state().formValues.firstField).toEqual({ foo: 'bar' });
  });

  describe('on a call to handleSubmit', () => {
    test('will dispatch the action method with field value parameters', () => {
      const wrapper = mountComponent();
      wrapper.state().formValues = { fieldA: 'value1', fieldB: 'value2' };
      wrapper.instance().handleSubmit();
      expect(services.serviceA.actions.typeA).toHaveBeenCalledWith('value1', 'value2');
    });

    test('will reset state field values to defaults', () => {
      const wrapper = mountComponent();
      wrapper.instance().handleSubmit();
      expect(wrapper.state().formValues).toEqual({
        firstField: '',
        secondField: '',
      });
    });
  });
});
