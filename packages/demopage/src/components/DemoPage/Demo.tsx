import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DemoPage, IDemoPageProps } from './DemoPage';

export const Demo = ({ srcFolder, readme, components, title }: IDemoPageProps) => {
  return (
    <Router>
      <DemoPage
        components={components}
        srcFolder={srcFolder}
        readme={readme}
        title={title}
      />
    </Router>
  );
};
