"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AttendanceFilters({
  subjects,
  selectedSubject,
  dateRange,
  onFilterChange,
}) {
  const [startDate, endDate] = dateRange;

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
      {/* Subject Dropdown */}
      <select
        value={selectedSubject}
        onChange={(e) => onFilterChange(e.target.value, dateRange)}
        className="mt-1 w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
      >
        <option value="">Select Subject</option>
        {subjects.map((subject) => (
          <option key={subject._id} value={subject._id}>
            {subject.name}
          </option>
        ))}
      </select>

      {/* Date Range Picker */}
      <div className="w-full md:w-1/2">
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            onFilterChange(selectedSubject, update);
          }}
          isClearable={true}
          placeholderText="Select date range"
          wrapperClassName="w-full"
          className="mt-1 min-w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
        />
      </div>
    </div>
  );
}
