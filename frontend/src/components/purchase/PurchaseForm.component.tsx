"use client";
import React from "react";
import { useForm } from "react-hook-form";
import PurchaseItem from "./PurchaseItem.component"; // Import your product component
import { zodResolver } from "@hookform/resolvers/zod";
import { purchaseSchema } from "@/schemas/purchase.schema";
import { z } from "zod";
import { ITicketPurchase } from "@/interfaces/event.interface";
import { api } from "@/config/axios.config";

type Props = {
  data?: ITicketPurchase[];
};

export default function PurchaseFormComponent({ data }: Props) {
  const [tickets, setTickets] = React.useState<ITicketPurchase[]>([]);
  React.useEffect(() => {
    async function fetchData() {}
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof purchaseSchema>["items"][number]>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {},
  });
  const { register, handleSubmit, watch } = form;

  const onSubmit = async (
    values: z.infer<typeof purchaseSchema>["items"][number]
  ) => {
    // Handle form submission (e.g., send data to server)
    console.log(values);
    const data = tickets.map((ticket) => {
      const item = { ...ticket, quantity: values.quantity };
      return item;
    });
    await api.post("/purchase", data);
  };

  const cartItems =
    data && data.length > 0
      ? data
      : [
          {
            id: 1,
            name: "Product 1",
            price: 10,
            quantity: 2,
            image: "",
            description: "Product 1 Description",
          },
          {
            id: 2,
            name: "Product 2",
            price: 20,
            quantity: 1,
            image: "",
            description: "Product 2 Description",
          },
        ];

  return (
    <div className="container mx-auto max-w-screen-xl">
      <h1 className="text-2xl font-bold mb-4 ">Shopping Cart</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          {cartItems.map((item: ITicketPurchase) => (
            <PurchaseItem key={item.id} item={item} register={register} />
          ))}
        </ul>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        </div>
      </form>
    </div>
  );
}
