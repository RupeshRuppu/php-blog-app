import { useState, useRef, useEffect } from "react";
import { EyeIcon, UserIcon, EyeOffIcon } from "@heroicons/react/outline";
import Modal from "./Modal";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setState }) => {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const [show, setShow] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const fullnameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  useEffect(() => {
    function checkIfUserExists() {
      user && navigate("/blog-posts");
    }
    checkIfUserExists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", fullnameRef.current);
    formData.append("email", emailRef.current);
    formData.append("password", passwordRef.current);

    setShow(true);

    const response = await fetch(
      "http://localhost/BLOG-API/user/user_resource.php?user=register",
      {
        method: "post",
        body: formData,
      }
    );

    setShow(false);
    const res = await response.json();
    if (res.user_register_data) {
      const { uid } = res.user_register_data;
      if (uid !== null) {
        await setUser(uid);
        navigate("/blog-posts");
      }
    } else if (res.error.includes("Duplicate entry")) setEmailError(true);
  };

  return (
    <div className="relative w-screen h-screen">
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        w-[400px] h-[480px] sm:w-[500px] sm:h-[500px] 
        flex flex-col p-3 z-10 shadow-2xl shadow-slate-400 rounded-xl
    "
      >
        <header
          className="w-full h-24 flex flex-col justify-around text-center select-none
       text-slate-700 sm:text-white md:text-slate-900"
        >
          <h1 className="text-3xl text-rose-500 font-bold">SignIn Form</h1>
          <p className="tracking-wide text-xl text-slate-600">
            Please enter your{" "}
            <span className="text-rose-600 text-lg">
              fullname, email & create password!
            </span>
          </p>
        </header>
        <div
          className="flex justify-center mt-5 w-full
       bg-transparent"
        >
          <UserIcon className="w-14 h-14 text-white bg-indigo-500 rounded-full p-2" />
        </div>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="flex-grow relative flex flex-col justify-center 
      items-center space-y-4"
        >
          <input
            type="text"
            name="fullname"
            id="fullname"
            className="px-4 py-2  bg-zinc-500 text-white rounded-full w-72 sm:w-80 outline-none border-none focus:ring-4 focus:ring-offset-indigo-900"
            onChange={(e) => (fullnameRef.current = e.target.value)}
          />
          <input
            type="email"
            name="email"
            id="email"
            className="px-4 py-2 bg-zinc-500 text-white rounded-full w-72 sm:w-80 outline-none border-none focus:ring-4 focus:ring-offset-indigo-900"
            onChange={(e) => (emailRef.current = e.target.value)}
          />
          <div className="flex space-x-5">
            <input
              type={show ? "text" : "password"}
              name="password"
              id="password"
              className="px-4 py-2 bg-zinc-500 text-white ml-14 rounded-full w-72 sm:w-80 outline-none border-none focus:ring-4 focus:ring-offset-indigo-900"
              onChange={(e) => (passwordRef.current = e.target.value)}
            />
            {show ? (
              <EyeIcon
                className="w-8 h-10 sm:w-10 sm:h-10 cursor-pointer sm:text-white"
                onClick={() => setShow((p) => !p)}
              />
            ) : (
              <EyeOffIcon
                className="w-8 h-10 sm:w-10 sm:h-10 cursor-pointer sm:text-white"
                onClick={() => setShow((p) => !p)}
              />
            )}
          </div>
          <input
            type="submit"
            value="SignIn"
            className="tracking-widest bg-indigo-400 px-16 sm:px-20 py-2 
          rounded-full text-white outline-none border-none focus:ring-4 focus:ring-offset-indigo-900
          cursor-pointer"
          />
        </form>
        <div className="text-center text-white mb-2">
          Have an account already ?{" "}
          <span
            className="ml-3 font-bold cursor-pointer tracking-wider text-rose-600"
            onClick={() => setState((prev) => !prev)}
          >
            Please Login
          </span>
        </div>
      </div>
      {show && (
        <div
          className="absolute w-screen h-screen z-20 bg-slate-800 opacity-50 top-0 left-0
        grid place-items-center"
        >
          <Modal show={show} />
        </div>
      )}
      {emailError && (
        <div
          onClick={() => setEmailError(false)}
          className="absolute w-screen h-screen z-20 bg-slate-800 opacity-80 top-0 left-0
        grid place-items-center text-white text-4xl text-bold backdrop-blur-sm transition-all duration-500"
        >
          Email is already taken
        </div>
      )}
    </div>
  );
};

export default SignIn;
