import { TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-[#eeeeee] flex flex-1 gap-20 w-full h-screen mx-auto bg-[#141414]">
      <div className="m-auto flex flex-col gap-10 items-center w-100 h-100">
        <div className="text-9xl font-bold">404</div>
        <div className="flex flex-col gap-5 items-center">
          <div className="text-lg text-center">
            The page you are looking for might have been removed or is
            temporarily unavailable.
          </div>
          <Link
            to={"/"}
            className="rounded-full p-3 bg-[#8956FB]  duration-300 ease-in-out hover:bg-[#674b9b] text-sm"
          >
            GO TO HOMEPAGE
          </Link>
        </div>
        <div className="mt-auto">
          <TriangleAlert size={70} />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
