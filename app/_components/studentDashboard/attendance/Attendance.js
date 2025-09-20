"use client";

import { useEffect, useMemo, useState } from "react";
import AttendanceFilters from "./AttendanceFilters";
import AttendanceSummary from "./AttendanceSummary";
import AttendanceChart from "./AttendanceChart";
import AttendanceTable from "./AttendanceTable";
import { useAuth } from "@/helper/AuthContext";
import { fetchAttendanceData } from "@/helper/StudentAPI";
import Loading from "@/app/loading";
import {motion} from "framer-motion";

export default function Attendance() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();
  
 
  // 1) Build base URL once
  const urlAPI = useMemo(
    () => `${process.env.NEXT_PUBLIC_BACKEND_URL}/attendance/student`,
    []
  );

  // 2) Load subjects from useAuth on mount / when user changes
  useEffect(() => {
    if (user?.data?.subjects?.length) {
      const mapped = user.data.subjects.map((s) => ({
        _id: s._id,
        name: s.name,
      }));
      setSubjects(mapped);

      // (Optional) auto-select first subject if none selected yet
      if (!selectedSubject) {
        setSelectedSubject(mapped[0]._id);
      }
    } else {
      setSubjects([]);
      setSelectedSubject("");
    }
  }, [user,selectedSubject]);

  // 3) Filter change handler (called by AttendanceFilters)
  const handleFilterChange = (subjectId, range) => {
    setSelectedSubject(subjectId);
    setDateRange(range);
  };

  // 4) Fetch when subject or date range changes
  useEffect(() => {
    // nothing to do without subject
    if (!selectedSubject) return;

    const [startDate, endDate] = dateRange || [null, null];

    // If no dates picked → overall for subject
    if (!startDate && !endDate) {
      fetchAttendanceData(setData, setLoading, urlAPI, selectedSubject);
      return;
    }

    // If only one date picked → wait
    if (startDate && !endDate) return;

    // If both dates picked → ranged fetch
    if (startDate && endDate) {
      const from = startDate.toISOString().split("T")[0];
      const to = endDate.toISOString().split("T")[0];
      fetchAttendanceData(setData, setLoading, urlAPI, selectedSubject, from, to);
    }
  }, [selectedSubject, dateRange, urlAPI]);
  


  const summaryData = data
    ? {
        total: data?.history?.length,
        present: data?.history?.filter((h) => h.status === "present")
          .length,
        absent: data?.history?.filter((h) => h.status === "absent")
          .length,
        percentage:
          data?.history?.length > 0
            ? (
                (data?.history.filter((h) => h.status === "present")
                  .length /
                  data?.history.length) *
                100
              ).toFixed(2)
            : 0,
      }
    : null;
   
    if(loading){
      return <Loading/>
      }
     
  return (
    <div>
      <AttendanceFilters
        subjects={subjects}
        selectedSubject={selectedSubject}
        dateRange={dateRange}
        onFilterChange={handleFilterChange}
      />

     

      {!loading && data && data?.history?.length === 0 && (
        <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex justify-center"
            >
              <div className="rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-50 border border-yellow-200 text-yellow-700 shadow-lg p-8 text-center max-w-md">
                <h2 className="text-2xl font-bold  mb-2">No Attendance data available</h2>
                <p>Your attendance has not been registered yet.</p>
              </div>
            </motion.div>
      )}

      {!loading && data && data?.history?.length > 0 && (
        <div className="space-y-8 mt-6">
          <AttendanceSummary data={summaryData} loading={loading}/> 
          <AttendanceChart history={data?.history} />
          <AttendanceTable history={data?.history}/>
        </div>
      )}
    </div>
  );
}