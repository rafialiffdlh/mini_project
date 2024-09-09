"use client";
import React from "react";
import { SessionContextValue } from "next-auth/react";
import { actionLogout } from "@/actions/auth.action";
import { FaShoppingCart } from "react-icons/fa";

type Props = { session: SessionContextValue | null };

export default function ProfileBarComponent({ session }: Props) {
  const logout = async () => {
    await actionLogout().then(() => {
      alert("Logout Success");
    });
  };

  return (
    <div className="grid grid-cols-2 items-center">
      <div className="flex justify-center">
        <button
          title="Cart"
          type="button"
          className="text-3xl text-white hover:text-gray-400"
        >
          <FaShoppingCart />
        </button>
      </div>

      <div className="text-right">
        {session && (
          <div className="flex flex-col items-end">
            <span className="text-white px-2 text-sm mb-1">
              Hi, {session.data?.user.name}
            </span>
            <button
              type="button"
              className="btn btn-success text-xs py-1 px-2"
              onClick={() => logout()}
            >
              LogOut
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
