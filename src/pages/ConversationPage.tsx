function Conversation() {
  return (
    <div className="flex flex-col flex-1 w-full h-full mx-auto bg-[#141414] relative">
      <div className=" h-15 border-b border-b-gray-500 w-full text-xl text-[#eeeeee] font-bold p-5 ">
        Harima K.
      </div>
      <div className="flex flex-col h-full mx-10 mt-5 mb-5 ">
        <div className="mt-auto ">
          <div className="chat chat-start mt-auto">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://media.tenor.com/akJHc9Lw_JIAAAAe/harima-kenji-school-rumble.png" />
              </div>
            </div>
            <div className="chat-header">
              Harima K.
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble bg-gray-700">
              You were the Chosen One!
            </div>
          </div>
          <div className="chat chat-end mt-auto">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://cdn.britannica.com/39/226539-050-D21D7721/Portrait-of-a-cat-with-whiskers-visible.jpg"
                />
              </div>
            </div>
            <div className="chat-header">
              Yoshi Vennen
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble bg-blue-500">I hate you!</div>
          </div>
        </div>
      </div>
      <div className="flex h-15 my-2 items-center ">
        <div className="ml-4 mt-2 mr-0">
          <img
            className="rounded-full h-12 w-12 object-cover"
            src="https://cdn.britannica.com/39/226539-050-D21D7721/Portrait-of-a-cat-with-whiskers-visible.jpg"
          />
        </div>
        <div className="w-9/10 h-12 ml-4 mr-auto flex items-center border border-gray-500 rounded-full">
          <input
            // value={userName}
            // onChange={handleUsernameChange}
            type="text"
            placeholder="Message..."
            className="w-full p-3 rounded-full focus:outline-1 focus:outline-white"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
