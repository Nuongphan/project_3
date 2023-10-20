import styles from "../../User.module.css";
import SortProduct from "./SortProduct";
import { useEffect, useState } from "react";
import { IProduct } from "../../redux/Type";
import axios from "axios";
import ListProduct from "./ListProduct";
import { useSelector, useDispatch } from "react-redux";

const Shop = () => {
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
  const [productList, setProductList] = useState<any>([]);
  const dispatch = useDispatch()
  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then((response) => {
        console.log("55555555555", response.data.products);
        setProductList(response.data.products)
      });
  }, []);

  useEffect(() => {
    if (type === "Shop All") {
      dispatch({ type: "CHANGE", payload: "Shop All" })
    }
    if (type === "Bestsellers") {
      dispatch({ type: "CHANGE", payload: "Bestsellers" })
      // return product.bestsellers > 20;
    }
    if (type === "Candles") {
      dispatch({ type: "CHANGE", payload: "Candles" })
    }
    if (type === "Diffusers") {
      dispatch({ type: "CHANGE", payload: "Diffusers" })
  
    }
    if (type === "Room Mist") {
      dispatch({ type: "CHANGE", payload: "Room Mist" })
    }
    if (type === "Bath Bars") {
      dispatch({ type: "CHANGE", payload: "Bath Bars" })
    }
    if (type === "Gift Sets") {
      dispatch({ type: "CHANGE", payload: "Diffusers" })
    }
  }, [type])
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
            {tab?.map((item) => (
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
          <ListProduct productListt={productList} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
