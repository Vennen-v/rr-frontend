import { Bookmark, EllipsisVertical, Heart, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import api from "../api/api";
import { Posts } from "../types/types";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Posts>();

  useEffect(() => {
    fetchPostInfo();
  }, [location.pathname]);

  async function fetchPostInfo() {
    try {
      const { data } = await api.get(`/posts/${id}`);
      setPost(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" flex flex-col flex-1 w-fit h-screen mx-auto overflow-y-auto bg-[#141414]">
      <div className=" flex justify-between h-14 mb-8 border-b border-b-gray-500 w-full text-xl items-center text-[#eeeeee] font-semibold p-5">
        <div className="flex items-center gap-2">
          <img
            className="object-cover rounded-md h-10 w-10 "
            src={post?.profilePic}
          />
          {post?.displayName}
        </div>
        <button className="p-3 bg-[#8956FB] text-sm rounded-lg duration-300 ease-in-out hover:bg-[#674b9b] hover:cursor-pointer">
          Follow
        </button>
      </div>
      <div className="container w-max mx-auto rounded-md flex flex-col h-full">
        <div className="flex flex-col gap-5 h-100 w-92 sm:w-80 md:w-183 mx-auto mb-10  text-[#eeeeee]">
          <img
            className="h-16 w-16 md:h-full md:w-full object-cover rounded-sm "
            src={post?.postImg}
          />
          <div className="text-4xl font-sans">{post?.title}</div>
          <div>
            <div className="flex items-center gap-3">
              <img
                className="object-cover rounded-md h-8 w-8 "
                src={post?.profilePic}
              />
              <div className="flex flex-col">
                <span className="text-xs">{post?.displayName}</span>

                {/* Still NEED DATES */}

                <div className="text-xs text-[#a8a8a8]">May 9, 2025</div>
              </div>
            </div>
          </div>
          <div className="divider mx-1 my-5"></div>

          {/* Below will be note content later but just to see the look */}
          <div
            className="mx-2"
            dangerouslySetInnerHTML={{ __html: post?.content }}
          >
            {/* {parse(post.content)} */}
            {/* <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              tincidunt erat ut risus sollicitudin placerat. In hac habitasse
              platea dictumst. Duis iaculis tincidunt velit, in sagittis ipsum
              iaculis et. Mauris augue est, luctus vitae purus semper, vehicula
              hendrerit lectus. Morbi volutpat varius diam vitae volutpat.
              Maecenas egestas a mi eget malesuada. Nulla ultricies ac justo nec
              sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed non condimentum augue. In sodales ut lorem vitae faucibus.
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
              Donec dapibus turpis purus, vitae mattis turpis blandit sed.
              Aliquam ornare feugiat libero ac sodales. Ut id pharetra enim, at
              euismod risus.
            </p>
            <p>&nbsp;</p>
            <p>
              In sodales quam eu tellus viverra, quis mattis odio placerat. Nam
              luctus et justo eget commodo. Praesent vulputate sagittis
              facilisis. Nulla nec urna pulvinar, lacinia ex vitae, imperdiet
              nulla. Praesent at metus at mi laoreet rutrum. Vivamus sed ornare
              nisi. Quisque congue iaculis posuere. Phasellus ullamcorper purus
              id quam bibendum laoreet. Pellentesque habitant morbi tristique
              senectus et netus et malesuada fames ac turpis egestas. Phasellus
              ut lectus vel lacus sollicitudin convallis at nec metus. Proin
              velit purus, pretium at tortor vitae, egestas euismod ipsum. Nunc
              a convallis ipsum.
            </p>
            <p>&nbsp;</p>
            <p>
              Aenean convallis ac justo vel porttitor. Pellentesque vel nisl
              mauris. Proin egestas, libero nec gravida rutrum, urna nibh auctor
              nunc, eu condimentum lorem mi eu odio. Vivamus bibendum elementum
              urna, sit amet interdum justo placerat quis. Fusce quis elit
              metus. Curabitur dictum lacus eget odio rhoncus, sit amet commodo
              quam ornare. Mauris vel ante sit amet magna aliquet finibus. Duis
              leo ante, tristique a ligula non, sagittis lobortis metus.
            </p> */}
          </div>
          {/* Above will be note content later but just to see the look */}

          <div className=" flex justify-between mt-10 p-2">
            <div className="flex gap-7 ">
              <button className="flex gap-1 items-center text-[#a8a8a8] hover:cursor-pointer">
                <Heart size={25} />{" "}
                <span className="text-sm md:text-base">16</span>
              </button>
              <button className="flex gap-1 items-center text-[#a8a8a8] hover:cursor-pointer">
                <MessageSquare size={25} />{" "}
                <span className="text-sm md:text-base">5</span>
              </button>
              <button className="flex gap-1 items-center text-[#a8a8a8] hover:cursor-pointer">
                <Bookmark size={25} />{" "}
                <span className="text-sm md:text-base">2</span>
              </button>
            </div>
            <div className="dropdown dropdown-top dropdown-end">
              <div
                className="p-2 duration-300 ease-in-out rounded-full hover:bg-[#8956FB] hover:cursor-pointer focus:bg-[#8956FB]"
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
                  <a>Copy Post Link</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="divider mx-1 mt-2 mb-8"></div>
          <div className="mb-10">Comments</div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
