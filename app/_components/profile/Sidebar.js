"use client";

import { FaUser, FaLock } from "react-icons/fa";
import SignOutButton from "./SignOutButton";

export default function Sidebar({ activeTab, setActiveTab }) {
  const items = [
    { id: "profile", label: "Profile", icon: <FaUser /> },
    { id: "change-password", label: "Change Password", icon: <FaLock /> },
  ];

  return (
    <div className="h-full flex flex-col justify-between p-4">
      <div>
        <h2 className="text-xl font-bold mb-8 text-[var(--btn-pmy)] text-center">Profile Panel</h2>
        <nav className="flex flex-col gap-4">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl font-semibold transition-colors ${
                activeTab === item.id
                  ? "bg-[var(--btn-pmy)] text-white"
                  : "text-[var(--text-sdy)] hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Sign Out button pinned at bottom */}
      <SignOutButton />
    </div>
  );
}