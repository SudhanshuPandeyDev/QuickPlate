import axios from "axios";

export const getCart = async (user) => {
  const res = await axios.get(
    `https://quickplate-backend.onrender.com/api/get-cart/${user._id}`
  );
  console.log("Response from API:", res);
  return res.data;
};
