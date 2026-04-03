import type { MachineStatus } from "../types/Machine";
 
type Props = {
  filter: MachineStatus;
  onChangeFilter: (value: MachineStatus) => void;
};


function FilterBar({filter, onChangeFilter}: Props) {
  return (
    <div className='flex flex-wrap gap-3'>
      <button onClick={() => onChangeFilter('all')} className={getButtonClass(filter === 'all')}>All</button>
      <button onClick={() => onChangeFilter("running") } className={getButtonClass(filter === 'running')}>Running</button>
      <button onClick={() => onChangeFilter('repair')} className={getButtonClass(filter === 'repair')}>Repair</button>
    </div>
  );
}

function getButtonClass(active: boolean) {
  return [
    "rounded-xl border px-4 py-2 text-sm font-medium transition",
    active
      ? "border-slate-900 bg-slate-900 text-white"
      : "border-slate-300 bg-white text-slate-800 hover:border-slate-400",
  ].join(" ");
}

export default FilterBar;