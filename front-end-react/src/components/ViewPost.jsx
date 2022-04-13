import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const ViewPost = () => {
  const [state, setState] = useState({ title: "", data: "", uid: null });
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();

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
      const res = await fetchSpecificProduct();
      const { posttitle, postdata, uid } = res.posts[0];
      setState({ title: posttitle, data: postdata, uid: uid });
    }
  }, []);

  return (
    <div class="grid place-items-center w-screen h-screen">
      <div class="w-1/2 h-1/2">
        <h1 class="text-xl font-bold cursor-pointer">{state.title}</h1>
        <div class="h-[300px] overflow-y-hidden text-ellipsis text-justify">
          {state.data}
        </div>
        {user === state.uid && (
          <div class="flex justify-around items-center">
            <a
              href="{{ route('posts.edit', ['post' => $post['id']]) }}"
              class="hover:bg-slate-200  px-4 py-1 rounded-md"
            >
              EDIT
            </a>
            <a
              href="{{ route('posts.destroy', ['post' => $post['id']]) }}"
              class="hover:bg-slate-200  px-4 py-1 rounded-md"
            >
              DELETE
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPost;
