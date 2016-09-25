import R from 'ramda';
import S from 'sanctuary';
import {Future} from 'ramda-fantasy';

const setValue = R.curry(function(options, data) {
  options.urlOut.value = data;
  options.urlOut.select();
});

const error = err => console.error(err);

const xhr = function(options) {
  return new Future(function(reject, resolve) {
    const oReq = new XMLHttpRequest();

    const requestData = { longUrl: `${options.returnUrl}${location.hash}` };

    oReq.addEventListener('load', resolve, false);
    oReq.addEventListener('error', reject, false);
    oReq.addEventListener('abort', reject, false);
    oReq.open('POST', options.apiUrl, true);
    oReq.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    oReq.send(JSON.stringify(requestData));
  });
};

const getResponse = R.compose(R.map(S.parseJson),
                            R.map(R.path(['target', 'responseText'])), xhr);

const getShortUrl = options => R.map(R.compose(setValue(options), R.prop('id')));

const futureXhr = options => getResponse(options);

export default function bindShortUrlButton(options) {

  options.btnMakeShortUrl.addEventListener('click', function() {
    futureXhr(options).fork(error, getShortUrl(options));
  });

}
