import { useEventStore } from "@/store/event.store";
import { Event } from "@/constants/data";
import { useMemo } from "react";

interface UseFilteredEventsProps {
  section?: "popular" | "upcoming";
  limit?: number;
  includeSearch?: boolean;
}

export const useFilteredEvents = ({
  section,
  limit,
  includeSearch = false,
}: UseFilteredEventsProps = {}) => {
  const events = useEventStore((state) => state.events);
  const categories = useEventStore((state) => state.categories);
  const activeCategory = useEventStore((state) => state.activeCategory);
  const searchQuery = useEventStore((state) => state.searchQuery);

  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (section) {
      filtered = filtered.filter((e) => e.section === section);
    }

    if (activeCategory > 0) {
      const selectedCategory = categories[activeCategory].name.toLowerCase();
      filtered = filtered.filter((event) => event.category === selectedCategory);
    }

    if (includeSearch && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query)
      );
    }

    if (limit) {
      filtered = filtered.slice(0, limit);
    }

    return filtered;
  }, [events, section, activeCategory, categories, searchQuery, includeSearch, limit]);

  return filteredEvents;
};