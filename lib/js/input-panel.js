import es2015 from 'babel-preset-es2015';
import stage0 from 'babel-preset-stage-0';
import R from 'ramda';
import debounce from 'debounce';
import queryString from 'query-string';
import codeMirrorConfig from '../code-mirror-config.json';

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

const setUrlPath = code => window.location.hash = '?' + queryString.stringify({ code });
const ramdaStr = `const {${R.keys(R).join(',')}} = R;`;
const evalSource = R.compose(R.toString, eval); // eslint-disable-line no-eval

const formatCode = code => evalSource(code)
                              .replace('"use strict"', '')

const formatError = err => err.message
                              .replace(ramdaStr, '')
                              .replace(/(?=\d).*(?=\|)/g, a => Number(a.trim()) - 1);

function compile(input, output, evalError) {

  const source = input.getValue();
  const code = `${ramdaStr} \n${source}`;

  setUrlPath(source);
  evalError.textContent = '';

  try {

    const transformed = babel.transform(code, transformConfig);

    output.setValue(formatCode(transformed.code));

  } catch (err) {

    evalError.textContent = formatError(err);

  }

}
const debounceCompile = delay => debounce(compile, delay);

export default function bindInputPanel(options) {

  const input = CodeMirror.fromTextArea(options.input, inputConfig);
  const onChange = debounceCompile(options.delay);

  input.on('change', () => onChange(input, options.output, options.evalError));

  // Get source code from 'code' params and paste it into editor
  // The 'code' param is actually located in a hash URL fragment,
  // so we have to parse the hash instead of query to prevent conflicts
  const code = queryString.parse(queryString.extract(location.hash)).code;
  if (code !== undefined) {
    input.setValue(code);
  }

  return input;

}
