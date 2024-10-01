import { ticket_type } from "@prisma/client";

interface ITicketPurchase {
  ticket_type_id: number;
  quantity: number;
  id?: number;
}
interface ITicketType {
  id: number;
  event_venue_id: number;
  description: string | null;
  maxNumber: number;
  rest: number | null;
  price: number;
  paidTicket: boolean | null;
  name: string | null;
}
interface ITicketPurchaseModel {
  ticket_type: ITicketType;
  quantity: number;
  purchase_id: number;
  id?: number;
}

export { ITicketPurchase, ITicketPurchaseModel, ITicketType };
