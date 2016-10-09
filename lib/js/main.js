/*import sanctuary from 'sanctuary';*/
/*import ramdaFantasy from 'ramda-fantasy';*/
import replaceTarget from './repl';

/*
window.S = sanctuary;
window.Either = ramdaFantasy.Either;
window.Future = ramdaFantasy.Future;
window.Identity = ramdaFantasy.Identity;
window.IO = ramdaFantasy.IO;
window.lift2 = ramdaFantasy.lift2;
window.lift3 = ramdaFantasy.lift3;
window.Maybe = ramdaFantasy.Maybe;
window.Tuple = ramdaFantasy.Tuple;
window.Reader = ramdaFantasy.Reader;

const _window = {}
R.forEach(x => _window[x] = window[x], R.keys(R).filter(k => k in window))
R.forEach(x => window[x] = R[x], R.keys(R))
*/

/*
 * ramdaRepl  :: DOMNode targetEl, Object config
 * This has the effect of loading the named scripts and adding their functions to the global object
 * before modifying the DOM to present the REPL.
 */
window.ramdaRepl = function ramdaRepl(targetEl, config) {

  replaceTarget(targetEl, config);

};
