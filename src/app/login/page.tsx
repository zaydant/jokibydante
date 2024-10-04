"use client";

import React, { useState } from "react";
import { LockOutlined, EmailOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import { CircularProgress, Snackbar, Alert } from "@mui/material";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar open state
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSnackbarOpen(false); // Close Snackbar before new attempt

    try {
      setLoading(true);
      await login(email, password);
      router.push("/admin"); // Redirect to admin page after successful login
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Set error message
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setSnackbarOpen(true); // Open Snackbar for error messages
    } finally {
      setLoading(false); // Reset loading state after process is done
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close Snackbar
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-black p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Login
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <EmailOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
              <input
                className="w-full pl-10 pr-3 py-2 rounded-lg text-black border-2 border-gray-200 outline-none focus:border-blue-500"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <LockOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
              <input
                className="w-full pl-10 pr-3 py-2 rounded-lg text-black border-2 border-gray-200 outline-none focus:border-blue-500"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} className="text-white" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>

      {/* Snackbar for error display */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Snackbar will close after 6 seconds
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position of Snackbar
      >
        <Alert onClose={handleSnackbarClose} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
