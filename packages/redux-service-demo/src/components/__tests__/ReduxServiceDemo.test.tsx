import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import {
  ReduxServiceDemo,
  IReduxServiceDemoState,
  IReduxServiceDemoProps,
} from '../ReduxServiceDemo';
import services from '../../../_data/example-services';

jest.mock('../ActionForm');
jest.mock('../ReduxServiceDemo.components', () => ({
  ServiceTabs: (): any => null,
  ActionSelect: (): any => null,
  StateMonitor: (): any => null,
  stateToString: (): any => 'stateToStringMock',
}));
jest.mock('../../config', () => ({
  config: { title: 'mocked title' },
}));

function mountComponent(params = {}): ReactWrapper<IReduxServiceDemoProps, IReduxServiceDemoState, ReduxServiceDemo> {
  return mount(<ReduxServiceDemo
    services={services}
    params={params} />
  );
}

describe('the ReduxServiceDemo class', () => {
  test('displays the page title based on the configuration', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('h1.title').text()).toBe('mocked title');
  });

  test('defaults activeService/activeType to first defined service, first type', () => {
    const wrapper = mountComponent();
    expect(wrapper.state().activeService).toBe('serviceA');
    expect(wrapper.state().activeAction).toBe('typeA');
  });

  test('updates the state active service, type on a call to handleServiceSelect', () => {
    const wrapper = mountComponent();
    wrapper.instance().handleServiceSelect({ target: { id: 'serviceB' } } as any);
    expect(wrapper.state().activeService).toBe('serviceB');
    expect(wrapper.state().activeAction).toBe('typeD');
  });

  test('updates the state active type on a call to handleActionSelect', () => {
    const wrapper = mountComponent();
    wrapper.instance().handleActionSelect({ target: { value: 'typeB' } } as React.ChangeEvent<HTMLSelectElement>);
    expect(wrapper.state().activeAction).toBe('typeB');
  });
});

describe('parameter overrides for default values', () => {
  test('defaults service based on parameter provided with a key of service', () => {
    const wrapper = mountComponent({ service: 'serviceB' });
    expect(wrapper.state().activeService).toBe('serviceB');
    expect(wrapper.state().activeAction).toBe('typeD');
  });

  test('defaults service/action based on parameter provided with a key of service/action', () => {
    const params = { service: 'serviceB', action: 'typeF' };
    const wrapper = mountComponent(params);
    expect(wrapper.state().activeService).toBe('serviceB');
    expect(wrapper.state().activeAction).toBe('typeF');
  });
});
