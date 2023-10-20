import { combineReducers } from "redux";
import { ProductReducer } from "./ProductReducer";
import { CartReducer } from "./CartReducer";
import { searchReducer } from "./searchReducer";
import { tabReducer} from "./tabReducer";
import React from "react"
export const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
  search: searchReducer,
 tab: tabReducer
});
