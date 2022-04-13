import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserContext } from "../contexts/UserContext";
import { usePostContext } from "../contexts/PostContext";
import Header from "./Header";
import Post from "./Post";

const Home = () => {
  const { user } = useUserContext();
  const { setPosts, posts } = usePostContext();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(
        `http://localhost/BLOG-API/post/post_resource.php?logic=fetch_non_user_posts&userid=${user}`,
        {
          method: "post",
        }
      );
      const data = await res.json();
      console.log(data);
      setPosts(data.posts);
    }

    function checkIfUserExists() {
      !user && navigate("/auth");
    }
    checkIfUserExists();
    fetchPosts();
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-x-hidden">
      <Header />
      <div className="relative top-20 h-[100vh] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-10 gap-y-5">
        {posts.map((post) => (
          <Post
            key={post.postid}
            id={post.postid}
            title={post.posttitle}
            data={post.postdata}
            uid={post.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
