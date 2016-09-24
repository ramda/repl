import reporter from './logger';
import bindClearButton from './clear';
import bindResetButton from './reset';
import bindPrettyBtn from './pretty';
import bindShortUrlButton from './googl';
import bindInputPanel from './input-panel';
import bindOutputPanel from './output-panel';

reporter.main({
  consoleLogElement: document.querySelector('.js-console-log'),
  consoleRef: window.console
});

const output = bindOutputPanel({
  outputEl: document.querySelector('.js-output')
});

bindResetButton({
  btnReset: document.querySelector('.js-btn-reset'),
  window: window
});

bindClearButton({
  btnClear: document.querySelector('.js-btn-clear'),
  evalError: document.querySelector('.js-error'),
  output: output
});

bindShortUrlButton({
  btnMakeShortUrl: document.querySelector('.js-btn-short-url'),
  urlOut: document.querySelector('.js-url-out')
});

bindPrettyBtn({
  btnPretty: document.querySelector('.js-btn-pretty'),
  output: output
});

bindInputPanel({
  input: document.querySelector('.js-input'),
  evalError: document.querySelector('.js-error'),
  output: output,
  delay: 1000
});
