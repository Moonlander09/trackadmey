"use client";

import ProfilePic from "./ProfilePic";
import ProfileInfo from "./ProfileInfo";

export default function UserProfile() {
  return (
    <div className="space-y-6">
      <ProfilePic />
      <ProfileInfo />
    </div>
  );
}