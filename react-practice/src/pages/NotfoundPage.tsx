import { Link } from "react-router-dom";

// function NotFoundPage() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
//       <div className="border border-slate-200 bg-white p-8 rounded-2xl text-center shadow-sm">
//         <h1 className="text-4xl font-bold text-slate-900">404</h1>
//         <p className="mt-2 text-slate-600">Page not found.</p>
//         <Link
//           to="/"
//           className="mt-5 inline-block rounded-xl bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
//         >
//           Go back home
//         </Link>
//       </div>
//     </div>
//   );
// }

function NotFoundPage() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='items-center justify-center border rounded-2xl bg-slate-400 p-6'>
        <h2 className= 'text-slate-600 font-bold text-6xl'>404</h2>
        <p className='text-slate-900 py-4'>Not Found Page</p>
        <Link to="/" className='text-slate-800 mt-4 p-2 rounded-2xl border rounded-2xl p-1 bg-slate-100 hover:bg-slate-700'>Go back Home</Link>
      </div>
    </div>
  );
}


export default NotFoundPage;
