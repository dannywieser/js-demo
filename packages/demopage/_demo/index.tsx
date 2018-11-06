import * as React from 'react';
import { render } from 'react-dom';
import { DemoApp } from '../src';
import * as components from '../src/';

const title = '@js-demo/demopage';
render(
  <DemoApp
    components={components}
    srcFolder={'src/components'}
    readme={'README.md'}
    title={title}
  />,
  document.getElementById('container')
);
