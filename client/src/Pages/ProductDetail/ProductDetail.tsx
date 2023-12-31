import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ScrollSpy from "../../Pages/ProductDetail/Img";
import styles from "../../User.module.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import MoreInfor from "./MoreInfor";
import React from "react";
import { useDispatch } from "react-redux";
import { increaseCart } from "../../redux/Action/CartAction";
import BaseAxios from "../../api/axiosClient";
const ProductDetail = () => {
  const [value, setvalue] = useState<any>(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any>();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/products/${id}`)
      .then((res) => {
        setProducts(res.data.product)
      })
      .catch((err) => console.log(err))

  }, []);
  const srcImg: any  = products?.[0]?.Images?.map((img: any) => img.imgSrc)
  function handleAddToCart(id: any) {
    if (value > Number(products?.[0]?.stock)) {
      alert("Số lượng bạn mua đã đạt giới hạn của sản phẩm");
      return;
    }
    if (products?.[0]?.stock===0) {
      alert("Sản phẩm đã hết hàng");
      return;
    }
    const userLoginJSON = localStorage.getItem("username");
    const userLogin: any | null = userLoginJSON
      ? JSON.parse(userLoginJSON)
      : null;
    if (!userLogin) {
      navigate("/auth");
    }
    if (userLogin?.status === 2) {
      alert("Your account has been locked.");
      return
    }
    BaseAxios.post(`/cart`, {productId:id, quantity:value});
    dispatch(increaseCart());
  }
  return (
    <>
      <div className={styles.productDetailContainer}>
        <div className={styles.productDetailImg} style={{ display: "flex" }}>
          <div className={styles.stickyImg}>
            <ScrollSpy targetIds={srcImg} />
          </div>
          <div>
            <div className={styles.sectionImg} id={srcImg?.[0]}>
              <img src={srcImg?.[0]} alt="" />
            </div>
            <div className={styles.sectionImg} id={srcImg?.[1]}>
              <img src={srcImg?.[1]} alt="" />
            </div>
            <div className={styles.sectionImg} id={srcImg?.[2]}>
              <img src={srcImg?.[2]} alt="" />
            </div>
          </div>
        </div>
        <div className="productContent">
          <div className={styles.productItemTitle}>
            <p id="productName">{products?.[0]?.name}</p>
            <p id="productPrice">{products?.[0]?.price?.toFixed(0)} $</p>
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
                20 review
              </span>
            </p>
            <input
              min="1"
              type="number"
              value={value}
              onChange={(e) => setvalue(e.target.value)}
            />{" "}
            <p>Buy 3+ Minimalist Candles, Get 15% off plus Free Shipping*</p>
            <br />
            <button onClick={() => handleAddToCart(products?.[0]?.id)}>
              ADD TO CART
            </button>
          </div>
          <div className={styles.productItemContent}>
            <p className={styles.tinyyy}>
              {React.createElement("div", {
              dangerouslySetInnerHTML: {
                  __html:`<div className={styles.tinyyyy}}> ${products?.[0]?.description}</div>` 
                },
              })}
            </p>
          </div>
          <div>
            <MoreInfor />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
