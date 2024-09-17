"use client";
import { avatar_src } from "@/config/image.config";
import { User } from "@/interfaces/user.interface";
import { profileSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

export default function ProfileComponent() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name!,
      gender: user?.gender!,
      image_src: user?.image_src!,
      password: "",
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
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
