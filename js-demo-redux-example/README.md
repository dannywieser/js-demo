# Redux Service Demo Example

This is an example Redux Data Service project using:
* @js-demo/core for building/local dev server
* @js-demo/redux-service-demo components for providing an interface to trigger Redux actions
* [Redux Service Utils](https://github.com/dannywieser/redux-service-util) for handling async actions

This demo uses the TODOs api available here: https://jsonplaceholder.typicode.com

See the demo running here: https://dannywieser.github.io/js-demo/js-demo-redux-example/

## Running the Demo Locally

```yarn start-demo```

## Available Actions

* todoList: perform a GET to retrieve all todos and populate the state
* todoAdd: add a NEW todo, given a JSON object with the following format:
```json
{
  "userId": 1,
  "title": "my new todo",
  "completed": false
}
```
* todoDelete: delete a todo, given a Todo ID
* todoComplete: complete an existing todo (completed=>true), given the current TODO object JSON
* todoIncomplete: set complete to false for an existing todo, given the current TODO object JSON
