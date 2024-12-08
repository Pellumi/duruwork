import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useUnit } from "../UnitContext.tsx"; 
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "./Table.jsx";

const SalesTracking = () => {
  const [salesData, setSalesData] = useState([]);
  const [newSale, setNewSale] = useState({
    date: "",
    amount: 0,
    unitsSold: 0,
  });

  const { selectedUnit } = useUnit();
  // Fetch sales data
  useEffect(() => {
    fetch(`https://maxhelp-api.onrender.com/sales/${selectedUnit}`)
      .then((res) => res.json())
      .then((data) => setSalesData(data));
  }, [selectedUnit]);

  // Handle form submission
  const handleRecordSale = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://maxhelp-api.onrender.com/sales/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newSale, unit: selectedUnit }),
      });
      const data = await response.json();
      setSalesData([...salesData, data]); // Update UI with new record
      setNewSale({ date: "", amount: 0, unitsSold: 0 }); // Reset form
    } catch (error) {
      console.error("Error recording sale:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
    <Sidebar />
    <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="min-h-screen bg-gray-100 p-6">
          <h2 className="text-xl font-semibold">Sales for {selectedUnit}</h2>

          {/* Add Sales Form */}
          <form
            onSubmit={handleRecordSale}
            className="my-6 p-4 bg-white shadow-md rounded-lg"
          >
            <h3 className="text-lg font-semibold mb-4">Record New Sale</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={newSale.date}
                onChange={(e) =>
                  setNewSale({ ...newSale, date: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                value={newSale.amount}
                onChange={(e) =>
                  setNewSale({ ...newSale, amount: parseFloat(e.target.value) })
                }
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Units Sold
              </label>
              <input
                type="number"
                value={newSale.unitsSold}
                onChange={(e) =>
                  setNewSale({
                    ...newSale,
                    unitsSold: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600"
            >
              Record Sale
            </button>
          </form>

          <h2 className="text-xl font-semibold">Sales Data</h2>

          {/* Sales Table */}
          <Table className="w-full mt-4 border-collapse bg-white shadow-md rounded-lg">
            <TableHeader>
              <TableRow className="bg-gray-300">
                <TableHead className="px-4 py-2">Date</TableHead>
                <TableHead className="px-4 py-2">Amount</TableHead>
                <TableHead className="px-4 py-2">Units Sold</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((sale) => (
                <TableRow key={sale._id}>
                  <TableCell className="border px-4 py-2"> {new Date(sale.date).toLocaleDateString("en-US")}</TableCell>
                  <TableCell className="border px-4 py-2">${sale.amount}</TableCell>
                  <TableCell className="border px-4 py-2">{sale.unitsSold}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SalesTracking;
