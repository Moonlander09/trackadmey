"use client";

import { useAuth } from "@/helper/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";

export default function SignOutButton({ small }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {setUser}=useAuth();
  const handleSignOut = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signout`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        // Clear the frontend cookie
      document.cookie = `jwt=; path=/; secure; samesite=none; max-age=0`;
        const data = await res.json();
        toast.success(data.message);
        setUser(null);
        router.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (small) {
    // Compact version for toolbar
    return (
      <button
        onClick={handleSignOut}
        className="flex flex-col font-semibold items-center gap-1 text-sm text-[var(--absent)] cursor-pointer disabled:text-opacity-70"
        disabled={loading}
      >
        <FaSignOutAlt />
        <span>{loading ?  "Signing Out":"SignOut" }</span>
      </button>
    );
  }

  // Full-width version for sidebar
  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-3 px-4 py-2 mt-4 rounded-xl font-semibold text-white bg-[var(--absent)] hover:-translate-y-0.5 hover:bg-[var(--absent)]/85 duration-300 cursor-pointer transition disabled:opacity-70 :" disabled={loading}
    >
      <FaSignOutAlt />
      <span>{loading ?  "Signing Out":"SignOut" }</span>
    </button>
  );
}
