import {
  lensProp,
  lensIndex,
  compose
} from 'ramda';

/*
 * Lenses
 */
const lensChildren    = lensProp('children');
const lensEl          = lensProp('el');
const numToChildLens  = num => compose(lensChildren, lensIndex(num));
const lensFirstChild  = numToChildLens(0);
const lensSecondChild = numToChildLens(1);
const lensThirdChild  = numToChildLens(2);
const lensFourthChild = numToChildLens(3);

const lensInputPanel = compose(
  lensThirdChild,
  lensFirstChild
);

const lensOutputPanel = compose(
  lensThirdChild,
  lensSecondChild
);

export const lensConsoleEl = compose(
  lensOutputPanel,
  lensFourthChild,
  lensSecondChild,
  lensEl
);

export const lensErrorEl = compose(
  lensOutputPanel,
  lensFourthChild,
  lensFirstChild,
  lensEl
);

export const lensOutputTextareaEl = compose(
  lensOutputPanel,
  lensFourthChild,
  lensThirdChild,
  lensEl
);

export const lensBtnResetEl = compose(
  lensSecondChild,
  lensFirstChild,
  lensEl
);

export const lensBtnShortUrlEl = compose(
  lensSecondChild,
  lensSecondChild,
  lensEl
);

export const lensUrlOutEl = compose(
  lensSecondChild,
  lensThirdChild,
  lensEl
);

export const lensBtnClearEl = compose(
  lensOutputPanel,
  lensSecondChild,
  lensEl
);

export const lensBtnPrettyEl = compose(
  lensOutputPanel,
  lensThirdChild,
  lensEl
);

export const lensInputTextareaEl = compose(
  lensInputPanel,
  lensSecondChild,
  lensFirstChild,
  lensEl
);
