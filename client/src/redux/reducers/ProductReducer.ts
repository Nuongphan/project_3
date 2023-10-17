import axios from "axios";
import { IProduct } from "../Type";
import React from "react"
export interface IState {
  productList: IProduct[];
  productEdit: IProduct;
  type: string;
}
const initialState: IState = {
  productList: [],
  productEdit: {
    id: "",
    name: "",
    quantity: 0,
    price: 0,
    description: "",
    type: "",
    image: ["", "", ""],
    feedback: [],
    totalReview: 0,
    totalRating: 0,
    status: true,
    bestsellers: 0
  },
  type: "",
};
export const ProductReducer = (state: IState = initialState, action: any) => {
  const deleteProductAPI = async (id: string) => {
    await axios.delete(`http://localhost:8080/proucts/${id}`);
  };
  const addProductAPI = async (product: IProduct) => {
    await axios.post("http://localhost:8080/proucts", product);
  };
  switch (action.type) {
    case "DELETE_PRODUCT":{
      deleteProductAPI(action.payload);
      const updateProductsAPI = state.productList.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        productList: updateProductsAPI,
      };}
    case "ADD_PRODUCT":
      addProductAPI(action.payload);
      return {
        ...state,
        productList: [...state.productList, action.payload],
        type: "Add",
      };
    case "EDIT_PRODUCT":
      return {
        ...state,
        editProduct: action.payload,
        type: "Edit",
      };
    default:
      return state;
  }
};
