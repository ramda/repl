import R from 'ramda';
import codeMirrorConfig from './codemirror/code-mirror-config.json';
import CodeMirror from './codemirror/codemirror';

const outputConfig = R.merge(codeMirrorConfig, {
  readOnly : true
});

export default function bindOutputPanel(options) {
  return CodeMirror.fromTextArea(options.outputEl, outputConfig);
}
