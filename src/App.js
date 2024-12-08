import Login from "./components/login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import InventoryManagement from "./components/InventoryManagement";
import SalesTracking from "./components/SalesTracking";
import FeedbackModule from "./components/FeedbackModule";
import BusinessUnitSelector from "./components/BusinessUnitSelector.tsx";
import React, { useState } from "react";
import { UnitProvider } from "./UnitContext.tsx";
import ProfilePage from "./components/ProfilePage.jsx";
import CreateUserForm from "./components/createuser.jsx";

const App = () => {
  return (
    <UnitProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/sales" element={<SalesTracking />} />
        <Route path="/feedback" element={<FeedbackModule />} />
        <Route path="/business" element={<BusinessUnitSelector />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-user" element={<CreateUserForm />} />
      </Routes>
    </UnitProvider>
  );
}


export default App;
