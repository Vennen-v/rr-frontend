import Post from "../components/Post";

function Home() {
  return (
    <div className="h-screen overflow-y-auto w-full flex-1">
      <div className="container mx-auto w-max mt-14 flex flex-col gap-5 ">
        <div role="tablist" className="tabs tabs-border mb-14">
          <a role="tab" className="tab tab-active text-lg">
            Discover
          </a>
          <a role="tab" className="tab text-lg">
            Following
          </a>
        </div>
        <div className="flex flex-col gap-7">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
}

export default Home;
