import assert from 'assert';
import jsdom from 'jsdom';
import R from 'ramda';
import sinon from 'sinon';
import bindInputPanel from '../lib/js/input-panel';

describe('Input panel', function() {

  let errMsgEl,
    inputEl,
    output,
    clock;

  beforeEach(function() {

    const doc = jsdom.jsdom(`
      <!doctype html>
      <html>
      <body>
        <div class="err-msg"></div>
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
      delay: 10
    });

    input.setValue('identity');

    clock.tick(20); // debounce

    sinon.assert.calledWith(output.setValue, R.identity.toString());

  });

  it('should compile JS codes with generator syntax', function() {

    const input = bindInputPanel({
      input: inputEl,
      evalError: errMsgEl,
      output,
      delay: 5
    });

    input.setValue('function* a() { yield 1; }; a().next();');

    clock.tick(10); // debounce

    assert.equal('', errMsgEl.textContent);
    sinon.assert.calledOnce(output.setValue);
    assert.deepEqual(JSON.parse(output.setValue.args[0][0]), {done: false, value: 1});

  });

  it('should set error messages if a compile fails', function() {

    const input = bindInputPanel({
      input: inputEl,
      evalError: errMsgEl,
      output,
      delay: 0
    });

    input.setValue('-a')

    clock.tick(10); // debounce

    sinon.assert.notCalled(output.setValue);
    assert.equal('a is not defined', errMsgEl.textContent);

  });

  it('clears error messages before a compile', function() {

    errMsgEl.textContent = '♈';

    const input = bindInputPanel({
      input: inputEl,
      evalError: errMsgEl,
      output,
      delay: 0
    });

    input.setValue('[1,2,3]')

    clock.tick(10); // debounce

    assert.equal('', errMsgEl.textContent);

  });

  describe('given an "initialValue" option is present', function() {

    it('should compile the initial value', function() {

      bindInputPanel({
        input: inputEl,
        evalError: errMsgEl,
        initialValue : '[1,2,3]',
        output,
        delay: 0
      });

      clock.tick(20); // debounce

      sinon.assert.calledWith(output.setValue, '[1, 2, 3]');

    });

  });

  describe('given an "onChange" option is present', function() {

    it('should call the callback with the pre-compiled output', function() {

      const onChangeSpy = sinon.spy();

      const input = bindInputPanel({
        input: inputEl,
        evalError: errMsgEl,
        onChange : onChangeSpy,
        output,
        delay: 0
      });

      input.setValue('[1,2,3]');

      clock.tick(20); // debounce

      sinon.assert.calledWith(onChangeSpy, '[1,2,3]');

    });

  });

});
