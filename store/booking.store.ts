// store/booking-store.ts
import { Event } from "@/constants/data";
import { Booking, TicketSelection } from "@/types/bookings.type";
import { isEvent } from "@/utils/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BookingState {
  currentBooking: Booking | null;
  selectedEvent: Event | null;
  bookings: Booking[];

  // Actions
  setSelectedEvent: (event: Event) => void;
  createBooking: (ticketSelection: TicketSelection) => Promise<string>;
  clearBooking: () => void;
  getActiveBookings: () => Booking[];
  getPastBookings: () => Booking[];
  getBookingById: (id: string) => Booking | undefined;
  updateCurrentBookingPaymentMethod: (paymentMethodId: string) => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      currentBooking: null,
      selectedEvent: null,
      bookings: [],

      setSelectedEvent: (event) => set({ selectedEvent: event }),

      createBooking: async (ticketSelection) => {
        const { selectedEvent, bookings } = get();
        if (!selectedEvent) throw new Error("No event selected");

        const subtotal = ticketSelection.price * ticketSelection.quantity;
        const fees = subtotal * ticketSelection.fee;
        const tax = subtotal * 0.04;
        const total = subtotal + fees + tax;

        const bookingId = `#BRF4875${Math.floor(Math.random() * 10000)}`;

        const booking: Booking = {
          id: bookingId,
          event: selectedEvent,
          ticketSelection,
          subtotal,
          fees,
          tax,
          total,
          createdAt: new Date(),
        };

        set({ currentBooking: booking, bookings: [...bookings, booking] });
        return bookingId;
      },

      updateCurrentBookingPaymentMethod: (paymentMethodId: string) => {
        set((state) => {
          if (!state.currentBooking) return state;

          return {
            currentBooking: {
              ...state.currentBooking,
              paymentMethod: paymentMethodId,
            },
          };
        });
      },

      getActiveBookings: () => {
        return get().bookings.filter((b) => !isEvent(b.event));
      },

      getPastBookings: () => {
        return get().bookings.filter((b) => isEvent(b.event));
      },

      clearBooking: () => set({ currentBooking: null, selectedEvent: null }),

      getBookingById: (id: string) => {
        return get().bookings.find((b) => b.id === id);
      },
    }),
    { name: "booking-storage", storage: createJSONStorage(() => AsyncStorage) }
  )
);
