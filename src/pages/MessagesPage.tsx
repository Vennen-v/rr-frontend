import { Plus, SquarePen } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function MessagesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className=" flex flex-col flex-1 w-fit h-screen mx-auto overflow-y-auto bg-[#141414]">
      <div className="hidden lg:block h-18 border-b border-b-gray-500 w-full text-center text-2xl text-[#eeeeee] font-bold p-5 ">
        Messages
      </div>
      <div className="flex h-full">
        <div className="lg:flex flex-col border-r border-r-gray-500 hidden lg:w-100 h-full $">
          <div className="flex w-full items-end justify-around my-5 ">
            <div className="flex flex-col w-full mx-auto gap-4">
              <form
                // onSubmit={handleSubmit}
                className="input w-4/5 mx-4  bg-[#202020]"
              >
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  // value={keyword}
                  type="text"
                  required
                  placeholder="Search"
                  // onChange={handleChange}
                  className="mx-3 "
                />
              </form>
            </div>
            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="w-9 rounded-md p-1 mr-5 mb-1 hover:cursor-pointer hover:bg-[#383838]"
            >
              <SquarePen
                size={25}
                strokeWidth={location.pathname === "/create" ? 2.5 : 2}
              />
            </button>
          </div>
          <div className="flex flex-col w-full border-t border-t-gray-500">
            <button
              onClick={() => {
                navigate(`/messages/conversations/1`);
              }}
              className={`flex gap-5 items-center p-5 h-20 w-full  duration-300 hover:bg-[#383838] hover:cursor-pointer ${
                location.pathname === `/messages/conversations/1` &&
                "bg-[#383838]"
              }`}
            >
              <img
                className="rounded-lg h-10 w-10 object-cover"
                src="https://media.tenor.com/akJHc9Lw_JIAAAAe/harima-kenji-school-rumble.png"
              />

              <div className="flex flex-col gap-2  ">
                <div className="flex gap-3 items-center">
                  <span className="text-base font-semibold">Harima K.</span>
                </div>
                <div className="text-start text-xs text-[#a8a8a8]">6h</div>
              </div>
            </button>
            <button
              onClick={() => {
                navigate(`/messages/conversations/2`);
              }}
              className={`flex gap-5 items-center p-5 h-20 w-full  duration-300 hover:bg-[#383838] hover:cursor-pointer ${
                location.pathname === `/messages/conversations/2` &&
                "bg-[#383838]"
              }`}
            >
              <img
                className="rounded-lg h-10 w-10 object-cover"
                src="https://m.media-amazon.com/images/M/MV5BOTEwYWFjYmItZWJmNi00MGExLWI1MjktYzRiYjJkNzhiMWIxXkEyXkFqcGdeQXNuZXNodQ@@._V1_.jpg"
              />

              <div className="flex flex-col gap-2  ">
                <div className="flex gap-3 items-center">
                  <span className="text-base font-semibold">Dunnneeee</span>
                </div>
                <div className="text-start text-xs text-[#a8a8a8]">6h</div>
              </div>
            </button>
          </div>
        </div>
        <Outlet />
        {location.pathname.slice(0, 23) === "/messages/conversations" ? (
          ""
        ) : (
          <div className="flex flex-col items-center m-auto gap-1 ">
            <div className="font-semibold">No conversation selected</div>
            <div className="m-auto text-sm text-[#a8a8a8]">
              Select a conversation to view it here
            </div>
          </div>
        )}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box h-130 w-130 bg-[#202020]">
            <form method="dialog ">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="font-semibold text-center w-full">New Message</div>

            <div className="divider my-1"></div>
            <div className="flex  gap-2">
              <div>To: </div>
              <input
                type="text"
                className="w-full focus:outline-none"
                placeholder="Search people"
              />
            </div>
            <div className="divider my-1"></div>
            <p className="text-sm">Suggested</p>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default MessagesPage;
