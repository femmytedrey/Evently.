import { TicketTypeId } from "@/types/bookings.type";
import { Notification } from "@/types/notification.type";
import {
  LineSquiggle,
  Music,
  Rows3,
  Sparkle,
  Volleyball,
} from "lucide-react-native";

export type TicketType = {
  id: TicketTypeId;
  name: string;
  price: number;
  fee: number;
  available: number;
  status: "available" | "sold-out";
};

export interface Event {
  id: string;
  title: string;
  price: {
    min: number;
    max: number;
  };
  location: string;
  date: {
    year: number;
    month: string;
    day: number;
  };
  image: string;
  category: "music" | "festival" | "sports" | "conference";
  isFeatured?: boolean;
  favorite?: boolean;
  description?: string;
  section: "popular" | "upcoming";
  ticketTypes: TicketType[];
}

export interface PaymentMethodType {
  id: string;
  type: "google-pay" | "apple-pay" | "visa" | "mastercard";
  name: string;
  email?: string;
  cardNumber?: string;
  balance: number;
  icon: string;
}

export const events: Event[] = [
  {
    id: "4",
    title: "BMTH Tour 2024",
    price: { min: 60.0, max: 300.0 },
    location: "Mandala Krida, Yogyakarta",
    date: { year: 2025, month: "Aug", day: 12 },
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    category: "music",
    favorite: false,
    description:
      "Experience the electrifying performance of Bring Me The Horizon live in Yogyakarta. Get ready for an unforgettable night of metalcore anthems and high-energy stage presence.",
    section: "popular",
    ticketTypes: [
      {
        id: "pre-sale-1",
        name: "Pre Sale I",
        price: 25.0,
        fee: 0.15,
        available: 0,
        status: "sold-out",
      },
      {
        id: "pre-sale-2",
        name: "Pre Sale II",
        price: 50.0,
        fee: 0.15,
        available: 542,
        status: "available",
      },
      {
        id: "normal",
        name: "Normal Ticket",
        price: 125.0,
        fee: 0.15,
        available: 1000,
        status: "available",
      },
    ],
  },
  {
    id: "5",
    title: "Moshing Metal Fest 2024",
    price: { min: 15.0, max: 30.0 },
    location: "Sleman, Yogyakarta",
    date: { year: 2025, month: "Sep", day: 5 },
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
    category: "music",
    favorite: true,
    description:
      "The ultimate metal festival featuring local and international bands. Dive into the mosh pit and experience the raw energy of metal music at its finest.",
    section: "popular",
    ticketTypes: [
      {
        id: "pre-sale-1",
        name: "Pre Sale I",
        price: 25.0,
        fee: 0.15,
        available: 0,
        status: "sold-out",
      },
      {
        id: "pre-sale-2",
        name: "Pre Sale II",
        price: 50.0,
        fee: 0.15,
        available: 542,
        status: "available",
      },
      {
        id: "normal",
        name: "Normal Ticket",
        price: 125.0,
        fee: 0.15,
        available: 1000,
        status: "available",
      },
    ],
  },
  {
    id: "6",
    title: "Bali Food Festival",
    price: { min: 10.0, max: 25.0 },
    location: "Seminyak, Bali",
    date: { year: 2025, month: "Jul", day: 22 },
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    category: "festival",
    favorite: false,
    description:
      "Discover the rich flavors of Indonesian and international cuisine. Join food lovers and top chefs for a culinary journey through Bali's finest dishes.",
    section: "popular",
    ticketTypes: [
      {
        id: "pre-sale-1",
        name: "Pre Sale I",
        price: 25.0,
        fee: 0.15,
        available: 0,
        status: "sold-out",
      },
      {
        id: "pre-sale-2",
        name: "Pre Sale II",
        price: 50.0,
        fee: 0.15,
        available: 542,
        status: "available",
      },
      {
        id: "normal",
        name: "Normal Ticket",
        price: 125.0,
        fee: 0.15,
        available: 1000,
        status: "available",
      },
    ],
  },
  {
    id: "1",
    title: "Synchronize Fest 2024",
    price: { min: 25.0, max: 125.0 },
    location: "Yogyakarta",
    date: { year: 2025, month: "May", day: 20 },
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    category: "music",
    isFeatured: true,
    favorite: false,
    description:
      "Discover the rich flavors of Indonesian and international cuisine. Join food lovers and top chefs for a culinary journey through Bali's finest dishes.",
    section: "upcoming",
    ticketTypes: [
      {
        id: "pre-sale-1",
        name: "Pre Sale I",
        price: 25.0,
        fee: 0.15,
        available: 0,
        status: "sold-out",
      },
      {
        id: "pre-sale-2",
        name: "Pre Sale II",
        price: 50.0,
        fee: 0.15,
        available: 542,
        status: "available",
      },
      {
        id: "normal",
        name: "Normal Ticket",
        price: 125.0,
        fee: 0.15,
        available: 1000,
        status: "available",
      },
    ],
  },
  {
    id: "2",
    title: "WJNC #9 : Gathering",
    price: { min: 9.95, max: 15.95 },
    location: "Yogyakarta",
    date: { year: 2025, month: "Oct", day: 7 },
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    category: "festival",
    isFeatured: true,
    favorite: true,
    description:
      "Discover the rich flavors of Indonesian and international cuisine. Join food lovers and top chefs for a culinary journey through Bali's finest dishes.",
    section: "upcoming",
    ticketTypes: [
      {
        id: "pre-sale-1",
        name: "Pre Sale I",
        price: 25.0,
        fee: 0.15,
        available: 0,
        status: "sold-out",
      },
      {
        id: "pre-sale-2",
        name: "Pre Sale II",
        price: 50.0,
        fee: 0.15,
        available: 542,
        status: "available",
      },
      {
        id: "normal",
        name: "Normal Ticket",
        price: 125.0,
        fee: 0.15,
        available: 1000,
        status: "available",
      },
    ],
  },
  {
    id: "3",
    title: "Jakarta Jazz Festival",
    price: { min: 50.0, max: 200.0 },
    location: "Jakarta",
    date: { year: 2025, month: "Jun", day: 15 },
    image:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
    category: "music",
    isFeatured: true,
    favorite: false,
    description:
      "Discover the rich flavors of Indonesian and international cuisine. Join food lovers and top chefs for a culinary journey through Bali's finest dishes.",
    section: "upcoming",
    ticketTypes: [
      {
        id: "pre-sale-1",
        name: "Pre Sale I",
        price: 25.0,
        fee: 0.15,
        available: 0,
        status: "sold-out",
      },
      {
        id: "pre-sale-2",
        name: "Pre Sale II",
        price: 50.0,
        fee: 0.15,
        available: 542,
        status: "available",
      },
      {
        id: "normal",
        name: "Normal Ticket",
        price: 125.0,
        fee: 0.15,
        available: 1000,
        status: "available",
      },
    ],
  },
  {
    id: "7",
    title: "Tech Conference Indonesia",
    price: { min: 75.0, max: 250.0 },
    location: "Bali",
    date: { year: 2025, month: "Aug", day: 22 },
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    category: "conference",
    isFeatured: false,
    favorite: true,
    description:
      "Discover the rich flavors of Indonesian and international cuisine. Join food lovers and top chefs for a culinary journey through Bali's finest dishes.",
    section: "upcoming",
    ticketTypes: [
      {
        id: "pre-sale-1",
        name: "Pre Sale I",
        price: 25.0,
        fee: 0.15,
        available: 0,
        status: "sold-out",
      },
      {
        id: "pre-sale-2",
        name: "Pre Sale II",
        price: 50.0,
        fee: 0.15,
        available: 542,
        status: "available",
      },
      {
        id: "normal",
        name: "Normal Ticket",
        price: 125.0,
        fee: 0.15,
        available: 1000,
        status: "available",
      },
    ],
  },
  {
    id: "8",
    title: "Bali Food Festival",
    price: { min: 15.0, max: 45.0 },
    location: "Bali",
    date: { year: 2025, month: "Sep", day: 10 },
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    category: "festival",
    isFeatured: false,
    favorite: false,
    description:
      "Discover the rich flavors of Indonesian and international cuisine. Join food lovers and top chefs for a culinary journey through Bali's finest dishes.",
    section: "upcoming",
    ticketTypes: [
      {
        id: "pre-sale-1",
        name: "Pre Sale I",
        price: 25.0,
        fee: 0.15,
        available: 0,
        status: "sold-out",
      },
      {
        id: "pre-sale-2",
        name: "Pre Sale II",
        price: 50.0,
        fee: 0.15,
        available: 542,
        status: "available",
      },
      {
        id: "normal",
        name: "Normal Ticket",
        price: 125.0,
        fee: 0.15,
        available: 1000,
        status: "available",
      },
    ],
  },
];

export interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "all",
    icon: Rows3,
  },
  {
    id: "2",
    name: "music",
    icon: Music,
  },
  {
    id: "3",
    name: "festival",
    icon: Sparkle,
  },
  {
    id: "4",
    name: "Sport",
    icon: Volleyball,
  },
  {
    id: "5",
    name: "Arts and Culture",
    icon: LineSquiggle,
  },
];

export interface LocationData {
  id: string;
  city: string;
  region: string;
  country: string;
  full: string;
}

export const popularLocations: LocationData[] = [
  {
    id: "1",
    city: "Lagos",
    region: "Lagos",
    country: "Nigeria",
    full: "Lagos, Lagos",
  },
  {
    id: "2",
    city: "Abuja",
    region: "FCT",
    country: "Nigeria",
    full: "Abuja, FCT",
  },
  {
    id: "3",
    city: "Port Harcourt",
    region: "Rivers",
    country: "Nigeria",
    full: "Port Harcourt, Rivers",
  },
  {
    id: "4",
    city: "Kano",
    region: "Kano",
    country: "Nigeria",
    full: "Kano, Kano",
  },
  {
    id: "5",
    city: "Ibadan",
    region: "Oyo",
    country: "Nigeria",
    full: "Ibadan, Oyo",
  },
  {
    id: "6",
    city: "Benin City",
    region: "Edo",
    country: "Nigeria",
    full: "Benin City, Edo",
  },
  {
    id: "7",
    city: "Kaduna",
    region: "Kaduna",
    country: "Nigeria",
    full: "Kaduna, Kaduna",
  },
  {
    id: "8",
    city: "Enugu",
    region: "Enugu",
    country: "Nigeria",
    full: "Enugu, Enugu",
  },
  {
    id: "9",
    city: "Calabar",
    region: "Cross River",
    country: "Nigeria",
    full: "Calabar, Cross River",
  },
  {
    id: "10",
    city: "Jos",
    region: "Plateau",
    country: "Nigeria",
    full: "Jos, Plateau",
  },
  {
    id: "11",
    city: "Ilorin",
    region: "Kwara",
    country: "Nigeria",
    full: "Ilorin, Kwara",
  },
  {
    id: "12",
    city: "Akure",
    region: "Ondo",
    country: "Nigeria",
    full: "Akure, Ondo",
  },
  {
    id: "13",
    city: "Owerri",
    region: "Imo",
    country: "Nigeria",
    full: "Owerri, Imo",
  },
  {
    id: "14",
    city: "Warri",
    region: "Delta",
    country: "Nigeria",
    full: "Warri, Delta",
  },
  {
    id: "15",
    city: "Abeokuta",
    region: "Ogun",
    country: "Nigeria",
    full: "Abeokuta, Ogun",
  },
];

export const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Event Booked Successfully",
    message:
      "Your booking for 'Tech Conference 2024' has been confirmed. Check your email for the ticket.",
    date: new Date(),
    read: false,
  },
  {
    id: "2",
    title: "Payment Received",
    message:
      "We've received your payment of $150 for the upcoming workshop. Thank you!",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
  },
  {
    id: "3",
    title: "Event Reminder",
    message:
      "Don't forget! Your event 'Web Design Masterclass' starts tomorrow at 10:00 AM.",
    date: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    read: true,
  },
  {
    id: "4",
    title: "New Message from Organizer",
    message:
      "The event organizer has sent you an important update about the venue location.",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
  },
  {
    id: "5",
    title: "Event Cancelled",
    message:
      "Unfortunately, 'Marketing Summit' has been cancelled. You'll receive a full refund within 5-7 business days.",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true,
  },
  {
    id: "6",
    title: "Ticket Available",
    message:
      "Good news! A ticket just became available for 'JavaScript Advanced Workshop'. Book now!",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: false,
  },
  {
    id: "7",
    title: "Rating Request",
    message:
      "How was your experience at 'UX Design Conference'? We'd love to hear your feedback.",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    read: true,
  },
];

export const PAYMENT_METHODS: PaymentMethodType[] = [
  {
    id: "1",
    type: "google-pay",
    name: "Google Pay",
    email: "p*************n@gmail.com",
    balance: 1234.0,
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg",
  },
  {
    id: "2",
    type: "apple-pay",
    name: "Apple Pay",
    email: "r*************n@gmail.com",
    balance: 2766.0,
    icon: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg",
  },
  {
    id: "3",
    type: "visa",
    name: "Visa",
    cardNumber: "**** **** **** 1234",
    balance: 1876766.0,
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg",
  },
  {
    id: "4",
    type: "mastercard",
    name: "Master Card",
    cardNumber: "**** **** **** 1234",
    balance: 221828.21,
    icon: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
  },
];
