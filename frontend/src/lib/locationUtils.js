// This file re-exports location utilities, but all country-state-city code
// is isolated in locationDataLoader.js which is only loaded when needed

export const getCountryCode = async (countryName) => {
  const module = await import('./locationDataLoader.js');
  return module.getCountryCode(countryName);
};

export const getStateCode = async (countryCode, stateName) => {
  const module = await import('./locationDataLoader.js');
  return module.getStateCode(countryCode, stateName);
};

export const getAllCountries = async () => {
  const module = await import('./locationDataLoader.js');
  return module.getAllCountries();
};

export const searchCountries = async (searchTerm) => {
  const module = await import('./locationDataLoader.js');
  return module.searchCountries(searchTerm);
};

export const getAllCountriesWithCodes = async () => {
  const module = await import('./locationDataLoader.js');
  return module.getAllCountriesWithCodes();
};

export const searchStates = async (countryCode, searchTerm) => {
  const module = await import('./locationDataLoader.js');
  return module.searchStates(countryCode, searchTerm);
};

export const getAllStatesWithCodes = async (countryCode) => {
  const module = await import('./locationDataLoader.js');
  return module.getAllStatesWithCodes(countryCode);
};

export const searchCities = async (countryCode, stateCode, searchTerm) => {
  const module = await import('./locationDataLoader.js');
  return module.searchCities(countryCode, stateCode, searchTerm);
};

export const hasCitiesData = async (countryCode, stateCode) => {
  const module = await import('./locationDataLoader.js');
  return module.hasCitiesData(countryCode, stateCode);
};

export const getIndianStates = async () => {
  const module = await import('./locationDataLoader.js');
  return module.getIndianStates();
};

export const getIndianCities = async () => {
  const module = await import('./locationDataLoader.js');
  return module.getIndianCities();
};

export const getAllCountriesData = async () => {
  const module = await import('./locationDataLoader.js');
  return module.getAllCountriesData();
};

export const getStatesData = async (countryCode) => {
  const module = await import('./locationDataLoader.js');
  return module.getStatesData(countryCode);
};

export const getCitiesData = async (countryCode, stateCode) => {
  const module = await import('./locationDataLoader.js');
  return module.getCitiesData(countryCode, stateCode);
};

export const getAllCitiesWithNames = async (countryCode, stateCode) => {
  const module = await import('./locationDataLoader.js');
  return module.getAllCitiesWithNames(countryCode, stateCode);
};
