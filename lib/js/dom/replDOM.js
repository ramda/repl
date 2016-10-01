import rdom from 'rdom';

rdom.addTags(['pre'], rdom);

const {
  h3,
  div,
  input,
  button,
  textarea,
  pre
} = rdom;

const btnReset = button(
  { className: 'repl-btn-alt repl-btn-reset js-btn-reset' },
  ['Reset']
);

const btnShortUrl = button(
  { className: 'repl-btn-alt repl-btn-short-url js-btn-short-url' },
  ['Make Short URL:']
);

const btnClear = button(
  { className: 'repl-btn js-btn-clear', type: 'button' },
  ['Clear Output']
);

const btnPretty = button(
  { className: 'repl-btn js-btn-pretty', type: 'button' },
  ['Pretty Output']
);

const urlOut = input({
  className: 'repl-url-out js-url-out',
  type: 'text'
}, []);

// The input panel
const inputPanel = div(
  { className: 'repl-panel repl-panel--input' },
  [
    h3(
      { className: 'repl-title' },
      ['Input']
    ),
    div(
      { className: 'repl-panel-body' },
      [
        textarea({ className: 'js-input' }, [])
      ]
    )
  ]
);

// The output panel
const outputPanel = div(
  { className: 'repl-panel repl-panel--output' },
  [
    h3(
      { className: 'repl-title' },
      ['Output']
    ),
    btnClear,
    btnPretty,
    div(
      { className: 'repl-panel-body' },
      [
        pre({ className: 'repl-error js-error' }, []),
        pre({ className: 'repl-console-log js-console-log' }, []),
        textarea({ className: 'js-output' }, [])
      ]
    )
  ]
);

export default div(
  { className: 'repl' },
  [
    // The vertical line that splits the two panels
    div({ className: 'repl-midline' }, []),
    div({},
      [
        btnReset,
        btnShortUrl,
        urlOut
      ]
    ),
    div(
      { className: 'repl-panels' },
      [
        inputPanel,
        outputPanel
      ]
    )
  ]
)
