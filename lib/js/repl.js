import reporter from './logger';
import bindClearButton from './clear';
import bindResetButton from './reset';
import bindPrettyBtn from './pretty';
import bindShortUrlButton from './googl';
import bindInputPanel from './input-panel';
import bindOutputPanel from './output-panel';
import constructDOM from './dom/constructDOM';
import structure from './dom/structure';

/*
 * bindBehaviour :: Object structure, Object config -> Object structure
 * Takes a structure representing the REPL and returns the same structure with DOM event bindings
 * attached.
 */
const bindBehaviour = (structure, config) => {

  const querySelector = structure.el.querySelector.bind(structure.el);

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
    urlOut          : querySelector('.js-url-out')
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

  return structure;

};

/*
 * replaceTarget :: DOMNode targetEl, Object config
 * This has the effect of hiding the "target" element and appending the DOM that represents the
 * Ramda REPL next to it.
 */
window.ramdaRepl = (targetEl, config = {}) => {

  targetEl.style.display = 'none';

  if (!config.initialValue) {
    config.initialValue = targetEl.value || targetEl.textContent;
  }

  const structureWithDOM = constructDOM(document, structure);

  targetEl.parentNode.insertBefore(structureWithDOM.el, targetEl);

  // The structure needs to be attached to the document before initialising the codemirror.
  bindBehaviour(structureWithDOM, config);

};
