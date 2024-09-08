"use client";
import { googleAuthenticate, loginAction } from "@/actions/auth.action";
import { loginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { z } from "zod";
import { ErrorMessage } from "@hookform/error-message";

const SignIn: React.FC = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });

  const [termCheck, setTermCheck] = React.useState(false);

  const handleTermCheck = (checked: boolean) => {
    setTermCheck(checked);
  };

  const router = useRouter();
  const [errorMsgGoogle, dispatchGoogle] = useFormState(
    googleAuthenticate,
    undefined
  );
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
        // toast(res.message);
        router.push("/");
      })
      .catch((err) => {
        if (err instanceof Error) {
          console.log(err);
          // toast(err.message, {
          //   style: {
          //     background: "red",
          //     border: "none",
          //     color: "#fff",
          //   },
          // });
          alert(err.message);
        }
      });
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-gray-900 p-4 md:p-8">
        <div className="md:w-1/2 flex flex-col justify-center items-center p-6 md:p-8 bg-gray-800 rounded-lg relative bg-cover bg-center">
          <div className="absolute inset-0 bg-gray-800 opacity-80 md:hidden rounded-lg"></div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6 relative">
            Login account
          </h2>
          <p className="text-gray-400 mb-4 text-sm md:text-base relative">
            Don&apos;t have an account yet?{" "}
            <a href="/sign-up" className="text-blue-400">
              Register
            </a>
          </p>
          <form
            className="w-full max-w-xs md:max-w-sm relative"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <input
                className="bg-gray-700 text-white rounded-md px-4 py-2 w-full"
                type="text"
                placeholder="Email"
                disabled
              />
            </div>
            <div className="mb-4">
              <input
                className="bg-gray-700 text-white rounded-md px-4 py-2 w-full"
                type="text"
                placeholder="Phone Number"
                {...register("phone_number")}
              />
            </div>
            <div className="text-red-500 pt-[5px] min-h-[25px] text-[13px]">
              <ErrorMessage errors={errors} name={"phone_number"} />
            </div>
            <div className="mb-4 relative">
              <input
                className="bg-gray-700 text-white rounded-md px-4 py-2 w-full"
                type="password"
                placeholder="Password"
                {...register("password")}
              />
            </div>
            <div className="text-red-500 pt-[5px] min-h-[25px] text-[13px]">
              <ErrorMessage errors={errors} name={"password"} />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="mr-2"
                onChange={(e) => handleTermCheck(e.target.checked)}
              />
              <label
                htmlFor="terms"
                className="text-gray-400 text-xs md:text-sm"
              >
                I agree to the{" "}
                <a href="#" className="text-blue-400">
                  Terms & Conditions
                </a>
              </label>
            </div>
            <button
              className="bg-purple-600 text-white py-2 px-4 rounded-md w-full mb-4 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:text-gray-300"
              type="submit"
              disabled={form.formState.isSubmitting || !termCheck}
            >
              Login account
            </button>
          </form>
          <div className="flex flex-col justify-center md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full relative">
            <form action={dispatchGoogle}></form>
            <a
              href="/"
              className="text-blue-400 text-center py-2 px-4 w-full md:w-auto flex items-center justify-center"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
