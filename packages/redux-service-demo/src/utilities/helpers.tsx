import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as log from 'loglevel';
import { Provider } from 'react-redux';
import { initializeDemoStore } from './redux';
import { ReduxServiceDemo, IReduxServiceDemoProps } from '../components/ReduxServiceDemo';
import { IReduxServiceList } from '../types';

export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const parseFieldValue = (value: string) => (isJsonString(value) ? JSON.parse(value) : value);
export const fieldValueForDisplay = (value: string) => (typeof (value) === 'object' ? JSON.stringify(value) : value);

export const searchParams = () => new URLSearchParams(window.location.search).entries();
export function getParams() {
  const params = Array.from(searchParams());
  const reducer = (allParams: IReduxServiceDemoProps, entry: string[]) => {
    const key = entry[0];
    const value = entry[1];
    return { ...allParams, [key]: value };
  };
  return params.reduce(reducer, {});
}

function initDemoLogging() {
  log.setLevel('INFO');
  log.info('[redux-service-demo:@VERSION@]');
}

export const renderDemo = (services: IReduxServiceList, container: HTMLElement) => {
  const demoStore = initializeDemoStore(services);
  const params = getParams();
  initDemoLogging();
  console.log(demoStore);
  ReactDOM.render(
    (<Provider store={demoStore}>
      <ReduxServiceDemo services={services} params={params} />
    </Provider>),
    container);

  return demoStore;
};
