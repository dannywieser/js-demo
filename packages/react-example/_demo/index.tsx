import * as React from 'react';
import { render } from 'react-dom';
import { ReduxDemoApp, demoStore } from '@js-demo/demopage';
import { todos, configure } from '@js-demo/redux-example';
import * as components from '../src/';

const store = demoStore({ todos: todos.reducer });
configure({ apiBasePath: 'https://jsonplaceholder.typicode.com' });

const title = '@js-demo/react-example';
render(
  <ReduxDemoApp
    components={components}
    srcFolder={'src/components'}
    readme={'README.md'}
    title={title}
    store={store}
  />,
  document.getElementById('container')
);
