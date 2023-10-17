import styles from "../../User.module.css";
import SortProduct from "./SortProduct";
import { useEffect, useState } from "react";
import { IProduct } from "../../redux/Type";
import axios from "axios";
import ListProduct from "./ListProduct";
import {  useSelector } from "react-redux";

const Shop =  () => {
  const tab = [
    "Shop All",
    "Bestsellers",
    "Candles",
    "Diffusers",
    "Room Mist",
    "Bath Bars",
    "Gift Sets",
  ];
  const searchResult = useSelector((state: any) => state.search);
  const [type, setType] = useState<string>("Shop All");
  const [productList, setProductList] = useState<IProduct[]>([]);
  const filteredProducts = searchResult?.filter((product: any) => {
    if (type === "Shop All") {
      return product;
    }
    if (type === "Bestsellers") {
      return product.bestsellers > 20;
    }
    if (type === "Candles") {
      return product.type === type;
    }
    if (type === "Diffusers") {
      return product.type === "Diffusers";
    }
    if (type === "Room Mist") {
      return product.type === "Room Mist";
    }
    if (type === "Bath Bars") {
      return product.type === "Bath bars";
    }
    if (type === "Gift Sets") {
      return product.type === "Gift sets";
    }
  });
  //  dispatch({ type: "ADD", payload: filteredProducts });
     useEffect( () => {
    axios
      .get("http://localhost:8080/proucts")
      .then((response) => setProductList(response.data));
  }, []);
  return (
    <div className={styles.conatinerShop}>
      <div>
        <img
          src="https://brooklyncandlestudio.com/cdn/shop/files/FALL-SCENTS_2023_collection_1600x.png?v=1693887277"
          alt=""
        />
      </div>
      <SortProduct />
      <div className={styles.mainShop}>
        <div style={{ width: "25%" }} className={styles.sidebarShop}>
          <ul>
            {tab.map((item) => (
              <li
                style={
                  type === item
                    ? { fontWeight: "bold", color: "#000", fontSize: "17px" }
                    : {}
                }
                onClick={() => setType(item)}
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.productAndSearch}>
          <ListProduct productListt={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
