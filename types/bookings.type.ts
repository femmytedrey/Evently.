import { Event } from "@/constants/data";

export type TicketTypeId = "pre-sale-1" | "pre-sale-2" | "normal";
export type BookingStatus = "active" | "past" | "cancelled";

export interface TicketSelection {
  type: TicketTypeId;
  price: number;
  quantity: number;
  fee: number;
}

export interface Booking {
  id: string;
  event: Event;
  ticketSelection: TicketSelection;
  subtotal: number;
  fees: number;
  tax: number;
  total: number;
  createdAt: Date;
}