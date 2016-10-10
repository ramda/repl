import sinon from 'sinon';
import mock from 'mock-require';

describe('Load scripts', function() {

  it('will load Ramda before any other script', function() {

    const config = {
      ramdaScript : { src : '/fake/ramda.js', name : 'ramda' },
      scripts : [
        { src : '/fake/jamda.js', name : 'jamda' }
      ]
    };

    const stub = sinon.stub();

    // Here we intercept the script loader. It is a function that takes a url and a node-style
    // callback. We will assert that the first script loaded is ramda, and that the second
    // script is not loaded until the ramda callback had been fired.
    mock('load-script', stub);

    const loadScripts = require('../lib/js/load-scripts');

    const onError   = sinon.spy();
    const onSuccess = sinon.spy();

    loadScripts.default(config).fork(onError, onSuccess);

    sinon.assert.calledWith(stub, config.ramdaScript.src);

    sinon.assert.calledOnce(stub);

    // Now we can invoke the callback, simulating the 'onload' of the Ramda script.
    stub.callArg(1)
    sinon.assert.calledWith(stub, config.scripts[0].src);

    // We can also confirm that if all the scripts loaded correctly, the success callback is fired.
    stub.callArg(1)
    sinon.assert.called(onSuccess);

  });

});
