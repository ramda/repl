import prettyJS from 'pretty-js';

export default function bindPrettyButton(options) {
  options.btnPretty.addEventListener('click', function prettify() {
    options.output.setValue(prettyJS(options.output.getValue()));
  });
}
