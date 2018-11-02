import * as React from 'react';
import * as ReactDOM from 'react-dom';
import loglevel from 'loglevel';
import { initializeDemoStore } from './redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ReduxServiceDemo, IReduxServiceDemoProps } from '../components/ReduxServiceDemo';
import { IReduxServiceList } from '../types';
import { demoTheme } from '../components/ReduxServiceDemo.styles';

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
  loglevel.setLevel('INFO');
  loglevel.info('[redux-service-demo:@VERSION@]');
}

export const renderDemo = (services: IReduxServiceList, container: HTMLElement) => {
  const demoStore = initializeDemoStore(services);
  const params = getParams();
  initDemoLogging();
  ReactDOM.render(
    <MuiThemeProvider theme={demoTheme}>
      <ReduxServiceDemo services={services} params={params} store={demoStore} />
    </MuiThemeProvider>,
    container);
  return demoStore;
};
