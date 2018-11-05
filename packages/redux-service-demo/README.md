# redux-service-demo

A React UI for testing Redux Service components without the need to integrate them into a large application

## Overview

A Redux Data Service is a Redux wrapper for an API that maps API functionality to Redux Actions.

Each service will manage/populate a slice of state that can be combined to implement larger applications.

Striving to develop micro-components vs monolithic apps, you might create Redux Data Services that live alongside each micro-service API utilized in your application.

This demo application allows testing of each individual Redux Service in a simple UI that presents a list of services and actions for each. Configuration is used to specify data fields that need to be collected to each action, and then the action dispatch can be tested, either connected to a live API or using a mock api layer.

## Usage

Add as a project dependency

`yarn install @js-demo/redux-service-demo --dev`

Import the necessary functions (and CSS if desired)

```javascript
  import { configure, renderDemo } from 'redux-service-demo';
```

Configure if you want to use redux logging and the application title

```javascript
  configure({
    useLogger: true,
    title: 'Redux Service Demo',
  });
```

Define your services object (see below) and pass it to the renderDemo function, along with the target container element for rendering

```javascript
renderDemo(services, document.getElementById('container'));
```

Configure your services as needed and load the application in a browser, then start testing your services!

You can default to a particular service/action by providing parameters in the url:

```
?service=todos&action=fetchTodoById
```

You can also set a default value for any field by setting a url parameter with the field name:
```
&userId=1&title=atitle
```

## Services Object

A Redux Data Service/State would typically consist of:
* a reducer
* an enumerated set of types available for the state
* a map of types to action function implementations

The services object expected by this application uses those properties, with the addition of one extra property representing an array of parameters expected by each action function (i.e. form fields in the application):

For example, a service for managing todos might have an action to add a new todo ```addTodo```, that accepts a parameter of the new todo object. To configure the demo application to allow input of a JSON value representing this new TODO, the following service configuration would be required:

```
forms: {
  addTodo: ['todoJSON']
}
```

Any number of fields can be defined, based on the parameters passed to the action.

Actions will be triggered with a Redux dispatch, with all form fields being passed as individual parameters to the action function.

The services object itself is a map of individual services (keyname = servicename):

Example:

```
{
  todos: {
    reducer: ...
    types: ...
    actions: ...
    forms: {
      addTodo: ['todoJSON'],
      deleteTodo: ['todoToDeleteId']
    }
  },
  serviceB: {
    reducer: ...
    types: ...
    actions: ...
    forms: {
      actionA: ['fieldA1'],
      actionB: ['fieldB1']
    }
  },  
}
```
