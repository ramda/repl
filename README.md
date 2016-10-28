Ramda Repl
==========

A repl (read-eval-print-loop) for [Ramda](http://ramdajs.com/)

[![Build Status](https://travis-ci.org/ramda/repl.svg?branch=master)](https://travis-ci.org/ramda/repl)

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
