import { useUserContext } from "../contexts/UserContext";
import { usePostContext } from "../contexts/PostContext";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { user } = useUserContext();
  const { setPosts } = usePostContext();
  const navigate = useNavigate();
  const titleRef = useRef("");
  const categoryRef = useRef("");
  const dataRef = useRef("");

  useEffect(() => {
    if (!user) navigate("/auth");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", titleRef.current);
    formData.append("category", categoryRef.current);
    formData.append("data", dataRef.current);

    const response = await fetch(
      `http://localhost/BLOG-API/post/post_resource.php?logic=create_post&userid=${user}`,
      {
        method: "post",
        body: formData,
      }
    );
    const res = await response.json();
    console.log(res);
    await setPosts(res.posts);
    navigate(-1);
  };

  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="border-2 border-black  w-1/2 h-1/2 relative p-2">
        <form
          onSubmit={handleSubmit}
          className="relative flex-col flex w-full h-full"
        >
          <div className="w-full h-30 flex justify-around items-center">
            <div className="flex space-x-3">
              <label htmlFor="ptitle" className="text-red-500">
                Post Title
              </label>
              <input
                type="text"
                className="outline-none bg-slate-100 p-2 rounded-md"
                name="ptitle"
                id="ptitle"
                onChange={(e) => (titleRef.current = e.target.value)}
              />
            </div>
            <div className="flex space-x-3">
              <label htmlFor="pcategory" className="text-red-500">
                Post Category
              </label>
              <input
                type="text"
                className="outline-none bg-slate-100 p-2 rounded-md"
                name="pcategory"
                id="pcategory"
                onChange={(e) => (categoryRef.current = e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 relative p-5">
            <label
              htmlFor="pdata"
              className="text-red-500 underline-offset-2 underline"
            >
              Post Data
            </label>
            <textarea
              className="w-full h-full outline-none p-5"
              name="pdata"
              id="pdata"
              onChange={(e) => (dataRef.current = e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="px-4 py-2 bg-green-400 rounded-md">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
