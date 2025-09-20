"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center mt-36 min-h-screen bg-white">
      <h1 className="text-6xl font-bold ">404</h1>
      <p className="text-xl text-[var(--text-sdy)]  mt-2">Page Not Found</p>
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-6 py-2 bg-[var(--btn-pmy)] text-white rounded-lg shadow-md hover:bg-[var(--btn-pmy)]/75 transition"
      >
        Go to Home
      </button>
    </div>
  );
}