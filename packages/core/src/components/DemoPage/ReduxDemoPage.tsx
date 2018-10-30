import { Provider } from 'react-redux';
import * as React from 'react';
import { DemoPage, IDemoPageProps } from './DemoPage';

export interface IReduxDemoPageProps extends IDemoPageProps {
  store: any;
}

export const ReduxDemoPage = ({ srcFolder, readme, components, title, store }: IReduxDemoPageProps) => {
  return (
    <Provider store={store}>
      <DemoPage
        components={components}
        srcFolder={srcFolder}
        readme={readme}
        title={title}
      />
    </Provider>
  );
};
