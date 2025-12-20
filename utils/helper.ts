import { Event } from "@/constants/data";

export const isEvent = (event: Event) => {
  const eventDate = new Date(
    event.date.year,
    parseInt(event.date.month),
    event.date.day
  );

  return eventDate < new Date();
};
