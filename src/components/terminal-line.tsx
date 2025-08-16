import type { terminalProps } from "../../types";
import type { FC, FormEvent } from "react";
import { useRef, useEffect, useState } from "react";

const TerminalLine: FC<terminalProps> = ({ commandPrompt, data }) => {
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  });

  const handleSubmit = (e: FormEvent) => {
    setValue("");
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* conditionally chnage input and output conditions */}
      {data === "output" && (
        <p style={{ fontSize: "14px", color: "#6a7282" }}>$ {commandPrompt}</p>
      )}

      {data === "input" && (
        <input
          type="text"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </form>
  );
};

export default TerminalLine;
