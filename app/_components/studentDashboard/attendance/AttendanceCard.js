"use client";



export default function AttendanceCard({ label, value, icon }) {

  
  return (
    <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-6 flex flex-col items-center justify-center text-center">
      {icon}
      <h2 className="mt-3 font-semibold">{label}</h2>
      <p className=" mt-1 font-bold">{value}</p>
    </div>
  );
}