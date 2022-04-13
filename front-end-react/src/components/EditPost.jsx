import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const EditPost = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useUserContext();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [data, setData] = useState("");
  useEffect(async () => {
    if (!user) navigate("/auth");
    else {
      async function fetchSpecificProduct() {
        const response = await fetch(
          `http://localhost/BLOG-API/post/post_resource.php?logic=specific_post&postid=${params.id}`
        );
        const res = await response.json();
        console.log(res);
        return res;
      }
      const data = await fetchSpecificProduct();
      const { posttitle, postcategory, postdata } = data.posts[0];
      setTitle(posttitle);
      setCategory(postcategory);
      setData(postdata);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("data", data);

    const response = await fetch(
      `http://localhost/BLOG-API/post/post_resource.php?logic=update_post&postid=${params.id}`,
      {
        method: "post",
        body: formData,
      }
    );
    const res = await response.json();
    if (res.updated) navigate("/user-posts");
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
                onChange={(e) => setTitle(e.target.value)}
                value={title}
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
                onChange={(e) => setCategory(e.target.value)}
                value={category}
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
              onChange={(e) => setData(e.target.value)}
              value={data}
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

export default EditPost;
