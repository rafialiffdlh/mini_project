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
      name: user?.name,
      gender: user?.gender,
      image: user?.image,
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
    form.append("full_name", values.name);
    form.append("gender", values.gender);
    form.append("image", values.image);
    console.log(Form);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      form.setValue("image", file);
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
                watch("image") instanceof File
                  ? URL.createObjectURL(watch("image"))
                  : watch("image")
                  ? avatar_src + user?.image
                  : ""
              }
              alt="Profile Picture"
              className="w-24 h-24 rounded-full"
            />
            <input
              type="file"
              {...register("image")}
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
          {/* ... other form fields */}
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
