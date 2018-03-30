import es2015 from 'babel-preset-es2015';
import stage0 from 'babel-preset-stage-0';
import R from 'ramda';
import debounce from 'debounce';
import codeMirrorConfig from './codemirror/code-mirror-config.json';
import CodeMirror from './codemirror/codemirror';
import 'babel-polyfill'; // required by transformer-regenerator

const babel = require('babel-core');

const inputConfig = R.merge(codeMirrorConfig, {
  lineNumbers : true,
  extraKeys: {
    Tab: 'autocomplete'
  },
  autofocus: true,
  autoCloseBrackets: true,
  historyEventDelay: 2000
});

const transformConfig = {
  filename: 'ramda',
  presets: [
    es2015,
    stage0
  ]
};

const ramdaStr = `const {${R.keys(R).join(',')}} = R;`;
const evalSource = R.compose(R.toString, eval); // eslint-disable-line no-eval
const errRedeclaringRamdaFn = new RegExp(`^ramda: Duplicate declaration "(${R.keys(R).join('|')})"`);

const formatCode = code => evalSource(code)
                              .replace('"use strict"', '')

const formatError = err => err.message
                              .replace(ramdaStr, '')
                              .replace(/(?=\d).*(?=\|)/g, a => Number(a.trim()) - 1)
                              .replace(
                                errRedeclaringRamdaFn,
                                'ramda: Cannot redeclare "$1" that has already been imported from Ramda'
                              );

function compile(input, options) {

  const source = input.getValue();
  const code = `${ramdaStr} \n${source}`;

  if (typeof options.onChange === 'function') {
    options.onChange(source);
  }

  options.evalError.textContent = '';

  try {

    const transformed = babel.transform(code, transformConfig);

    options.output.setValue(formatCode(transformed.code));

  } catch (err) {

    options.evalError.textContent = formatError(err);

  }

}
const debounceCompile = delay => debounce(compile, delay);

export default function bindInputPanel(options) {

  const input = CodeMirror.fromTextArea(options.input, inputConfig);
  const onChange = debounceCompile(options.delay);

  input.on('change', () => onChange(input, options));

  if (options.initialValue) {
    input.setValue(options.initialValue);
  }

  return input;

}
