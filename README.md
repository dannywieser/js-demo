# @js-demo
[![Build Status](https://travis-ci.org/dannywieser/js-demo.svg?branch=master)](https://travis-ci.org/dannywieser/js-demo)

Helpers and Utilities for creating demos in JavaScript applications.

## Overview

Given an architectural strategy of building many small micro-components or modules and piecing them together into a larger application, the pattern for these components is that each have a simple, self-contained demo that can be used for:

* Local developer testing
* Requirements Review and Demo to Stakeholders
* Ability to present the running component in some type of library of available components

The utilities here are focused on React and Redux, although some parts are not strictly dependent on those frameworks. The packaging/dev server used is Webpack.

## Sub Packages
* **[@js-demo/core](packages/core/README.md)**: simplified webpack configuration, components for rendering markdown documentation containing JSX
* **[@js-demo/redux-service-demo](packages/redux-service-demo/README.md)**: Components for creating a demo of a Redux Data Service (note that this has a dependency on @js-demo/core)

## Examples
* [@js-demo/react-example](packages/react-example/README.md): example React component to illustrate usage of the demo utilities
* [@js-demo/redux-example](packages/redux-example/README.md): example Redux service to illustrate usage of the demo utilities.

## Live Demos

* [Redux Example](https://dannywieser.github.io/js-demo/js-demo-redux-example/)
* [React Example](https://dannywieser.github.io/js-demo/js-demo-react-example/)
