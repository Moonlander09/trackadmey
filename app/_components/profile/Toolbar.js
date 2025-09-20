"use client";

import { FaUser, FaLock } from "react-icons/fa";
import SignOutButton from "./SignOutButton";

export default function Toolbar({ activeTab, setActiveTab }) {
  const items = [
    { id: "profile", label: "Profile", icon: <FaUser /> },
    { id: "change-password", label: "Change Password", icon: <FaLock /> },
  ];

  return (
    <nav className="flex justify-around p-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center gap-1 text-sm font-semibold ${
            activeTab === item.id
              ? "text-[var(--btn-pmy)]"
              : "text-[var(--text-sdy)] hover:text-gray-700"
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}

      {/* Sign Out in toolbar inline */}
      <SignOutButton small />
    </nav>
  );
}