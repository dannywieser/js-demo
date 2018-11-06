# @js-demo/demopage

* UI components for rendering demos and React Components via Markdown

### Markdown to JSX Demo Page Builder Components

A React Component is provided by this library based on the [markdown-to-jsx]:(https://github.com/probablyup/markdown-to-jsx) library. The intent here is for the component README.md files to act as both documentation for usage of your components.

See additional documentation on usage below

## Add as a project dev dependency:

`yarn add @js-demo/demo-page --dev`

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

Then run `yarn start-demo` to start the local development server (part of [@js-demo/core](../core/README.md))

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

### DemoApp

Given the structure above, you can setup your _demo/index.tsx to render a demo page with component navigation using the ***DemoPage*** component

This component will render a demo page for one or more components, given the following props:
* components: a js module containing all of the components that should be included in the demo navigation.
* srcFolder: path to folder containing sub-folders with README files for the components included in the ```components``` module. This is relative to the project root dir, not to the _demo folder.
* readme: path to main project README. This is relative to the project root dir, not to the _demo folder.
* title: name of the project being demoed (displayed as header on demo page)

```typescript
import * as React from 'react';
import { render } from 'react-dom';
import { DemoApp } from '@js-demo/demopage';
import * as components from '../src/components';

const title = 'My Awesome React Component';
render(<DemoApp
  components={components}
  srcFolder={`src/components`}
  readme={'README.md'}
  title={title} />,
  document.getElementById('container')
);
```

### ReduxDemoApp

Same usage as DemoApp, but for usage when a Redux store is required for one or more of the components included in the demo.
