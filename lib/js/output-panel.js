import R from 'ramda';
import codeMirrorConfig from '../code-mirror-config.json';

const outputConfig = R.merge(codeMirrorConfig, {
  readOnly : true
});

export default function bindOutputPanel(options) {
  return CodeMirror.fromTextArea(options.outputEl, outputConfig);
}
