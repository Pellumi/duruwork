
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import React, { useEffect } from "react";
import { useUnit } from "../UnitContext.tsx"; 
import { Link, useNavigate } from "react-router-dom";


const BusinessUnitSelector = () => {
  const { selectedUnit, setSelectedUnit } = useUnit(); // Access and update selectedUnit
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role"); // Get role from localStorage
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUnit(e.target.value); 
    if (userRole === "customer") {
      navigate("/feedback"); // Redirect to feedback page for customer role
    }else{
    navigate("/dashboard"); // Redirect to dashboard
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
    <Sidebar />
    <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 bg-white shadow-md rounded-lg mx-6 mt-4 flex-1">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Select Business Unit
          </h2>

          <div className="space-y-4">
            <label htmlFor="unit-select" className="block text-lg font-medium text-gray-700">
              Choose a Unit
            </label>

            <select
              id="unit-select"
              value={selectedUnit}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <option value="Bookshop">Bookshop</option>
              <option value="Restaurant">Restaurant</option>
              <option value="BottleWater">Bottle Water Industry</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessUnitSelector;
