import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const NavList = ({ toggleNav, setToggleNav, auth }) => {
  const handleLogout = async () => {
    const res = await axios.get("http://localhost:5000/api/logout");
    const data = await res.data;
    toast.success(data.message);
    window.location.href = "/"; // change the current url of the website
  };
  return (
    <div
      className={` ${
        !toggleNav && "translate-x-[200px]"
      } fixed top-12 right-5 lg:right-8 lg:top-14 p-4 w-fit bg-white bg-opacity-80 backdrop-blur-sm rounded-md border border-gray-400 font-bold text-gray-800 transition-all duration-500 ease-in-out`}
    >
      {auth ? (
        <li
          onClick={handleLogout}
          // className="hover:text-black select-none list-none cursor-pointer"
          className="text-gray-700 hover:text-gray-900 font-medium select-none list-none cursor-pointer transition duration-200 ease-in-out"
        >
          Logout
        </li>
      ) : (
        <div className="flex flex-col items-start space-y-2">
          <Link
            to="/login"
            className="text-gray-700 hover:text-gray-900 font-medium select-none list-none transition duration-200 ease-in-out"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-gray-700 hover:text-gray-900 font-medium select-none list-none transition duration-200 ease-in-out"
          >
            Signup
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavList;
