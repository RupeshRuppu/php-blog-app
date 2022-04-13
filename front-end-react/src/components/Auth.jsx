import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const Auth = () => {
  const [state, setState] = useState(true);
  return (
    <div className={`w-screen h-screen relative overflow-hidden`}>
      <div
        id="upper-triangle"
        className={`w-screen absolute transform bg-black h-screen opacity-80
        ${
          state
            ? "top-0 left-0 origin-top-left sm:origin-bottom-left -rotate-[30deg]  shadow-2xl shadow-slate-900"
            : "bottom-0 right-0 origin-bottom-right sm:origin-top-right -rotate-[30deg] shadow-inner shadow-white"
        }
        `}
      ></div>
      <div className="absolute bg-transparent w-screen h-screen z-10">
        {state ? <Login setState={setState} /> : <SignUp setState={setState} />}
      </div>
    </div>
  );
};

export default Auth;
