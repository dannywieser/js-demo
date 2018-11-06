import { Provider } from 'react-redux';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DemoPage, IDemoPageProps } from './DemoPage';

export interface IReduxDemoPageProps extends IDemoPageProps {
  store: any;
}

export const ReduxDemo = ({ srcFolder, readme, components, title, store }: IReduxDemoPageProps) => {
  return (
    <Provider store={store}>
      <Router>
        <DemoPage
          components={components}
          srcFolder={srcFolder}
          readme={readme}
          title={title}
        />
      </Router>
    </Provider>
  );
};
