import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUser } from "../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });
    const data = res.data;
    if (res.status === 200) {
      dispatch(loginUser());
      toast.success(data.message);
      navigate("/");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-lg p-5 shadow-lg flex flex-col gap-3 w-[80vw] lg:w-[20vw] text-sm"
      >
        <input
          type="email"
          name="email"
          id="email"
          className="outline-none border border-gray-400 rounded-md px-3 py-2 focus:border-green-400 text-gray-600"
          autoComplete="off"
          placeholder="sudhanshu8967@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          className="outline-none border border-gray-400 rounded-md px-3 py-2 focus:border-green-400 text-gray-600"
          autoComplete="off"
          placeholder="*******"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link
          to="/forgot-password"
          className="text-xs text-gray-600 hover:underline cursor-pointer mb-1"
        >
          Forgot Password
        </Link>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-400 outline-none rounded-md px-3 py-2 text-white"
        >
          Login
        </button>
        <p className="text-xs text-gray-600 flex gap-2 mt-1">
          <span>Or</span>
          <Link to="/signup" className="hover:text-green-600">
            Create your account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
