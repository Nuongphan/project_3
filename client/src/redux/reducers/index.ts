import { combineReducers } from "redux";
import { ProductReducer } from "./ProductReducer";
import { CartReducer } from "./CartReducer";
import { SearchReducer } from "./searchReducer";
import React from "react"
export const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
  search: SearchReducer
});
