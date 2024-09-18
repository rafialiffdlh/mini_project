declare module "next-auth" {
  interface User {
    id: number | undefined;
    phone_number: string | undefined;
    birthDate: string | undefined;
    gender: "pria" | "wanita" | undefined;
    email: string | undefined;
    name: string | undefined;
    image: string | undefined;
    image_src?: string | undefined;
    user_role?: string | undefined;
    access_token?: string | undefined;
  }
  interface Session {
    user: User;
  }
}

import { JWT } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    id: number | undefined;
    phone_number: string | undefined;
    email: string | undefined;
    name: string | undefined;
    //   gender: 'Pria' | 'Perempuan' | undefined;
    image?: string;
    role: "user" | "organizer" | undefined;
    access_token?: string;
  }
}
