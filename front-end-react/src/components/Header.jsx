import { UserCircleIcon, SearchIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { usePostContext } from "../contexts/PostContext";

const Header = () => {
  const [showUser, setShowUser] = useState(false);
  const searchRef = useRef("");
  const { user, setUser } = useUserContext();
  const { fetchOnSearhResult } = usePostContext();
  const navigate = useNavigate();

  const deleteUser = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost/BLOG-API/user/user_resource.php?user=delete&uid=${user}`
    );

    const res = await response.json();
    console.log(res);
    if (res.user_deleted) {
      await setUser(null);
      navigate("/auth");
    }
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-screen h-16 bg-blue-500 shadow-lg shadow-slate-500 px-20
      flex items-center backdrop-blur-md z-30"
      >
        <nav className="flex justify-between w-full">
          <div className="flex space-x-8 justify-center">
            <h1 className="text-white text-2xl font-bold">Deep Dive</h1>
            <div className="flex">
              <input
                type="text"
                name="search"
                id="search"
                className="search"
                onChange={(e) => (searchRef.current = e.target.value)}
              />
              <SearchIcon
                className="relative w-5 h-5 top-3 right-10 cursor-pointer text-white"
                onClick={() => fetchOnSearhResult(searchRef.current)}
              />
            </div>
          </div>
          <div className="flex space-x-5 justify-center items-center">
            {!user && (
              <button
                className="font-semibold text-lg bg-slate-100 px-3 py-1 rounded-md opacity-30
            hover:opacity-60"
                onClick={() => navigate("/auth")}
              >
                LOGIN
              </button>
            )}
            <h1
              className="cursor-pointer text-lg text-white"
              onClick={() => navigate("/user-posts")}
            >
              My Posts
            </h1>
            <UserCircleIcon
              className="w-10 h-10 cursor-pointer text-white"
              onClick={() => {
                setShowUser((prev) => !prev);
              }}
            />
          </div>
        </nav>
      </div>
      {showUser && (
        <div className="absolute w-screen h-screen bg-slate-300 z-20 grid place-items-center">
          {user !== null ? (
            <div className="space-y-4 space-x-5">
              <h1 className="text-2xl font-bold">
                User Unique Id : <span className="text-blue-800">{user}</span>
              </h1>
              <button
                className="bg-red-500 px-4 py-2 rounded-md"
                onClick={async () => {
                  await setUser(null);
                  navigate("/auth");
                }}
              >
                LOGOUT
              </button>
              <button
                className="bg-red-500 px-4 py-2 rounded-md"
                onClick={deleteUser}
              >
                DELETE ACCOUNT
              </button>
            </div>
          ) : (
            <div className="text-3xl font-bold">
              No user account detected Please login first!
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
