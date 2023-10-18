import { useEffect, useState } from "react";
import styles from "../../User.module.css";
import { IProduct } from "../../redux/Type";
import axios from "axios";
import { useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const [productList, setProductList] = useState<any>([]);
  const [searchInput, setSearchInput] = useState("");
  const handleGetDataa = () => {
    axios.get("http://localhost:8000/products")
    .then((response) => {
      console.log("888888888", response.data.products);
      setProductList(response.data.products);
      dispatch({ type: "ADD", payload: response.data.products });
    })
    .catch(error=> console.log(error));
  };
  useEffect(() => {
    const searchResult = productList?.filter((item:any) => {
      return item?.name?.toLowerCase().includes(searchInput?.toLowerCase());
    });
    if (searchInput.length === 0) {
      handleGetDataa();
    } else {
      setProductList(searchResult);
      dispatch({ type: "ADD", payload: searchResult });
    }
  }, [searchInput]);
  return (
    <div className={styles.searchProduct}>
      <input className={styles.inputSearchProduct}
        onChange={(e) => setSearchInput(e.target.value)}
        type="text"
        placeholder="Nhập tên sản phẩm cần tìm kiếm"
      />
    </div>
  );
};

export default Search;
