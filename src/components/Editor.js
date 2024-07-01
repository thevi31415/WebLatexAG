import React, { useRef, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
const customCompleter = {
  getCompletions: (editor, session, pos, prefix, callback) => {
    const completions = [
      { value: "sqrt{}", index: 1 },
      { value: "sqrt[]{}", index: 3 },
      { value: "dfrac{}{}", index: 3 },
      { value: "sum_{}^{}", index: 4 },
      { value: "displaystyle\\int{}\\;\\mathrm{d}x", index: 14 },
      {
        value: "displaystyle\\int\\limits_{ }^{ } { }\\;\\mathrm{d}x",
        index: 23,
      },
      { value: "displaystyle \\lim_{ \\to 0}", index: 7 },
      { value: "dfrac{\\mathrm{d} }{\\mathrm{d} x} ", index: 0 },
      { value: "left (  \\right )", index: 10 },
      { value: "left [  \\right ]", index: 10 },
      { value: "left\\{  \\right\\}", index: 10 },
      { value: "left<  \\right>", index: 9 },
      { value: "left| \\right|", index: 8 },
      { value: "left\\| \\right\\|", index: 9 },
      { value: "left \\lfloor \\right \\rfloor", index: 14 },
      { value: "left \\lceil \\right \\rceil ", index: 14 },
      { value: "binom{}{}", index: 3 },
      { value: "rightarrow ", index: 0 },
      { value: "leftarrow ", index: 0 },
      { value: "uparrow ", index: 0 },
      { value: "downarrow ", index: 0 },
      { value: "xleftarrow[]{}", index: 3 },
      { value: "xrightarrow[]{}", index: 3 },
      { value: "leftrightarrow ", index: 0 },
      { value: "Leftarrow ", index: 0 },
      { value: "Rightarrow ", index: 0 },
      { value: "Leftrightarrow ", index: 0 },
      { value: "leftrightharpoons ", index: 0 },
      { value: "rightleftharpoons ", index: 0 },
      { value: "leftharpoonup ", index: 0 },
      { value: "rightharpoonup ", index: 0 },
      { value: "leftharpoondown  ", index: 0 },
      { value: "rightharpoondown  ", index: 0 },
      { value: "overset{}{\\leftarrow}", index: 13 },
      { value: "overset{}{\\rightarrow} ", index: 15 },

      { value: "leq ", index: 0 },
      { value: "geq ", index: 0 },
      { value: "nless ", index: 0 },
      { value: "ngtr ", index: 0 },
      { value: "nleqslant ", index: 0 },
      { value: "ngeqslant ", index: 0 },
      { value: "equiv ", index: 0 },
      { value: "not\\equiv ", index: 0 },
      { value: "neq  ", index: 0 },
      { value: "sim ", index: 0 },
      { value: "approx  ", index: 0 },
      { value: "simeq  ", index: 0 },
      { value: "ll ", index: 0 },
      { value: "gg ", index: 0 },
      { value: "parallel ", index: 0 },
      { value: "perp ", index: 0 },
      { value: "vdash ", index: 0 },
      { value: "dashv ", index: 0 },
      { value: "widetilde{}", index: 1 },
      { value: "widehat{}", index: 1 },
      { value: "overleftarrow{}", index: 1 },
      { value: "overrightarrow{}", index: 1 },
      { value: "overline{}", index: 1 },
      { value: "underline{}", index: 1 },
      { value: "overbrace{}", index: 1 },
      { value: "underbrace{}", index: 1 },
      { value: "subset ", index: 0 },
      { value: "supset ", index: 0 },
      { value: "subseteq ", index: 0 },
      { value: "supseteq ", index: 0 },
      { value: "nsubseteq ", index: 0 },
      { value: "nsupseteq ", index: 0 },
      { value: "supseteqq ", index: 0 },
      { value: "subseteqq ", index: 0 },
      { value: "nsupseteqq ", index: 0 },
      { value: "in ", index: 0 },
      { value: "ni ", index: 0 },
      { value: "notin ", index: 0 },
      { value: "mathbb{P}", index: 0 },
      { value: "mathbb{N}", index: 0 },
      { value: "mathbb{Z}", index: 0 },
      { value: "mathbb{I}", index: 0 },
      { value: "mathbb{Q}", index: 0 },
      { value: "mathbb{R}", index: 0 },
      { value: "mathbb{C}", index: 0 },
      { value: "measuredangle ", index: 0 },
      { value: "sphericalangle ", index: 0 },
      { value: "angle ", index: 0 },
      { value: "varnothing ", index: 0 },
      { value: "infty ", index: 0 },
      { value: "mho ", index: 0 },
      { value: "Omega ", index: 0 },
      { value: "forall ", index: 0 },
      { value: "exists ", index: 0 },
      { value: "partial ", index: 0 },
      { value: "Re ", index: 0 },
      {
        value: "alpha ",
        index: 0,
      },

      { value: "beta ", index: 0 },
      { value: "zeta ", index: 0 },
      { value: "kappa ", index: 0 },
      { value: "epsilon ", index: 0 },
      { value: "varepsilon ", index: 0 },
      { value: "iota ", index: 0 },
      { value: "xi ", index: 0 },
      { value: "theta ", index: 0 },
      { value: "vartheta ", index: 0 },
      { value: "nu ", index: 0 },
      { value: "varrho ", index: 0 },
      { value: "lambda ", index: 0 },
      { value: "mu ", index: 0 },
      { value: "rho ", index: 0 },
      { value: "upsilon ", index: 0 },
      { value: "pi ", index: 0 },
      { value: "varpi ", index: 0 },
      { value: "tau ", index: 0 },
      { value: "psi ", index: 0 },
      { value: "sigma ", index: 0 },
      { value: "varsigma ", index: 0 },
      { value: "chi ", index: 0 },
      { value: "phi ", index: 0 },
      { value: "varphi ", index: 0 },
      { value: "delta ", index: 0 },
      { value: "omega ", index: 0 },
      { value: "gamma ", index: 0 },
      { value: "eta ", index: 0 },
      { value: "pm ", index: 0 },
      { value: "mp ", index: 0 },
      { value: "cap ", index: 0 },
      { value: "cup ", index: 0 },
      { value: "times ", index: 0 },
      { value: "odot ", index: 0 },
      { value: "wedge ", index: 0 },
      { value: "vee ", index: 0 },
      { value: "square ", index: 0 },
      { value: "Delta ", index: 0 },
      { value: "Theta ", index: 0 },
      { value: "Lambda ", index: 0 },
      { value: "Xi ", index: 0 },
      { value: "Pi ", index: 0 },
      { value: "Sigma ", index: 0 },
      { value: "Upsilon ", index: 0 },
      { value: "Phi ", index: 0 },
      { value: "Psi ", index: 0 },
      {
        value: "sin{}",
        index: 1,
      },
      {
        value: "cos{}",
        index: 1,
      },
      {
        value: "tan{}",
        index: 1,
      },
      {
        value: "cot{}",
        index: 1,
      },
      {
        value: "sec{}",
        index: 1,
      },
      {
        value: "log{}",
        index: 1,
      },
      {
        value: "log_{}{}",
        index: 3,
      },
      {
        value: "ln{}",
        index: 1,
      },
      {
        value: "ell ",
        index: 0,
      },
    ];
    callback(
      null,
      completions.map((completion) => ({
        caption: completion.value.trim(),
        value: completion.value,
        score: 1000 - completion.index,
        meta: "",
        completer: {
          insertMatch: function (editor, data) {
            editor.completer.insertMatch({ value: data.value });
            const pos = editor.getCursorPosition();
            editor.moveCursorTo(pos.row, pos.column - completion.index);
          },
        },
      }))
    );
  },
};
const Editor = ({
  inputRef,
  MathShortcuts,
  insertFormulaShortcut,
  theme,
  handleInputChange,
  inputText,
}) => {
  const editorRef = useRef(null);
  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      editor.completers = [customCompleter];

      editor.getSession().on("change", function (e) {
        const cursor = editor.getCursorPosition();
        const line = editor.session.getLine(cursor.row);

        if (cursor.column > 0 && line.charAt(cursor.column - 1) === "\\") {
          editor.execCommand("startAutocomplete");
        }
      });

      // Add this to ensure proper cursor positioning after autocomplete
      editor.commands.on("afterExec", function (e) {
        if (e.command.name === "insertstring" && /^[\w\.]$/.test(e.args)) {
          editor.execCommand("startAutocomplete");
        }
      });
    }
  }, []);

  return (
    <div
      style={{
        height: "calc(100vh - 0px)",
        overflow: "auto",
        zIndex: 0,
        position: "relative",
      }}
    >
      <AceEditor
        ref={(el) => {
          editorRef.current = el;
          if (inputRef) inputRef.current = el;
        }}
        onLoad={(editorInstance) => {
          // editorInstance.completers = [customCompleter];
          Object.values(MathShortcuts).forEach((shortcut) => {
            editorInstance.commands.addCommand({
              name: shortcut.name,
              bindKey: shortcut.bindKey,
              exec: () => {
                console.log(`Shortcut ${shortcut.name} executed`);
                insertFormulaShortcut(
                  shortcut.formula,
                  shortcut.pos,
                  shortcut.x,
                  shortcut.y,
                  shortcut.check,
                  shortcut.icon
                );
              },
            });
          });
        }}
        mode="latex"
        theme={theme}
        onChange={handleInputChange}
        value={inputText}
        name="latex-editor"
        editorProps={{ $blockScrolling: Infinity }}
        width="100%"
        height="85vh"
        fontSize="14px"
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        wrapEnabled={true}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        style={{
          zIndex: 0,
          position: "relative",
          borderBottomWidth: "1px",
          borderColor: "#DCDCDC",
        }}
      />
    </div>
  );
};

export default Editor;
