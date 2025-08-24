import { useState, useEffect, useRef } from 'react';

export const useOutline = modules => {
  const [activeModuleId, setActiveModuleId] = useState(null);
  const moduleRefs = useRef({});

  const registerModuleRef = (moduleId, element) => {
    moduleRefs.current[moduleId] = element;
  };

  const scrollToModule = moduleId => {
    const element = moduleRefs.current[moduleId];
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const moduleElements = Object.entries(moduleRefs.current);
      let currentActiveId = null;

      for (const [moduleId, element] of moduleElements) {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentActiveId = moduleId;
            break;
          }
        }
      }

      if (currentActiveId !== activeModuleId) {
        setActiveModuleId(currentActiveId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeModuleId]);

  return {
    activeModuleId,
    registerModuleRef,
    scrollToModule,
  };
};
