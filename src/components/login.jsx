import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("https://maxhelp-api.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setError(data.message);
      }

      if (response.ok) {
        // Store token in localStorage or state
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Redirect user to the business page
        navigate("/business");
        if (onLogin) {
          onLogin();
        }
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login to Your MaxHelp Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="Username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-5 text-white bg-violet-500 rounded-lg h-full hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400 relative"
          >
            {isLoading ? (
              <div className="absolute inset-0 flex items-center  px-4 py-2 justify-center">
                <div className=" border-4 border-t-4 px-4 py-3 border-white border-solid rounded-full animate-spin" />
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        {error && (
          <div className="text-red-500 text-center mt-2">{error}</div>
        )}
        {/* <div className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-violet-500 hover:underline">
            Sign Up
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
