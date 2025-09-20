"use client";

import { useEffect, useMemo, useState } from "react";
import SubjectWiseFilters from "./SubjectWiseFilters";
import SubjectWiseCards from "./SubjectWiseCards";
import SubjectWiseChart from "./SubjectWiseChart";
import SubjectWiseMessage from "./SubjectWiseMessage";
import { useAuth } from "@/helper/AuthContext";
import {  fetchSummaryData } from "@/helper/StudentAPI";
import Loading from "@/app/loading";

export default function SubjectWise() {
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
        fetchSummaryData(setData, setLoading, urlAPI, selectedSubject);
        return;
      }
  
      // If only one date picked → wait
      if (startDate && !endDate) return;
  
      // If both dates picked → ranged fetch
      if (startDate && endDate) {
        const from = startDate.toISOString().split("T")[0];
        const to = endDate.toISOString().split("T")[0];
        fetchSummaryData(setData, setLoading, urlAPI, selectedSubject, from, to);
      }
    }, [selectedSubject, dateRange, urlAPI]);


    if(loading){
      return <Loading/>
    }
  return (
    <div>
      <SubjectWiseFilters
        subjects={subjects}
        selectedSubject={selectedSubject}
        dateRange={dateRange}
        onFilterChange={handleFilterChange}
      />

  

      {!loading && data && data.totalSessions === 0 && (
        <SubjectWiseMessage subject={data.subject} />
      )}

      {!loading && data && data.totalSessions > 0 && (
        <div className="space-y-8 mt-6">
          <SubjectWiseCards data={data} />
          <SubjectWiseChart data={data} />
        </div>
      )}

    </div>
  );
}