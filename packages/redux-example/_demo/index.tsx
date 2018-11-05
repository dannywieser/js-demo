import { configure as demoConfigure, renderDemo } from '@js-demo/redux-service-demo';
import { configure } from '../src/config';
import * as todos from '../src/todos';

demoConfigure({
  useLogger: true,
  title: 'Todos w/ @js-demo',
});

const localPath = 'http://localhost:3000';
const livePath = 'https://jsonplaceholder.typicode.com';

//switch to localPath to use local json server via `yarn start-api`
configure({ apiBasePath: livePath });

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
