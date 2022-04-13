import { useState, useRef, useEffect } from "react";
import { EyeIcon, UserIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Login = ({ setState }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    function checkIfUserExists() {
      user && navigate("/blog-posts");
    }
    checkIfUserExists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", emailRef.current);
    formData.append("password", passwordRef.current);
    const response = await fetch(
      "http://localhost/BLOG-API/user/user_resource.php?user=login",
      {
        method: "post",
        body: formData,
      }
    );
    const res = await response.json();
    console.log(res);
    if (res.user_login_data?.uid) {
      await setUser(res.user_login_data.uid);
      navigate("/blog-posts");
    } else if (res.user_login_data === null) setError(true);
  };

  return (
    <div className="relative w-screen h-screen">
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        w-[500px] h-[450px] sm:w-[500px] sm:h-[500px] 
        flex flex-col p-3 z-10  shadow-2xl shadow-slate-400 rounded-xl
    "
      >
        <header
          className="w-full h-24 flex flex-col justify-around text-center select-none
       sm:text-white text-slate-400"
        >
          <h1 className="text-3xl text-rose-500 font-bold">Login Form</h1>
          <p className="tracking-wide text-xl">
            Please login with your{" "}
            <span className="text-rose-600">email & password!</span>
          </p>
        </header>
        <div
          className="flex justify-center w-full
       bg-transparent mt-3"
        >
          <UserIcon className="w-14 h-14 text-white bg-red-400 rounded-full p-2" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex-grow relative flex flex-col justify-center 
      items-center space-y-4"
          autoComplete="off"
        >
          <input
            type="email"
            name="email"
            id="email"
            className="px-4 py-2 w-72 bg-zinc-500 text-white rounded-full sm:w-80 outline-none border-none focus:ring-4 focus:ring-offset-indigo-900"
            onChange={(e) => (emailRef.current = e.target.value)}
          />
          <div className="flex space-x-5">
            <input
              type={show ? "text" : "password"}
              name="password"
              id="password"
              className="px-4 py-2 w-72 bg-zinc-500 text-white ml-14 rounded-full sm:w-80 outline-none border-none focus:ring-4 focus:ring-offset-indigo-900"
              onChange={(e) => (passwordRef.current = e.target.value)}
            />
            {show ? (
              <EyeIcon
                className="w-8 h-10 sm:w-10 sm:h-10 cursor-pointer"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <EyeOffIcon
                className="w-8 h-10 sm:w-10 sm:h-10 cursor-pointer"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>
          <input
            type="submit"
            value="LOGIN"
            className="tracking-widest bg-indigo-400 px-20 sm:px-20 py-2 
          rounded-full text-white outline-none border-none focus:ring-4 focus:ring-offset-indigo-900
          cursor-pointer"
          />
        </form>
        <div className="text-center mb-2">
          Don't have an account ?{" "}
          <span
            className="ml-2 font-bold cursor-pointer tracking-wider text-red-400"
            onClick={() => setState((prev) => !prev)}
          >
            Create One
          </span>
        </div>
        <div className="text-center mb-2">
          Forgot password ?{" "}
          <span
            className="ml-2 font-bold cursor-pointer tracking-wider text-red-400"
            onClick={() => setState((prev) => !prev)}
          >
            Click here to reset it!
          </span>
        </div>
      </div>
      {error && (
        <div
          onClick={() => setError(false)}
          className="absolute w-screen h-screen z-20 bg-slate-800 opacity-80 top-0 left-0
        grid place-items-center text-white text-4xl text-bold backdrop-blur-sm transition-all duration-500"
        >
          Please input valid credentials!
        </div>
      )}
    </div>
  );
};

export default Login;
