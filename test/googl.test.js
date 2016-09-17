import assert from 'assert';
import jsdom from 'jsdom';
import R from 'ramda';
import sinon from 'sinon';

import bindShortUrlButton from '../lib/js/googl';

describe.only('Clicking the "Make short URL" button', function() {

  const locationHash = 'location-hash';

  let btnMakeShortUrl,
    urlOut,
    xhr,
    consoleRef;

  let requests = [];

  beforeEach(function() {

    const doc = jsdom.jsdom(`
      <input class="url-out" type="text"/>
      <button class="btn-url"></button>
    `);

    btnMakeShortUrl = doc.querySelector('.btn-url'),
    urlOut          = doc.querySelector('.url-out');

    // Example: using sinon to mock XMLHttpRequest
    // https://github.com/scriptare/compago-ajax/blob/master/tests/unit.test.js#L36
    xhr = sinon.useFakeXMLHttpRequest();
    global.XMLHttpRequest = xhr;
    global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = xhr => requests.push(xhr);

    // The request data presumes a global location.hash
    global.location = { hash : locationHash };

    consoleRef = { error : sinon.spy() };

  });

  afterEach(function() {
    requests = [];
    xhr.restore();
  });

  it('should invoke a request for a short url', function() {

    bindShortUrlButton({ btnMakeShortUrl, urlOut, consoleRef });

    btnMakeShortUrl.click();

    assert.equal(1, requests.length);
    assert(R.contains(global.location.hash, R.head(requests).requestBody));

  });

  it('calls console.error when an XHR error occurs', function() {

    bindShortUrlButton({ btnMakeShortUrl, urlOut, consoleRef });

    btnMakeShortUrl.click();

    const request = R.head(requests);
    request.dispatchEvent(new sinon.Event('error', false, false, xhr));

    sinon.assert.called(consoleRef.error);

  });

/*
 *  it('sets success responses in the DOM', function() {
 *
 *    bindShortUrlButton({ btnMakeShortUrl, urlOut, consoleRef });
 *
 *    btnMakeShortUrl.click();
 *
 *    const request = R.head(requests);
 *    const responseBody = 'ramda';
 *
 *    request.respond(500, { 'Content-Type': 'text/plain' }, responseBody);
 *    request.dispatchEvent(new sinon.Event('load'));
 *
 *    assert.equal(responseBody, urlOut.textContent);
 *
 *  });
 */

});
