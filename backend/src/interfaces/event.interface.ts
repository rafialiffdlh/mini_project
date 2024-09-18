import { Decimal } from "@prisma/client/runtime/library";

interface ITicketModel {
  action?: "update" | "create" | "delete";
  description?: string;
  price?: Decimal;
  maxNumber?: number;
  paidTicket?: boolean;
  name?: string;
  id?: number;
  rest?: number;
}

interface ITicketQuery {
  createMany?: {
    data: ITicketModel[];
  };
  update?: {
    where: { id: number };
    data: ITicketModel;
  };
  delete?: {
    where: { id: { in: number[] } };
  };
}
export { ITicketModel, ITicketQuery };
