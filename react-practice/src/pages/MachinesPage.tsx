import { useState } from "react";
import AddMachineForm from "../components/AddMachineForm";
import FilterBar from "../components/FilterBar";
import MachineList from "../components/MachineList";
import type { Machine, MachineStatus } from "../types/Machine";

function MachinesPage() {
  const [machines, setMachines] = useState<Machine[]>([
    {
      id: 1,
      model: "JACK A4",
      serial: "88921",
      location: "Line 3",
      department: "Sewing",
      status: "running",
    },
    {
      id: 2,
      model: "ZOJE A6000",
      serial: "99212",
      location: "Line 8",
      department: "Finishing",
      status: "repair",
    },
    {
      id: 3,
      model: "JACK A5E",
      serial: "22114",
      location: "Line 5",
      department: "Sample",
      status: "running",
    },
  ]);

  const [filter, setFilter] = useState<MachineStatus>("all");

  function handleAddMachine(
    model: string,
    serial: string,
    location: string,
    department: string,
    status: "running" | "repair"
  ) {
    const newMachine: Machine = {
      id: Date.now(),
      model,
      serial,
      location,
      department,
      status,
    };

    setMachines((prevMachines) => [newMachine, ...prevMachines]);
  }

  function handleDeleteMachine(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this machine?"
    );

    if (!confirmed) return;

    setMachines((prevMachines) =>
      prevMachines.filter((machine) => machine.id !== id)
    );
  }

  const filteredMachines =
    filter === "all"
      ? machines
      : machines.filter((machine) => machine.status === filter);

  const runningCount = machines.filter(
    (machine) => machine.status === "running"
  ).length;

  const repairCount = machines.filter(
    (machine) => machine.status === "repair"
  ).length;

  return (
    <div>
      <div className='mb-4'>
        <h1 className='text-2xl text-slate-900 font-bold'>Machines</h1>
        <p className='text-slate-700'>All Machines Performance and related stuffs.</p>
      </div>

      <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3 '>
        <div className='border border-slate-200 bg-white rounded-2xl p-5 shadow-sm'>
          <h2 className='text-sm text-slate-500 ' >Total Machines</h2>
          <p className ='font-bold text-2xl'>{machines.length}</p>
        </div>
        <div className='border border-slate-200 bg-white rounded-2xl p-5 shadow-sm'>
          <h2 className='text-sm text-slate-500 ' >Running</h2>
          <p className ='font-bold text-2xl'>{runningCount}</p>
        </div>
        <div className='border border-slate-200 bg-white rounded-2xl p-5 shadow-sm'>
          <h2 className='text-sm text-slate-500 '>Repair</h2>
          <p className ='font-bold text-2xl'>{repairCount}</p>
        </div>
      </div>


      <div className="mb-6">
        <AddMachineForm onAddMachine={handleAddMachine} />
      </div>

      <div className="mb-4">
        <h2 className="mb-3 text-xl font-semibold">Filter Machines</h2>
        <FilterBar filter={filter} onChangeFilter={setFilter} />
      </div>

      {filteredMachines.length > 0 && (
        <p className="mb-4 text-sm text-slate-500">
          Showing {filteredMachines.length} machine
          {filteredMachines.length > 1 ? "s" : ""}
        </p>
      )}

      <MachineList
        machines={filteredMachines}
        onDeleteMachine={handleDeleteMachine}
      />
    </div>
  );
}

export default MachinesPage;
