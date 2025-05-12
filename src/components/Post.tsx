import { Heart, MessageSquare, Bookmark } from "lucide-react";

function Post() {
  return (
    <div className=" flex flex-col my-auto w-140 h-98 bg-[#252525] rounded-md">
      <div className="border-b border-b-gray-500 p-3 flex gap-2 items-center">
        <img
          className="rounded-xl h-7 w-7"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXgwGl5-0mC66avbg7_TzilB0lMAH4sP7iGA&s"
        />
        <span className="text-sm">Emma S</span>
      </div>
      <img
        className="h-50 w-162 object-contain bg-zinc-950"
        src="https://skooncatlitter.com/blog/wp-content/uploads/2022/03/blog-COVER-2000x1200px-0.jpg"
      />
      <div className="flex flex-col p-5 gap-4">
        <div className="text-2xl">
          Cats: Are they getting a little telepathic?
        </div>
        <div className="text-sm text-gray-400">5 days ago</div>
        <div className="flex gap-4">
          <div className="flex gap-1 items-center">
            <Heart size={18} /> <span>16</span>
          </div>
          <div className="flex gap-1 items-center">
            <MessageSquare size={18} /> <span>5</span>
          </div>
          <div className="flex gap-1 items-center">
            <Bookmark size={18} /> <span>2</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
