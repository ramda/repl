import assert from 'assert';
import R from 'ramda';
import sanctuary from 'sanctuary';
import ramdaFantasy from 'ramda-fantasy';

import '../lib/js/main';

describe('Globals', function() {

  it('adds a global reference to Sanctuary', function() {

    assert('S' in window);
    assert.equal(window.S, sanctuary);

  });

  [
    'Either',
    'Future',
    'Identity',
    'IO',
    'lift2',
    'lift3',
    'Maybe',
    'Tuple',
    'Reader'
  ].forEach(function(key) {

    it(`adds a global reference to ${key}`, function() {
      assert(key in window);
      assert.equal(window[key], ramdaFantasy[key]);
    });

  });

  // `length` omitted ?
  const ramdaKeys = R.reject(R.equals('length'), R.keys(R));

  ramdaKeys.forEach(function(key) {

    it(`adds a global reference to ${key}`, function() {
      assert(key in window);
      assert.equal(window[key], R[key]);
    });

  });

});
