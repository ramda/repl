import assert from 'assert';
import jsdom from 'jsdom';
import R from 'ramda';
import sinon from 'sinon';
import FakeXHR from 'fake-xml-http-request';

import bindShortUrlButton from '../lib/js/googl';

describe('Clicking the "Make short URL" button', function() {

  const locationHash = 'location-hash';

  let btnMakeShortUrl,
    urlOut;

  let requests = [];

  beforeEach(function() {

    const doc = jsdom.jsdom(`
      <input class="url-out" type="text"/>
      <button class="btn-url"></button>
    `);

    btnMakeShortUrl = doc.querySelector('.btn-url'),
    urlOut          = doc.querySelector('.url-out');

    global.XMLHttpRequest = function() {

      const fakeXhr = new FakeXHR();
      requests.push(fakeXhr);

      return fakeXhr;

    }

    // The request data presumes a global location.hash
    global.location = { hash : locationHash };

    console.error = sinon.spy();

  });

  afterEach(function() {
    requests = [];
  });

  it('should invoke a request for a short url', function() {

    bindShortUrlButton({ btnMakeShortUrl, urlOut });

    btnMakeShortUrl.click();

    assert.equal(1, requests.length);
    assert(R.contains(global.location.hash, R.head(requests).requestBody));

  });

  it('calls console.error when an XHR error occurs', function() {

    bindShortUrlButton({ btnMakeShortUrl, urlOut });

    btnMakeShortUrl.click();

    R.head(requests).dispatchEvent({ type : 'error' });

    sinon.assert.called(console.error);

  });

  it('sets success responses in the DOM', function() {

    bindShortUrlButton({ btnMakeShortUrl, urlOut });

    btnMakeShortUrl.click();

    const request = R.head(requests);
    const responseBody = { id: 'ramda'};

    request.respond(200, { 'Content-Type': 'text/plain' }, JSON.stringify(responseBody));

    assert.equal(responseBody.id, urlOut.value);

  });

});
