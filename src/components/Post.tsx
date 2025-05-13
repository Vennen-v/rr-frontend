import { Heart, MessageSquare, Bookmark } from "lucide-react";

function Post() {
  return (
    <div className=" flex flex-col mx-auto w-140 h-74 bg-[#252525] rounded-md">
      <div className="border-b border-b-gray-500 p-3 flex gap-2 items-center">
        <img
          className="rounded-xl h-7 w-7 "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXgwGl5-0mC66avbg7_TzilB0lMAH4sP7iGA&s"
        />

        <span className="text-sm">Emma S</span>
      </div>
      <div className="flex items-center p-5">
        <div className="flex flex-col gap-4">
          <div className="text-xl">
            Cats: Are they getting a little telepathic?
          </div>
          <div className="text-sm text-[#a8a8a8]">5 days ago</div>
        </div>
        <img
          className="h-36 w-52 object-cover rounded-md bg-zinc-950 "
          src="https://skooncatlitter.com/blog/wp-content/uploads/2022/03/blog-COVER-2000x1200px-0.jpg"
        />
      </div>
      <div className="flex gap-4 p-5">
        <button className="flex gap-1 items-center text-[#a8a8a8] hover:cursor-pointer">
          <Heart size={18} /> <span>16</span>
        </button>
        <button className="flex gap-1 items-center text-[#a8a8a8] hover:cursor-pointer">
          <MessageSquare size={18} /> <span>5</span>
        </button>
        <button className="flex gap-1 items-center text-[#a8a8a8] hover:cursor-pointer">
          <Bookmark size={18} /> <span>2</span>
        </button>
      </div>
    </div>
  );
}

export default Post;
