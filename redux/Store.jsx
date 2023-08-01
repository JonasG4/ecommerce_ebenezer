import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/redux/cart";
const Store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default Store;