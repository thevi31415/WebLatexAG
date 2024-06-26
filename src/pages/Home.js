import React, { useState, useRef, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-dreamweaver";

import "ace-builds/src-noconflict/theme-tomorrow";

import "ace-builds/src-noconflict/theme-dracula";

import "ace-builds/src-noconflict/theme-dracula";

import Footer from "../components/Footer";
// import "./customFont.css";
function Home() {
  const [inputText, setInputText] = useState(`Ví dụ:
        Cho ba số thực $a, b, c$  không âm thỏa mãn: $a^2 + b^2+c^2+3=2 \\left(ab+bc+ca\\right)$. Chứng minh:  
        
        $3\\leq a+b+c\\leq \\dfrac{2\\left(ab+bc+ca\\right)+3}{3}$`);
  const inputRef = useRef(null);
  const iframeRef = useRef(null);
  const [basicFormulas, setBasicFormulas] = useState([]);
  const [basicFormulas2, setBasicFormulas2] = useState([]);

  const handleInputChange = (value) => {
    setInputText(value);
    updateIframeContent(value);
  };

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setBasicFormulas(data))
      .catch((error) => console.error("Error fetching data:", error));
    fetch("/data2.json")
      .then((response) => response.json())
      .then((data) => setBasicFormulas2(data))
      .catch((error) => console.error("Error fetching data:", error));
    updateIframeContent(inputText);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "Do you want to exit the website or not?";
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // const processInputText = (text) => {
  //   return text.replace(/\\\\/g, "\n").trim();
  // };

  const updateIframeContent = (text) => {
    if (iframeRef.current) {
      // const processedText = text;
      const processedText = text
        .replace(/\\\\(\s*)/g, "<br>")
        .replace(/\\textbf\{([^}]+)\}/g, "<strong>$1</strong>")
        .replace(/\\textit\{([^}]+)\}/g, "<em>$1</em>")
        .replace(/\\underline\{([^}]+)\}/g, "<u>$1</u>")
        .replace(
          /\\begin\{center\}([\s\S]*?)\\end\{center\}/g,
          '<div style="text-align: center;">$1</div>'
        )
        .replace(
          /\\begin\{flushleft\}([\s\S]*?)\\end\{flushleft\}/g,
          '<div style="text-align: left;">$1</div>'
        )
        .replace(
          /\\begin\{flushright\}([\s\S]*?)\\end\{flushright\}/g,
          '<div style="text-align: right;">$1</div>'
        ); // Replace \\ followed by any whitespace with <br>

      const iframeContent = `
                <!DOCTYPE html>
                <html>
                <head>
                  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css">
                  <script src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.js"></script>
                  <script src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/contrib/auto-render.min.js"></script>
                  <style>
                    body { font-family: Times New Roman, sans-serif;
                     white-space: normal;
              word-wrap: break-word;
              padding: 10px; }
                    .katex { font-size: 1.1em; }
                    strong { font-weight: bold; }
                    em { font-style: italic; }
u { text-decoration: underline; }
                  </style>
                </head>
                <body>
                  <div id="latex-content">${processedText}</div>
                  <script>
                    document.addEventListener("DOMContentLoaded", function() {
                      renderMathInElement(document.body, {
                        delimiters: [
                          {left: "$$", right: "$$", display: true},
                          {left: "$", right: "$", display: false}
                        ]
                      });
                    });
                  </script>
                </body>
                </html>
              `;
      iframeRef.current.srcdoc = iframeContent;
    }
  };

  const insertFormula = (formula, pos, x, y) => {
    const editor = inputRef.current.editor;
    const position = editor.getCursorPosition();
    const selection = editor.getSelection();
    const range = selection.getRange();
    const selectionRange = editor.getSelection().getRange();
    const isTextSelected = !selectionRange.isEmpty();
    if (isTextSelected) {
      const selectedText = editor.getSelectedText();
      const startPos = editor.session.doc.positionToIndex(selectionRange.start);
      const endPos = editor.session.doc.positionToIndex(selectionRange.end);

      const textBeforeSelection = inputText.substring(0, startPos);
      const textAfterSelection = inputText.substring(endPos);

      const beforeDollarCount = (textBeforeSelection.match(/\$/g) || []).length;
      const afterDollarCount = (textAfterSelection.match(/\$/g) || []).length;

      let newFormula = formula;
      if (formula !== "$$") {
        if (beforeDollarCount % 2 === 1 && afterDollarCount % 2 === 1) {
          newFormula = `${formula}`;
          x = x - 1;
        } else {
          newFormula = `$${formula}$`;
        }
      } else {
        newFormula = `${formula}`;
      }

      const insertionPoint = startPos + x;
      const newFormulaWithSelectedText =
        newFormula.slice(0, insertionPoint - startPos) +
        selectedText +
        newFormula.slice(insertionPoint - startPos);

      const newText =
        textBeforeSelection + newFormulaWithSelectedText + textAfterSelection;

      const newCursorPos = startPos + x + selectedText.length + y;
      setInputText(newText);
      updateIframeContent(newText);
      setTimeout(() => {
        editor.focus();
        editor.moveCursorToPosition(
          editor.session.doc.indexToPosition(newCursorPos)
        );
        editor.clearSelection();
      }, 0);
    } else {
      const textBeforeCursor = inputText.substring(
        0,
        editor.session.doc.positionToIndex(position)
      );
      const textAfterCursor = inputText.substring(
        editor.session.doc.positionToIndex(position)
      );
      let newFormula = formula;
      let newCursorPos = position.column + formula.length;

      const beforeDollarCount = (textBeforeCursor.match(/\$/g) || []).length;
      const afterDollarCount = (textAfterCursor.match(/\$/g) || []).length;

      if (formula !== "$$") {
        if (beforeDollarCount % 2 === 1 && afterDollarCount % 2 === 1) {
          newFormula = formula;
          newCursorPos = newCursorPos - pos;
        } else {
          newFormula = `$${formula}$`;
          newCursorPos += 2;
          newCursorPos = newCursorPos - pos - 1;
        }
      } else {
        newCursorPos = newCursorPos - pos;
      }

      const newText = textBeforeCursor + newFormula + textAfterCursor;
      setInputText(newText);
      updateIframeContent(newText);

      setTimeout(() => {
        editor.focus();
        editor.moveCursorTo(range.start.row, newCursorPos);
      }, 0);
    }
  };

  return (
    <>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F3F3F3",
        }}
      >
        <div
          style={{
            backgroundColor: "#E5E5E5",
            padding: "2px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              marginTop: "5px",
              marginBottom: "5px",
              borderWidth: "2px",
              borderColor: "#CCCCCC",
              borderStyle: "solid",
              borderRadius: "5px",
              width: "600px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Latex AG
          </div>
        </div>
        <div className="grid grid-cols-[155px,1fr,1fr] gap-0 divide-x divide-solid divide-gray h-full">
          <div
            className="overflow-y-auto pr-1"
            style={{
              maxHeight: "calc(100vh - 0px)",
              backgroundColor: "#F3F3F3",
            }}
          >
            <div className="grid grid-rows-5 ">
              <div
                className="grid grid-rows-4 grid-flow-col gap-1 p-2"
                style={{
                  margin: "5px",

                  borderColor: "#D3D3D3",
                  borderRadius: "10px",
                  // borderWidth: "1px",
                }}
              >
                {basicFormulas.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex justify-center items-center"
                  >
                    <button
                      onClick={() =>
                        insertFormula(item.formula, item.pos, item.x, item.y)
                      }
                      className="w-9 h-9  border border-transparent hover:bg-blue-100 hover:border-blue-200 transition-colors duration-300 p-0.5 rounded"
                    >
                      <img
                        src={item?.linkimage}
                        alt="formula"
                        className="w-full h-full object-contain"
                      />
                    </button>
                  </div>
                ))}
              </div>
              <div
                className="grid grid-rows-4 grid-flow-col gap-1 p-2"
                style={{
                  margin: "5px",
                  borderColor: "#D3D3D3",
                  borderRadius: "10px",
                  // borderWidth: "1px",
                }}
              >
                {basicFormulas2.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex justify-center items-center"
                  >
                    <button
                      onClick={() =>
                        insertFormula(item.formula, item.pos, item.x, item.y)
                      }
                      className="w-9 h-9  border border-transparent hover:bg-blue-100 hover:border-blue-200 transition-colors duration-300 p-0.5 rounded"
                    >
                      <img
                        src={item?.linkimage}
                        alt="formula"
                        className="w-full h-full object-contain"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-0">
            <div
              className="flex items-center"
              style={{
                backgroundColor: "#F8F8F8",
                display: "flex",
                alignItems: "center",
                borderColor: "#E5E5E5",

                borderBottomWidth: "1px",
              }}
            >
              <div className="flex-1">
                <button
                  style={{
                    margin: "8px",
                    padding: "4px",
                    color: "#808080",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#1f1f1f")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#616161")
                  }
                >
                  <i class="fa-solid fa-xmark fa-xl" />
                </button>
                <button
                  style={{
                    margin: "8px",
                    padding: "4px",
                    color: "#808080",

                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#1f1f1f")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#616161")
                  }
                >
                  <i className="fa-regular fa-clipboard fa-xl" />
                </button>
              </div>

              <div className="flex space-x-2">
                <button
                  style={{
                    margin: "8px",
                    padding: "4px",
                    color: "#808080",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#1f1f1f")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#616161")
                  }
                >
                  <i class="fa-solid fa-bold fa-xl"></i>
                </button>
                <button
                  style={{
                    margin: "8px",
                    padding: "4px",
                    color: "#808080",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#1f1f1f")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#616161")
                  }
                >
                  <i class="fa-solid fa-underline fa-xl"></i>
                </button>
                <button
                  style={{
                    margin: "8px",
                    padding: "4px",
                    color: "#808080",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#1f1f1f")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#616161")
                  }
                >
                  <i class="fa-solid fa-italic fa-xl" />{" "}
                </button>
                <button
                  style={{
                    margin: "8px",
                    padding: "4px",
                    color: "#808080",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#1f1f1f")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#616161")
                  }
                >
                  <i class="fa-solid fa-align-left fa-xl"></i>
                </button>
                <button
                  style={{
                    margin: "8px",
                    padding: "4px",
                    color: "#808080",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#1f1f1f")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#616161")
                  }
                >
                  <i class="fa-solid fa-align-center fa-xl"></i>{" "}
                </button>
                <button
                  style={{
                    margin: "8px",
                    padding: "4px",
                    color: "#808080",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#1f1f1f")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#616161")
                  }
                >
                  <i class="fa-solid fa-align-right fa-xl"></i>{" "}
                </button>
              </div>
            </div>

            <div style={{ height: "calc(100vh - 20px)", overflow: "auto" }}>
              <AceEditor
                ref={inputRef}
                mode="latex"
                theme="tomorrow"
                onChange={handleInputChange}
                value={inputText}
                name="latex-editor"
                editorProps={{ $blockScrolling: Infinity }}
                width="100%"
                height="100%"
                fontSize="14px"
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                enableSnippets={true}
                wrapEnabled={true}
                softWrap={true}
                style={{ paddingBottom: "40px" }}
              />
            </div>
          </div>
          <div class="grid grid-cols-1 gap-0">
            <div
              style={{
                backgroundColor: "#F8F8F8",
                display: "flex",
                alignItems: "center",
                borderColor: "#E5E5E5",

                borderBottomWidth: "1px",
              }}
            >
              <button
                style={{
                  margin: "8px",
                  padding: "4px",
                  color: "#808080",

                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1f1f1f")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#616161")}
              >
                <i className="fa-regular fa-clipboard fa-xl" />
              </button>
            </div>

            <div style={{ height: "calc(100vh - 20px)", overflow: "hidden" }}>
              <iframe
                ref={iframeRef}
                title="LaTeX Output"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  paddingBottom: "0px",
                  backgroundColor: "white",
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#007ACC",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            display: "flex",
            color: "white",
          }}
        >
          2024 Nguyen Duong The Vi. All right reserved.
        </div>
      </div>
    </>
  );
}
export default Home;
