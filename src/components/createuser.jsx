import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");  // Filter role state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    age: "",
    bio: "",
    role: "user", // Default role is "user"
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://maxhelp-api.onrender.com/user/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);  // Initially show all users
      } catch (err) {
        setErrorMessage("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  // Handle role filter change
  const handleRoleFilterChange = (e) => {
    const selectedRole = e.target.value;
    setRoleFilter(selectedRole);

    if (selectedRole === "") {
      setFilteredUsers(users);  // Show all users when no role is selected
    } else {
      setFilteredUsers(users.filter((user) => user.role === selectedRole));
    }
  };

  // Handle user deletion
  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`https://maxhelp-api.onrender.com/user/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage(response.data.message);
      setFilteredUsers(filteredUsers.filter((user) => user._id !== userId));  // Update the filtered list
    } catch (err) {
      setErrorMessage("Failed to delete user.");
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission for creating new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("https://maxhelp-api.onrender.com/user/register", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setFormData({
        username: "",
        password: "",
        email: "",
        fullName: "",
        age: "",
        bio: "",
        role: "user", // Reset to default
      });
    } catch (err) {
      setSuccessMessage("");
      setErrorMessage(err.response?.data?.message || "Error creating user");
    }
  };

  return (
    <div className="flex relative flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="min-h-screen bg-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">Admin User Management</h2>
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          {/* Role Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Filter by Role</label>
            <select
              value={roleFilter}
              onChange={handleRoleFilterChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          {/* User Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full table-auto bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-300">
                  <th className="px-4 py-2 text-left">Username</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Full Name</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="border px-4 py-2">{user.username}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.fullName}</td>
                    <td className="border px-4 py-2">{user.role}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Create New User Form */}
          <div className="w-full  items-center justify-center px-10 place-content-center mx-auto mt-8 py-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Create New User</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="user">Staff</option>
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-600"
              >
                Create User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;
