export default function bindClearButton(options) {

  options.btnClear.addEventListener('click', () => {
    console.clear();
    options.output.setValue('');
    options.evalError.textContent = '';
  });

}
