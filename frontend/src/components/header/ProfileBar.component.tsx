"use client";
import React, { useState, useEffect } from "react";
import { SessionContextValue } from "next-auth/react";
import { actionLogout } from "@/actions/auth.action";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type Props = { session: SessionContextValue | null };

export default function ProfileBarComponent({ session }: Props) {
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);
  const [isLogoutError, setIsLogoutError] = useState(false);

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

  const logout = async () => {
    try {
      await actionLogout();
      setIsLogoutSuccess(true);
      Toast.fire({
        icon: "success",
        title: "Logout Berhasil",
      });
    } catch (error) {
      setIsLogoutError(true);
      Toast.fire({
        icon: "error",
        title: "Error, Logout Gagal",
      });
    }
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
