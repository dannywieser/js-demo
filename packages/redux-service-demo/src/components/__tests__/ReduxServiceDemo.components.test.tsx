import { shallow, ShallowWrapper } from 'enzyme';
import * as components from '../ReduxServiceDemo.components';
import services from '../../../_data/example-services';

test('will render an action option select control', () => {
  const wrapper: ShallowWrapper = shallow(components.renderActionOption('theOption'));
  expect(wrapper).toHaveLength(1);
  expect(wrapper.prop('value')).toEqual('theOption');
  expect(wrapper.text()).toEqual('theOption');
});

test('the state monitor function will display the active state', () => {
  const wrapper = shallow(components.StateMonitor({ stateString: 'theState' }));
  expect(wrapper.text()).toEqual('theState');
});

test('stateToString should convert state to a string', () => {
  const testState = { foo: 'bar' };
  const expected = JSON.stringify(testState, null, 2);
  expect(components.stateToString(testState)).toEqual(expected);
});

describe('the ActionSelect function', () => {
  const handleActionSelect = jest.fn();
  const activeService = 'serviceB';
  const activeAction = 'typeE';
  const params = {
    services,
    activeService,
    activeAction,
    handleActionSelect,
  };
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(components.ActionSelect(params));
  });

  test('will render an option for each type in the active service', () => {
    expect(wrapper.find('option')).toHaveLength(3);
    expect(wrapper.find('option').at(0).text()).toBe('typeD');
    expect(wrapper.find('option').at(1).text()).toBe('typeE');
    expect(wrapper.find('option').at(2).text()).toBe('typeF');
  });

  test('sets the default value of the select control', () => {
    const select = wrapper.find('select');
    expect(select.prop('value')).toEqual('typeE');
  });

  test('will trigger the handler function on change of the selection', () => {
    const select = wrapper.find('select');
    const changeEvent = { target: { value: 'typeF' } };
    select.simulate('change', changeEvent);
    expect(handleActionSelect.mock.calls).toHaveLength(1);
    expect(handleActionSelect.mock.calls[0][0]).toBe(changeEvent);
  });
});

describe('the renderTab function', () => {
  const theHandler = jest.fn();
  test('renders an anchor for the provided service name', () => {
    const wrapper = shallow(components.renderTab('theService', 'anotherService', theHandler));
    expect(wrapper.find('a').prop('id')).toEqual('theService');
    expect(wrapper.find('a').text()).toEqual('theService');
  });

  test('connects the onClick action to the provided handler', () => {
    const wrapper = shallow(components.renderTab('theService', 'anotherService', theHandler));
    expect(wrapper.find('a').prop('onClick')).toEqual(theHandler);
  });

  test('adds the is-active class to the list item for an inactive service', () => {
    const wrapper = shallow(components.renderTab('theService', 'theService', theHandler));
    expect(wrapper.find('li').hasClass('is-active')).toEqual(true);
  });

  test('does not add the is-active class to the list item for an inactive service', () => {
    const wrapper = shallow(components.renderTab('theService', 'anotherService', theHandler));
    expect(wrapper.find('li').hasClass('is-active')).toEqual(false);
  });

  test('invokes the click handler on click of the anchor', () => {
    const wrapper = shallow(components.renderTab('theService', 'anotherService', theHandler));
    wrapper.find('a').simulate('click');
    expect(theHandler.mock.calls).toHaveLength(1);
  });
});

describe('the ServiceTabs function', () => {
  const handleServiceSelect = jest.fn();
  const activeService = 'serviceB';
  const params = { services, activeService, handleServiceSelect };
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(components.ServiceTabs(params));
  });

  test('renders a tab for each service in the services objects', () => {
    expect(wrapper.find('li')).toHaveLength(2);
  });

  test('invokes the select handler on click of the tab anchor', () => {
    wrapper.find('a').at(1).simulate('click');
    expect(handleServiceSelect.mock.calls).toHaveLength(1);
  });
});
