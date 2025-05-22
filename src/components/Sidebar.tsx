import { House, Search, Settings, Plus, EllipsisVertical } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAtomValue } from "jotai";
import { currentUser } from "../globalState/atoms";
import toast from "react-hot-toast";

function Sidebar() {
  const user = useAtomValue(currentUser);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  async function signOut() {
    try {
      const { data } = await api.post(`/auth/signout`);
      localStorage.removeItem("rrid");
      navigate("/welcome");
      toast.success("You have logged out");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="hidden flex-initial w-17 lg:w-62 h-screen border-r border-r-gray-500 mx-0 md:flex flex-col bg-[#202020] sticky top-0">
      <Link
        to={"/"}
        className=" hidden lg:block text-gray-200 text-xl font-extralight mt-10 mb-12 ml-7 duration-100 hover:cursor-pointer hover:text-[#828282]"
      >
        The Rogue Road
      </Link>
      <div className="w-full mx-2 ">
        <Link
          to={"/"}
          className={`flex gap-3 text-base text-gray-200 md:mt-12 lg:mt-auto mb-3 mr-4 p-3 duration-100 rounded-r-lg ${
            location.pathname === "/"
              ? "font-semibold bg-[#383838] border-l-3 border-l-[#8956FB]"
              : ""
          } hover:border-l-3  hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer `}
        >
          <span>
            <House
              size={24}
              strokeWidth={location.pathname === "/" ? 2.5 : 2}
            />
          </span>
          <span className=" hidden lg:block">Home</span>
        </Link>
        <Link
          to={"/search"}
          className={`flex gap-3 text-base text-gray-200 w-58 mb-3 mr-4 p-3 duration-100 rounded-r-lg ${
            location.pathname === "/search"
              ? "font-semibold bg-[#383838] border-l-3 border-l-[#8956FB]"
              : ""
          } hover:border-l-3 hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer`}
        >
          <span>
            <Search
              size={24}
              strokeWidth={location.pathname === "/search" ? 2.5 : 2}
            />
          </span>
          <span className=" hidden lg:block">Search</span>
        </Link>
        {user && user.id && (
          <Link
            to={"/settings"}
            className={`flex gap-3 text-based text-gray-200 mb-3 mr-4 p-3 duration-100 rounded-r-lg ${
              location.pathname === "/settings"
                ? "font-semibold bg-[#383838] border-l-3 border-l-[#8956FB]"
                : ""
            } hover:border-l-3 hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer`}
          >
            <span>
              <Settings
                size={24}
                strokeWidth={location.pathname === "/settings" ? 2.5 : 2}
              />
            </span>
            <span className=" hidden lg:block">Settings</span>
          </Link>
        )}

        {user && user.id && (
          <Link
            to={"/create"}
            className={`flex items-center gap-3 text-base text-gray-200 mb-3 mr-4 p-3 duration-100 rounded-r-lg ${
              location.pathname === "/create"
                ? "font-semibold bg-[#383838] border-l-3 border-l-[#8956FB]"
                : ""
            } hover:border-l-3 hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer`}
          >
            <span className="bg-[#8956FB] rounded-md p-1">
              <Plus
                size={18}
                strokeWidth={location.pathname === "/create" ? 2.5 : 2}
              />
            </span>
            <span className=" hidden lg:block">Create</span>
          </Link>
        )}
      </div>

      {user && user?.id ? (
        <div className=" mt-auto">
          <div className="flex gap-3 items-center lg:mx-2 lg:mb-3 text-gray-200 lg:p-3 duration-300 ease-in-out  border-t border-t-gray-500 ">
            <Link
              to={`/${user.userName}`}
              className="flex items-center gap-3 rounded-lg mx-auto my-4 lg:my-0 lg:p-1 lg:mx-0 hover:underline hover:cursor-pointer"
            >
              <img
                className="rounded-2xl h-10 w-10 object-cover "
                src={user?.profilePic}
              />
              <div className="lg:flex flex-col hidden">
                <span className="text-xs font-semibold">
                  {user.displayName}
                </span>
                <span className="text-xs text-[#a8a8a8">@{user.userName}</span>
              </div>
            </Link>
            <div className="dropdown dropdown-right dropdown-end">
              <div
                className=" hidden lg:block ml-auto p-2 duration-300 ease-in-out rounded-full hover:bg-[#8956FB] hover:cursor-pointer focus:bg-[#8956FB]"
                tabIndex={0}
                role="button"
              >
                <EllipsisVertical />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-[#202020] border border-gray-500 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <button onClick={signOut} className="hover:bg-[#383838]">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className=" mt-auto">
          <div className="flex flex-col gap-2 mx-2 mb-3 text-gray-200 p-3 border-t border-t-gray-500 ">
            <Link
              to={"/welcome"}
              className="flex gap-3 rounded-lg h-12 w-full bg-[#8956FB] duration-300 ease-in-out hover:bg-[#674b9b] hover:cursor-pointer "
            >
              <span className="text-center m-auto text-lg">Sign in | Join</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
