"use client";

import { useEffect, useState } from "react";

import SummaryCard from "./SummaryCard";
import SummaryChart from "./SummaryChart";
import SummaryMessage from "./SummaryMessage";
import DatePicker from "react-datepicker";
import { fetchDashboardData } from "@/helper/StudentAPI";
import Loading from "@/app/loading";



export default function Summary() {

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate,endDate] = dateRange;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

   const urlAPI = `${process.env.NEXT_PUBLIC_BACKEND_URL}/attendance/student/overall-summary`;


     // Run API when page loads or date range changes
   useEffect(() => {
     if (!startDate && !endDate) {
       // no range → fetch default (full dashboard)
       fetchDashboardData(setData, setLoading, urlAPI);
       return;
     }
   
     if (startDate && endDate) {
       const from = startDate.toISOString().split("T")[0];
       const to = endDate.toISOString().split("T")[0];
       fetchDashboardData(setData, setLoading, urlAPI, from, to);
     }
   }, [startDate, endDate, urlAPI]);
  
   if(loading){
    return <Loading/>
   }  

  return (
    <div className="space-y-6">
      

     {/* Date Range Picker */}
           <div className="mb-6 text-center">
             <DatePicker
               selectsRange={true}
               startDate={startDate}
               endDate={endDate}
               onChange={(update) => setDateRange(update)}
               isClearable={true}
               placeholderText="Select date range"
               wrapperClassName="w-full"
               className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
             />
           </div>

  

      {!loading && data && data.overall.total === 0 && (
        <SummaryMessage />
      )}

      {!loading && data && data.overall.total > 0 && (
        <div className="space-y-8 mt-6">
          <SummaryCard overall={data.overall} />
          <SummaryChart overall={data.overall} subjects={data.subjects} />
        </div>
      )}
    </div>
  );
}