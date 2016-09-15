import R from 'ramda';

const internals = {};
const reporter = {};

let consoleLogElement,
  consoleRef;

internals.buffer = [];

internals.flush = function flush() {
  consoleLogElement.textContent = internals.buffer.join('\n');
};

internals.logMethods = ['log', 'info', 'debug'];

internals.prepLogs = R.cond([
  [R.is(String), R.identity],
  [R.is(Function), R.toString],
  [R.T, JSON.stringify]
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
