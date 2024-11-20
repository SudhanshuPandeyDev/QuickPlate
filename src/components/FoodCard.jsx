import React from "react";
import { IoStarSharp } from "react-icons/io5";
// useDispatch sends actions to update the state
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { getCart } from "../../helper.js";
import { setCart } from "../redux/slices/CartSlice.jsx";

const FoodCard = ({ id, name, price, desc, img, rating, handleToast }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const addToCart = async ({ id, name, img, price, rating, quantity }) => {
    const res = await axios.post(
      `https://quickplate-backend.onrender.com/api/add-to-cart/${user._id}`,
      { id, image: img, name, price, rating, quantity }
    );
    const data = await res.data;
    toast.success(data.message);
    getCart(user).then((data) => dispatch(setCart(data.cartItems)));
  };
  return (
    <div className="font-bold w-[290px] bg-white p-5 flex flex-col rounded-lg gap-2">
      <img
        src={img}
        alt=""
        className="w-auto h-[130px] hover:scale-110 cursor-grab transition-all duration-500 ease-in-out"
      />
      {/* <div className="text-sm flex justify-between">
        <h2>{name}</h2>
        <span className="text-green-600">₹{price}</span>
      </div> */}
      <div className="flex justify-between items-center text-sm">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <span className="text-xl font-bold text-green-600 tracking-wide">
          ₹{price}
        </span>
      </div>

      {/* <p className="text-sm font-normal">{desc.slice(0, 50)}...</p> */}
      <p className="text-sm font-medium text-gray-700 leading-relaxed">
        {desc.slice(0, 50)}...
      </p>

      <div className="flex justify-between">
        {/* <span className="flex justify-center items-center">
          <IoStarSharp className="mr-1 text-yellow-500" /> {rating}
        </span> */}
        <span className="flex items-center text-sm font-medium text-gray-800">
          <IoStarSharp className="text-xl mr-1 text-yellow-400" />
          <span className="text-lg text-gray-700">{rating}</span>
        </span>

        <button
          onClick={() => {
            !user
              ? toast.error("Please Login to add to cart")
              : addToCart({ id, name, img, price, rating, quantity: 1 });
          }}
          // className="p-1 text-white bg-green-500 hover:bg-green-600 rounded-md text-sm"
          className="p-2 bg-green-600 hover:bg-green-700 text-white font-light rounded-sm shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
