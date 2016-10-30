Ramda Repl
==========

A repl (read-eval-print-loop) for [Ramda](http://ramdajs.com/)

[![Build Status](https://travis-ci.org/ramda/repl.svg?branch=master)](https://travis-ci.org/ramda/repl)

---

### Usage

[dist/bundle.js](dist/bundle.js) will expose a global function called `ramdaRepl`.

`ramdaRepl` is applied to two arguments (details to follow) and will immediately attempt to instantiate itself in the DOM.

An example with all the configuration options set is available [here](example/index.html).

```js
ramdaRepl(target, config)
```

#### target

`target` is a reference to a DOM Node, such as you would get from `document.querySelector`:

```js
var target = document.querySelector('#my-text-area');
```

RamdaREPL will do the following operations with respect to the target DOM Node:

- it will hide the target node
- it will add itself to the DOM as a sibling to the target node
- it will look for text within the target node and will prefill the input panel with this text (this can be overridden by the config)

#### config

`config` is a regular JavaScript object.

<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Required</th>
      <th>Type</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`apiURL`</td>
      <td>Yes<td>
      <td>String</td>
      <td>A path to a [Google url-shortener]( https://developers.google.com/url-shortener/ ) service endpoint - this will require a specific API key, details [here](https://developers.google.com/url-shortener/v1/getting_started)</td>
      <td>`'https://www.googleapis.com/urlshortener/v1/url?key=APIKEY'`</td>
    </tr>
    <tr>
      <td>`returnUrl`</td>
      <td>Yes</td>
      <td>String</td>
      <td>A URL (minus query string) that will be used with the url-shortening service to indicate where a sharable link will take user-agents. The current query string will be appended to this. This idea here is that you can have a REPL at `http://your-ramda-repl.com#<code>` and have the share feature redirect to `http://ramdajs.com/repl#<code>` should you wish.</td>
      <td>
        <pre lang="js">
"http://ramdajs.com/repl/"
        </pre>
      </td>
    </tr>
    <tr>
      <td>`initialValue`</td>
      <td>No</td>
      <td>String</td>
      <td>Used to provide the initial code in the input panel. It overrides the default behaviour, which is to use the content of the `target` element.</td>
      <td>
        <pre lang="js">
"identity(1)"
        </pre>
      </td>
    </tr>
    <tr>
      <td>`onChange`</td>
      <td>No</td>
      <td>Function</td>
      <td>This is called with the _pre-compiled_ text from the input window whenever this text is changed. This can be used for updating the URL with a new query string, for example.</td>
      <td>
        <pre lang="js">
(code) => window.location.hash = URI.encode(code)
        </pre>
      </td>
    </tr>
    <tr>
      <td>`ramdaScript`</td>
      <td>Yes</td>
      <td>Object - see below</td>
      <td>A script description object used to defined where Ramda is sourced and how it is globally exposed</td>
      <td>
        <pre lang="js">
{
  src    : "//cdn.jsdelivr.net/ramda/latest/ramda.min.js",
  global : "R"
}
        </pre>
      </td>
    </tr>
    <tr>
      <td>`scripts`</td>
      <td>No</td>
      <td>Array of Objects - see below</td>
      <td>A list of script description objects used to defined where other interesting libraries are sourced and how it is globally exposed</td>
      <td>
        <pre lang="js">
[
  {
    src      :'//wzrd.in/standalone/sanctuary@latest',
    global   : 'sanctuary',
    exposeAs : 'S'
  }
]
        </pre>
      </td>
    </tr>
  </tbody>
</table>


The keys `ramdaScript` and `scripts` are used to organise the dynamically loaded scripts that will be available to the REPL, such as `ramda`, `ramda-sanctuary` and `ramda-fantasy`. Ramda is loaded first, as it is presumed that the other libraries will require it to be present before they can be included.

Organising the scripts includes providing a reference to a URL where the script can be sourced - and adding in optional configuration for how globals will be made available.

How the dynamically loaded scripts are made available can defined using objects with the following keys:

<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Required</th>
      <th>Type</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`src` </td>
      <td>Yes</td>
      <td>String</td>
      <td>A URL referencing a JavaScript file</td>
      <td>
        <pre lang="js">
"//cdn.jsdelivr.net/ramda/latest/ramda.min.js"
        </pre>
      </td>
    </tr>
    <tr>
      <td>`global`</td>
      <td>Yes if `exposeAs` or `expose` are used </td>
      <td> String </td>
      <td> A name of a global the the script will introduce</td>
      <td>
        <pre lang="js">
"R"
        </pre>
      </td>
    </tr>
    <tr>
      <td>`exposeAs`</td>
      <td>No</td>
      <td>String</td>
      <td>The name of a global that will act as an alias to the global introduced by the script</td>
      <td>
        <pre lang="js">
"RAMDA"
        </pre>
      </td>
    </tr>
    <tr>
      <td>`expose`</td>
      <td>No</td>
      <td>Array of Strings</td>
      <td>A list of method names on the `global` that you wish to expose globally. **Given this list is not provided all methods found on the `global` will be exposed**</td>
      <td>
        <pre lang="js">
[
  "identity",
  "map",
  "filter"
]
        </pre>
      </td>
    </tr>
  </tbody>
</table>

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
