import sinon from 'sinon';
import assert from 'assert';
import mock from 'mock-require';
import { Either } from 'ramda-fantasy';

describe('Load scripts', function() {

  let config;
  let loadStub = sinon.stub();

  beforeEach(function() {

    config = {
      ramdaScript : { src : '/fake/ramda.js' },
      scripts : [
        { src : '/fake/san.js' },
        { src : '/fake/fan.js' }
      ]
    };

    // This will intercept the script loader, providing a mock that we can use to influence the
    // code under test.
    // It is a module providing a function that takes a url and a node-style callback:
    // `loadScript(url, err => ...);`
    mock('load-script', loadStub);

  });

  afterEach(function() {
    loadStub.reset();
  });

  it('returns a Future', function() {

    const loadScripts = require('../lib/js/load-scripts');
    const Future      = require('ramda-fantasy').Future;

    assert(loadScripts.default(config) instanceof Future)

  });

  it('calls the failure path if Ramda doesn\'t load', function() {

    const loadScripts = require('../lib/js/load-scripts');

    const onError   = sinon.spy();
    const onSuccess = sinon.spy();

    loadScripts.default(config).fork(onError, onSuccess);

    // At this point the script loader should have started loading the Ramda script only.
    sinon.assert.calledWith(loadStub, config.ramdaScript.src);
    sinon.assert.calledOnce(loadStub);

    // Now we can invoke the callback, simulating the 'onload' of the Ramda script. In this case
    // we give it an error to mimic Ramda failing to load:
    loadStub.callArgWith(1, Error('Luke 15:4'));

    // It will not go on to load any more scripts as they probably would rely on Ramda.
    sinon.assert.calledOnce(loadStub);

    sinon.assert.calledWith(onError, Either.Left(config.ramdaScript));

  });

  it('will load other scripts once Ramda has loaded', function() {

    const loadScripts = require('../lib/js/load-scripts');

    loadScripts.default(config).fork(sinon.spy(), sinon.spy());

    // At this point the script loader should have started loading the Ramda script only.
    sinon.assert.calledWith(loadStub, config.ramdaScript.src);
    sinon.assert.calledOnce(loadStub);

    // Now we can invoke the callback, simulating the 'onload' of the Ramda script.
    // In this case no error is given, so it can continue to load other scripts.
    loadStub.callArgWith(1);

    sinon.assert.calledWith(loadStub, config.scripts[0].src);
    sinon.assert.calledWith(loadStub, config.scripts[1].src);

  });

  it('will take the success path even if other scripts fail to load', function() {

    const loadScripts = require('../lib/js/load-scripts');

    const onError   = sinon.spy();
    const onSuccess = sinon.spy();

    loadScripts.default(config).fork(onError, onSuccess);

    loadStub.callArgWith(1); // Loaded Ramda
    loadStub.callArgWith(1, Error('No san')); // Failed to load `san.js`
    loadStub.callArgWith(1, Error('No fan')); // Loaded `fan.js`

    sinon.assert.calledWith(onSuccess, [
      Either.Right(config.ramdaScript),
      Either.Left(config.scripts[0]),
      Either.Left(config.scripts[1])
    ]);

  });

});
