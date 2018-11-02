# @js-demo/core

* Core utilities for getting a demo up and running
* UI components for rendering demos and React Components via Markdown

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
module.exports = require('@js-demo/core/webpack/webpack').demoConfig();
```

These helpers aren't specific to React, they could be used to get a local running dev server for any type of javascript/webpack-bundled component.

### Shortcut script for running JSON-server mock API

It may be useful during demo to utilize a simple mock REST api, which can quickly be setup using [JSON-Server]:(https://github.com/typicode/json-server) by adding a `_data` folder to your project containing a JSON folder that represents the starting API dataset. See the json server docs for more details on setup.

### Markdown to JSX Demo Page Builder Components

A React Component is provided by this library based on the [markdown-to-jsx]:(https://github.com/probablyup/markdown-to-jsx) library. The intent here is for the component README.md files to act as both documentation for usage of your components.

See additional documentation on usage below

## Add as a project dev dependency:

`yarn add @js-demo/core --dev`

## Demo Setup

Create a folder named `_demo` (recommended) in your project:

```
|-my-javascript-project
  |-_demo
      |-index.html
      |-index.ts(x)
      |-webpack.config.js
```

Where:
* index.html is the main html file for rendering your demo.
* To work with the default provided webpack config, the contents of this file should include:

```html
<body>
  <div id="container"></div>
  <script src="../demo.js"></script>
</body>
```
* index.ts(x) code to pull in your components and actually run the demo. See below on usage of the Markdown processing components.
* webpack.config.js is the configuration for webpack-dev-server to allow local testing. At it's simplest, the contents of this file can be:

```javascript
module.exports = require('@js-demo/core/webpack/webpack').demoConfig();
```

Then run `yarn start-demo` to start the local development server

## Bundling a Demo Project for public deployment

The local demo can easily be run by using the `yarn start-demo` script, but it may be desired to take the application and deploy to another environment for other stakeholders and developers to be able to access it and view the documentation and demos for your components.

There are two things the library includes that facilitate this:

* Running the `yarn bundle-demo` script will package the demo application using webpack and generate the necessary artifacts inside the target projects _dist_ folder. The generated files represent a static app that can be deployed to a web server for viewing.
* Inside the `docker` folder, you will find a sample Dockerfile (nginx) and nginx configuration that can be used to deploy the demo application as a container.

The demo application will dynamically load any README.md files that contain documentation, and it will also parse the source code `*.types.ts` file to determine interfaces for the components. This requires that the bundled application include the full source code and
md files (since they are dynamically loaded, they are not included in the main artifact created by webpack)

## Markdown to JSX Demo Page Component

### Expected Project Folder Structure

The demo components are based on assumption that a project will contain a primary README.md file, and then specific README.md files for each component exported by the library.  

Example:

```
  |->my-react-project
    |->README.md  //main README, general project documentation
    |->src
      |->components
        |->ComponentA
          |->README.md
          |-> ... // other source files
        |->ComponentB
          |->README.md
          |-> ... // other source files
```

### DemoPage

Given the structure above, you can setup your _demo/index.tsx to render a demo page with component navigation using the ***ComponentDemo*** component

This component will render a demo page for one or more components, given the following props:
* components: a js module containing all of the components that should be included in the demo navigation.
* srcFolder: path to folder containing sub-folders with README files for the components included in the ```components``` module. This is relative to the project root dir, not to the _demo folder.
* readme: path to main project README. This is relative to the project root dir, not to the _demo folder.
* title: name of the project being demoed (displayed as header on demo page)

```typescript
import * as React from 'react';
import { render } from 'react-dom';
import { DemoPage } from '@js-demo/core';
import * as components from '../src/components';

const title = 'My Awesome React Component';
render(<DemoPage
  components={components}
  srcFolder={`src/components`}
  readme={'README.md'}
  title={title} />,
  document.getElementById('container')
);
```

### ReduxDemoPage

Same usage as ComponentDemo, but for usage when a Redux store is required for one or more of the components included in the demo.

#### Sub Components

The ComponentDemo component has the following child components that are used to render the demo page:

***DemoPageNav***

Creates the sidebar navigation for navigating through the different components included in a project

***DemoPageViewSource***

Adds ability to toggle hide/show of source markdown for the component, with live editing of the markdown.
