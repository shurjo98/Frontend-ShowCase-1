import MachineCard from "./MachineCard";
import type { Machine } from "../types/Machine";

type Props = {
  machines: Machine[];
  onDeleteMachine: (id: number) => void;
};

function MachineList({ machines, onDeleteMachine }: Props) {
  if (machines.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #d1d5db",
        }}
      >
        <p style={{ margin: 0 }}>No machines found.</p>
      </div>
    );
  }

  return (
    <div>
      {machines.map((machine) => (
        <MachineCard
          key={machine.id}
          machine={machine}
          onDeleteMachine={onDeleteMachine}
        />
      ))}
    </div>
  );
}

export default MachineList;
