import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/api";

import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { currentUser } from "../globalState/atoms";
import { AtSignIcon, LockKeyhole, Mail, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const schema = z.object({
  username: z.string(),
  password: z.string().min(6),
});

type FormFields = z.infer<typeof schema>;

function Welcome() {
  const [activeTab, setActiveTab] = useState<string>("tab 1");
  const [userName, setUserName] = useState<string>("");
  const [displayName, setDisplayname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const user = useAtomValue(currentUser);
  const navigate = useNavigate();

  function handleTabChange(tabId: string) {
    setActiveTab(tabId);
  }

  async function handleSignUp(e: any) {
    e.preventDefault();
    if (!userName || !displayName || !password || !email) return;

    try {
      await api.post(`/auth/signup`, {
        username: userName,
        displayName: displayName,
        email: email,
        password: password,
      });
      toast.success("Welcome to the Rogue Road!");
      try {
        const { data } = await api.post(`/auth/signin`, {
          username: userName,
          password: password,
        });
        console.log(data);

        navigate("/");
      } catch (error) {
        setError("username", { message: "error of some kind" });
        toast.error(`${error}`);
      }
      console.log("i tried it");
    } catch (e) {
      console.log(e);
      toast.error(`${e}`);
    }
  }

  const handleUsernameChange = (event: any) => {
    setUserName(event.target.value);
  };

  const handleDisplayNameChange = (event: any) => {
    setDisplayname(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePassChange = (event: any) => {
    setPassword(event.target.value);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSignInSubmit: SubmitHandler<FormFields> = async (formData) => {
    try {
      const { data } = await api.post(`/auth/signin`, formData);
      console.log(data);

      navigate("/");
    } catch (error) {
      setError("username", { message: "error of some kind" });
      toast.error(`${error}`);
    }
  };

  // const onSignUpSubmit: SubmitHandler<FormFieldz> = async (formData) => {
  //   try {
  //     const { data } = await api.post(`/auth/signup`, formData);
  //     console.log(data);
  //     navigate("/");
  //   } catch (error) {
  //     setError("username", { message: "error of some kind" });
  //   }
  // };

  if (user && user.id) {
    navigate("/");
  }

  return (
    <div className="text-[#eeeeee] flex flex-1 gap-20 w-full h-screen mx-auto bg-[#141414]">
      <div className="hidden md:flex w-40 md:w-85 h-screen ml-auto border-r border-r-[#8956FB]">
        <div
          className="w-full my-auto mr-10 md:text-lg lg:text-7xl font-bold inline-block 
       bg-gradient-to-r from-[#bcb6c7] to-[#8956FB]
       bg-clip-text text-transparent p-3"
        >
          {activeTab == "tab 1" ? "Sign in" : "Sign Up"}
        </div>
      </div>
      <div className="flex w-150 m-auto rounded-lg h-112 bg-[#202020]/60 backdrop-blur-2xl">
        {activeTab == "tab 1" && (
          <div className="m-auto w-4/5 flex flex-col gap-4 items-center">
            <div className="flex flex-col gap-2 items-center mb-10 text-2xl font-extralight">
              <span>Sign in to The Rogue Road</span>
              <span className="text-base">
                New Here?{" "}
                <span
                  onClick={() => handleTabChange("tab 2")}
                  className="text-[#8956FB] font-semibold hover:underline hover:cursor-pointer"
                >
                  Create account
                </span>
              </span>
            </div>

            <form
              onSubmit={handleSubmit(onSignInSubmit)}
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
              {/* {errors.username && (
                <div className="text-red-500">{errors.username.message}</div>
              )} */}
              <div className="w-full flex items-center border border-gray-500 rounded-lg">
                <LockKeyhole size={21} className="m-2 text-[#686868]" />
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className="w-full m-0 p-3 rounded-lg focus:outline-1 focus:outline-white"
                />
              </div>
              {/* {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )} */}
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
        )}
        {activeTab == "tab 2" && (
          <div className="m-auto w-4/5 flex flex-col gap-4 items-center">
            <div className="flex flex-col gap-2 items-center mb-2 text-2xl font-extralight">
              <span>Welcome to The Rogue Road</span>
              <span className="text-base">
                Already have an account?{" "}
                <span
                  onClick={() => handleTabChange("tab 1")}
                  className="text-[#8956FB] font-semibold hover:underline hover:cursor-pointer"
                >
                  Sign In
                </span>
              </span>
            </div>

            <form
              onSubmit={handleSignUp}
              className="w-full flex flex-col gap-4"
            >
              <div className="w-full flex items-center border border-gray-500 rounded-lg">
                <AtSignIcon size={21} className="m-2 text-[#686868]" />
                <input
                  value={userName}
                  onChange={handleUsernameChange}
                  type="text"
                  placeholder="Username"
                  className="w-full m-0 p-3 rounded-lg focus:outline-1 focus:outline-white"
                ></input>
              </div>
              {/* {errors.username && (
                <div className="text-red-500">{errors.username.message}</div>
              )} */}
              <div className="w-full flex items-center border border-gray-500 rounded-lg">
                <User size={21} className="m-2 text-[#686868]" />
                <input
                  value={displayName}
                  onChange={handleDisplayNameChange}
                  type="text"
                  placeholder="Display Name"
                  className="w-full m-0 p-3 rounded-lg focus:outline-1 focus:outline-white"
                ></input>
              </div>
              {/* {errors.username && (
                <div className="text-red-500">{errors.username.message}</div>
              )} */}
              <div className="w-full flex items-center border border-gray-500 rounded-lg">
                <Mail size={21} className="m-2 text-[#686868]" />
                <input
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  placeholder="Email"
                  className="w-full m-0 p-3 rounded-lg focus:outline-1 focus:outline-white"
                ></input>
              </div>
              {/* {errors.username && (
                <div className="text-red-500">{errors.username.message}</div>
              )} */}
              <div className="w-full flex items-center border border-gray-500 rounded-lg">
                <LockKeyhole size={21} className="m-2 text-[#686868]" />
                <input
                  value={password}
                  onChange={handlePassChange}
                  type="password"
                  placeholder="Password"
                  className="w-full m-0 p-3 rounded-lg focus:outline-1 focus:outline-white"
                />
              </div>
              {/* {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )} */}
              <button
                disabled={isSubmitting}
                className="flex gap-3 rounded-lg h-10 w-full bg-[#8956FB] duration-300 ease-in-out hover:bg-[#674b9b] hover:cursor-pointer "
              >
                <span className="text-center m-auto">
                  {isSubmitting ? "Signing in" : "Create Account"}
                </span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Welcome;
