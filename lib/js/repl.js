import reporter from './logger';
import bindClearButton from './clear';
import bindResetButton from './reset';
import bindPrettyBtn from './pretty';
import bindShortUrlButton from './googl';
import bindInputPanel from './input-panel';
import bindOutputPanel from './output-panel';
import replDOM from './dom/replDOM';
import loadScripts from './load-scripts';

/*
 * bindBehaviour :: HTMLElement el, Object config -> HTMLElement el
 * Takes the root element of the REPL and returns the element with DOM event bindings
 * attached to its tree.
 */
const bindBehaviour = (el, config) => {

  const querySelector = el.querySelector.bind(el);

  reporter.main({
    consoleLogElement : querySelector('.js-console-log'),
    consoleRef        : window.console
  });

  const output = bindOutputPanel({
    outputEl : querySelector('.js-output')
  });

  bindResetButton({
    btnReset : querySelector('.js-btn-reset'),
    window   : window
  });

  bindClearButton({
    btnClear  : querySelector('.js-btn-clear'),
    evalError : querySelector('.js-error'),
    output    : output
  });

  bindShortUrlButton({
    btnMakeShortUrl : querySelector('.js-btn-short-url'),
    urlOut          : querySelector('.js-url-out'),
    apiUrl          : config.apiUrl,
    returnUrl       : config.returnUrl
  });

  bindPrettyBtn({
    btnPretty : querySelector('.js-btn-pretty'),
    output    : output
  });

  bindInputPanel({
    input        : querySelector('.js-input'),
    evalError    : querySelector('.js-error'),
    initialValue : config.initialValue,
    onChange     : config.onChange,
    output       : output,
    delay        : 1000
  });

  return el;

};

const onLoadEnd = el => el.className = 'repl'; // Removes repl-loading class

/*
 * replaceTarget :: DOMNode targetEl, Object config
 * This has the effect of hiding the "target" element and appending the DOM that represents the
 * Ramda REPL next to it.
 */
export default function replaceTarget(targetEl, config = {}) {

  targetEl.style.display = 'none';
  targetEl.parentNode.insertBefore(replDOM, targetEl);

  // Given an initial value is not explicitly set, attempt to use the content of the element that
  // the REPL is replacing.
  if (!config.initialValue) {
    config.initialValue = targetEl.value || targetEl.textContent;
  }

  loadScripts(config).fork(
    err => {
      onLoadEnd(replDOM);
      replDOM.querySelector('.js-error').textContent = err;
    },
    ()  => {
      onLoadEnd(replDOM);
      bindBehaviour(replDOM, config);
    }
  );

}
