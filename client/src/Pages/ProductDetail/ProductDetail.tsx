import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct, IUser } from "../../redux/Type";
import axios from "axios";
import ScrollSpy from "../../Pages/ProductDetail/Img";
import styles from "../../User.module.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import MoreInfor from "./MoreInfor";
import React from "react";
import { useDispatch } from "react-redux";
import { increaseCart } from "../../redux/Action/CartAction";

const ProductDetail = () => {
  const [value, setvalue] = useState<any>(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [user, setUser] = useState<any>();
  const idUser = localStorage.getItem("auth");
  const navigate = useNavigate();
  const [products, setProucts] = useState<IProduct[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/proucts")
      .then((res) => setProucts(res.data));
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/${idUser}`)
      .then((res) => setUser(res.data));
  }, []);
  const productDetail: any = products.find((product) => id == product.id);
  const srcImg: string[] | undefined = productDetail?.image;
  function handleAddToCart(id: any) {
    if (value > Number(productDetail.quantity)) {
      alert("Số lượng bạn mua đã đạt giới hạn của sản phẩm");
      return;
    }
    if (productDetail.quantity == 0) {
      alert("Sản phẩm đã hết hàng");
      return;
    }
    const userLoginJSON = localStorage.getItem("userLogin");
    const userLogin: IUser | null = userLoginJSON
      ? JSON.parse(userLoginJSON)
      : null;
    if (!userLogin) {
      navigate("/auth");
    }
    if (user?.status === false) {
      alert("Your account has been locked.");
    }
    //  Kiểm tra xem sản phẩm có trong Cart hay không
    const checkIndex: any = user?.cart.findIndex((item: any) => item.id === id);

    if (checkIndex !== -1) {
      console.log(typeof user.cart[checkIndex].quantity);

      user.cart[checkIndex].quantity =
        Number(user.cart[checkIndex].quantity) + Number(value);
    } else {
      const productCart = { ...productDetail };
      productCart.quantity = value;
      user.cart.push(productCart);
    }
    axios.patch(`http://localhost:8080/users/${idUser}`, user);
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
            <div className={styles.sectionImg} id={productDetail?.image[0]}>
              <img src={productDetail?.image[0]} alt="" />
            </div>
            <div className={styles.sectionImg} id={productDetail?.image[1]}>
              <img src={productDetail?.image[1]} alt="" />
            </div>
            <div className={styles.sectionImg} id={productDetail?.image[2]}>
              <img src={productDetail?.image[2]} alt="" />
            </div>
          </div>
        </div>
        <div className="productContent">
          <div className={styles.productItemTitle}>
            <p id="productName">{productDetail?.name}</p>
            <p id="productPrice">{productDetail?.price.toFixed(0)}</p>
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
                {productDetail?.totalReview} review
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
            <button onClick={() => handleAddToCart(productDetail?.id)}>
              ADD TO CART
            </button>
          </div>
          <div className={styles.productItemContent}>
            <p>
              {React.createElement("div", {
                dangerouslySetInnerHTML: {
                  __html: productDetail?.description,
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
