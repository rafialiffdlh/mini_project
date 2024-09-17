import PurchaseFormComponent from "@/components/purchase/PurchaseForm.component";
import React from "react";

type Props = {};

const cartItems = [
  { id: 1, name: "Product 1", price: 10, quantity: 2 },
  { id: 2, name: "Product 2", price: 20, quantity: 1 },
];

export default function PurchasePage({}: Props) {
  return (
    <div className="py-2 px-2">
      <div className="mx-auto max-w-screen-xl">
        <PurchaseFormComponent />
      </div>
    </div>
  );
}
