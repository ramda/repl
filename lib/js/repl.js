import reporter from './logger';
import bindClearButton from './clear';
import bindResetButton from './reset';
import bindPrettyBtn from './pretty';
import bindShortUrlButton from './googl';
import bindInputPanel from './input-panel';
import codeMirrorConfig from '../code-mirror-config.json';

const outputConfig = R.merge(codeMirrorConfig, {
  readOnly : true
});

const output = CodeMirror.fromTextArea(document.querySelector('.output'), outputConfig);

reporter.main({
  consoleLogElement: document.querySelector('.console-log'),
  consoleRef: window.console
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

