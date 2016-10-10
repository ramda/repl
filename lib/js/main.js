import replaceTarget from './repl';

/*
 * ramdaRepl  :: DOMNode targetEl, Object config
 * This has the effect of loading the named scripts and adding their functions to the global object
 * before modifying the DOM to present the REPL.
 */
window.ramdaRepl = function ramdaRepl(targetEl, config) {

  replaceTarget(targetEl, config);

};
