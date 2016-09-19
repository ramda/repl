import reporter from './logger';
import bindClearButton from './clear';
import bindResetButton from './reset';
import bindPrettyBtn from './pretty';
import bindShortUrlButton from './googl';
import bindInputPanel from './input-panel';
import bindOutputPanel from './output-panel';

reporter.main({
  consoleLogElement: document.querySelector('.console-log'),
  consoleRef: window.console
});

const output = bindOutputPanel({
  outputEl: document.querySelector('.output')
});

bindResetButton({
  btnReset: document.getElementById('resetBtn'),
  window: window
});

bindClearButton({
  btnClear: document.querySelector('.clear-console'),
  evalError: document.querySelector('pre.error'),
  output: output
});

bindShortUrlButton({
  btnMakeShortUrl: document.getElementById('mkurl'),
  urlOut: document.getElementById('urlout')
});

bindPrettyBtn({
  btnPretty: document.querySelector('.pretty-console'),
  output: output
});

bindInputPanel({
  input: document.querySelector('.input'),
  evalError: document.querySelector('pre.error'),
  output: output,
  delay: 1000
});
