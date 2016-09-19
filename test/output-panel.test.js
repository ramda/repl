import 'jsdom-global/register';
import assert from 'assert';
import jsdom from 'jsdom';
import bindOutputPanel from '../lib/js/output-panel';

describe('Output panel', function() {

  let outputEl;

  beforeEach(function() {

    const doc = jsdom.jsdom(`
      <!doctype html>
      <html>
      <body>
        <textarea class="output"></textarea>
        <input class="mock" type="range"/>
      </body>
      </html>
    `);

    // CodeMirror expects to find a document.
    global.document = doc;

    // JSDOM does not presently implement createRange / createTextRange; CodeMirror expects one of
    // these to exist.
    // https://github.com/tmpvar/jsdom/issues/317
    doc.body.createTextRange = () => doc.querySelector('.mock');

    outputEl = doc.querySelector('.output');

  });

  it('should implement a codemirror', function() {

    const CodeMirror = require('codemirror');
    const output = bindOutputPanel({ outputEl });

    assert(output instanceof CodeMirror);

  });

});
