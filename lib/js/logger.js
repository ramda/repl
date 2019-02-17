import R from 'ramda';

const internals = {};
const reporter = {};

let consoleLogElement,
  consoleRef;

const valueReplacer = (key, value) => {
  if (value === undefined) {
    return `__${undefined}__`
  }
  if (typeof value === 'number' && (isNaN(value) || !isFinite(value))) {
    return `__${value}__`;
  }
  return value;
}

const replaceTempValues = (str = '') => str
  .replace(/"__undefined__"/g, 'undefined')
  .replace(/"__NaN__"/g, 'NaN')
  .replace(/"__Infinity__"/g, 'Infinity')
  .replace(/"__-Infinity__"/g, '-Infinity');

const stringify = R.compose(
  replaceTempValues,
  R.flip(R.curryN(2, JSON.stringify))(valueReplacer)
)

internals.buffer = [];

internals.flush = function flush() {
  consoleLogElement.textContent = internals.buffer.join('\n');
};

internals.logMethods = ['log', 'info', 'debug'];

internals.prepLogs = R.cond([
  [R.is(String), R.identity],
  [R.is(Function), R.toString],
  [R.T, stringify]
]);

internals.intercept = function(method) {
  const original = consoleRef[method];
  consoleRef[method] = function(...args) {
    args.reduce(function(buf, arg) {
      buf.push(internals.prepLogs(arg));
      return buf;
    }, internals.buffer);
    original.apply(consoleRef, args);
    internals.flush();
  };
};

internals.clear = function() {
  const consoleClear = consoleRef.clear;
  consoleRef.clear = function() {
    internals.buffer = [];
    consoleLogElement.textContent = '';
    consoleClear.call(consoleRef);
  };
};

reporter.main = function(options) {
  consoleLogElement = options.consoleLogElement
  consoleRef = options.consoleRef;
  internals.clear();
  internals.buffer = [];
  internals.logMethods.reduce(function(fn, method) {
    fn(method);
    return fn;
  }, internals.intercept);
};

export default reporter;
