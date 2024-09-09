"use client";
import { actionLogout } from "@/actions/auth.action";
import { UserRoles } from "@/interfaces/user.interface";
import { SessionContextValue } from "next-auth/react";
import Link from "next/link";
import React from "react";

type Props = { session: SessionContextValue | null };

export default function MobileProfileBarComponent({ session }: Props) {
  const logout = async () => {
    await actionLogout().then(() => {
      alert("Logout Success");
    });
  };
  return (
    <>
      <div className="text-center mb-2">
        <h3 className="text-lg font-semibold">
          {session ? session.data?.user.name : ""}
        </h3>
        <p className="text-sm text-gray-600">
          {session ? UserRoles[Number(session.data?.user.user_role)] : ""}
        </p>
      </div>
      <div className="mb-4 flex justify-between gap-2">
        <Link href="/profile" className="w-1/2">
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            Profile
          </button>
        </Link>
        <Link href="/sign-in" className="w-1/2">
          <button
            type="button"
            className="w-full border border-red-600 text-red-600 py-2 rounded-md"
            onClick={() => logout()}
          >
            Log Out
          </button>
        </Link>
      </div>
    </>
  );
}
