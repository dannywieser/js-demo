import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { DemoPage, IDemoPageProps } from './DemoPage';

export const DemoApp = ({ srcFolder, readme, components, title }: IDemoPageProps) => (
  <Router>
    <DemoPage
      components={components}
      srcFolder={srcFolder}
      readme={readme}
      title={title}
    />
  </Router>
);

export interface IReduxDemoPageProps extends IDemoPageProps {
  store: any;
}

export const ReduxDemoApp = ({ srcFolder, readme, components, title, store }: IReduxDemoPageProps) => {
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
