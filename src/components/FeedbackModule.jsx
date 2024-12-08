import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useUnit } from "../UnitContext.tsx";

const FeedbackModule = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    comment: "",
    sentiment: "positive", // Default to positive sentiment
  });
  const [role, setRole] = useState(""); // State to store user role
  const { selectedUnit } = useUnit();

  // Fetch role from localStorage and set it
  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  // Fetch feedback data based on selected unit
  useEffect(() => {
    fetch(`https://maxhelp-api.onrender.com/feedback/${selectedUnit}`)
      .then((res) => res.json())
      .then((data) => setFeedbackData(data));
  }, [selectedUnit]);

  // Handle feedback submission
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://maxhelp-api.onrender.com/feedback/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unit: selectedUnit,
          comment: newFeedback.comment,
          sentiment: newFeedback.sentiment,
        }),
      });
      const data = await response.json();
      setFeedbackData([data, ...feedbackData]); // Update UI with new feedback
      setNewFeedback({ comment: "", sentiment: "positive" }); // Reset form
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="min-h-screen bg-gray-100 p-6">
          <h2 className="text-xl font-semibold">Customer Feedback for {selectedUnit}</h2>

          {/* Show the feedback form only for customers */}
          {role === "customer" && (
            <form
              onSubmit={handleFeedbackSubmit}
              className="mt-6 p-4 bg-white shadow-md rounded-lg"
            >
              <h3 className="text-lg font-semibold mb-4">Submit Feedback</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Comment</label>
                <textarea
                  value={newFeedback.comment}
                  onChange={(e) =>
                    setNewFeedback({ ...newFeedback, comment: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Sentiment</label>
                <select
                  value={newFeedback.sentiment}
                  onChange={(e) =>
                    setNewFeedback({ ...newFeedback, sentiment: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="positive">Positive</option>
                  <option value="neutral">Neutral</option>
                  <option value="negative">Negative</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600"
              >
                Submit Feedback
              </button>
            </form>
          )}

          {/* Display Existing Feedback */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            {feedbackData.map((feedback, index) => (
              <div key={index} className="p-4 mb-4 bg-white shadow-md rounded-lg">
                <p className="text-gray-700">{feedback.comment}</p>
                <p className="text-sm text-gray-500">Sentiment: {feedback.sentiment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModule;
