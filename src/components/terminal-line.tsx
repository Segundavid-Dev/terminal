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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    handleCommand?.(value);
    setHistoryCmd?.((prev) => [...(prev ?? []), value]);
    setValue("");
    setHistoryIndex(null);
  };

  const recallAndPlaceCaret = (cmd: string) => {
    const cloned = `${cmd}`;
    setValue(cloned);
    setTimeout(() => {
      const el = inputRef.current;
      if (el) el.setSelectionRange(cloned.length, cloned.length);
    }, 0);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!historyCmd?.length) return;
      setHistoryIndex((prev) => {
        const newIndex =
          prev === null ? historyCmd.length - 1 : Math.max(prev - 1, 0);
        recallAndPlaceCaret(historyCmd[newIndex]);
        return newIndex;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!historyCmd?.length) return;
      setHistoryIndex((prev) => {
        if (prev === null) return null;
        const newIndex = Math.min(prev + 1, historyCmd.length - 1);
        recallAndPlaceCaret(historyCmd[newIndex]);
        return newIndex;
      });
    } else if (e.key.length === 1 && historyIndex !== null) {
      setHistoryIndex(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} onClick={() => inputRef.current?.focus()}>
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
            position: "relative",
          }}
        >
          <span>$</span>

          <input
            type="text"
            ref={inputRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={onInputKeyDown}
            style={{
              position: "absolute",
              opacity: 0,
              left: 0,
              top: 0,
              width: "100%",
              height: "1em",
            }}
            autoComplete="off"
            spellCheck={false}
          />

          <pre
            style={{
              margin: 0,
              color: "white",
              fontFamily: "inherit",
              fontSize: "14px",
              pointerEvents: "none",
            }}
          >
            {value}
            <span className="caret-block" />
          </pre>
        </div>
      )}
    </form>
  );
};

export default TerminalLine;
