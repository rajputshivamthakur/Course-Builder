export const searchInText = (text, searchTerm) => {
  if (!text || !searchTerm) return false;
  return text.toLowerCase().includes(searchTerm.toLowerCase());
};

export const searchInResource = (resource, searchTerm) => {
  return (
    searchInText(resource.title, searchTerm) ||
    searchInText(resource.url, searchTerm) ||
    searchInText(resource.fileName, searchTerm)
  );
};

export const searchInModule = (module, searchTerm) => {
  const moduleMatches = searchInText(module.name, searchTerm);
  const hasMatchingResources = module.resources?.some(resource =>
    searchInResource(resource, searchTerm)
  );

  return moduleMatches || hasMatchingResources;
};

export const filterModules = (modules, searchTerm) => {
  if (!searchTerm) return modules;

  return modules.filter(module => searchInModule(module, searchTerm));
};

export const filterResources = (resources, searchTerm) => {
  if (!searchTerm) return resources;

  return resources.filter(resource => searchInResource(resource, searchTerm));
};
