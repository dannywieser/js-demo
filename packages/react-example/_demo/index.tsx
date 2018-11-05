import * as React from 'react';
import { render } from 'react-dom';
import { ReduxDemoPage, demoStore } from '@js-demo/core';
import { todos, configure } from '@js-demo/redux-example';
import * as components from '../src/';

const store = demoStore({ todos: todos.reducer });
configure({ apiBasePath: 'https://jsonplaceholder.typicode.com' });

const title = '@js-demo/react-example';
render(
  <ReduxDemoPage
    components={components}
    srcFolder={'src/components'}
    localeFolder={'locales'}
    readme={'README.md'}
    title={title}
    store={store}
  />,
  document.getElementById('container')
);