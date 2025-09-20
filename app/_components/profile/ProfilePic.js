"use client";
import { useAuth } from "@/helper/AuthContext";
import { FaCamera, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

export default function ProfilePic() {
  const { user, apiLoading, fetchUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const img = user?.data?.profileImage;

  // Validate file before upload
  const validateFile = (file) => {
    // Check file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload JPG, PNG, or WEBP images only!");
      return false;
    }

    // Check file size (4MB = 4 * 1024 * 1024 bytes)
    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Image size must be less than 4MB!");
      return false;
    }

    return true;
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (validateFile(file)) {
      uploadToCloudinary(file);
    }

    // Reset file input
    event.target.value = "";
  };

  // Upload to Cloudinary
  const uploadToCloudinary = async (file) => {
    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "profile_images");
      formData.append("cloud_name", "dakhjewwx");
      formData.append("folder", "profile_pics");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dakhjewwx/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        toast.error("Upload failed");
      }

      const data = await response.json();

      // Update user profile with new image URL
      await updateUserProfile(data.secure_url);

      toast.success("Profile picture updated successfully!");
    } catch (error) {
      toast.error("Failed to upload image. Please try again!");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // Update user profile in backend
  const updateUserProfile = async (imageUrl) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/updateprofilepicture`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profileImage: imageUrl }),
        }
      );

      if (!response.ok) {
        toast.error("Failed to update profile");
      }
      await fetchUser();
      // You might want to refresh user data here
      // await refetchUser(); // if you have this function in your auth context
    } catch (error) {
      toast.error("Image uploaded but failed to update profile!");
    }
  };

  // Trigger file input click
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  if (apiLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl p-8 border border-gray-200 flex flex-col md:flex-row items-center gap-6"
    >
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Profile Image */}
      <div className="relative group shrink-0">
        <div className="relative">
          <img
            src={img || "https://avatar.iran.liara.run/public/12"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover ring-4 ring-[var(--border)] shadow-md transition-transform duration-300 group-hover:scale-105"
          />

          {/* Upload Progress Overlay */}
          {uploading && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
              <div className="text-white text-center">
                <FaSpinner className="animate-spin mx-auto mb-1" size={20} />
                <div className="text-xs text-[var(--text-sdy)]">
                  {uploadProgress > 0 ? `${uploadProgress}%` : "Uploading..."}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Upload Button */}
        <button
          type="button"
          onClick={handleCameraClick}
          disabled={uploading}
          className="absolute bottom-2 right-2 bg-gradient-to-r from-[var(--btn-pmy)] to-[var(--btn-sdy)] text-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <FaSpinner className="animate-spin" size={16} />
          ) : (
            <FaCamera size={16} />
          )}
        </button>
      </div>

      {/* Info */}
      <div>
        <h2 className="text-xl font-bold text-[var(--btn-pmy)]">
          Profile Picture
        </h2>
        <p className="text-sm text-[var(--text-sdy)] mt-1">
          Upload your latest photo (JPG, PNG, WEBP).
        </p>
        <p className="text-xs text-[var(--text-dsb)] mt-1">Max size: 4MB</p>
        {uploading && (
          <p className="text-xs text-[var(--btn-pmy)] mt-1 font-medium">
            Uploading your new profile picture...
          </p>
        )}
      </div>
    </motion.div>
  );
}
