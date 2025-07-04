import { ArrowLeft } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { currentUser } from "../store/atoms";
import useSiteTitle from "../utils/title";

function CreatePostPage() {
  const user = useAtomValue(currentUser);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean | undefined>();
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");

  useSiteTitle("Create New Post | The Rogue Road");

  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    // const target = e.target as HTMLInputElement & {
    //   files: FileList;
    // };
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
    // console.log(file?.name);
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  async function handlePostUpload() {
    // if (!file || !title || !content) {
    //   toast.error("All fields are required");
    //   return;
    // }

    if (!title || title == "") {
      toast.error("A title is required");
      return;
    }

    if (!file) {
      toast.error("A feature photo is requied");
      return;
    }
    if (!content || content == "<p><br></p>") {
      toast.error("You cannot publish an empty post");
      return;
    }

    if (!user?.emailVerified) {
      toast.error("Your email must be verified to publish a new post");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("content", content);

    setIsLoading(true);
    try {
      await api.post(`/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log("i tried it");
      toast.success("Your post has been published!");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",

    "indent",
    "link",
    "image",
  ];

  return (
    <div className="h-screen overflow-y-auto w-full  flex-1 text-gray-200 bg-[#141414]">
      <div className=" h-20 border-b flex justify-between items-center border-b-gray-500 w-full text-center text-[#eeeeee]">
        <button
          onClick={() => navigate(-1)}
          className=" p-2 gap-3 text-xl ml-4 rounded-lg duration-300 ease-in-out hover:bg-[#383838] hover:cursor-pointer"
        >
          <ArrowLeft />
        </button>
        <button
          disabled={isLoading}
          onClick={handlePostUpload}
          className="w-20 h-10 mr-4 p-1 text-sm bg-[#8956FB] rounded-lg duration-300 ease-in-out hover:bg-[#674b9b] hover:cursor-pointer"
        >
          {isLoading && (
            <span className="loading loading-spinner loading-xs m-auto"></span>
          )}{" "}
          Publish
        </button>
      </div>
      <div className="mx-5 md:mx-10 lg:hidden">
        <input
          // {...register("password")}
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-20 p-4 rounded-lg bg-[#141414]"
        />
        <div className="w-full flex flex-col mx-auto p-5 gap-2">
          <label className="text-sm">Feature Photo:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input h-8 bg-[#202020] "
          />
        </div>
      </div>
      <div className="flex container h-screen w-max justify-around mx-9 lg:mt-0 gap-4 md:mx-auto">
        <div className="">
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={content}
            onChange={setContent}
            className="w-83 md:w-190 lg:w-180  mx-auto"
          />
        </div>
        <div className="hidden lg:block w-105 h-100 bg-[#202020] mt-20 rounded-lg">
          <form className="w-full h-full flex flex-col items-center gap-7 mt-10">
            <div className="flex flex-col gap-2 w-full p-5">
              <div className="w-full border border-gray-500 rounded-lg">
                <textarea
                  // {...register("password")}
                  placeholder="Title..."
                  value={title}
                  onChange={handleTitleChange}
                  className="w-full h-30 m-0 p-4 rounded-lg bg-[#141414]"
                />
              </div>
            </div>
            {/* {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )} */}
            <div className="w-full flex flex-col mx-auto p-5 gap-5">
              <label>Feature Photo:</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="file-input bg-[#202020] "
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePostPage;
