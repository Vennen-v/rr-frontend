import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/api";

import { useNavigate } from "react-router-dom";

const schema = z.object({
  username: z.string(),
  password: z.string().min(6),
});

type FormFields = z.infer<typeof schema>;

function Welcome() {
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

  return (
    <div className="text-[#eeeeee] flex flex-1 w-fit h-screen mx-auto">
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
            <div className="w-full border border-gray-500 rounded-lg">
              <input
                {...register("username")}
                type="text"
                placeholder="Username"
                className="w-full m-0 p-3 rounded-lg"
              />
            </div>
            {errors.username && (
              <div className="text-red-500">{errors.username.message}</div>
            )}
            <div className="w-full border border-gray-500 rounded-lg">
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full m-0 p-3 rounded-lg"
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
