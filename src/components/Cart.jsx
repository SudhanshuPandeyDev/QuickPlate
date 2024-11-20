import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ItemCard from "./ItemCard";
// useSelector reads data from the state.
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [activeCart, setActiveCart] = useState(false);

  const cartItems = useSelector((state) => state.cart.cart);
  console.log(cartItems);
  const totalQty = cartItems.reduce(
    (totalQty, item) => totalQty + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const navigate = useNavigate();

  return (
    <>
      <div
        className={`fixed top-0 right-0 w-full lg:w-[22vw] h-full bg-white p-5 ${
          activeCart ? "translate-x-0" : "translate-x-full"
        } transition-all duration-500 z-50`}
      >
        <div className="flex justify-between">
          <span className="text-xl font-bold text-gray-800">My Order</span>
          <IoMdClose
            onClick={() => setActiveCart(!activeCart)}
            className="border-2 border-gray-600 text-gray-600 font-bold p-1 text-2xl rounded-md hover:text-red-400 hover:border-red-400 cursor-pointer"
          />
        </div>
        {cartItems.length > 0 ? (
          cartItems.map((food) => {
            return <ItemCard key={food.id} {...food} />;
          })
        ) : (
          <h1 className="text-center text-xl font-bold text-gray-800 m-5">
            Your cart is empty
          </h1>
        )}
        <div className="absolute bottom-8">
          <h3 className="font-medium text-gray-800">Items : {totalQty} </h3>
          <h3 className="font-medium text-gray-800">
            Total Amount : {totalPrice}{" "}
          </h3>
          <hr className="my-3 w-[90vw] lg:w-[18vw] bg-gray-300 h-0.5" />
          <button
            onClick={() => {
              navigate("/success");
            }}
            className="bg-green-500 font-bold px-3 text-white py-2 rounded-lg  w-[90vw] lg:w-[18vw]"
          >
            Checkout
          </button>
        </div>
      </div>
      <FaShoppingCart
        onClick={() => {
          setActiveCart(!activeCart);
        }}
        className={`rounded-full bg-slate-300 text-5xl shadow-md p-3 fixed bottom-5 right-5 ${
          totalQty > 0 && "transition-all animate-bounce delay-500"
        }`}
      />
    </>
  );
};

export default Cart;
