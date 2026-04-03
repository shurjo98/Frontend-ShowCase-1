import type { Machine } from "../types/Machine";

type Props = {
  machine: Machine;
  onDeleteMachine: (id: number) => void;
};

function MachineCard({ machine, onDeleteMachine }: Props) {
  const statusClass =
    machine.status === "running"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-red-100 text-red-700";

  const statusText = machine.status === "running" ? "Running" : "Repair";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {machine.model}
          </h3>
          <p className="mt-1 text-sm text-slate-500">Serial: {machine.serial}</p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
        >
          {statusText}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-700 md:grid-cols-2">
        <p>
          <span className="font-semibold">Location:</span> {machine.location}
        </p>
        <p>
          <span className="font-semibold">Department:</span> {machine.department}
        </p>
      </div>

      {machine.status === "repair" && (
        <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          Needs maintenance attention
        </p>
      )}

      <button
        onClick={() => onDeleteMachine(machine.id)}
        className="mt-5 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}

export default MachineCard;
