import { useState, useEffect } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline";
import { usePostContext } from "../contexts/PostContext";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const { deletePost } = usePostContext();
  const navigate = useNavigate();
  const { user } = useUserContext();
  useEffect(() => {
    if (!user) navigate("/auth");
    else {
      const fetchUserPosts = async () => {
        const response = await fetch(
          `http://localhost/BLOG-API/post/post_resource.php?logic=fetch_user_posts&userid=${user}`
        );
        const res = await response.json();
        console.log(res);

        setPosts(res.posts);
      };
      fetchUserPosts();
    }
  }, []);

  return (
    <div className="flex w-screen h-screen overflow-x-hidden p-10 justify-around">
      <div className="w-[300px] p-5 fixed top-0 right-0">
        <button
          className="bg-green-300 px-6 py-2 rounded-md cursor-pointer"
          onClick={() => navigate("/create-post")}
        >
          Create Post
        </button>
      </div>
      <div className="space-y-5">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              className="w-1/2 space-y-5 hover:bg-slate-100 p-5 flex justify-around flex-col"
              key={post.postid}
            >
              <h1
                className="text-xl font-bold cursor-pointer"
                onClick={() => navigate(`/view-posts/${post.postid}`)}
              >
                {post["posttitle"]}
              </h1>
              <div className="overflow-y-hidden text-ellipsis text-justify">
                {post["postdata"]}
              </div>
              <div className="flex justify-around items-center">
                <button
                  className="hover:bg-yellow-500 cursor-pointer px-4 py-1 rounded-md
        space-x-1 flex justify-center items-center"
                  onClick={() => navigate(`/edit-post/${post.postid}`)}
                >
                  <span>EDIT</span>
                  <PencilAltIcon className="w-5 h-5" />
                </button>
                <button
                  className="hover:bg-red-500 cursor-pointer px-4 py-1 rounded-md 
        space-x-1 flex justify-center items-center"
                  onClick={async () => setPosts(await deletePost(post.postid))}
                >
                  <span>DELETE</span>
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-6xl font-bold">No posts created yet!</h1>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
