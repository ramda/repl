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

    it('will intercept console.clear, clearing the in-DOM log', function() {

      reporter.main({
        consoleLogElement : logEl,
        consoleRef : consoleMock
      });

      logEl.textContent = text;

      consoleMock.clear();

      assert(R.isEmpty(logEl.textContent));

    });

    ['log', 'info', 'debug'].forEach(method => {

      describe(`console.${method} interceptor`, function() {

        it('will display args in the DOM', function() {

          reporter.main({
            consoleLogElement : logEl,
            consoleRef : consoleMock
          });

          consoleMock[method](text);

          assert.equal(text, logEl.textContent);

          consoleMock[method](text);

          assert.equal(`${text}\n${text}`, logEl.textContent);

        });

        it('will display buffered args on multiple lines', function() {

          reporter.main({
            consoleLogElement : logEl,
            consoleRef : consoleMock
          });

          consoleMock[method](text);
          consoleMock[method](text);
          consoleMock[method](text);

          assert.equal(`${text}\n${text}\n${text}`, logEl.textContent);

        });

        it('will display string representations of Functions', function() {

          reporter.main({
            consoleLogElement : logEl,
            consoleRef : consoleMock
          });

          consoleMock[method](R.identity);

          assert.equal(R.identity.toString(), logEl.textContent);

        });

        it('will display stringified errors', function() {

          reporter.main({
            consoleLogElement : logEl,
            consoleRef : consoleMock
          });

          const e = new Error('🐑');

          consoleMock[method](e);

          assert.equal(JSON.stringify(e), logEl.textContent);

        });

        it('will display stringified objects', function() {

          reporter.main({
            consoleLogElement : logEl,
            consoleRef : consoleMock
          });

          const o = { baa : '🐑'};

          consoleMock[method](o);

          assert.equal(JSON.stringify(o), logEl.textContent);

        });

        it('will display stringified arrays', function() {

          reporter.main({
            consoleLogElement : logEl,
            consoleRef : consoleMock
          });

          const a = ['🐑'];

          consoleMock[method](a);

          assert.equal(JSON.stringify(a), logEl.textContent);

        });

      });

    });

  });

});
