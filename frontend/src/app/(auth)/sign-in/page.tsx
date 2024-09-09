"use client";
import { googleAuthenticate, loginAction } from "@/actions/auth.action";
import { loginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ErrorMessage } from "@hookform/error-message";

const SignIn: React.FC = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });

  const [termCheck, setTermCheck] = React.useState(false);
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    await loginAction(values)
      .then((res) => {
        console.log(res);
        alert(res.message);
        router.push("/");
      })
      .catch((err) => {
        if (err instanceof Error) {
          console.error(err);
          alert(err.message);
        }
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 px-6">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Login to your account
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Don&apos;t have an account yet?{" "}
          <a href="/sign-up" className="text-blue-400 underline">
            Register
          </a>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Phone Number:</label>
            <input
              className="w-full p-2 bg-gray-700 text-white rounded-md"
              type="text"
              placeholder="Phone Number"
              {...register("phone_number")}
            />
            <div className="text-red-500 text-sm mt-1">
              <ErrorMessage errors={errors} name={"phone_number"} />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Password:</label>
            <input
              className="w-full p-2 bg-gray-700 text-white rounded-md"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <div className="text-red-500 text-sm mt-1">
              <ErrorMessage errors={errors} name={"password"} />
            </div>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              onChange={(e) => setTermCheck(e.target.checked)}
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
            Login
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

export default SignIn;
