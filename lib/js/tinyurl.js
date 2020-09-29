import R from 'ramda';
import {Future} from 'ramda-fantasy';

const setValue = R.curry(function(options, data) {
  options.urlOut.value = data;
  options.urlOut.select();
});

const error = err => console.error(err);

const xhr = function(options) {
  return new Future(function(reject, resolve) {
    const oReq = new XMLHttpRequest();

    const apiUrl = options.apiUrl + '?url='
                   + encodeURIComponent(`${options.returnUrl}${location.hash}`);

    oReq.addEventListener('load', resolve, false);
    oReq.addEventListener('error', reject, false);
    oReq.addEventListener('abort', reject, false);
    oReq.open('GET', apiUrl, true);
    oReq.send(null);
  });
};

const getResponse = R.compose(R.map(R.path(['target', 'responseText'])), xhr);

const futureXhr = options => getResponse(options);

export default function bindShortUrlButton(options) {

  // Given a missing or incomplete configuration, do not present or bind the controls.
  if (!options.apiUrl || !options.returnUrl) {
    options.btnMakeShortUrl.style.display = 'none';
    options.urlOut.style.display = 'none';
    return;
  }

  options.btnMakeShortUrl.addEventListener('click', function() {
    futureXhr(options).fork(error, setValue(options));
  });

}
