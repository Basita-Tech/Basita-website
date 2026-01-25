import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

const DEFAULT_HEIGHT_RANGE = [122, 193];
const DEFAULT_WEIGHT_RANGE = [40, 120];
const DEFAULT_AGE_RANGE = [20, 40];

const defaultFilters = {
  searchInput: "",
  searchName: "",
  selectedReligion: "all",
  selectedCaste: "all",
  selectedState: "",
  selectedProfession: "",
  selectedCountry: "all",
  selectedEducation: "all",
  newProfileDuration: "all",
  ageRange: [...DEFAULT_AGE_RANGE],
  heightRange: [...DEFAULT_HEIGHT_RANGE],
  weightRange: [...DEFAULT_WEIGHT_RANGE],
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState(defaultFilters);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const setAllFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const value = {
    filters,
    updateFilter,
    clearFilters,
    setAllFilters,
    defaultFilters,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within FilterProvider");
  }
  return context;
};
