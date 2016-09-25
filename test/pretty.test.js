import jsdom from 'jsdom';
import sinon from 'sinon';

import bindPrettyButton from '../lib/js/pretty';

describe('Clicking the "pretty" button', function() {

  let btnPrettyEl,
    output;

  beforeEach(function() {

    const doc = jsdom.jsdom('<button class="btn-pretty"></button>');

    btnPrettyEl = doc.querySelector('.btn-pretty');

  });

  it('should instruct the "output" CodeMirror to reformat the text', function() {

    const unformattedCode = "['a', 'b', 'c,']";
    const formattedCode = `[\n    "a",\n    "b",\n    "c,"\n]`;

    output = {
      setValue : sinon.spy(),
      getValue : sinon.stub().returns(unformattedCode)
    };

    bindPrettyButton({
      btnPretty : btnPrettyEl,
      output : output
    });

    btnPrettyEl.click();

    sinon.assert.called(output.getValue);
    sinon.assert.calledWith(output.setValue, formattedCode + 'FAIL!');

  });

});
