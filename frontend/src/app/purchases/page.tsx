import PurchaseFormComponent from "@/components/purchase/PurchaseForm.component";
import React from "react";

type Props = {};

export default function PurchasePage({}: Props) {
  return (
    <div className="py-2 px-2">
      <div className="mx-auto max-w-screen-xl">
        <PurchaseFormComponent />
      </div>
    </div>
  );
}
