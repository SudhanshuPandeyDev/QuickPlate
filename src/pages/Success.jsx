import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import axios from "axios";
axios.defaults.withCredentials = true; // bcz we using clearCart

const Success = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const clearCart = async () => {
    const res = await axios.get(
      "https://quickplate-backend.onrender.coms/api/clear-cart"
    );
    const data = await res.data;
    toast.success(data.message);
  };

  useEffect(() => {
    clearCart();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {loading ? (
        <PropagateLoader color="#4A90E2" size={15} />
      ) : (
        <div>
          <h2 className="text-4xl font-semibold mb-4">Order Successful!</h2>
          <p className="font-medium text-gray-900">
            Your order has been successfully placed.
          </p>
        </div>
      )}
    </div>
  );
};

export default Success;
