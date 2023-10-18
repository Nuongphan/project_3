import { IProduct } from "../Type";
import React from "react"
const initialState: any[] = [];
export const SearchReducer = (
  state: any[] = initialState,
  action: any
) => {
  switch (action.type) {
    case "ADD":
      state = [...action.payload];
      return state;
  }
  return state;
};
