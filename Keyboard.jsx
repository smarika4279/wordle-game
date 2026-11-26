
function Keyboard({ onKeyPress, keyColors }) {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
  ];

  return (
    <div className="keyboard">
      {rows.map((row, index) => (
        <div className="keyboard-row" key={index}>
          {row.map((key) => (
            <button
              key={key}
              className={`key ${keyColors[key] || ""}`}
              onClick={() => onKeyPress(key)}
            >
              {key === "BACKSPACE" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
