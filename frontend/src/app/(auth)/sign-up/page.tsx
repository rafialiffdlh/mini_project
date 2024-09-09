"use client";
import { actionRegister } from "@/actions/auth.action";
import { registerSchema } from "@/schemas/auth.schema";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";

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

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    actionRegister(values)
      .then((res) => {
        alert(res.message);
        form.reset();
        router.push("/sign-in");
        // toast.success(res.message);
      })
      .catch((err) => {
        alert(err.message);
        // toast.error(err.message);
      });
  };

  return (
    // <Form {...form}>
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 p-4 md:p-8">
      <div className="md:w-1/2 flex flex-col justify-center items-center p-6 md:p-8 bg-gray-800 rounded-lg relative bg-cover bg-center">
        <div className="absolute inset-0 bg-gray-800 opacity-80 md:hidden rounded-lg"></div>
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6 relative">
          Create an account
        </h2>
        <p className="text-gray-400 mb-4 text-sm md:text-base relative">
          Already have an account?{" "}
          <a href="/sign-in" className="text-blue-400">
            Log in
          </a>
        </p>
        <form
          className="w-full max-w-xs md:max-w-sm relative"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 flex">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">
                  Saya ingin mendaftar sebagai:
                </span>
              </div>
              <select
                className="select select-bordered"
                required
                defaultValue={""}
                {...register("role")}
              >
                <option disabled value={""}>
                  Pilih salah satu:
                </option>
                {(Object.keys(RoleEnum) as Array<keyof typeof RoleEnum>).map(
                  (role) =>
                    !Number.isInteger(Number(role)) ? (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ) : (
                      ""
                    )
                )}
              </select>
            </label>
            <div className="text-red-500 pt-[5px] min-h-[25px] text-[13px]">
              <ErrorMessage errors={errors} name={"role"} />
            </div>
          </div>
          <div className="mb-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <input
              className="bg-gray-700 text-white rounded-md px-4 py-2 w-full"
              type="text"
              placeholder="Full Name"
              {...register("name")}
            />
            <input
              className="bg-gray-700 text-white rounded-md px-4 py-2 w-full"
              type="text"
              placeholder="Phone Number"
              {...register("phone_number")}
            />
          </div>
          <div className="mb-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="text-red-500 pt-[5px] min-h-[25px] text-[13px]">
              <ErrorMessage errors={errors} name={"name"} />
            </div>
            <div className="text-red-500 pt-[5px] min-h-[25px] text-[13px]">
              <ErrorMessage errors={errors} name={"phone_number"} />
            </div>
          </div>
          <div className="mb-4">
            <input
              className="bg-gray-700 text-white rounded-md px-4 py-2 w-full"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            <div className="text-red-500 pt-[5px] min-h-[25px] text-[13px]">
              <ErrorMessage errors={errors} name={"email"} />
            </div>
          </div>
          <div className="mb-4 relative">
            <input
              className="bg-gray-700 text-white rounded-md px-4 py-2 w-full"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <div className="text-red-500 pt-[5px] min-h-[25px] text-[13px]">
              <ErrorMessage errors={errors} name={"password"} />
            </div>
          </div>
          <div className="mb-4 relative">
            <input
              className="bg-gray-700 text-white rounded-md px-4 py-2 w-full"
              type="password"
              placeholder="Confirm Password"
              {...register("confirm_password")}
            />
            <div className="text-red-500 pt-[5px] min-h-[25px] text-[13px]">
              <ErrorMessage errors={errors} name={"confirm_password"} />
            </div>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              onChange={(e) => handleTermCheck(e.target.checked)}
            />
            <label htmlFor="terms" className="text-gray-400 text-xs md:text-sm">
              I agree to the{" "}
              <a href="" className="text-blue-400">
                Terms & Conditions
              </a>
            </label>
          </div>
          <button
            className="bg-purple-600 text-white py-2 px-4 rounded-md w-full mb-4 disabled:bg-slate-600 disabled:text-gray-300 disabled:cursor-not-allowed"
            type="submit"
            disabled={form.formState.isSubmitting || !termCheck}
          >
            Create account
          </button>
        </form>
        <div className="flex flex-col justify-center md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full relative">
          <a
            href="/"
            className="text-blue-400 text-center py-2 px-4 w-full md:w-auto flex items-center justify-center"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
    // </Form>
  );
};

export default SignUp;
