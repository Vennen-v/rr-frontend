import Post from "../components/Post";

function Home() {
  return (
    <div className="mx-auto mt-10 text-gray-200 flex flex-col gap-5">
      <div role="tablist" className="tabs tabs-border mb-10">
        <a role="tab" className="tab tab-active ">
          Discover
        </a>
        <a role="tab" className="tab">
          Following
        </a>
      </div>
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default Home;
