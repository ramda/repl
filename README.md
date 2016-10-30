Ramda Repl
==========

A repl (read-eval-print-loop) for [Ramda](http://ramdajs.com/)

[![Build Status](https://travis-ci.org/ramda/repl.svg?branch=master)](https://travis-ci.org/ramda/repl)

---

### Usage

[dist/bundle.js](dist/bundle.js) will expose a global function called `ramdaRepl`.

`ramdaRepl` takes two arguments (details to follow) and will immediately attempt to instantiate itself in the DOM.

```js
ramdaRepl(target, config)
```

#### target

`target` is a reference to a DOM Node, such as you would get from `document.querySelector`:

```js
var target = document.querySelector('#my-text-area');
```

RamdaREPL will do the following operations relating with respect to the target DOM Node:

- it will hide the target node
- it will add itself to the DOM as a sibling to the target node
- it will look for text within the target node, adding the text to its input panel when it appears (note that this can be overridden in certain circumstances).

#### config

`config` is a regular JavaScript object.

```javascript

var config = {

  apiUrl: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDhbAvT5JqkxFPkoeezJp19-S_mAJudxyk',
  returnUrl: 'http://ramdajs.com/repl/',

  // If unset, initialValue will use the value or textcontent of the
  // target element.
  initialValue: URI.decode(window.location.hash).substring(2),

  // Called with the pre-compiled content
  onChange : function(code) {
    window.location.hash = '?' + URI.encode(code);
  },

  // The following config defines scripts that will be dynamically
  // loaded upon creating the REPL. Each has the following properties:
  //
  // src      - The source of the script, a URL
  // global   - (Optional) a name of a global that the script introduces
  // exposeAs - (Optional) a name that can alias the global
  // expose   - (Optional) a list of methods to expose globally

  // Required.
  // As ramda may be a dependency for other scripts, it will
  // be intentionally loaded before any other script.
  ramdaScript: {
    src    : ramdaUrl,
    global : 'R'
  },

  // Optional.
  // Here we can declare a list of libraries that we wish to have
  // loaded and exposed in the repl.
  scripts: [
    {
      src      : '//wzrd.in/standalone/sanctuary@latest',
      global   : 'sanctuary',
      exposeAs : 'S'
    },
    {
      src    : '//wzrd.in/standalone/ramda-fantasy@latest',
      global : 'ramdaFantasy',
      expose : [
        'Either',
        'Future',
        'Identity',
        'IO',
        'lift2',
        'lift3',
        'Maybe',
        'Tuple',
        'Reader'
      ]
    }
  ]

};

```


---

### Development

You will find a collection of [npm run *](https://docs.npmjs.com/cli/run-script) scripts in [package.json](package.json):

To run a simple server that will host the [example/index.html](example/index.html) file:

`npm run server`

This will start serving the _repl_ at [localhost:8080/example](http://localhost:8080/example)

To build the JavaScript bundle:

`npm run build`

#### Watch modes

To build the JavaScript bundle when files change (with sourcemap support):

`npm run watch-js`

To build the CSS bundle when files change:

`npm run watch-css`

To watch both:

`npm run watch`

#### Testing / Linting

To run tests:

`npm test`

To lint the JavaScript:

`npm run lint`

#### Minification

The CSS is quite small and is minified while it is built.

The JavaScript is not minified by `npm run build-js` or `npm run watch-js` so those operations can run a little faster.

To minify the JavaScript:

`npm run minify`
