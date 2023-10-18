import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styles from "../../User.module.css";
import { IProduct } from "../../redux/Type";
import { NavLink } from "react-router-dom";
import Search from "./Search";
import { useSelector } from "react-redux";

interface IProductProps {
  productListt: any[];
}
const ListProduct = (props: IProductProps) => {
  const searchResult = useSelector((state: any) => state.search);
  const products = props;
  // const productList = products?.productListt;
  console.log(searchResult);

  return (
    <>
      <Search />
      <div className={styles.productList}>
        {searchResult?.map((product: any) => (
          <div key={product?.id} className={styles.candleItem}>
            {/* {product?.bestsellers > 20 && (
              <span className={styles.tagCandleItem}>BESTSELLER</span>
            )} */}
            <div className={styles.addToCartGroup}>
              <img className={styles.img1} src={product?.Images[0].imgSrc} />
              <img className={styles.img2} src={product?.Images[1].imgSrc} />
              <NavLink to={`/product/${product?.id}`}>
                <button className={styles.btnAddToCart}>LEARN MORE</button>
              </NavLink>
            </div>
            <div className={styles.titleCandle}>
              <p>SCENT FAMILY: {product?.Category?.title}</p>
              <p>{product?.name}</p>
              <p>{product?.price} $</p>
              <p style={{ display: "flex", gap: "9px" }}>
                <span style={{ display: "flex" }}>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                </span>
                <span
                  style={{
                    textDecoration: "underline",
                    fontSize: "11px",
                    color: "rgb(148, 147, 147)",
                    cursor: "pointer",
                  }}
                >
                  20 reviews
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListProduct;
