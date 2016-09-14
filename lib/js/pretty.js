import prettyJS from 'pretty-js';
const prettyBtn = document.querySelector('.pretty-console');

export default (output) => {
  prettyBtn.addEventListener('click', function prettify() {
    output.setValue(prettyJS(output.getValue()));
  });
};
