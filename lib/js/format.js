import prettyJS from "pretty-js";

export default function bindFormatButton(options) {
  options.btnFormat.addEventListener("click", function prettify() {
    options.input.setValue(prettyJS(options.input.getValue()));
  });
}
