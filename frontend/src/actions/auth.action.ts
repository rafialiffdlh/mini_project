"use server";
import { api } from "@/config/axios.config";
import { loginSchema, registerSchema } from "@/schemas/auth.schema";
import { z } from "zod";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { AxiosError } from "axios";
export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", {
      ...values,
      redirectTo: "/",
    });
    return {
      message: "Login Berhasil",
    };
  } catch (error) {
    throw error;
  }
};

export const actionLogout = async () => {
  return await signOut({ redirect: false });
};

export const actionRegister = async (
  values: z.infer<typeof registerSchema>
) => {
  try {
    const res = await api.post("/auth/register", values);

    return {
      message: "Register Berhasil",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Register Gagal");
  }
};

export const actionLogOut = async () => {
  try {
    return await signOut({ redirect: false, redirectTo: "/sign-in" });
    // return {
    //   message: "Logout Berhasil",
    // };
  } catch (error) {
    return {
      message: "Logout Gagal",
    };
  }
};

export async function googleAuthenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("google");
  } catch (error) {
    if (error instanceof AuthError) {
      return "Google Log In failed";
    }
    throw error;
  }
}
