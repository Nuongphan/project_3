import { IProduct } from "../Type";
import React from "react"
const initialState: IProduct[] = [];
export const SearchReducer = (
  state: IProduct[] = initialState,
  action: any
) => {
  switch (action.type) {
    case "ADD":
      state = [...action.payload];
      return state;
  }
  return state;
};
