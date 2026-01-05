import React, { useState } from "react";
import assets from "../assets/assets";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  const[email, setEmail] = useState('admin@forever.com');
  const[password, setPassword] = useState('password78');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <img className="py-2 px-[45px]" src={assets.logo} alt="" />

      <div className=" md:text-xl text-base flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg px-8 py-6 md:w-[40%] ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt14 gap-4 text-gray-800"
          >
            <div className="inline-flex items-center gap-2 mb-2 mt-10">
              <p className="prata-regular md:text-3xl">Admin Panel Sign In</p>
              <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
            </div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              className="w-full px-3 py-2 border border-gray-800"
              placeholder="Your@email.com"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              className="w-full px-3 py-2 border border-gray-800"
              placeholder="Password"
            />
            <button className="bg-black text-white font-light px-8 py-2 mt-4">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
