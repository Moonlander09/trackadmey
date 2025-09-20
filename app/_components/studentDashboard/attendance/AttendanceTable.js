"use client";

import { PiNotepadBold } from "react-icons/pi";

export default function AttendanceTable({ history }) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-6 flex flex-col items-center justify-center text-center">
      <h2 className="text-lg font-semibold mb-6">Attendance History</h2>
      
      {/* Desktop View */}
      <div className="hidden md:block w-full overflow-x-auto">
        <div className="min-w-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <div className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Date
            </div>
            <div className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Status
            </div>
            <div className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Teacher
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {history.map((record, index) => (
              <div 
                key={index} 
                className="grid grid-cols-3 hover:bg-gray-50 transition-colors duration-150 ease-in-out group"
              >
                {/* Date Column */}
                <div className="px-6 py-4 flex items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 opacity-60"></div>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(record.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Status Column */}
                <div className="px-6 py-4 flex justify-center items-center">
                  <span 
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                      record.status === "present"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    <div 
                      className={`w-2 h-2 rounded-full mr-2 ${
                        record.status === "present" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    {record.status}
                  </span>
                </div>

                {/* Teacher Column */}
                <div className="px-6 py-4 flex items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                      {record.teacher?.charAt(0)?.toUpperCase() || 'T'}
                    </div>
                    <span className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                      {record.teacher}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Empty State */}
          {history.length === 0 && (
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">No attendance records</h3>
              <p className="text-xs text-gray-500">Attendance history will appear here once available.</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile View - Card Layout */}
      <div className="md:hidden w-full space-y-3">
        {history.map((record, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-150"
          >
            {/* Date and Status Row */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-400 opacity-60"></div>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(record.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <span 
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                  record.status === "present"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-red-100 text-red-800 border border-red-200"
                }`}
              >
                <div 
                  className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                    record.status === "present" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                {record.status}
              </span>
            </div>

            {/* Teacher Row */}
            <div className="flex items-center space-x-3 pt-2 border-t border-gray-100">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] flex items-center justify-center text-white text-xs font-bold">
                {record.teacher?.charAt(0)?.toUpperCase() || 'T'}
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Teacher</p>
                <p className="text-sm font-medium text-gray-900">{record.teacher}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Mobile Empty State */}
        {history.length === 0 && (
          <div className="rounded-xl bg-white border border-gray-200 shadow-lg p-6">
            <div className="flex flex-col gap-2 justify-center items-center">

            <PiNotepadBold className="text-3xl text-[var(--btn-pmy)]"/>
            <h3 className="text-sm font-medium text-gray-900 ">No attendance records</h3>
            <p className="text-xs text-gray-500">Attendance history will appear here once available.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}