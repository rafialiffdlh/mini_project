"use client";
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
          src={item.image ?? ""}
          alt={item.name}
          className="w-20 h-20 mr-4"
        />
        <div>
          <p className="text-lg font-medium">{item.name}</p>
          <p className="text-gray-500">Rp{item.price}</p>
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
        <button className="bg-gray-200 text-gray-500 px-2 py-1 rounded">
          Remove
        </button>
      </div>
    </li>
  );
};

export default PurchaseItem;
