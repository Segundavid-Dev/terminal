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
    inputRef?.current?.focus();
  });

  const handleSubmit = (e: FormEvent) => {
    setValue("");
    e.preventDefault();
    // guard check to handle undefined error
    if (handleCommand) {
      handleCommand(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* conditionally chnage input and output conditions */}
      {data === "output" && (
        <p style={{ fontSize: "14px", color: color || `#6a7282` }}>
          $ {commandPrompt}
        </p>
      )}

      {data === "input" && (
        <div style={{ display: "flex", gap: "6px" }}>
          <span>$</span>
          <input
            type="text"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      )}
    </form>
  );
};

export default TerminalLine;
