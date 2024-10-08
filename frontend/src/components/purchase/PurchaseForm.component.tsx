"use client";
import React from "react";
import { useForm } from "react-hook-form";
import PurchaseItem from "./PurchaseItem.component"; // Import your product component
import { zodResolver } from "@hookform/resolvers/zod";
import { purchaseSchema } from "@/schemas/purchase.schema";
import { z } from "zod";
import {
  IPurchase,
  ITicket,
  ITicketPurchase,
} from "@/interfaces/event.interface";
import { api } from "@/config/axios.config";
import { useSession } from "next-auth/react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { User } from "next-auth";
const MySwal = withReactContent(Swal);

export default function PurchaseFormComponent() {
  const { data: session } = useSession();
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    if (session?.user) setUser(session?.user);
  }, [session]);

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

  const form = useForm<z.infer<typeof purchaseSchema>>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: { items: [{ quantity: 0 }] },
  });
  const { register, handleSubmit, watch } = form;

  const onSubmit = async (values: z.infer<typeof purchaseSchema>) => {
    // Handle form submission (e.g., send data to server)
    console.log(values);
    const data = tickets.map((ticket) => {
      // const item = { ...ticket, quantity: values[itme] };
      // return item;
      return ticket;
    });
    await api
      .patch("/purchase", data, {
        headers: {
          Authorization: `Bearer ${
            user ? user.access_token : session?.user.access_token
          }`,
        },
      })
      .then((response) => {
        Toast.fire({
          icon: "success",
          title: "Checkout success",
        });
      })
      .catch((error) => {
        console.log(error.message);
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      });
  };

  React.useEffect(() => {
    async function fetchData() {
      await api
        .get("/purchase", {
          headers: {
            Authorization: `Bearer ${
              user ? user.access_token : session?.user.access_token
            }`,
          },
        })
        .then((response) => {
          console.log(response.data.data.map((x: any) => x.tickets).tickets);
          setTickets((response.data.data as IPurchase[])[0].tickets);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    if (user) {
      const timer = setTimeout(() => fetchData(), 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [user]);

  return (
    <div className="container mx-auto max-w-screen-xl">
      <h1 className="text-2xl font-bold mb-4 ">Shopping Cart</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          {tickets
            ? tickets.map((item: ITicketPurchase, index) => (
                <PurchaseItem
                  key={item.id}
                  item={item}
                  index={index}
                  register={register}
                />
              ))
            : "Loading..."}
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
