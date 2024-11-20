import React from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { getCart } from "../../helper";
import { setCart } from "../redux/slices/CartSlice";

const ItemCard = ({ id, name, quantity, price, image, _id }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const removeFromCart = async (id) => {
    const res = await axios.delete(
      `https://quickplate-backend.onrender.com/api/remove-from-cart/${id}`
    );
    const data = await res.data;
    getCart(user).then((data) => dispatch(setCart(data.cartItems || [])));
    toast.success(data.message);
  };

  const incrementQuantity = async (id) => {
    const res = await axios.put(
      `https://quickplate-backend.onrender.com/api/increment-quantity/${id}`
    );
    const data = res.data;
    getCart(user).then((data) => dispatch(setCart(data.cartItems)));
  };

  const decrementQuantity = async (id) => {
    const res = await axios.put(
      `https://quickplate-backend.onrender.com/api/decrement-quantity/${id}`
    );
    const data = res.data;
    getCart(user).then((data) => dispatch(setCart(data.cartItems)));
  };

  return (
    <div className="flex gap-4 shadow-md rounded-lg p-2 bg-slate-100 mt-3">
      <MdDelete
        onClick={() => {
          removeFromCart(_id);
        }}
        className="absolute right-8 text-gray-600 cursor-pointer text-xl"
      />
      <img src={image} alt="" className="w-[50px] h-[50px]" />
      <div className="leading-5">
        <h3 className="text-gray-800 font-bold">{name}</h3>
        <div className="flex justify-between">
          <span className="text-green-500 font-bold">₹{price}</span>
          <div className="flex justify-center items-center gap-2 absolute right-9 ">
            <FiMinus
              onClick={() =>
                quantity > 1 ? decrementQuantity(_id) : (quantity = 0)
              }
              className="border-2 border-gray-600 text-gray-900 h-[15px] w-[15px] hover:text-white hover:bg-green-500 hover:border-none p-0.5 transition-all ease-linear cursor-pointer"
            />
            <span>{quantity}</span>
            <FiPlus
              onClick={() =>
                quantity >= 1 ? incrementQuantity(_id) : (quantity = 0)
              }
              className="border-2 border-gray-600 text-gray-900 h-[15px] w-[15px] hover:text-white hover:bg-green-500 hover:border-none p-0.5 transition-all ease-linear cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
