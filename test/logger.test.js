import assert from 'assert';
import jsdom from 'jsdom';
import R from 'ramda';
import sinon from 'sinon';

import reporter from '../lib/js/logger';

describe('reporter', function() {

  let consoleMock,
    logEl;

  beforeEach(function() {

    const doc = jsdom.jsdom('<div class="console-log"></div>');

    consoleMock = ['clear', 'log', 'info', 'debug'].reduce((o, method) => {
      o[method] = sinon.spy();
      return o;
    }, {});

    logEl = doc.querySelector('.console-log');

  });

  describe('.main', function() {

    const text = 'ramda';

    it('will decorate console.clear', function() {

      reporter.main({
        consoleLogElement : logEl,
        consoleRef : consoleMock
      });

      logEl.textContent = text;

      consoleMock.clear();

      assert(R.isEmpty(logEl.textContent));

    });

    ['log', 'info', 'debug'].forEach(method => {

      it(`will decorate console.${method}`, function() {

        logEl.textContent = '';

        reporter.main({
          consoleLogElement : logEl,
          consoleRef : consoleMock
        });

        consoleMock[method](text);

        assert.equal(text, logEl.textContent);

        consoleMock[method](text);

        assert.equal(`${text}\n${text}`, logEl.textContent);

      });

    });


  });

});
