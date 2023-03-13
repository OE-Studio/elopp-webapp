import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import transactionsSlice from "../features/transactionsSlice";

export const store = configureStore({
    reducer:{
        cart:cartSlice,
        transactions:transactionsSlice
    }
})