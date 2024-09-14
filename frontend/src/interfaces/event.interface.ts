import { User } from "./user.interface";

interface IEvent {
  id: number;
  events: IEventItem;
  venues: IVenueItem;
  tickets: ITicket[];
  users: User;
}
interface IEventItem {
  id: number;
  description: string;
  title: string;
  event_date: Date;
  image_src: string;
  category: ICategoryItem;
  duration: number;
}
interface IVenueItem {
  id?: number;
  location: { id?: number; fullName: string };
  name: string;
  address: string;
}
interface ICategoryItem {
  id?: number;
  name: string;
}

interface ITicket {
  id?: number;
  name: string;
  description: string;
  maxNumber: number;
  price: number;
  action?: "update" | "create" | "delete";
}

export type { ITicket, IVenueItem, IEventItem, IEvent, ICategoryItem };
