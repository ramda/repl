import assert from 'assert';
import jsdom from 'jsdom';

import bindResetButton from '../lib/js/reset';

describe('Clicking the "reset" button', function() {

  it('should return the window location to "."', function() {

    const doc = jsdom.jsdom(`
      <button class="btn-reset"></button>
    `);

    const fromLocation = 'qwerty';
    const toLocation   = '.';

    const win = {
      location : fromLocation
    };

    const btnResetEl = doc.querySelector('.btn-reset');

    bindResetButton({
      btnReset : btnResetEl,
      window : win
    });

    assert.equal(win.location, fromLocation);

    btnResetEl.click();

    assert.equal(win.location, toLocation);

  });

});
