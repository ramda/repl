export default function bindResetButton(options) {

  options.btnReset.addEventListener('click', () => {
    options.window.location = '.';
  });

}
