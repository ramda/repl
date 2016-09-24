import reporter from './logger';
import bindClearButton from './clear';
import bindResetButton from './reset';
import bindPrettyBtn from './pretty';
import bindShortUrlButton from './googl';
import bindInputPanel from './input-panel';
import bindOutputPanel from './output-panel';
import constructDOM from './dom/constructDOM';
import structure from './dom/structure';
import { view } from 'ramda';
import {
  lensBtnResetEl,
  lensBtnShortUrlEl,
  lensUrlOutEl,
  lensBtnClearEl,
  lensBtnPrettyEl,
  lensConsoleEl,
  lensErrorEl,
  lensInputTextareaEl,
  lensOutputTextareaEl
} from './dom/lenses';

/*
 * bindBehaviour :: Object structure -> Object structure
 * Takes a structure representing the REPL and returns the same structure with DOM event bindings
 * attached.
 */
const bindBehaviour = structure => {

  reporter.main({
    consoleLogElement : view(lensConsoleEl, structure),
    consoleRef        : window.console
  });

  const output = bindOutputPanel({
    outputEl : view(lensOutputTextareaEl, structure)
  });

  bindResetButton({
    btnReset : view(lensBtnResetEl, structure),
    window   : window
  });

  bindClearButton({
    btnClear  : view(lensBtnClearEl, structure),
    evalError : view(lensErrorEl, structure),
    output    : output
  });

  bindShortUrlButton({
    btnMakeShortUrl : view(lensBtnShortUrlEl, structure),
    urlOut          : view(lensUrlOutEl, structure)
  });

  bindPrettyBtn({
    btnPretty : view(lensBtnPrettyEl, structure),
    output    : output
  });

  bindInputPanel({
    input     : view(lensInputTextareaEl, structure),
    evalError : view(lensErrorEl, structure),
    output    : output,
    delay     : 1000
  });

  return structure;

};

/*
 * replaceTarget :: Object document -> () -> undefined
 * This has the effect of hiding the "target" element and appending the DOM that represents the
 * Ramda REPL next to it.
 */
const replaceTarget = doc => () => {

  const targetEl = doc.querySelector('.ramda-repl-target');
  targetEl.style.display = 'none';

  const structureWithDOM  = constructDOM(doc, structure);

  targetEl.parentNode.insertBefore(structureWithDOM.el, targetEl);

  // The structure needs to be attached to the document before initialising the codemirror.
  bindBehaviour(structureWithDOM);

};

document.addEventListener('DOMContentLoaded', replaceTarget(document));
