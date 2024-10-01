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
  rest?: number;
  price: number;
  event_venue?: IEvent;
  action?: "update" | "create" | "delete";
}
interface ITicketPurchase {
  id?: number;
  purchase_id: number;
  ticket_type: ITicket;
  quantity: number;
}

interface IPurchase {
  id?: number;
  user_id: number;
  total_price: number;
  isPurchased: boolean;
  tickets: ITicketPurchase[];
}

export type {
  ITicket,
  ITicketPurchase,
  IPurchase,
  IVenueItem,
  IEventItem,
  IEvent,
  ICategoryItem,
};
