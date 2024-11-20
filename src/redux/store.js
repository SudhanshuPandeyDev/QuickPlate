import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./slices/CartSlice.jsx";
import CategorySlice from "./slices/CategorySlice.jsx";
import SearchSlice from "./slices/SearchSlice.jsx";
import AuthSlice from "./slices/AuthSlice.jsx";

const Store = configureStore({
  reducer: {
    cart: CartSlice,
    category: CategorySlice,
    search: SearchSlice,
    auth: AuthSlice,
  },
});

export default Store;
