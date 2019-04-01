[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/cookie-editor.svg)](https://www.npmjs.com/package/@advanced-rest-client/cookie-editor)

[![Build Status](https://travis-ci.org/advanced-rest-client/cookie-editor.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/cookie-editor)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/cookie-editor)

An element to edit cookie details.

### Example

```html
<cookie-editor></cookie-editor>
```

### API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)

## Usage

### Installation
```
npm install --save @advanced-rest-client/cookie-editor
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import './node_modules/@advanced-rest-client/cookie-editor/cookie-editor.js';
    </script>
  </head>
  <body>
    <cookie-editor></cookie-editor>
  </body>
</html>
```

### In a Polymer 3 element

```js
import {PolymerElement, html} from './node_modules/@polymer/polymer';
import './node_modules/@advanced-rest-client/cookie-editor/cookie-editor.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
    <cookie-editor></cookie-editor>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

### Installation

```sh
git clone https://github.com/advanced-rest-client/cookie-editor
cd api-url-editor
npm install
npm install -g polymer-cli
```

### Running the demo locally

```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
