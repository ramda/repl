import { Future } from 'ramda-fantasy';
import { sequence } from 'ramda';
import load from 'load-script';

// loadScript :: Script -> Future Error Script
const loadScript = script => Future((reject, resolve) => {

  console.log(`Loading ${script.name}`);

  load(script.src, err => err ? reject(err) : resolve(script));

});

// loadParallelScripts = Array scripts -> () -> Future Error [Scripts]
const loadParallelScripts = scripts => () => sequence(Future.of, scripts.map(loadScript));

// loadScripts :: Object config -> Future Error [Scripts]
export default function loadScripts(config) {

  const { ramdaScript, scripts } = config;

  // First load ramda, then load the remaining scripts in parallel.
  return loadScript(ramdaScript).chain(loadParallelScripts(scripts));

}
