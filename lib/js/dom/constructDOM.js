import { uncurryN, keys, reduce } from 'ramda';

/*
 * constructDOM :: Object doc, Object tree -> Object tree
 * The notion here is that we can pass in a reference to the `document` and a tree describing a DOM
 * structure, and this will traverse the tree generating a DOM structure.
 * Part of the traversal includes binding DOM references to the tree at `el`.
 */
const constructDOM = (doc, tree) => {

  tree.el = doc.createElement(tree.tagName);

  if (tree.className) {

    tree.el.className = tree.className;

  }

  if (tree.children) {

    const branch = constructBranch(doc, tree.children)

    tree.el.appendChild(branch.frag);
    tree.children = branch.children;

  }

  if (tree.textContent) {
    tree.el.textContent = tree.textContent;
  }

  if (tree.attrs) {

    return keys(tree.attrs).reduce((acc, key) => {

      acc.el[key] = tree.attrs[key];
      return acc;

    }, tree);

  }

  return tree;

};

/*
 * constructBranch
 * :: Object document
 * -> [Object child]
 * -> Object { frag: DocumentFragment, [Object child] }
 */
const constructBranch = uncurryN(2, doc => reduce((acc, child) => {

  const boundChild = constructDOM(doc, child);

  acc.frag.appendChild(boundChild.el);
  acc.children.push(boundChild);

  return acc;

}, { frag: doc.createDocumentFragment(), children: [] }));

export default constructDOM;
