import { ActionCreatorsMapObject } from 'redux';
import { configure as demoConfigure, renderDemo } from '@js-demo/redux-service-demo';
import { configure } from '../src/config';
import * as todos from '../src/todos';

demoConfigure({
  useLogger: true,
  title: 'Redux Service Demo',
});
configure({
  apiBasePath: 'https://jsonplaceholder.typicode.com'
});

const services = {
  todos: {
    reducer: todos.reducer,
    types: todos.types,
    actions: todos.actions,
    forms: {
      fetchTodoById: ['id'],
      todoAdd: ['userId', 'title'],
    },
  }
};

renderDemo(services, document.getElementById('container'));
