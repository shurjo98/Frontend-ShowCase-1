import { useState } from "react";

type Props = {
  onAddMachine: (
    model: string,
    serial: string,
    location: string,
    department: string,
    status: "running" | "repair"
  ) => void;
};

function AddMachineForm({ onAddMachine }: Props) {
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState<"running" | "repair">("running");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !model.trim() ||
      !serial.trim() ||
      !location.trim() ||
      !department.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    onAddMachine(
      model.trim(),
      serial.trim(),
      location.trim(),
      department.trim(),
      status
    );

    setModel("");
    setSerial("");
    setLocation("");
    setDepartment("");
    setStatus("running");
  }

  return (

    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2>Add Machine Form</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className='block'>
          <span className='text-slate-400 font-bold'>Department</span>             

          <select value={status} onChange={(e) => setStatus(e.target.value as 'running' | 'repair')} className='w-full border border-slate-300 rounded-2xl transiton px-1 py-2 focus:border-slate-500' >
            <option value="Sewing">Sewing</option>
            <option value="Finishing">Finishing</option>
            <option value="Sampling">Sampling</option>
          </select>

        </label>
      
      </div>
    </form>


    // <form
    //   onSubmit={handleSubmit}
    //   className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    // >
    //   <h2 className="text-xl font-semibold">Add Machine</h2>

    //   <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    //     <label className="block">
    //       <span className="mb-1 block text-sm font-medium text-slate-700">
    //         Model
    //       </span>
    //       <input
    //         type="text"
    //         value={model}
    //         onChange={(e) => setModel(e.target.value)}
    //         placeholder="e.g. JACK A4"
    //         className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
    //       />
    //     </label>

    //     <label className="">
    //       <span className="mb-1 text-sm font-medium text-slate-700">
    //         Serial
    //       </span>
    //       <input
    //         type="text"
    //         value={serial}
    //         onChange={(e) => setSerial(e.target.value)}
    //         placeholder="e.g. 88921"
    //         className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
    //       />
    //     </label>

    //     <label className="block">
    //       <span className="mb-1 block text-sm font-medium text-slate-700">
    //         Location
    //       </span>
    //       <input
    //         type="text"
    //         value={location}
    //         onChange={(e) => setLocation(e.target.value)}
    //         placeholder="e.g. Line 3"
    //         className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
    //       />
    //     </label>

    //     <label className="block">
    //       <span className="mb-1 block text-sm font-medium text-slate-700">
    //         Department
    //       </span>
    //       <input
    //         type="text"
    //         value={department}
    //         onChange={(e) => setDepartment(e.target.value)}
    //         placeholder="e.g. Sewing"
    //         className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
    //       />
    //     </label>

    //     <label className="block md:col-span-2">
    //       <span className="mb-1 block text-sm font-medium text-slate-700">
    //         Status
    //       </span>
    //       <select
    //         value={status}
    //         onChange={(e) => setStatus(e.target.value as "running" | "repair")}
    //         className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
    //       >
    //         <option value="running">Running</option>
    //         <option value="repair">Repair</option>
    //       </select>
    //     </label>

    //   </div>

    //   <button
    //     type="submit"
    //     className="mt-5 rounded-xl bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
    //   >
    //     Add Machine
    //   </button>


    // </form>
  );
}

export default AddMachineForm;
