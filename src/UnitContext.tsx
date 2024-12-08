import React, { createContext, useContext, useState, useEffect } from 'react';

const UnitContext = createContext<any>(null);

export const UnitProvider = ({ children }: any) => {
  const [selectedUnit, setSelectedUnit] = useState<string>(() => {
    // Get selected unit from localStorage if it exists
    return localStorage.getItem("selectedUnit") || "Bookhop";
  });

  // Update localStorage whenever selectedUnit changes
  useEffect(() => {
    localStorage.setItem("selectedUnit", selectedUnit);
  }, [selectedUnit]);

  return (
    <UnitContext.Provider value={{ selectedUnit, setSelectedUnit }}>
      {children}
    </UnitContext.Provider>
  );
};

export const useUnit = () => useContext(UnitContext);
