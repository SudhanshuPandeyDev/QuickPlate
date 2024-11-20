import React from "react";
import FoodCard from "./FoodCard";
import FoodData from "../data/FoodData.js";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";

// The key prop allows React to uniquely identify each item and only update the ones that have changed, rather than re-rendering the entire list.
const FoodItems = () => {
  const category = useSelector((state) => state.category.category);
  const search = useSelector((state) => state.search.search);
  console.log(search);

  const handleToast = (name) => toast.success(`Added ${name}`);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-wrap gap-8 justify-center lg:justify-start mx-6 my-10">
        {FoodData.filter((food) => {
          if (category === "All") {
            return food.name.toLowerCase().includes(search.toLowerCase());
          } else {
            return (
              category === food.category &&
              food.name.toLowerCase().includes(search.toLowerCase())
            ); //Returns true or false based on the condition
          }
        }).map((food) => (
          <FoodCard
            key={food.id}
            id={food.id}
            name={food.name}
            price={food.price}
            desc={food.desc}
            rating={food.rating}
            img={food.img}
            handleToast={handleToast}
          />
        ))}
      </div>
    </>
  );
};

export default FoodItems;
