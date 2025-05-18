import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/api";

import { redirect, useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { currentUser } from "../globalState/atoms";
import { AtSignIcon, LockKeyhole } from "lucide-react";

const schema = z.object({
  username: z.string(),
  password: z.string().min(6),
});

type FormFields = z.infer<typeof schema>;

function Welcome() {
  const user = useAtomValue(currentUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      username: "test@email.com",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (formData) => {
    try {
      const { data } = await api.post(`/auth/signin`, formData);
      console.log(data);
      navigate("/");
    } catch (error) {
      setError("username", { message: "error of some kind" });
    }
  };

  if (user && user.id) {
    navigate("/");
  }

  return (
    <div className="text-[#eeeeee] flex flex-1 gap-20 w-fit h-screen mx-auto">
      <div className="hidden md:flex w-40 md:w-80 h-screen border-r border-r-[#8956FB]">
        <div
          className="w-full my-auto mr-10 md:text-lg lg:text-7xl font-bold inline-block 
      bg-gradient-to-r from-[#bcb6c7] to-[#8956FB]
      bg-clip-text text-transparent p-3"
        >
          Sign in
        </div>
      </div>
      <div className="flex w-150 m-auto rounded-lg h-100 bg-[#202020]/60 backdrop-blur-2xl">
        <div className="m-auto w-4/5 flex flex-col gap-4 items-center">
          <div className="flex flex-col gap-2 items-center mb-10 text-2xl font-extralight">
            <span>Sign in to The Rogue Road</span>
            <span className="text-base">
              New Here?{" "}
              <span className="text-[#8956FB] font-semibold hover:underline hover:cursor-pointer">
                Create account
              </span>
            </span>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4"
          >
            <div className="w-full flex items-center border border-gray-500 rounded-lg">
              <AtSignIcon size={21} className="m-2 text-[#686868]" />
              <input
                {...register("username")}
                type="text"
                placeholder="Username"
                className="w-full m-0 p-3 rounded-lg focus:outline-1 focus:outline-white"
              ></input>
            </div>
            {errors.username && (
              <div className="text-red-500">{errors.username.message}</div>
            )}
            <div className="w-full flex items-center border border-gray-500 rounded-lg">
              <LockKeyhole size={21} className="m-2 text-[#686868]" />
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full m-0 p-3 rounded-lg focus:outline-1 focus:outline-white"
              />
            </div>
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
            <button
              disabled={isSubmitting}
              className="flex gap-3 rounded-lg h-10 w-full bg-[#8956FB] duration-300 ease-in-out hover:bg-[#674b9b] hover:cursor-pointer "
            >
              <span className="text-center m-auto">
                {isSubmitting ? "Signing in" : "Continue"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
