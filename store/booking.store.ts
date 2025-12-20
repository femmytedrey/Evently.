// store/booking-store.ts
import { create } from 'zustand';
import { Event } from '@/constants/data';

export type TicketTypeId = 'pre-sale-1' | 'pre-sale-2' | 'normal'

interface TicketSelection {
  type: TicketTypeId;
  price: number;
  quantity: number;
  fee: number
}

interface Booking {
  id: string;
  event: Event;
  ticketSelection: TicketSelection;
  subtotal: number;
  fees: number;
  tax: number;
  total: number;
  createdAt: Date;
}

interface BookingState {
  currentBooking: Booking | null;
  selectedEvent: Event | null;
  
  // Actions
  setSelectedEvent: (event: Event) => void;
  createBooking: (ticketSelection: TicketSelection) => Promise<string>; 
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  currentBooking: null,
  selectedEvent: null,

  setSelectedEvent: (event) => set({ selectedEvent: event }),

  createBooking: async (ticketSelection) => {
    const { selectedEvent } = get();
    if (!selectedEvent) throw new Error('No event selected');

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

    set({ currentBooking: booking });
    return bookingId;
  },

  clearBooking: () => set({ currentBooking: null, selectedEvent: null }),
}));