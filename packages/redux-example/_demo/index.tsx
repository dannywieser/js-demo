import { configure as demoConfigure, renderDemo } from '@js-demo/redux-service-demo';
import { configure } from '../src/config';
import * as todos from '../src/todos';

demoConfigure({
  useLogger: true,
  title: 'Todos w/ @js-demo',
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
      todoAdd: ['todo'],
      todoDelete: ['id'],
      todoComplete: ['todo'],
      todoIncomplete: ['todo'],
    },
  }
};

renderDemo(services, document.getElementById('container'));
