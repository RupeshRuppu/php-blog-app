import { createContext, useContext, useState } from "react";
import { useUserContext } from "./UserContext";
const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

function PostContextProvider(props) {
  const { user } = useUserContext();
  const [posts, setPosts] = useState([]);
  async function fetchOnSearhResult(search) {
    const response = await fetch(
      `http://localhost/BLOG-API/post/post_resource.php?logic=search_post&search=${search}`
    );
    const res = await response.json();
    console.log(res);
    setPosts(res.posts);
  }
  async function deletePost(postid) {
    const response = await fetch(
      `http://localhost/BLOG-API/post/post_resource.php?logic=delete_post&postid=${postid}&userid=${user}`
    );
    const res = await response.json();
    console.log(res);
    return res.posts;
  }
  const values = {
    posts,
    setPosts,
    fetchOnSearhResult,
    deletePost,
  };

  return (
    <PostContext.Provider value={values}>{props.children}</PostContext.Provider>
  );
}
export default PostContextProvider;
