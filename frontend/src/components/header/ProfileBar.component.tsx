"use client";
import React, { useState, useEffect } from "react";
import { SessionContextValue } from "next-auth/react";
import { actionLogout } from "@/actions/auth.action";
import { FaShoppingCart, FaSignOutAlt, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Link from "next/link";

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
        <Link href="/purchases" title="Cart" className="p-3">
          <button
            title="CartButton"
            type="button"
            className="text-3xl text-white hover:text-gray-400"
          >
            <FaShoppingCart />
          </button>
        </Link>
      </div>

      <div className="text-right">
        {session && (
          <div>
            <div className="flex flex-row items-end text-right">
              <Link href="/profile" title="Profile" className="p-3">
                {session.data?.user.image ? (
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img title="avatar" src={session.data?.user.image} />
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-200 p-3 rounded-full">
                    <FaUser className="text-gray-500 hover:text-gray-700" />
                  </div>
                )}
              </Link>
              <button
                type="button"
                title="Logout"
                className="bg-gray-200 p-3 rounded-full"
                onClick={() => logout()}
              >
                <FaSignOutAlt className="text-red-700 hover:text-red-900" />
              </button>
            </div>
            <div className="text-right">
              <label className="swap">
                <input type="checkbox" />
                <div className="swap-on">
                  {" "}
                  <span className=" text-white px-2 text-sm mb-1 ">
                    Hi, {session.data?.user.name}
                  </span>{" "}
                </div>
                <div className="swap-off">
                  {" "}
                  <span className=" text-white px-2 text-sm mb-1 truncate">
                    Hi, {session.data?.user.name}
                  </span>{" "}
                </div>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
