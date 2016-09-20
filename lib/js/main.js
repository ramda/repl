import R from 'ramda';
import sanctuary from 'sanctuary';
import ramdaFantasy from 'ramda-fantasy';

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
