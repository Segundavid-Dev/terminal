import type { terminalProps } from "../../types";
import type { FC } from "react";
import { useRef, useEffect } from "react";

const TerminalLine: FC<terminalProps> = ({ commandPrompt, data }) => {
  // on component mount, cursor should be highlighted
  const inputRef = useRef();

  useEffect(() => {
    console.log("hello world");
  });

  return (
    <form>
      {/* conditionally chnage input and output conditions */}
      {data === "output" && (
        <p style={{ fontSize: "14px", color: "#6a7282" }}>$ {commandPrompt}</p>
      )}

      {data === "input" && <input type="text" />}
    </form>
  );
};

export default TerminalLine;
