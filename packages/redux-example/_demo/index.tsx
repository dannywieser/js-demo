import { configure, renderDemo } from 'redux-service-demo';
import * as todos from '../src/todos';
import '../src/index.scss';

configure({
  useLogger: true,
  title: 'Redux Service Demo',
});

const services = {
  todos: {
    reducer: todos.reducer,
    types: todos.types,
    actions: todos.actions,
    forms: {
      fetchTodoById: ['id'],
      addTodo: ['userId', 'title'],
    },
  }
};

renderDemo(services, document.getElementById('container'));
