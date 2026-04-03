export type MachineStatus = "all" | "running" | "repair";

export type Machine = {
  id: number;
  model: string;
  serial: string;
  location: string;
  department: string;
  status: "running" | "repair";
};
