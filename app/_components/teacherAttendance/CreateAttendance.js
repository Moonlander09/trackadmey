"use client";
import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import SelectControls from "./SelectControls";
import { useAuth } from "@/helper/AuthContext";
import toast from "react-hot-toast";
import { FaSave, FaSpinner } from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";
import Loading from "../Loading";

const CreateAttendance = () => {
  const [students, setStudents] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [subjectId, setSubjectId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (user?.data?.subjects?.length > 0) {
      setSubjectId(user.data.subjects[0]._id);
    }
  }, [user]);

  useEffect(() => {
    async function fetchStudents() {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/teacher/${subjectId}/students`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await res.json();
        if (result.status === "success") {
          setStudents(result.students);

          const initialStatuses = {};
          result.students.forEach((s) => {
            initialStatuses[s._id] = "absent"; // Default to absent
          });
          setStatuses(initialStatuses);
        }
      } catch (error) {
        toast.error("Failed to fetch students.");
      } finally {
        setLoading(false);
      }
    }

    if (subjectId) {
      fetchStudents();
    }
  }, [subjectId]);

  const toggleStatus = (id) => {
    setStatuses((prev) => ({
      ...prev,
      [id]: prev[id] === "present" ? "absent" : "present",
    }));
  };

  const markAllPresent = () => {
    const updated = {};
    students.forEach((s) => (updated[s._id] = "present"));
    setStatuses(updated);
  };

  const markAllAbsent = () => {
    const updated = {};
    students.forEach((s) => (updated[s._id] = "absent"));
    setStatuses(updated);
  };

  const saveAttendance = async () => {
    setLoadingSave(true);
    try {
      const studentsData = Object.entries(statuses).map(
        ([studentId, status]) => ({
          student: studentId,
          status: status,
        })
      );

      const payload = {
        students: studentsData,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/attendance/teacher/${subjectId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (res.ok && result.status === "success") {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to save attendance.");
    } finally {
      setLoadingSave(false);
    }
  };

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="space-y-6 mx-2 md:m-0">
      {/* Header Section */}
      <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg p-6 flex flex-col items-center gap-2">
        <h2 className="text-xl font-bold text-gray-900 ">Create Attendance</h2>
        <p className="text-[var(--text-sdy)] mb-6">Mark attendance for your students</p>
        
        <SelectControls
          markAllPresent={markAllPresent}
          markAllAbsent={markAllAbsent}
        />
      </div>

      {/* Students Section */}
      <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg px-2 py-6 md:p-6">
        {students.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold ">Students List</h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {students.length} student{students.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            {/* Desktop View: Grid Layout */}
            <div className="hidden md:block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {students.map((s) => (
                  <StudentCard
                    key={s._id}
                    student={s}
                    status={statuses[s._id]}
                    toggleStatus={toggleStatus}
                  />
                ))}
              </div>
            </div>

            {/* Mobile View: Single Column */}
            <div className="md:hidden space-y-3">
              {students.map((s) => (
                <StudentCard
                  key={s._id}
                  student={s}
                  status={statuses[s._id]}
                  toggleStatus={toggleStatus}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 flex flex-col items-center justify-center gap-2">
            <FaUserXmark className='text-3xl text-[var(--btn-pmy)]'/>
            <h3 className="text-lg font-bold">No Students Found</h3>
            <p className="text-gray-500">No students are enrolled in this subject.</p>
          </div>
        )}
      </div>

      {/* Save Button Section */}
      {students.length > 0 && (
        <div className="flex justify-center">
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-pmy)]/90 hover:from-[var(--btn-pmy)]/90 hover:to-[var(--btn-pmy)]/80 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={loadingSave}
            onClick={saveAttendance}
          >
            {loadingSave ? (
              <>
                <FaSpinner className="animate-spin" />
                Saving Attendance...
              </>
            ) : (
              <>
                <FaSave />
                Save Attendance
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateAttendance;