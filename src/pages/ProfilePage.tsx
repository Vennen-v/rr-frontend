import Post from "../components/Post";

function ProfilePage() {
  return (
    <div className=" flex flex-col flex-1 w-fit h-screen mx-auto overflow-y-auto">
      <div className=" h-18 border-b border-b-gray-500 w-full text-center text-2xl text-[#eeeeee] font-bold p-5">
        Yoshi Vennen
      </div>
      <div className="h-13 mx-auto w-full flex items-center gap-2 border-b border-b-gray-500">
        <div role="tablist" className="tabs tabs-border h-full m-auto">
          <a role="tab" className="tab tab-active ">
            Posts
          </a>
          <a role="tab" className="tab ">
            About
          </a>
        </div>
      </div>

      <div className="container w-max mx-auto rounded-md flex flex-col h-full">
        <div className="flex flex-col gap-5 h-100 w-145 mx-auto mt-10 text-[#eeeeee]">
          <div className="flex gap-5 justify-between items-center">
            <div className="flex flex-col gap-3">
              <div>@yoshi35</div>
              <div className=" flex gap-2 text-md text-[#a8a8a8]">
                <span>15 Followers</span>
                <span>•</span>
                <span>3 Posts</span>
              </div>
            </div>
            <img
              className="object-cover  rounded-md h-22 w-22 border-2 border-gray-500"
              src="https://www.catconworldwide.com/wp-content/uploads/2023/01/Luna.jpg"
            />
          </div>
          <div>
            Award winning author and illustrator of many silly picture books. I
            have no idea what I am doing most of the time.
          </div>
          <button className="w-1/2 p-2 bg-[#8956FB] rounded-lg">Follow</button>
          <div className="divider"></div>
          <div className="flex flex-col gap-4">
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
