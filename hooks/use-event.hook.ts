import { categories, Event } from "@/constants/data";
import { useMemo, useState } from "react";

interface useEventProps {
  data: Event[];
  activeCategory?: number;
}

export const useEvent = ({ data, activeCategory }: useEventProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState(data);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (activeCategory && activeCategory > 0) {
      const categoryOptions = categories.map((cat) => cat.name);
      const selectedCategory = categoryOptions[activeCategory];
      filtered = filtered.filter(
        (event) => event.category === selectedCategory
      );
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [events, searchQuery, activeCategory]);

  const handleAddEventFavorite = (eventId: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, favorite: !event.favorite } : event
      )
    );
  };
  return {
    events: filteredEvents,
    handleAddEventFavorite,
    handleSearch,
    searchQuery,
    
  };
};
