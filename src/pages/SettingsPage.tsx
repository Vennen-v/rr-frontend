import { useAtomValue } from "jotai";
import { currentUser } from "../globalState/atoms";
import { ChangeEvent, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type UploadStatus = "idle" | "uploading" | "success" | "error";

function SettingsPage() {
  const [activeTab, setActiveTab] = useState<string>("tab 1");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const user = useAtomValue(currentUser);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  function handleTabChange(tabId: string) {
    setActiveTab(tabId);
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    // const target = e.target as HTMLInputElement & {
    //   files: FileList;
    // };
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
    console.log(file?.name);
  }

  async function handleFileUpload(e: any) {
    if (!file) return;
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

  return (
    <div className="h-screen overflow-y-auto w-full flex-1 text-gray-200 bg-[#141414]">
      <div className="flex flex-col mt-15 container w-max mx-auto gap-4">
        <div role="tablist" className="tabs tabs-border mb-10">
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
            className={`tab duration-300  ${
              activeTab === "tab 2" && "tab-active"
            }`}
          >
            Profile Picture
          </button>
        </div>
        {activeTab === "tab 1" && (
          <div className="flex flex-col gap-3 items-center h-175 w-160 bg-[#202020] rounded-lg">
            <div className="mt-8 text-xl font-semibold">
              {" "}
              Edit Account Information
            </div>
            <div className="divider mb-1"></div>
            <form className="w-full h-full flex flex-col gap-7 p-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold ml-1">
                  Display Name
                </label>
                <div className="w-full border border-gray-500 rounded-lg">
                  <input
                    type="text"
                    placeholder="Display Name"
                    className="w-full m-0 p-2 rounded-lg"
                  />
                </div>
              </div>
              {/* {errors.username && (
              <div className="text-red-500">{errors.username.message}</div>
            )} */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold ml-1">Username</label>
                <div className="w-full border border-gray-500 rounded-lg">
                  <input
                    // {...register("password")}
                    type="text"
                    placeholder="Username"
                    className="w-full m-0 p-2 rounded-lg"
                  />
                </div>
              </div>
              {/* {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )} */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold ml-1">Email</label>
                <div className="w-full border border-gray-500 rounded-lg">
                  <input
                    // {...register("password")}
                    type="email"
                    placeholder="Email"
                    className="w-full m-0 p-2 rounded-lg"
                  />
                </div>
              </div>
              {/* {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )} */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold ml-1">Bio</label>
                <div className="w-full border border-gray-500 rounded-lg">
                  <textarea
                    // {...register("password")}

                    placeholder="Bio"
                    className="w-full h-30 m-0 p-2 rounded-lg"
                  />
                </div>
              </div>
              {/* {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )} */}
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
          <div className="flex flex-col gap-3 items-center h-175 w-160 bg-[#202020] rounded-lg">
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
                className="file-input bg-[#202020] w-1/2 mx-auto"
              />
              {file && status !== "uploading" && (
                <button
                  onClick={handleFileUpload}
                  // disabled={}
                  className="flex gap-3 rounded-lg h-10 w-20 mt-auto  bg-[#8956FB] duration-300 ease-in-out hover:bg-[#674b9b] hover:cursor-pointer "
                >
                  <span className="text-center m-auto">Save</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsPage;
