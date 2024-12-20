import React from "react";
import IconButton from "./IconButton"; // Giả sử bạn có component IconButton

const MenuInput = ({
  isChecked,
  handleChange,
  theme,
  handleThemeChange,
  setInputText,
  updateIframeContent,
  copyTextToClipboard,
  handleCopy,
  insertFormula,
}) => {
  return (
    <div
      className="flex items-center justify-between "
      style={{
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        borderColor: "#E5E5E5",
        borderBottomWidth: "1px",
      }}
    >
      <div className="flex ml-3">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
          />
          <span className="ml-2 " style={{ color: "#000000" }}>
            Auto-Copy
          </span>
        </label>
        <div className="flex items-center">
          <select
            value={theme}
            onChange={handleThemeChange}
            style={{
              margin: "10px",
              padding: "5px",
              paddingLeft: "15px",
              paddingRight: "15px",
              borderRadius: "4px",
              borderColor: "#18B0D8",
              borderWidth: "1px",
            }}
          >
            <option value="tomorrow">Light</option>
            <option value="dracula">Dark</option>
          </select>
        </div>
      </div>

      <div className="flex space-x-1">
        <IconButton
          icon="fa-solid fa-eraser"
          onClick={() => {
            setInputText("");
            updateIframeContent("");
          }}
        />
        <IconButton icon="fa-regular fa-copy" onClick={handleCopy} />
        <IconButton
          icon="fa-solid fa-bold"
          onClick={() => insertFormula("\\textbf{}", 1, 9, 0, true, false)}
          margin="8px"
        />
        <IconButton
          icon="fa-solid fa-italic"
          onClick={() => insertFormula("\\textit{}", 1, 9, 0, true, false)}
          margin="8px"
        />
        <IconButton
          icon="fa-solid fa-align-left"
          onClick={() =>
            insertFormula(
              "\\begin{flushleft}\n\n\\end{flushleft}",
              0,
              19,
              0,
              true
            )
          }
          margin="8px"
        />
        <IconButton
          icon="fa-solid fa-align-center"
          onClick={() =>
            insertFormula(
              "\\begin{center}\n\n\\end{center}",
              0,
              16,
              0,
              true,
              false
            )
          }
          margin="8px"
        />
        <IconButton
          icon="fa-solid fa-align-right"
          onClick={() =>
            insertFormula(
              "\\begin{flushright}\n\n\\end{flushright}",
              0,
              20,
              0,
              true,
              false
            )
          }
          margin="8px"
        />
      </div>
    </div>
  );
};

export default MenuInput;
