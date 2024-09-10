"use client";
import { actionRegister } from "@/actions/auth.action";
import { registerSchema } from "@/schemas/auth.schema";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

enum RoleEnum {
  User,
  Organizer,
}

const SignUp: React.FC = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const [termCheck, setTermCheck] = React.useState(false);

  const handleTermCheck = (checked: boolean) => {
    setTermCheck(checked);
  };

  const router = useRouter();

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

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const res = await actionRegister(values);
      form.reset();
      router.push("/sign-in");

      Toast.fire({
        icon: "success",
        title: "Register Berhasil",
      });
    } catch (err) {
      if (err instanceof Error) {
        Toast.fire({
          icon: "error",
          title: `Registration failed: ${err.message}`,
        });
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 p-4 md:p-8">
      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Create an Account
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Already have an account?{" "}
          <a href="/sign-in" className="text-blue-400 underline">
            Log in
          </a>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <select
              className="w-full p-2 bg-gray-700 text-white rounded-md"
              required
              defaultValue={""}
              {...register("role")}
            >
              <option disabled value={""}>
                Select a role
              </option>
              {(Object.keys(RoleEnum) as Array<keyof typeof RoleEnum>).map(
                (role) =>
                  !Number.isInteger(Number(role)) ? (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ) : null
              )}
            </select>
            <div className="text-red-500 text-sm mt-1">
              <ErrorMessage errors={errors} name="role" />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                className="w-full p-2 bg-gray-700 text-white rounded-md"
                type="text"
                placeholder="Full Name"
                {...register("name")}
              />
              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage errors={errors} name="name" />
              </div>
            </div>
            <div>
              <input
                className="w-full p-2 bg-gray-700 text-white rounded-md"
                type="text"
                placeholder="Phone Number"
                {...register("phone_number")}
              />
              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage errors={errors} name="phone_number" />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <input
              className="w-full p-2 bg-gray-700 text-white rounded-md"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            <div className="text-red-500 text-sm mt-1">
              <ErrorMessage errors={errors} name="email" />
            </div>
          </div>

          <div className="mb-4">
            <input
              className="w-full p-2 bg-gray-700 text-white rounded-md"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <div className="text-red-500 text-sm mt-1">
              <ErrorMessage errors={errors} name="password" />
            </div>
          </div>

          <div className="mb-4">
            <input
              className="w-full p-2 bg-gray-700 text-white rounded-md"
              type="password"
              placeholder="Confirm Password"
              {...register("confirm_password")}
            />
            <div className="text-red-500 text-sm mt-1">
              <ErrorMessage errors={errors} name="confirm_password" />
            </div>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              onChange={(e) => handleTermCheck(e.target.checked)}
            />
            <label htmlFor="terms" className="text-gray-400 text-sm">
              I agree to the{" "}
              <a href="#" className="text-blue-400 underline">
                Terms & Conditions
              </a>
            </label>
          </div>

          <button
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:bg-slate-600 disabled:text-gray-300 disabled:cursor-not-allowed"
            type="submit"
            disabled={form.formState.isSubmitting || !termCheck}
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-blue-400 underline text-sm hover:text-blue-300"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
