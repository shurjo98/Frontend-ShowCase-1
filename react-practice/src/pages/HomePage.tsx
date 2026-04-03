

function HomePage() {
  return (

    <div>
      {/* <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>
        <p className=" text-slate-600">
          Welcome to FM Support. Manage service operations from one place.
        </p>
      </div> */}

      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-slate-800'>Machine</h1>
        <p className='text-slate-500'>Welcome to FM Support. Manage service operations from one place.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="border border-slate-200 rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Open Tickets</p>
          <h2 className="mt-2 text-3xl font-bold">12</h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Running Machines</p>
          <h2 className="mt-2 text-3xl font-bold">84</h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Repair Alerts</p>
          <h2 className="mt-2 text-3xl font-bold">5</h2>
        </div>
      </div>

      {/* <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Today’s Focus</h3>
          <p className="mt-2 text-slate-600">
            Follow up on repair machines, check urgent tickets, and review line
            performance.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Support Summary</h3>
          <p className="mt-2 text-slate-600">
            This dashboard will later show technician activity, AI diagnosis
            suggestions, and customer service KPIs.
          </p>
        </div>
      </div> */}

      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='border border-slate-200 rounded-2xl py-6 px-8 bg-white shadow-sm'>
            <h2 className='font-bold text-xl'>Today's Focus</h2>
            <p className=''>asdasd</p>
        </div>
        <div className='border border-slate-200 rounded-2xl py-6 px-8 bg-white shadow-sm'>
          <h2 className='font-bold text-xl'>Day Summary</h2>
          <p className=''>Asadasd</p>
        </div>
      </div>

    </div>
  );
}

export default HomePage;
