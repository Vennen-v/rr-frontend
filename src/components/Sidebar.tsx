import { House, Search, Settings, Plus, EllipsisVertical } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAtomValue } from "jotai";
import { currentUser } from "../globalState/atoms";

function Sidebar() {
  const user = useAtomValue(currentUser);
  const navigate = useNavigate();

  async function signOut() {
    try {
      const { data } = await api.post(`/auth/signout`);
      localStorage.removeItem("rrid");
      navigate("/welcome");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="hidden flex-initial w-62 h-screen border-r border-r-gray-500 mx-0  md:flex flex-col bg-[#202020] sticky top-0">
      <Link
        to={"/"}
        className="text-gray-200 text-xl font-extralight mt-10 mb-12 ml-7 duration-100 hover:cursor-pointer hover:text-[#828282]"
      >
        The Rogue Road
      </Link>
      <div className="w-full mx-2 ">
        <Link
          to={"/"}
          className="flex gap-3 text-base text-gray-200 mb-3 mr-4 p-3 duration-100 rounded-r-lg hover:border-l-3 hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer"
        >
          <span>
            <House size={24} />
          </span>
          Home
        </Link>
        <Link
          to={"/search"}
          className="flex gap-3 text-base text-gray-200 w-full mb-3 mr-4 p-3 duration-100 rounded-r-lg hover:border-l-3 hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer"
        >
          <span>
            <Search size={24} />
          </span>
          Search
        </Link>
        <Link
          to={"/settings"}
          className="flex gap-3 text-based text-gray-200 mb-3 mr-4 p-3 duration-100 rounded-r-lg hover:border-l-3 hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer"
        >
          <span>
            <Settings size={24} />
          </span>
          Settings
        </Link>
        <Link
          to={"/create"}
          className="flex items-center gap-3 text-base text-gray-200 mb-3 mr-4 p-3 duration-100 rounded-r-lg hover:border-l-3 hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer"
        >
          <span className="bg-[#8956FB] rounded-md p-1">
            <Plus size={18} />
          </span>
          Create
        </Link>
      </div>

      {user && user?.id ? (
        <div className=" mt-auto">
          <div className="flex gap-3 items-center mx-2 mb-3 text-gray-200 p-3 duration-300 ease-in-out  border-t border-t-gray-500 ">
            <Link
              to={`/profile/${user.userName}`}
              className="flex gap-3 rounded-lg p-1 hover:bg-[#383838] hover:cursor-pointer"
            >
              <img className="rounded-2xl h-10 w-10 " src={user?.profilePic} />
              <div className="flex flex-col">
                <span className="text-sm">{user.displayName}</span>
                <span className="text-sm">@{user.userName}</span>
              </div>
            </Link>
            <div className="dropdown dropdown-right dropdown-end">
              <div
                className="ml-auto p-2 duration-300 ease-in-out rounded-full hover:bg-[#8956FB] hover:cursor-pointer focus:bg-[#8956FB]"
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
