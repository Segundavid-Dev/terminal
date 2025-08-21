import type { terminalProps } from "../../types";
import type { FC, FormEvent } from "react";
import { useRef, useEffect, useState } from "react";

const TerminalLine: FC<terminalProps> = ({
  commandPrompt,
  data,
  handleCommand,
  color,
  historyCmd,
  setHistoryCmd,
}) => {
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      inputRef?.current?.focus();

      if (e.key === "ArrowUp") {
        setHistoryIndex((prev) => {
          let newIndex = prev;
          if (historyCmd?.length) {
            newIndex =
              prev === null ? historyCmd?.length - 1 : Math.max(prev - 1, 0);
            setValue(historyCmd[newIndex] ? `${historyCmd[newIndex]}` : "");
          }
          return newIndex;
        });
      } else if (e.key === "ArrowDown") {
        setHistoryIndex((prev) => {
          let newIndex = prev;
          if (prev === null) return null;

          if (historyCmd) {
            newIndex = Math.min(prev + 1, historyCmd?.length - 1);
            setValue(historyCmd[newIndex] || "");
          }
          return newIndex;
        });
      }
    };

    // handle body click event
    const handleBodyClick = () => {
      inputRef?.current?.focus();
    };
    // automatic input focus on mount
    inputRef?.current?.focus();

    document.body.addEventListener("click", handleBodyClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [historyCmd]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    console.log(historyCmd);

    if (handleCommand) {
      handleCommand(value);
      setHistoryCmd?.((prev) => [...prev, value]);
    }
    setValue("");
    setHistoryIndex(null);
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
            onChange={(e) => {
              setValue(e.target.value);
              setHistoryIndex(null);
            }}
            onKeyDown={() => {
              setHistoryIndex(null);
            }}
            style={{
              position: "absolute",
              overflow: "hidden",
              left: "-9999px",
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

          {/* testout the button up arrow functionality */}
        </div>
      )}
    </form>
  );
};

export default TerminalLine;
