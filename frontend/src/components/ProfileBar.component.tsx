"use client";
import { auth } from "@/auth";
import React from "react";
import { useSession } from "next-auth/react";
type Props = {};

export default function ProfileBarComponent({}: Props) {
  const session = useSession();
  console.log(session?.data?.user.access_token);

  return <div>{session?.data?.user.name}</div>;
}
