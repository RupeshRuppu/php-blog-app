import Blog from "./images/blog.svg";
import EPN from "./images/3epn.svg";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-screen h-screen bg-slate-50 flex flex-col justify-between p-5 space-y-5">
      <div className="flex-1">
        <h1 className="text-8xl text-indigo-400 font-bold text-center">
          Deep Dive
        </h1>
      </div>
      <div className="p-10 flex space-x-5 justify-center items-center flex-1">
        <div className="space-y-4">
          <h1 className="text-6xl">Spread your knowlege with writing blogs.</h1>
          <p className="text-indigo-300 font-bold">
            Don't focus on having a great blog. Focus on producing a blog that’s
            great for your readers.
          </p>
        </div>
        <div className="flex">
          <img
            className="w-1/2 h-1/2 pointer-events-none"
            src={Blog}
            alt="img1"
          />
          <img
            className="w-1/2 h-1/2 pointer-events-none"
            src={EPN}
            alt="img2"
          />
        </div>
      </div>
      <div className="flex justify-center items-center flex-1">
        <a
          className="bg-green-500 px-8 py-2 rounded-full text-white
            hover:bg-green-400 cursor-pointer"
          onClick={() => navigate("/auth")}
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default App;
