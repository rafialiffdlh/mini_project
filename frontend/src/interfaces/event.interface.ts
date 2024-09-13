import { User } from "./user.interface";

interface Event {
  id: number;
  events: EventItem;
  venues: VenueItem;
  tickets: Ticket[];
  users: User;
}
interface EventItem {
  id: number;
  description: string;
  title: string;
  event_date: Date;
  image_src: string;
  category: { name: string };
  duration: number;
}
interface VenueItem {
  location: { fullName: string };
  name: string;
  address: string;
}

interface Ticket {
  price: number;
}

export type { Ticket, VenueItem, EventItem, Event };
