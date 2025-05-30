import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { Check } from "lucide-react";

function EmailVerificationPage() {
  const [verified, setVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function handleEmailVerification() {
      const token = searchParams.get("link");
      setIsLoading(true);
      try {
        await api.post(`/verify-email?token=${token}`);
        setVerified(true);
      } catch (e) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
    handleEmailVerification();
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#141414]">
      <div className="w-100 h-70 bg-[#202020] m-auto rounded-2xl flex flex-col gap-2 p-5">
        {isLoading == true && (
          <span className="loading loading-dots loading-lg m-auto"></span>
        )}
        {verified == true && isLoading == false && (
          <div className="w-full h-full flex flex-col gap-5 mx-auto items-center">
            <div className="rounded-full bg-green-600 p-2">
              <Check size={50} />
            </div>
            <div className="text-2xl">Email Verified!</div>

            <div className="text-center">
              You're email has been verified, and you have completed your
              registration!
            </div>
          </div>
        )}
        {verified == false && isLoading == false && (
          <div className="w-full h-full flex flex-col gap-5 mx-auto items-center">
            <div className="text-2xl mt-10">Something went wrong!</div>
            <div className="text-center">
              This email verification token may be invalid or expired. Please
              request a new verification email.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailVerificationPage;
