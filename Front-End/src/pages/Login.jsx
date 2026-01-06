import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { backendUrl, token, setToken, navigate} = useContext(ShopContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name: name,
          email: email,
          password: password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setCurrentState("Login");
          toast.success(response.data.message, { autoClose: 1500 });
        } else {
          toast.error(response.data.message, { autoClose: 1500 });
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email: email,
          password: password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          //   navigate("/");
          toast.success(response.data.message, { autoClose: 1500 });
        } else {
          toast.error(response.data.message, { autoClose: 1500 });
        }

      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Your@email.com"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
      />
      <div className="w-full flex justify-between text-sm mt-[8px]">
        <p className="prata-regular">
          {currentState === "Login"
            ? "Forgot Password?"
            : "Already have an account?"}
        </p>
        <p
          onClick={() =>
            currentState === "Login"
              ? setCurrentState("Sign Up")
              : setCurrentState("Login")
          }
          className="prata-regular cursor-pointer"
        >
          {currentState === "Login" ? "Create an account" : "Login Here"}
        </p>
      </div>

      <button className=" cursor-pointer bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
