import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

// exporting both the action creators and the reducer from a Redux slice.
export const { setCart } = CartSlice.actions;
export default CartSlice.reducer;
