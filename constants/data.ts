import {
  LineSquiggle,
  Music,
  Rows3,
  Sparkle,
  Volleyball,
} from "lucide-react-native";

export interface Event {
  id: string;
  title: string;
  price: {
    min: number;
    max: number;
  };
  location: string;
  date: {
    month: string;
    day: number;
  };
  image: string; 
  category: "Music" | "Festival" | "Sports" | "Conference";
  isFeatured?: boolean;
}

export const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Synchronize Fest 2024',
    price: { min: 25.0, max: 125.0 },
    location: 'Yogyakarta',
    date: { month: 'May', day: 20 },
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    category: 'Music',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'WJNC #9 : Gathering',
    price: { min: 9.95, max: 15.95 },
    location: 'Yogyakarta',
    date: { month: 'Oct', day: 7 },
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    category: 'Festival',
  },
  {
    id: '3',
    title: 'Jakarta Jazz Festival',
    price: { min: 50.0, max: 200.0 },
    location: 'Jakarta',
    date: { month: 'Jun', day: 15 },
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80',
    category: 'Music',
  },
];

export const popularEvents: Event[] = [
  {
    id: '4',
    title: 'BMTH Tour 2024',
    price: { min: 60.0, max: 300.0 },
    location: 'Mandala Krida, Yogyakarta',
    date: { month: 'Aug', day: 12 },
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    category: 'Music',
  },
  {
    id: '5',
    title: 'Moshing Metal Fest 2024',
    price: { min: 15.0, max: 30.0 },
    location: 'Sleman, Yogyakarta',
    date: { month: 'Sep', day: 5 },
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
    category: 'Music',
  },
  {
    id: '6',
    title: 'Bali Food Festival',
    price: { min: 10.0, max: 25.0 },
    location: 'Seminyak, Bali',
    date: { month: 'Jul', day: 22 },
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    category: 'Festival',
  },
];

export const categories = [
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
  { id: '1', city: 'Lagos', region: 'Lagos', country: 'Nigeria', full: 'Lagos, Lagos' },
  { id: '2', city: 'Abuja', region: 'FCT', country: 'Nigeria', full: 'Abuja, FCT' },
  { id: '3', city: 'Port Harcourt', region: 'Rivers', country: 'Nigeria', full: 'Port Harcourt, Rivers' },
  { id: '4', city: 'Kano', region: 'Kano', country: 'Nigeria', full: 'Kano, Kano' },
  { id: '5', city: 'Ibadan', region: 'Oyo', country: 'Nigeria', full: 'Ibadan, Oyo' },
  { id: '6', city: 'Benin City', region: 'Edo', country: 'Nigeria', full: 'Benin City, Edo' },
  { id: '7', city: 'Kaduna', region: 'Kaduna', country: 'Nigeria', full: 'Kaduna, Kaduna' },
  { id: '8', city: 'Enugu', region: 'Enugu', country: 'Nigeria', full: 'Enugu, Enugu' },
  { id: '9', city: 'Calabar', region: 'Cross River', country: 'Nigeria', full: 'Calabar, Cross River' },
  { id: '10', city: 'Jos', region: 'Plateau', country: 'Nigeria', full: 'Jos, Plateau' },
  { id: '11', city: 'Ilorin', region: 'Kwara', country: 'Nigeria', full: 'Ilorin, Kwara' },
  { id: '12', city: 'Akure', region: 'Ondo', country: 'Nigeria', full: 'Akure, Ondo' },
  { id: '13', city: 'Owerri', region: 'Imo', country: 'Nigeria', full: 'Owerri, Imo' },
  { id: '14', city: 'Warri', region: 'Delta', country: 'Nigeria', full: 'Warri, Delta' },
  { id: '15', city: 'Abeokuta', region: 'Ogun', country: 'Nigeria', full: 'Abeokuta, Ogun' },
];