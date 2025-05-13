import UserSearch from "../components/UserSearch";

function SearchPage() {
  return (
    <div className="h-screen overflow-y-auto w-full flex-1">
      <div className="flex flex-col container w-max mx-auto gap-4">
        <label className="input w-150 mt-14 bg-[#202020] ">
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
          <input type="search" required placeholder="Search" />
        </label>
        <div role="tablist" className="tabs tabs-border mb-10">
          <a role="tab" className="tab ">
            Posts
          </a>
          <a role="tab" className="tab tab-active">
            People
          </a>
        </div>

        <div className="flex gap-5 p-5 border-b border-b-gray-500">
          <img
            className="rounded-2xl h-10 w-10 "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXgwGl5-0mC66avbg7_TzilB0lMAH4sP7iGA&s"
          />
          <div className="flex flex-col ">
            <span className="text-md">Emma S</span>
            <span className="text-sm text-[#a8a8a8]">@sward140</span>
          </div>
        </div>
        <UserSearch />
      </div>
    </div>
  );
}

export default SearchPage;
