import { useState } from "react";
import TerminalLine from "./components/terminal-line";
import type { terminalProps } from "../types";

// This component enters on mount of the entire app
// specify color based on what exactly

function App() {
  // Available commands
  const [cmds, setCmds] = useState<terminalProps[]>([
    {
      id: "7413a496-261c-44b6-bd34-587d15668a08",
      commandPrompt: "welcome to the terminal",
      data: "output",
    },
    {
      id: "618b3b42-c6cf-4107-bf08-54c6a705e51f",
      commandPrompt: "run `ssh help` to see available commands",
      data: "output",
    },
    {
      id: "ece3a24d-fcc7-4b3d-9154-8e168f3cd6c4",
      data: "input",
    },
  ]);

  // command sections -> will keep adding more as time goes on
  const commandAction = [
    {
      command: "ssh help",
      action: () => {
        setCmds((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            data: "output",
            commandPrompt: "ssh signup - create new account",
            color: "#00b4d8",
          },
          {
            id: crypto.randomUUID(),
            data: "output",
            commandPrompt: "ssh logout - logout of account",
            color: "#00b4d8",
          },
          {
            id: crypto.randomUUID(),
            data: "output",
            commandPrompt: "ssh status - check status of your account",
            color: "#00b4d8",
          },
          {
            id: crypto.randomUUID(),
            data: "output",
            commandPrompt: "ssh themes - change theme status of your terminal",
            color: "#00b4d8",
          },
          {
            id: crypto.randomUUID(),
            data: "output",
            commandPrompt: "clear - clean terminal",
            color: "#00b4d8",
          },
        ]);
      },
    },
    {
      command: "ssh signup",
      action: () => {
        setCmds((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            data: "output",
            commandPrompt: "enter username to signup",
          },
        ]);
      },
    },
  ];

  const handleCommand = (command: string) => {
    const normalizeString = command.trim().toLowerCase();
    const validateCommand = commandAction.find(
      (cmd) => cmd.command === normalizeString
    );

    setCmds((prev) => {
      const updated = [...prev];
      const lastInputIndex = [...updated]
        .reverse()
        .findIndex((item) => item.data === "input");

      if (lastInputIndex !== -1) {
        updated.splice(updated.length - 1 - lastInputIndex, 1);
      }

      updated.push({
        id: crypto.randomUUID(),
        data: "output",
        commandPrompt: command,
      });

      if (validateCommand) return updated;

      updated.push({
        id: crypto.randomUUID(),
        data: "output",
        commandPrompt: `user account created ${command}`,
        color: "#4ade80",
      });

      // if command not found
      updated.push({
        id: crypto.randomUUID(),
        data: "output",
        commandPrompt: `Command not found: ${command}`,
        color: "#fb2c36",
      });

      updated.push({
        id: crypto.randomUUID(),
        data: "input",
      });

      return updated;
    });

    if (validateCommand) {
      setTimeout(() => {
        validateCommand.action();
        setCmds((prev) => [
          ...prev,
          { id: crypto.randomUUID(), data: "input" },
        ]);
      });
    }
  };
  return (
    <div>
      {cmds.map((cmd) => (
        <TerminalLine
          commandPrompt={cmd.commandPrompt}
          key={cmd.id}
          id={cmd.id}
          data={cmd.data}
          handleCommand={handleCommand}
          color={cmd.color}
        />
      ))}
    </div>
  );
}

export default App;

// import { Loader, ArrowRight } from "lucide-react";

// export default function Example() {
//   return (
//     <div className="flex gap-6 p-6">
//       {/* Spinning loader */}
//       <Loader className="w-8 h-8 animate-spin text-green-500" />

//       {/* Bouncing arrow */}
//       <ArrowRight className="w-8 h-8 animate-bounce text-blue-500" />
//     </div>
//   );
// }
