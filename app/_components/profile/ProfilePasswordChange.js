"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaDownload } from "react-icons/fa";

export default function ProfilePasswordChange() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function submitPasswordHandler(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/updatepassword`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ oldPassword, password, confirmPassword }),
        }
      );

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        toast.success(data.message);
        router.push("/");
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went Wrong. Try Again!");
    } finally {
      setLoading(false);
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl p-8 border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-4 text-center">
        Change Password
      </h2>
      <form className="mt-8 space-y-6" onSubmit={submitPasswordHandler}>
        {/*Old Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Current Password
          </label>
          <input
            id="password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
            placeholder="••••••••"
          />
        </div>
        {/*New Password */}
        <div>
          <label
            htmlFor="newpassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            New Password
          </label>
          <input
            id="newpassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
            placeholder="••••••••"
          />
        </div>
        {/*confirm Password */}
        <div>
          <label
            htmlFor="confirmpassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            id="confirmpassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--btn-pmy)] outline-none"
            placeholder="••••••••"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full flex items-center gap-1.5 justify-center py-3 bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] text-white font-semibold rounded-lg shadow-md disabled:opacity-70"
        ><FaDownload />
          {loading ? "Updating ..." : "Update Password"}
        </motion.button>
      </form>
    </motion.div>
  );
}
