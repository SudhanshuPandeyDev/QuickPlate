import React, { useState, useEffect } from "react";
import FoodData from "../data/FoodData";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/slices/CategorySlice";

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);

  const listUniqueCategories = () => {
    const uniqueCategories = [
      ...new Set(FoodData.map((food) => food.category)), //converts set to array
    ];
    setCategories(uniqueCategories);
    console.log(categories);
  };

  useEffect(() => {
    listUniqueCategories();
  }, []);

  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.category.category);

  return (
    <div className="mx-6 mt-10">
      {/* <h3 className="text-xl font-semibold">Find the best food</h3> */}
      <h3 className="text-2xl font-semibold text-gray-800 tracking-wide mb-4 p-2">
        Find the Best Food
      </h3>

      <div className="my-5 flex gap-3 overflow-x-scroll scroll-smooth lg:overflow-x-hidden">
        {/* <button
          onClick={() => dispatch(setCategory("All"))}
          className={`px-3 py-2 bg-gray-300 font-bold rounded-sm ${
            selectedCategory === "All" && "bg-green-500 text-white"
          }`}
        >
          All
        </button> */}
        <button
          onClick={() => dispatch(setCategory("All"))}
          className={`px-5 py-3 font-semibold rounded-md transition-all duration-300 ease-in-out ${
            selectedCategory === "All"
              ? "bg-green-500 text-white shadow-lg transform scale-105"
              : "bg-gray-300 text-gray-900 shadow-md"
          }`}
        >
          All
        </button>

        {categories.map((category, index) => {
          return (
            <button
              onClick={() => dispatch(setCategory(category))}
              key={index}
              className={`px-3 py-2 bg-gray-300 font-bold rounded-sm  transition-all duration-300 ease-in-out  ${
                selectedCategory === category && "bg-green-500 text-white"
              } `}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryMenu;
