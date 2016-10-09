import { compose, pickBy, keys, isNil } from 'ramda';

// getMethodNames :: Object -> Array String
const getMethodNames = compose(keys, pickBy(val => typeof val === 'function'));

// expose :: script -> script
//
// Side-effectful.
//
// This is intended to take methods introduced by a global made available by the loaded script and
// expose them on the `window` object.
//
// By default all top level methods of the global will be exposed.
// Given a method is present on the window object already it will not be overridden.
//
// Given the `script` has a property `expose` - a list of method names - only those listed
// will be exposed.
//
// Given the `script` has a property `exposeAs` - a string - the global will be made available at
// that namespace on the window object. Methods will not be exposed on `window`.
export default function expose(script) {

  if (isNil(script.global)) { return script; }

  const g = window[script.global];

  if (isNil(g)) { return script; }

  if (!isNil(script.exposeAs)) {

    window[script.exposeAs] = g;
    return script;

  }

  const methodNames = isNil(script.expose) ? getMethodNames(g) : script.expose;

  methodNames.forEach(name => {
    window[name] = window[name] || g[name];
  });

  return script;

}
