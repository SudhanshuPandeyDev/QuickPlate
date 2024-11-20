import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:5000/api/reset-password", {
        email,
      });
      const data = await res.data;
      if (data.success) {
        toast.success(data.message);
        navigate("/verify-otp");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form
        onSubmit={handleResetPassword}
        className="bg-white rounded-lg p-5 shadow-lg flex flex-col gap-3 w-[80vw] lg:w-[25vw] text-sm"
      >
        <span className="text-lg text-gray-600 cursor-pointer text-center mb-1">
          Enter your email for verification
        </span>
        <input
          type="email"
          name="email"
          id="email"
          className="outline-none border border-gray-400 rounded-md px-3 py-2 focus:border-green-400 text-gray-600"
          autoComplete="off"
          placeholder="sudhanshu954@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-400 outline-none rounded-md px-3 py-2 text-white"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
