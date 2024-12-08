import React, { useState, useEffect } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar visibility
  const [role, setRole] = useState("");

  useEffect(() => {
    // Fetch role from localStorage
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=""></div>
    // <div className="lg:min-h-screen h-full bg-gray-800">
    //   {/* Hamburger Menu for Mobile */}
    //   <button
    //     className="md:hidden  p-4 w-full text-white bg-gray-800"
    //     onClick={toggleSidebar}
    //   >
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       stroke="currentColor"
    //       className="w-6 h-6"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="M4 6h16M4 12h16M4 18h16"
    //       />
    //     </svg>
    //   </button>

    //   {/* Sidebar */}
    //   <aside
    //     className={`w-64 bg-gray-800 text-white min-h-screen  flex flex-col fixed top-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
    //       isOpen ? "translate-x-0" : "-translate-x-full"
    //     } md:translate-x-0 md:relative`} // Fixed sidebar for desktop, retractable for mobile
    //   >
    //     <div className="p-4">
    //       <ul className="space-y-4">
    //         {/* Business Unit Selector */}
    //         <li>
    //           <a
    //             href="/business"
    //             className="block hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
    //           >
    //             Business Unit Selector
    //           </a>
    //         </li>

    //         {/* Dashboard - for User and Admin */}
    //         {(role === "user" || role === "admin") && (
    //           <li>
    //             <a
    //               href="/dashboard"
    //               className="block hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
    //             >
    //               Dashboard
    //             </a>
    //           </li>
    //         )}

    //         {/* Inventory - for User and Admin */}
    //         {(role === "user" || role === "admin") && (
    //           <li>
    //             <a
    //               href="/inventory"
    //               className="block hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
    //             >
    //               Inventory
    //             </a>
    //           </li>
    //         )}

    //         {/* Sales - for User and Admin */}
    //         {(role === "user" || role === "admin") && (
    //           <li>
    //             <a
    //               href="/sales"
    //               className="block hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
    //             >
    //               Sales
    //             </a>
    //           </li>
    //         )}

    //         {/* Feedback - for Customer, User, and Admin */}
    //         {(role === "user" || role === "admin" || role === "customer") && (
    //           <li>
    //             <a
    //               href="/feedback"
    //               className="block hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
    //             >
    //               Feedback
    //             </a>
    //           </li>
    //         )}

    //         {/* Create User - for Admin only */}
    //         {role === "admin" && (
    //           <li>
    //             <a
    //               href="/create-user"
    //               className="block hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
    //             >
    //               Create User
    //             </a>
    //           </li>
    //         )}
    //       </ul>
    //     </div>
    //   </aside>

    //   {/* Overlay effect when sidebar is open (mobile) */}
    //   {isOpen && (
    //     <div
    //       onClick={toggleSidebar} // Close sidebar when clicking outside
    //       className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
    //     />
    //   )}
    // </div>
  );
};

export default Sidebar;
