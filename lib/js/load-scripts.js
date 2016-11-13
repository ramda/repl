import { Either, Future } from 'ramda-fantasy';
import { prepend, sequence } from 'ramda';
import load from 'load-script';

// The following functions provide contexts to `scriptDescriptors`, which are structures derived
// from the configuration and look like `{ src : 'path/to/ramda.js' }`

// :: scriptDescriptor -> Future (Either scriptDescriptor scriptDescriptor)
const loadScript = sd => Future((reject, resolve) => {

  load(sd.src, err => err ? reject(sd) : resolve(sd));

}).bimap(Either.Left, Either.Right);

// :: [scriptDescriptors] -> Future [Either scriptDecriptor scriptDecriptor]
const loadRemainingScripts = asd => sequence(
  Future.of,
  asd.map(loadScript).map(fesd => fesd.chainReject(Future.of))
);

// :: combineWith
// -> Future [Either scriptDescriptor scriptDescriptor]
// :: Either scriptDescriptor scriptDescriptor
// -> Future [Either scriptDescriptor scriptDescriptor]
const combineWith = fesd => esd => Future.of(prepend(esd)).ap(fesd);

// :: Object config -> Future [Either scriptDescriptor scriptDescriptor]
export default function loadScripts(config) {

  const { ramdaScript, scripts } = config;
  const futureRemainingScripts = loadRemainingScripts(scripts);

  // First load ramda, then load the remaining scripts in parallel.
  return loadScript(ramdaScript)
    .chain(combineWith(futureRemainingScripts));

}
