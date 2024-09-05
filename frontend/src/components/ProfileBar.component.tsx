import { auth } from "@/auth";
import React from "react";

type Props = {};

export default async function ProfileBarComponent({}: Props) {
  const session = await auth();
  console.log(session?.user.access_token);

  return <div>{session?.user.name}</div>;
}
