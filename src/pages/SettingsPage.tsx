import { useAtomValue } from "jotai";
import { currentUser } from "../store/atoms";
import { ChangeEvent, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "@tanstack/react-form";
import { z } from "zod/v4";
import useSiteTitle from "../utils/title";

type UploadStatus = "idle" | "uploading" | "success" | "error";

function SettingsPage() {
  const [activeTab, setActiveTab] = useState<string>("tab 1");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const user = useAtomValue(currentUser);
  const navigate = useNavigate();

  useSiteTitle("Settings | The Rogue Road");

  if (!user) {
    navigate("/");
  }

  function handleTabChange(tabId: string) {
    setActiveTab(tabId);
  }

  interface UpdateInfo {
    displayName: string;
    userName: string;
    email: string;
    bio: string;
  }

  const updateSchema = z.object({
    displayName: z
      .string()
      .min(1, "Display Name is required")
      .max(20, "Display Name cannot be more than 20 characters"),
    username: z
      .string()
      .min(1, "Username is required")
      .max(20, "Username cannot be more than 20 characters"),
    email: z.email(),
    // .max(50, "Email cannot be more than 20 characters"),
    bio: z.string().max(120, "Bio cannot be more than 250 characters"),
  });

  // type UpdateInfo = z.infer<typeof updateSchema>;

  const form = useForm({
    defaultValues: {
      displayName: `${user?.displayName}`,
      userName: `${user?.userName}`,
      email: `${user?.email}`,
      bio: `${user?.bio ? user.bio : ""}`,
    } as UpdateInfo,
    // validators: {
    //   onChange: updateSchema,
    // },
    onSubmit: async ({ value }) => {
      if (!user?.emailVerified) {
        toast.error("Your email must be verified to edit your profile");
        return;
      }
      try {
        await api.put(`/user/update`, {
          bio: value.bio,
          userName: value.userName,
          displayName: value.displayName,
          email: value.email,
        });
        toast.success("Account info successfully updated!");
        signOut();
      } catch (e) {
        // console.log(e);
        toast.error(`${e}`);
      }
    },
  });

  async function signOut() {
    try {
      const { data } = await api.post(`/auth/signout`);
      localStorage.removeItem("rrid");
      navigate("/welcome");
      toast.success("You have been logged out");
      // console.log(data);
    } catch (error) {
      // console.log(error);
    }
  }
  async function deactivate() {
    try {
      await api.delete(`/user/delete-self`);
      toast.success("We're sad to see you go");
    } catch (error) {
      // console.log(error);
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    // const target = e.target as HTMLInputElement & {
    //   files: FileList;
    // };
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
    // console.log(file?.name);
  }

  async function handleFileUpload(e: any) {
    if (!file) {
      toast.error("A picture is required to update");
      return;
    }

    if (!user?.emailVerified) {
      toast.error("Your email must be verified to edit your profile");
      return;
    }
    setStatus("uploading");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.put(`/user/update/pic`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setStatus("success");
      navigate("/");
      toast.success("Profile Pic Changed Successfully");
    } catch (e) {
      toast.error(`${e}`);
      setStatus("error");
    }
  }

  async function sendVerifEmail() {
    try {
      await api.post(`email-verification?email=${user?.email}`);
      toast.success("You will recieve a verification email shortly");
    } catch (error) {
      // console.log(error);
    }
  }

  return (
    <div className="h-screen overflow-y-auto w-full flex-1 text-gray-200 bg-[#141414]">
      <div className="flex flex-col mt-10 md:mt-15 container w-max mx-auto gap-4">
        <div role="tablist" className="tabs tabs-border mb-3 md:mb-10">
          <button
            onClick={() => handleTabChange("tab 1")}
            role="tab"
            className={`tab duration-300 ${
              activeTab === "tab 1" && "tab-active"
            }`}
          >
            Account
          </button>
          <button
            onClick={() => handleTabChange("tab 2")}
            role="tab"
            className={`tab duration-300 lg:text-base text-sm ${
              activeTab === "tab 2" && "tab-active"
            }`}
          >
            Profile Picture
          </button>
          {!user?.emailVerified && (
            <button
              onClick={() => handleTabChange("tab 3")}
              role="tab"
              className={`tab duration-300  ${
                activeTab === "tab 3" && "tab-active"
              }`}
            >
              Email Verification
            </button>
          )}
          <button
            onClick={() => handleTabChange("tab 4")}
            role="tab"
            className={`tab duration-300 ${
              activeTab === "tab 4" && "tab-active"
            }`}
          >
            Deactivate
          </button>
        </div>
        {activeTab === "tab 1" && (
          <div className="flex flex-col gap-3 items-center h-175 w-82 md:w-160 bg-[#202020] rounded-lg">
            <div className="mt-8 text-xl font-semibold">
              {" "}
              Edit Account Information
            </div>
            <div className="text-sm font-semibold text-[#8956FB]">
              {" "}
              (Editing this info will require you to sign back in)
            </div>
            <div className="divider mb-1"></div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="w-full h-full flex flex-col gap-7 p-5"
            >
              <form.Field
                name="displayName"
                validators={{
                  onChange: ({ value }) => {
                    value.trim() === "" ? "Display is required" : undefined;
                  },
                }}
              >
                {(field) => (
                  <>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={field.name}
                        className="text-sm font-semibold ml-1"
                      >
                        Display Name:
                      </label>
                      <div className="w-full border border-gray-500 rounded-lg">
                        <input
                          id={field.name}
                          type="text"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full m-0 p-2 rounded-lg"
                        />
                      </div>
                      {!field.state.meta.isValid && (
                        <em className="text-red-400">
                          {field.state.meta.errors.join(", ")}
                        </em>
                      )}
                    </div>
                  </>
                )}
              </form.Field>

              <form.Field
                name="userName"
                validators={{
                  onChange: ({ value }) => {
                    value.trim() === "" ? "Username is required" : undefined;
                  },
                }}
              >
                {(field) => (
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-semibold ml-1"
                    >
                      Username:
                    </label>
                    <div className="w-full border border-gray-500 rounded-lg">
                      <input
                        id={field.name}
                        type="text"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full m-0 p-2 rounded-lg"
                      />
                    </div>
                    {!field.state.meta.isValid && (
                      <em className="text-red-400">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return !emailRegex.test(value)
                      ? "Email is invalid"
                      : undefined;
                  },
                }}
              >
                {(field) => (
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-semibold ml-1"
                    >
                      Email:
                    </label>
                    <div className="w-full border border-gray-500 rounded-lg">
                      <input
                        id={field.name}
                        name="email"
                        // type="email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full m-0 p-2 rounded-lg"
                      />
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <em className="text-red-400">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field name="bio">
                {(field) => (
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-semibold ml-1"
                    >
                      Bio:
                    </label>
                    <div className="w-full border border-gray-500 rounded-lg">
                      <textarea
                        id={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full h-30 m-0 p-2 rounded-lg"
                      />
                    </div>
                    {!field.state.meta.isValid && (
                      <em>{field.state.meta.errors.join(", ")}</em>
                    )}
                  </div>
                )}
              </form.Field>

              <button
                // disabled={}
                className="flex gap-3 rounded-lg h-10 w-20 mt-auto bg-[#8956FB] duration-300 ease-in-out hover:bg-[#674b9b] hover:cursor-pointer "
              >
                <span className="text-center m-auto">Save</span>
              </button>
            </form>
          </div>
        )}
        {activeTab === "tab 2" && (
          <div className="flex flex-col gap-3 items-center h-175 w-82 md:w-160 bg-[#202020] rounded-lg">
            <div className="mt-8  text-xl font-semibold">
              {" "}
              Update Profile Pic
            </div>
            <div className="divider mb-20"></div>
            <div className="mb-15 h-30 w-30 rounded-md border-1 border-gray-500">
              <img
                className="object-cover rounded-md h-29 w-30 "
                src={user?.profilePic}
              />
            </div>
            <div className="w-full h-full flex flex-col p-5">
              <input
                type="file"
                onChange={handleFileChange}
                className="file-input bg-[#202020] w-full md:w-1/2 mx-auto"
              />
              {file && status !== "uploading" && (
                <button
                  onClick={handleFileUpload}
                  // disabled={}
                  className="flex gap-3 rounded-lg h-10 md:w-20 mt-auto  bg-[#8956FB] duration-300 ease-in-out hover:bg-[#674b9b] hover:cursor-pointer "
                >
                  <span className="text-center m-auto">Save</span>
                </button>
              )}
            </div>
          </div>
        )}
        {activeTab === "tab 3" && (
          <div className="flex flex-col gap-3 items-center h-100 w-82 md:w-160 bg-[#202020] rounded-lg">
            <div className="flex flex-col items-center gap-5 m-auto">
              <div className="text-red-400 text-3xl text-center">
                Your email is not verified!
              </div>
              <div className="text-base font-extralight text-center">
                The button below will send you a new verification email.
              </div>
              <button
                onClick={sendVerifEmail}
                className="rounded-full p-3 bg-[#8956FB]  duration-300 ease-in-out hover:bg-[#674b9b] hover:cursor-pointer text-sm"
              >
                Send a new email verification token
              </button>
            </div>
          </div>
        )}
        {activeTab === "tab 4" && (
          <div className="flex flex-col gap-3 items-center h-100 w-82 md:w-160 bg-[#202020] rounded-lg">
            <div className="flex flex-col items-center gap-10 m-auto">
              <div className="text-xl text-center">
                The button below will remove your account entirely.
              </div>

              <button
                onClick={() => {
                  deactivate();
                  signOut();
                }}
                className="rounded-full p-3 bg-red-500  duration-300 ease-in-out hover:bg-red-700 hover:cursor-pointer text-sm"
              >
                Delete account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsPage;
