import { useState } from "react";

export const useCategoryFilter = () => {
  const [activeFilter, setActiveFilter] = useState(0);

  const handleFilterChange = (index: number) => {
    setActiveFilter(index);
  };

  return {
    activeFilter,
    handleFilterChange,
  };
};
