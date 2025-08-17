export type terminalProps = {
  id: string;
  commandPrompt?: string;
  data: "input" | "output";
  handleCommand?: (command: string) => void;
  color?: string;
};
