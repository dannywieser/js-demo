# @js-demo/core

* Core utilities for getting a demo up and running

## Reduced Configuration Webpack Dev Server setup

Using @js-demo/core, you can eliminate:
* pulling in webpack and webpack-dev-server as dependencies to each project
* copy/pasting a base webpack config to get a stand-alone demo up and running
* adding a script to package.json to start the demo

In many cases, components requiring demos are not actually bundled via webpack and therefore don't have any inherent dependencies on it, so it's better to not clutter the package dependencies with libraries only needed specifically for demo.

This library provides two key items to assist with running demos with little to no configuration:

* **start-demo** script: this will look for a `_demo` folder in your project (another folder name can be specified as a parameter), and run a dev server based on a webpack config in that folder.

```
yarn start-demo //looks for webpack config in _demo folder
yarn start-demo app //looks in app folder
```

* **Webpack Config Helper**: The `_demo/webpack.config.js` file can be completely custom if needed, but a basic config file that builds typescript located in an index.ts file can be generated with a single line of code based on the webpack utility helper.

```javascript
module.exports = require('@js-demo/core/webpack/webpack-demo').demoConfig();
```

These helpers aren't specific to React, they could be used to get a local running dev server for any type of javascript/webpack-bundled component.

### Shortcut script for running JSON-server mock API

It may be useful during demo to utilize a simple mock REST api, which can quickly be setup using [JSON-Server]:(https://github.com/typicode/json-server)

To use this feature:
* Create a folder named *_data* in your project
* Create a file inside this folder named *demo-base-data.json*
* Run ```yarn start-api```

Example file structure:

```{
  "todos": [
    { "id": 1, "title": "clone this repo to a folder with the name of your new component", "completed": false},
    { "id": 2, "title": "use the todos component as a guideline for creating a skeleton of your new component", "completed": false},
    { "id": 3, "title": "remove the .git folder and re-initialize as a new git repo", "completed": false},
    { "id": 4, "title": "update package.json with your project/repo details", "completed": false}
  ]
}
```

Given this file, JSON server will provide an API with an endpoint of **localhost:3000/todos**

Note that at runtime, a copy of the demo-base-data.json file is made for the running demo - JSON-server will update the contents of this file real-time as API operations (create/delete/update) are performed. The source dataset is kept intact through this copy technique. Stopping the JSON server will reset data back to the original dataset.
