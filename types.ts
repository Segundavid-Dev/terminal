import type { SetStateAction } from "react";

export type terminalProps = {
  id: string;
  commandPrompt?: string;
  data: "input" | "output";
  handleCommand?: (command: string) => void;
  color?: string;
  historyCmd?: string[];
  setHistoryCmd?: React.Dispatch<SetStateAction<string[]>>;
};
