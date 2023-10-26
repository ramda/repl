import rdom from 'rdom';

rdom.addTags(['i', 'pre', 'header'], rdom);

const {
  i,
  h3,
  header,
  div,
  input,
  button,
  textarea,
  pre
} = rdom;

const btnReset = button(
  { className: 'repl-btn repl-btn-danger repl-btn-reset js-btn-reset' },
  ['Reset']
);

const btnShortUrl = button(
  { className: 'repl-btn repl-btn-short-url js-btn-short-url' },
  ['Share']
);

const btnClear = button(
  { className: 'repl-btn repl-btn-danger js-btn-clear', type: 'button' },
  ['Clear']
);

const btnPretty = button(
  { className: 'repl-btn js-btn-pretty', type: 'button' },
  ['Tidy']
);

const btnFormat = button(
  { className: 'repl-btn js-btn-format', type: 'button' },
  ['Tidy']
);

const urlOut = input({
  className: 'repl-url-out js-url-out',
  required: 'required',
  tabIndex: -1,
  type: 'text'
}, []);

// The input panel
const inputPanel = div(
  { className: 'repl-panel repl-panel--input' },
  [
    header({ className: 'repl-panel-header' }, [
      h3(
        { className: 'repl-title' },
        ['Input']
      ),
      btnReset,
      btnShortUrl,
      btnFormat,
      urlOut
    ]),
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
    header({ className: 'repl-panel-header' }, [
      h3(
        { className: 'repl-title' },
        ['Output']
      ),
      btnClear,
      btnPretty
    ]),
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
  { className: 'repl repl-loading' },
  [
    // The vertical line that splits the two panels
    div({ className: 'repl-midline' }, []),
    div(
      { className: 'repl-panels' },
      [
        inputPanel,
        outputPanel
      ]
    ),
    // The loading spinner
    div({ className: 'repl-spinner', title: 'Loading' }, []),

    // The load error indicators
    i({ className: 'repl-icon repl-icon--danger js-icon--danger', title: '' }, ['!']),
    i({ className: 'repl-icon repl-icon--warning js-icon--warning', title: '' }, ['!'])

  ]
)
