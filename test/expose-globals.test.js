import assert from 'assert';
import R from 'ramda';
import sanctuary from 'sanctuary';
import ramdaFantasy from 'ramda-fantasy';

import expose from '../lib/js/expose-globals';

describe('Expose Globals:', function() {

  describe('given a "script" object without a "global" property', function() {

    it('will not add any additional properties to the window object', function() {

      const script = {
        src  : 'http://ramda-example.com',
        name : 'ramda example'
      };

      // Attach Ramda to a mock window object - this is to simulate the presence of a global
      // introduced by a loaded script.
      const mockWindow = { R };

      const initialKeys = R.keys(mockWindow);

      expose(mockWindow, script);

      const nextKeys = R.keys(mockWindow);

      assert(R.equals(initialKeys, nextKeys));

    });

  });

  describe('given a "script" object with a "global" property that references a global not present on the window object', function() {

    it('will not add any additional properties to the window object', function() {

      const script = {
        src    : 'http://ramda-example.com',
        name   : 'ramda example',
        global : 'R'
      };

      const mockWindow = {};

      const initialKeys = R.keys(mockWindow);

      expose(mockWindow, script);

      const nextKeys = R.keys(mockWindow);

      assert(R.equals(initialKeys, nextKeys));

    });

  });

  describe('given a script object without "exposeAs" or "expose" properties', function() {

    it('will expose all properties of the named global, except for those already present on the window object', function() {

      const script = {
        src    : 'http://ramda-example.com',
        name   : 'ramda example',
        global : 'R'
      };

      const mockWindow = { R };

      expose(mockWindow, script);

      const ramdaKeys = R.difference(R.keys(R), ['__', 'toString']);

      ramdaKeys.forEach(function(key) {

        assert(key in mockWindow);
        assert.equal(mockWindow[key], R[key]);

      });

    });

  });

  describe('given a script with an "exposeAs" property', function() {

    it('will provide a reference to the named global using the "exposeAs" name', function() {

      const script = {
        src      : 'http://sanctuary-example.com',
        name     : 'sanctuary example',
        global   : 'sanctuary',
        exposeAs : 'S'
      };

      const mockWindow = { sanctuary };

      const initialKeys = R.keys(mockWindow);

      expose(mockWindow, script);

      const nextKeys = R.keys(mockWindow);

      // There should only be one additional key
      assert.equal(initialKeys.length + 1, nextKeys.length);

      // The new key is a reference to the named global
      assert.equal(sanctuary, mockWindow.S);

    });

  });

  describe('given a list of methods to expose', function() {

    it('will only expose the named methods', function() {

      const script = {
        src    : 'http://ramda-fantasy-example.com',
        name   : 'ramda-fantasy example',
        global : 'ramdaFantasy',
        expose : [
          'Either',
          'Future',
          'Identity',
          'IO',
          'lift2',
          'lift3',
          'Maybe',
          'Tuple',
          'Reader'
        ]
      };

      const mockWindow = { ramdaFantasy };

      const initialKeys = R.keys(mockWindow);

      expose(mockWindow, script);

      const nextKeys = R.keys(mockWindow);

      // Only the named methods will be exposed on the window object
      assert.equal(initialKeys.length + script.expose.length, nextKeys.length);

      script.expose.forEach(methodName => {
        assert.equal(mockWindow[methodName], ramdaFantasy[methodName]);
      });

    });

  });

});
