import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../redux/slices/SearchSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import NavList from "./NavList";
import axios from "axios";
import { loginUser, setUser } from "../redux/slices/AuthSlice";
import { getCart } from "../../helper";
import { setCart } from "../redux/slices/CartSlice";

axios.defaults.withCredentials = true;

const Navbar = () => {
  const dispatch = useDispatch();
  const [toggleNav, setToggleNav] = useState(false);

  const auth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);

  const getUser = async () => {
    const res = await axios.get("http://localhost:5000/api/get-user");
    const data = await res.data;
    dispatch(setUser(data.user));
    dispatch(loginUser());
  };

  getCart(user).then((data) => dispatch(setCart(data.cartItems)));

  useEffect(() => {
    getUser();
  }, []);
  return (
    <nav className="flex flex-col lg:flex-row justify-between mx-6 py-3">
      <div>
        <h3 className="text-xl font-medium text-gray-900 bg-gradient-to-r from-green-800 to-blue-800 text-transparent bg-clip-text p-3 rounded-lg  flex items-center space-x-2">
          <span>{new Date().toUTCString().slice(0, 16)}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 text-gray-800"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </h3>
        {/* <h3 className="text-xl font-bold text-gray-600">
          {new Date().toUTCString().slice(0, 16)}
        </h3> */}
        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight tracking-tight bg-gradient-to-r from-green-600 to-blue-700 text-transparent bg-clip-text p-2 flex items-center justify-center">
          QuickPlate: <span className="ml-3 mt-2">Quick Bites, Big Smiles!</span>
        </h1>
        {/* <h1 className="text-2xl font-bold">QuickBite : Taste the Speed</h1> */}
      </div>
      <div>
        <input
          type="search"
          name=""
          id=""
          placeholder="Search here"
          autoComplete="off"
          className="p-3 border border-gray-500 text-sm rounded-lg outline-none w-full lg:w-[25vw]"
          onChange={(e) => {
            dispatch(setSearch(e.target.value));
          }}
        />
      </div>

      {/* GiHam is set to true and hidden and MdClo is set to false and hidden */}
      <GiHamburgerMenu
        className={`absolute top-5 right-5 lg:right-8 lg:top-6 text-2xl text-gray-600 cursor-pointer ${
          toggleNav && "hidden"
        } transition-all ease-in-out duration-500`}
        onClick={() => setToggleNav(true)}
      />
      <MdClose
        className={`absolute top-5 right-5 lg:right-8 lg:top-6 text-2xl text-gray-600 cursor-pointer ${
          !toggleNav && "hidden"
        } transition-all ease-in-out duration-500`}
        onClick={() => setToggleNav(false)}
      />

      {/* passing props to NavList */}
      <NavList toggleNav={toggleNav} setToggleNav={setToggleNav} auth={auth} />
    </nav>
  );
};

export default Navbar;
