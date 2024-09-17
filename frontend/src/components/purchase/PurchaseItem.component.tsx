"use client";
import { avatar_src } from "@/config/image.config";
import { ITicketPurchase } from "@/interfaces/event.interface";
import React from "react";

interface ProductProps {
  item: ITicketPurchase;
  register: any;
}

const PurchaseItem = ({ item, register }: ProductProps) => {
  return (
    <li className="flex justify-between items-center mb-2">
      <div className="flex items-center">
        <img
          src={
            item.ticket_type.event_venue
              ? avatar_src + item.ticket_type.event_venue?.events.image_src
              : ""
          }
          alt={item.ticket_type.name}
          className="w-20 h-20 mr-4"
        />
        <div className="flex flex-col mr-2 ">
          <p className="text-lg font-medium">{item.ticket_type.name}</p>
          <p className="text-black">Rp{item.price}</p>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          min="1"
          defaultValue={item.quantity}
          {...register(`items.${item.id}.quantity`)}
          className="w-12 border p-2"
        />
        {/* <button className=" text-black px-2 py-1 rounded">Remove</button> */}
      </div>
    </li>
  );
};

export default PurchaseItem;
