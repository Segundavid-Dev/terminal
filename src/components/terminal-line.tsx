import type { terminalProps } from "../../types";
import type { FC, FormEvent } from "react";
import { useRef, useEffect, useState } from "react";

const TerminalLine: FC<terminalProps> = ({
  commandPrompt,
  data,
  handleCommand,
  color,
}) => {
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = () => {
      inputRef?.current?.focus();
    };
    const handleBodyClick = () => {
      inputRef?.current?.focus();
    };
    inputRef?.current?.focus();

    document.body.addEventListener("click", handleBodyClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    setValue("");
    e.preventDefault();
    // guard check to handle undefined error
    if (handleCommand) {
      handleCommand(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} onClick={() => inputRef.current?.focus()}>
      {/* conditionally chnage input and output conditions */}
      {data === "output" && (
        <p style={{ fontSize: "14px", color: color || `#6a7282` }}>
          $ {commandPrompt}
        </p>
      )}

      {data === "input" && (
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            fontFamily: "Source Code Pro",
          }}
        >
          <span>$</span>

          <input
            type="text"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              position: "absolute",
              overflow: "hidden",
              width: "1px",
              height: "1px",
              opacity: 0,
              pointerEvents: "none",
              caretColor: "transparent",
            }}
          />

          <pre
            style={{
              margin: 0,
              color: "white",
              fontFamily: "inherit",
              fontSize: "14px",
            }}
          >
            {value}
            <span className="caret-block"></span>
          </pre>
        </div>
      )}
    </form>
  );
};

export default TerminalLine;
