import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useUnit } from "../UnitContext.tsx"; 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./Table.jsx";

const InventoryManagement = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [newInventory, setNewInventory] = useState({
    product: "",
    stock: 0,
    reorderPoint: 0,
  });


  // Fetch inventory data
  const { selectedUnit } = useUnit();
  console.log("Selected Unit:", selectedUnit);


  useEffect(() => {
    fetch(`https://maxhelp-api.onrender.com/inventory/${selectedUnit}`)
      .then((res) => res.json())
      .then((data) => setInventoryData(data));
  }, [selectedUnit]);

      console.log("Inventory Data:", inventoryData);

  // Handle form submission
  const handleAddInventory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://maxhelp-api.onrender.com/inventory/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newInventory, unit: selectedUnit }),
      });
      const data = await response.json();
      setInventoryData([...inventoryData, data]); // Update UI with new item
      setNewInventory({ product: "", stock: 0, reorderPoint: 0 }); // Reset form
    } catch (error) {
      console.error("Error adding inventory:", error);
    }
  };

  return (
     <div className="flex flex-col md:flex-row">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
        <div className="min-h-screen bg-gray-100 p-6">
          <h2 className="text-xl font-semibold">Inventory for {selectedUnit}</h2>
          {/* Add Inventory Form */}
          <form
            onSubmit={handleAddInventory}
            className="my-6 p-4 bg-white shadow-md rounded-lg"
          >
            <h3 className="text-lg font-semibold mb-4">Add New Inventory</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Product
              </label>
              <input
                type="text"
                value={newInventory.product}
                onChange={(e) =>
                  setNewInventory({ ...newInventory, product: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                value={newInventory.stock}
                onChange={(e) =>
                  setNewInventory({ ...newInventory, stock: parseInt(e.target.value) })
                }
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Reorder Point
              </label>
              <input
                type="number"
                value={newInventory.reorderPoint}
                onChange={(e) =>
                  setNewInventory({
                    ...newInventory,
                    reorderPoint: parseInt(e.target.value),
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
              Add Inventory
            </button>
          </form>
          
          <h2 className="text-xl font-semibold">Inventory Data</h2>
          {/* Inventory Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Reorder Point</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="border px-4 py-2">{item.product}</TableCell>
                  <TableCell className="border px-4 py-2">{item.stock}</TableCell>
                  <TableCell className="border px-4 py-2">{item.reorderPoint}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;
