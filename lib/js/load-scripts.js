import { Future } from 'ramda-fantasy';
import { sequence } from 'ramda';
import load from 'load-script';
import expose from './expose-globals';

// loadScript :: script -> Future error script
const loadScript = script => Future((reject, resolve) => {

  load(script.src, err => err ? reject(err) : resolve(script));

}).map(expose(window));

// loadParallelScripts = Array scripts -> () -> Future error [scripts]
const loadParallelScripts = scripts => () => sequence(Future.of, scripts.map(loadScript));

// loadScripts :: Object config -> Future error [scripts]
export default function loadScripts(config) {

  const { ramdaScript, scripts } = config;

  // First load ramda, then load the remaining scripts in parallel.
  return loadScript(ramdaScript).chain(loadParallelScripts(scripts));

}
