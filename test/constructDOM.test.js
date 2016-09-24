import assert from 'assert';
import R from 'ramda';

import constructDOM from '../lib/js/dom/constructDOM';

describe('A utility for generating DOM structure', function() {

  it('takes a document and a structure and returns the same structure with bindings to a generated DOM', function() {

    const root = {
      tagName: 'div',
      className: 'ramda'
    };

    const { el } = constructDOM(document, root);

    assert.equal(R.toLower(el.tagName), root.tagName);
    assert.equal(el.className, root.className);

  });

  it('will generate and attach child elements', function() {

    const root = {
      tagName: 'div',
      className: 'ramda',
      children: [
        {
          tagName: 'ul',
          children: [
            { tagName : 'li' },
            { tagName : 'li' },
            { tagName : 'li' }
          ]
        }
      ]
    };

    const { el } = constructDOM(document, root);

    const lis = el.querySelectorAll('li');
    assert.equal(root.children[0].children.length, lis.length);

  });

  it('will insert text content', function() {

    const root = {
      tagName: 'div',
      textContent: 'ramda'
    };

    const { el } = constructDOM(document, root);

    assert.equal(el.textContent, root.textContent);

  });

  it('will provide attributes', function() {

    const root = {
      tagName: 'input',
      attrs: {
        value : 1,
        type : 'number'
      }
    };

    const { el } = constructDOM(document, root);

    assert.equal(el.value, root.attrs.value);
    assert.equal(el.type, root.attrs.type);

  });

});

