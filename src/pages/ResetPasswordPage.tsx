import { useAtomValue } from "jotai";
import { Eye } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { currentUser } from "../store/atoms";
import { error } from "zod/v4/locales/ar.js";
import api from "../api/api";
import toast from "react-hot-toast";

function ResetPasswordPage() {
  const currUser = useAtomValue(currentUser);
  const [token, setToken] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [type1, setType1] = useState<string>("password");
  const [type2, setType2] = useState<string>("password");
  const [mistake, setMistake] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const t = searchParams?.get("token");
    if (t == null) {
      navigate("*");
      return;
    }
    console.log(t);
  }, []);

  async function handleResetPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const tokenData = searchParams.get("token");

    if (password !== confirm) {
      toast.error("Passwords must match");
      return;
    }

    try {
      await api.post(
        `/reset-password?token=${tokenData}&newPassword=${password}`
      );
      navigate("/welcome");
      toast.success("Password successfully reset");
    } catch (e) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  return (
    <div className="flex h-screen w-full bg-[#141414]">
      <div className="w-100 h-70 bg-[#202020] m-auto rounded-2xl flex flex-col gap-2 p-5">
        <div className="text-center text-xl">Reset Your Password</div>
        <div className="divider my-2"></div>
        <div className="flex flex-col gap-4 w-9/10 mx-auto">
          <form onSubmit={handleResetPassword} className=" flex flex-col gap-4">
            <div className="input w-full mx-auto bg-[#202020]">
              <input
                value={password}
                type={type1 == "password" ? "password" : "text"}
                required
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
                className=""
              />
              <Eye
                className="hover:cursor-pointer"
                onMouseDown={() => setType1("text")}
                onMouseUp={() => setType1("password")}
              />
            </div>
            <div className="input w-full mx-auto bg-[#202020]">
              <input
                value={confirm}
                type={type2 == "password" ? "password" : "text"}
                required
                placeholder="Confirm New Password"
                onChange={(e) => {
                  setConfirm(e.target.value);
                }}
              />
              <Eye
                className="hover:cursor-pointer"
                onMouseDown={() => setType2("text")}
                onMouseUp={() => setType2("password")}
              />
            </div>
            {mistake && (
              <div className="text-red-400">Your password does not match</div>
            )}
            <button
              type="submit"
              className="p-1 text-sm bg-[#8956FB] rounded-lg duration-300 ease-in-out hover:bg-[#674b9b] hover:cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
