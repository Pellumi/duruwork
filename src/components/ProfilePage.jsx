import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null); // Profile details
  const [isEditing, setIsEditing] = useState(false); // Edit mode
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch profile details on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token
        const response = await axios.get("https://maxhelp-api.onrender.com/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data.profile); // Set profile details
      } catch (err) {
        setError("Failed to load profile. Please try again.");
      }
    };

    fetchProfile();
  }, []);

  // Handle form submission to update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "https://maxhelp-api.onrender.com/user/profile",
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Profile updated successfully!");
      setProfile(response.data.profile); // Update profile with server response
      setIsEditing(false); // Exit edit mode
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    }
  };

  // Handle field changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  if (!profile) {
    return (
        <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Loading profile...</p>
      </div>
      </div>
      </div>
    );
  }

  return (
    <div className="flex  flex-col md:flex-row">
    <Sidebar />
    <div className="flex-1 flex flex-col">
        <Navbar />
    <div className="w-full items-center justify-center px-10 place-content-center mx-auto mt-8 py-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Profile</h1>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && <div className="text-green-500 text-center mb-4">{success}</div>}

      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-violet-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-violet-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={profile.age || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-violet-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={profile.bio || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-violet-300"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div >
          <div className="mb-4">
            <p>
              <strong>Full Name:</strong> {profile.fullName}
            </p>
          </div>
          <div className="mb-4">
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
          </div>
          <div className="mb-4">
            <p>
              <strong>Age:</strong> {profile.age || "Not provided"}
            </p>
          </div>
          <div className="mb-4">
            <p>
              <strong>Role:</strong> {profile.role || "Not provided"}
            </p>
          </div>
          <div className="mb-4">
            <p>
              <strong>Bio:</strong> {profile.bio || "Not provided"}
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600"
            >
              Edit Profile
            </button>

            <a href="/" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default ProfilePage;
