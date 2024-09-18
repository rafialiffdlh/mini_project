"use client";
import { actionUpdateProfile } from "@/actions/auth.action";
import { api } from "@/config/axios.config";
import { avatar_src } from "@/config/image.config";
import { User } from "next-auth";
import { profileSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { Form, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { z } from "zod";
const MySwal = withReactContent(Swal);

export default function ProfileComponent() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  React.useEffect(() => {
    if (session?.user) setUser(session?.user);
  }, [session]);
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

  React.useEffect(() => {
    async function fetchData() {
      const response = await api.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${session?.user.access_token}`,
        },
      });
      setUser(response.data.data as User);
    }
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name!,
      birthDate: user?.birthDate!,
      gender: user?.gender!,
      image_src: user?.image_src!,
      password: undefined,
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = form;
  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    const form = new FormData();
    form.append("name", values.name);
    form.append("birthDate", values.birthDate);
    form.append("gender", values.gender);
    form.append("image_src", values.image_src);
    form.append("password", values.password?.length ? values.password : "");
    console.log(Form);
    await actionUpdateProfile(form)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "Profil diperbarui",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.message,
        });
      });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      form.setValue("image_src", file);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-screen-xl">
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-center">
            <img
              src={
                watch("image_src") instanceof File
                  ? URL.createObjectURL(watch("image_src"))
                  : watch("image_src")
                  ? avatar_src + user?.image_src
                  : ""
              }
              alt="Profile Picture"
              className="w-24 h-24 rounded-full"
              onClick={() => ref.current?.click()}
            />
            <input
              type="file"
              {...register("image_src")}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              ref={ref}
            />
            <label
              htmlFor="profilePicture"
              className="cursor-pointer text-blue-500"
              onClick={(e) => ref.current?.click()}
            >
              Upload
            </label>
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="border p-2"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="birthDate" className="text-gray-700">
              Tanggal Lahir:
            </label>

            <input
              type="text"
              id="birthDate"
              placeholder="YYYY-MM-DD"
              {...register("birthDate", { required: "Birth Date is required" })}
              className="border p-2"
            />
            {errors.birthDate && (
              <p className="text-red-500">{errors.birthDate.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="gender" className="text-gray-700">
              Gender:
            </label>
            <select
              id="gender"
              {...register("gender", { required: "gender is required" })}
              className="border p-2"
            >
              <option value={""} disabled>
                Pilih:
              </option>
              <option value={"pria"}>Pria</option>
              <option value={"wanita"}>Wanita</option>
              {errors.gender && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700">
              Password:
            </label>
            <input
              type="text"
              id="name"
              {...register("password")}
              className="border p-2"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-700 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
