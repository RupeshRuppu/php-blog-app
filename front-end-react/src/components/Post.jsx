import { useNavigate } from "react-router-dom";

const Post = ({ title, data, id }) => {
  const navigate = useNavigate();
  return (
    <div
      className="relative h-52 space-y-5 hover:bg-slate-100 p-5 flex flex-col justify-around"
      key={id}
    >
      <h1
        onClick={() => {
          navigate(`/view-posts/${id}`);
        }}
        className="text-xl font-bold cursor-pointer"
      >
        {title}
      </h1>
      <div className="overflow-y-hidden text-ellipsis text-justify">{data}</div>
    </div>
  );
};

export default Post;
