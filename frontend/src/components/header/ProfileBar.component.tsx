"use client";

import React from "react";
import { SessionContextValue } from "next-auth/react";
import { actionLogout } from "@/actions/auth.action";
type Props = { session: SessionContextValue | null };

export default function ProfileBarComponent({ session }: Props) {
  const logout = async () => {
    await actionLogout().then(() => {
      alert("Logout Success");
    });
  };

  return (
    <div>
      <div>
        <h2 className="text-white">
          Hi,{session ? session.data?.user.name : ""}
        </h2>
      </div>
      <button
        type="button"
        className="btn btn-success"
        onClick={() => logout()}
      >
        LogOut
      </button>
    </div>
  );
}
