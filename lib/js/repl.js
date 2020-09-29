import { Either } from 'ramda-fantasy';
import { path, isEmpty, identity } from 'ramda';
import reporter from './logger';
import bindClearButton from './clear';
import bindResetButton from './reset';
import bindPrettyBtn from './pretty';
import bindShortUrlButton from './tinyurl';
import bindInputPanel from './input-panel';
import bindOutputPanel from './output-panel';
import replDOM from './dom/replDOM';
import loadScripts from './load-scripts';
import exposeGlobals from './expose-globals';

// :: Either a b -> Either a b
// Has an intentional side effect where globals are exposed on the `window` object.
const expose = Either.either(identity, exposeGlobals(window));

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

/*
 * onLoadError :: DOMNode el > [Either scriptDescriptor scriptDescriptor] -> undefined
 *
 * This has the following effects:
 * - hides the loading state
 * - indicates that Ramda failed to load
 */
const onLoadError = el => eitherScriptDescriptors => {
  el.className = 'repl repl--no-ramda';
  el.querySelector('.js-icon--danger').title = 'Ramda failed to load, try refreshing';
};

/*
 * onLoadSuccess
 * :: (DOMNode el, Object config)
 * -> [Either scriptDescriptor scriptDescriptor]
 * -> undefined
 *
 * This has the following effects:
 * - hides the loading state
 * - exposes globals from the loaded scripts as prescribed by the configuration
 * - makes the REPL interactive
 * - indicates if any scripts failed to load
 */
const onLoadSuccess = (el, config) => esds => {

  esds.forEach(expose);

  const failedScripts = esds.filter(Either.isLeft).map(path(['value', 'src']));

  el.className = isEmpty(failedScripts)
    ? 'repl'
    : 'repl repl--missing-script';

  el.querySelector('.js-icon--warning').title = failedScripts
    .map(s => `Failed to load '${s}'`)
    .join('\n')

  bindBehaviour(el, config);

};

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

  loadScripts(config).fork(onLoadError(replDOM), onLoadSuccess(replDOM, config));

}
