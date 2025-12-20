import { categories, Category, Event, events } from "@/constants/data";
import { create } from "zustand";

interface EventStore {
  events: Event[];
  searchQuery: string;
  activeCategory: number;
  categories: Category[];

  // Actions (mutations)
  setSearchQuery: (query: string) => void;
  setActiveCategory: (categoryIndex: number) => void;
  toggleFavorite: (eventId: string) => void;
}

export const useEventStore = create<EventStore>((set) => ({
  events: events,
  searchQuery: "",
  activeCategory: 0,
  categories: categories,

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  
  setActiveCategory: (category: number) => set({ activeCategory: category }),

  toggleFavorite: (eventId: string) => {
    set((state) => ({
      events: state.events.map((event) =>
        event.id === eventId ? { ...event, favorite: !event.favorite } : event
      ),
    }));
  },
}));

export const useEventById = (eventId: string) =>
  useEventStore((state) => state.events.find((e) => e.id === eventId));


