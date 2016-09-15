import assert from 'assert';
import jsdom from 'jsdom';
import R from 'ramda';
import sinon from 'sinon';

import bindClearButton from '../lib/js/clear';

describe('Clicking the "clear" button', function() {

  const errMsg = 'An error is present';

  let errMsgEl,
    btnClearEl,
    output;

  beforeEach(function() {

    const doc = jsdom.jsdom(`
      <div class="err-msg">
        ${errMsg}
      </div>
      <button class="btn-clear"></button>
    `);

    errMsgEl = doc.querySelector('.err-msg');
    btnClearEl = doc.querySelector('.btn-clear');
    output = {
      setValue : sinon.spy()
    };

    console.clear = sinon.spy();

    bindClearButton({
      btnClear : btnClearEl,
      evalError : errMsgEl,
      output
    });

  });

  it('should clear the console', function() {

    assert.equal(false, console.clear.calledOnce);

    btnClearEl.click();

    assert(console.clear.calledOnce);

  });

  it('should clear the error message text', function() {

    assert.ok(R.contains(errMsg, errMsgEl.textContent));

    btnClearEl.click();

    assert(R.isEmpty(errMsgEl.textContent));

  });

  it('should clear the output text', function() {

    assert.equal(false, output.setValue.calledOnce);

    btnClearEl.click();

    assert(output.setValue.calledOnce);

  });

});
