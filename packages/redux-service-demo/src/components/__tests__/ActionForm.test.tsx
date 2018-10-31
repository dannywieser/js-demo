import * as React from 'react';
import { Store } from 'redux';
import { mount, ReactWrapper } from 'enzyme';
import { ActionFormBase, IActionFormProps, IActionFormState } from '../ActionForm';
import services from '../../__tests__/example-services';
import { getActiveActionForm, getDefaultFormValues } from '../../utilities';
import { styles } from '../ReduxServiceDemo.styles';

jest.mock('../../utilities', () => ({
  getActiveActionForm: jest.fn(),
  getDefaultFormValues: jest.fn(),
  fieldValueForDisplay: jest.fn(),
  parseFieldValue: jest.fn(),
}));
const getActiveActionFormMock = getActiveActionForm as jest.Mock;
const getDefaultFormValuesMock = getDefaultFormValues as jest.Mock;
const handleActionSelectMock = jest.fn();
let store: Store<any>;

beforeEach(() => {
  //global.console = { info: jest.fn() } as any;
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
      activeAction="typeD"
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
    const changeEventOne = createChangeEvent('firstField', 'changedValue');
    wrapper.instance().handleFieldUpdate(changeEventOne);

    const changeEventTwo = createChangeEvent('secondField', 'AnotherChangedValue');
    wrapper.instance().handleFieldUpdate(changeEventTwo);

    expect(wrapper.state().formValues.firstField).toEqual('changedValue');
    expect(wrapper.state().formValues.secondField).toEqual('AnotherChangedValue');
  });

  test('handles the scenario when the value entered in a field can be converted to an object', () => {
    const wrapper = mountComponent();
    expect(wrapper.state().formValues.firstField).toBe('');
    const changeEventOne = createChangeEvent('firstField', { "foo": "bar" });
    wrapper.instance().handleFieldUpdate(changeEventOne);

    expect(wrapper.state().formValues.firstField).toEqual({ foo: 'bar' });
  });

  describe('on a call to handleSubmit', () => {
    test('will dispatch the action method with field value parameters', () => {
      const wrapper = mountComponent();
      wrapper.instance().handleSubmit();
  //    expect(services.serviceA.actions.typeA.mock.calls).toHaveLength(1);
    //  expect(services.serviceA.actions.typeA.mock.calls[0][0]).toEqual('value1');
    // TODO: replace with mapDispatchToProps
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
