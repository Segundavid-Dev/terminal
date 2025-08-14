import { useState } from "react";
import TerminalLine from "./components/terminal-line";
import type { terminalProps } from "../types";

// This component enters on mount of the entire app
// specify color based on what exactly

function App() {
  const [cmds, setCmds] = useState<terminalProps[]>([
    {
      id: "7413a496-261c-44b6-bd34-587d15668a08",
      text: "$welcome to the terminal",
      data: "output",
    },
    {
      id: "618b3b42-c6cf-4107-bf08-54c6a705e51f",
      text: "run `ssh help` to see available commands",
      data: "output",
    },
  ]);
  return (
    <div>
      {cmds.map((cmd) => (
        <TerminalLine cmd={cmd.text} id={cmd.id} key={cmd.id} />
      ))}
    </div>
  );
}

export default App;
