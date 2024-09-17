"use client";
import React from "react";
import { useForm } from "react-hook-form";
import PurchaseItem from "./PurchaseItem.component"; // Import your product component
import { zodResolver } from "@hookform/resolvers/zod";
import { purchaseSchema } from "@/schemas/purchase.schema";
import { z } from "zod";
import { ITicketPurchase } from "@/interfaces/event.interface";
import { api } from "@/config/axios.config";
import { useSession } from "next-auth/react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);

export default function PurchaseFormComponent() {
  const session = useSession();
  const Toast = MySwal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const [tickets, setTickets] = React.useState<ITicketPurchase[]>([]);

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
    await api.patch("/purchase", data, {
      headers: {
        Authorization: `Bearer ${session?.data?.user.access_token}`,
      },
    });
  };

  React.useEffect(() => {
    async function fetchData() {
      const token = session?.data?.user.access_token;

      console.log("start purchase api:" + token);
      const response = await api.get("/purchase", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      setTickets(response.data.data as ITicketPurchase[]);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto max-w-screen-xl">
      <h1 className="text-2xl font-bold mb-4 ">Shopping Cart</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          {tickets.map((item: ITicketPurchase) => (
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
