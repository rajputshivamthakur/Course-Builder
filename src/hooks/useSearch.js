import { useState, useMemo } from 'react';
import { filterModules, filterResources } from '../utils/searchHelpers.js';

export const useSearch = (modules, resources) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResults = useMemo(() => {
    return {
      modules: filterModules(modules, searchTerm),
      resources: filterResources(resources, searchTerm),
    };
  }, [modules, resources, searchTerm]);

  const hasResults =
    filteredResults.modules.length > 0 || filteredResults.resources.length > 0;

  return {
    searchTerm,
    setSearchTerm,
    filteredModules: filteredResults.modules,
    filteredResources: filteredResults.resources,
    hasResults,
    isSearching: searchTerm.length > 0,
  };
};
