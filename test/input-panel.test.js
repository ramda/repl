import 'jsdom-global/register';
// import assert from 'assert';
import jsdom from 'jsdom';
import R from 'ramda';
import sinon from 'sinon';
import bindInputPanel from '../lib/js/input-panel';

describe.only('Input panel', function() {

  const errMsg = 'An error is present';

  let errMsgEl,
    inputEl,
    output,
    clock;

  beforeEach(function() {

    const doc = jsdom.jsdom(`
      <!doctype html>
      <html>
      <body>
        <div class="err-msg">
          ${errMsg}
        </div>
        <textarea class="input"></textarea>
        <input class="mock" type="range"/>
      </body>
      </html>
    `);

    // CodeMirror expects to find a document.
    global.document = doc;

    // Babel transform expects to find R defined globally.
    global.R = R;

    // JSDOM does not presently implement createRange / createTextRange; CodeMirror expects one of
    // these to exist.
    // https://github.com/tmpvar/jsdom/issues/317
    doc.body.createTextRange = () => doc.querySelector('.mock');

    // Provide a way to push time forwards (as the input is debounced).
    clock = sinon.useFakeTimers();

    errMsgEl = doc.querySelector('.err-msg');
    inputEl = doc.querySelector('.input');
    output = {
      setValue : sinon.spy()
    };

  });

  it('should compile and set the input text', function() {

    const input = bindInputPanel({
      input: inputEl,
      evalError: errMsgEl,
      output,
      delay : 10
    });

    input.setValue('identity');

    clock.tick(20);

    sinon.assert.calledWith(output.setValue, R.identity.toString());

  });

  // it should set error messages if a compile fails
  // it should set text sources from the queryString
  // it should update the queryString
  // it should highlight it's text

});
