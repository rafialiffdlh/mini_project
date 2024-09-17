import { User } from "./user.interface";

interface IEvent {
  id: number;
  events: IEventItem;
  venues: IVenueItem;
  ticket_type: ITicket[];
}
interface IEventItem {
  id: number;
  description: string;
  title: string;
  event_date: Date;
  end_date: Date;
  image_src: string;
  category: ICategoryItem;
  start_time: number;
  end_time: number;
  user: User;
  default_discount?: number;
  default_discount_date?: Date;
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
  _id?: string;
  name: string;
  description: string;
  maxNumber: number;
  price: number;
  action?: "update" | "create" | "delete";
}
interface ITicketPurchase {
  id?: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  image?: string;
}

export type {
  ITicket,
  ITicketPurchase,
  IVenueItem,
  IEventItem,
  IEvent,
  ICategoryItem,
};
