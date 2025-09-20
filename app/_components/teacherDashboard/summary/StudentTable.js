import React from "react";
import { PiNotepadBold } from "react-icons/pi";

const StudentTable = ({ students }) => {


  // Early return for the empty state. This is cleaner than conditional rendering inside JSX.
  if (students.length === 0) {
    return (
        <div className="rounded-xl bg-white border border-gray-200 shadow-lg p-6">
              <div className="flex flex-col gap-2 justify-center items-center">
                
                <PiNotepadBold className="text-3xl text-[var(--btn-pmy)]"/>
          <h3 className="text-lg font-medium text-gray-900 ">No Students Found</h3>
          <p className="text-sm text-gray-500">Student performance data will appear here once available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-6 flex flex-col items-center justify-center text-center">
      <h2 className="text-center md:text-left font-semibold mb-6">Student Performance</h2>
      
      {/* Desktop View: Table */}
      <div className="hidden md:block w-full overflow-x-auto">
        <div className="min-w-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <div className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Student</div>
            <div className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Present</div>
            <div className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Absent</div>
            <div className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Percentage</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {students.map((student,i) => (
              <div key={i} className="grid grid-cols-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out group">
                {/* Student Column */}
                <div className="px-6 py-4 flex items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] flex items-center justify-center text-white text-xs font-bold">
                      {student.firstName?.charAt(0)?.toUpperCase() || 'S'}
                    </div>
                    <span className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                      {student.firstName} {student.lastName}
                    </span>
                  </div>
                </div>

                {/* Present Column */}
                <div className="px-6 py-4 flex justify-center items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                    <div className="w-2 h-2 rounded-full mr-2 bg-green-500"></div>
                    {student.presentCount}
                  </span>
                </div>

                {/* Absent Column */}
                <div className="px-6 py-4 flex justify-center items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                    <div className="w-2 h-2 rounded-full mr-2 bg-red-500"></div>
                    {student.absentCount}
                  </span>
                </div>

                {/* Percentage Column */}
                <div className="px-6 py-4 flex justify-center items-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${parseFloat(student.percentage) >= 70 ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-orange-100 text-orange-800 border border-orange-200"}`}>
                    {student.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View: Card Layout */}
      <div className="md:hidden w-full grid grid-cols-2 gap-3">
        {students.map((student,i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-150">
            {/* Student Name and Avatar */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] flex items-center justify-center text-white text-xs font-bold">
                {student.firstName?.charAt(0)?.toUpperCase() || 'S'}
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900 truncate">{student.firstName}</p>
                <p className="text-xs text-gray-500 truncate">{student.lastName}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Present</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">{student.presentCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Absent</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">{student.absentCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Percentage</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${parseFloat(student.percentage) >= 70 ? "bg-emerald-100 text-emerald-800" : "bg-orange-100 text-orange-800"}`}>
                  {student.percentage}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentTable;
