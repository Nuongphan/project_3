import { useEffect, useState } from "react";
import styles from "../../User.module.css";
import axios from "axios";
import { decreaseCart } from "../../redux/Action/CartAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BaseAxios from "../../api/axiosClient";
const CartTable = () => {
  const [productList, setProductList] = useState<any>();
  const navigate = useNavigate();
  const cartCount = useSelector((state: any) => state.cart.count);
  const dispatch = useDispatch();
 const [address, setAddress]=useState<any>()
 const [idAddress, setIdAddress]=useState<any>(0)
  // useEffect(() => { }, [cartCount]);
  useEffect(() => {
    BaseAxios
      .get(`/cart`)
      .then((res) => {
        setProductList(res.data.data), console.log("66666666", res.data.data);
      })
  }, []);
  useEffect(()=>{
    BaseAxios
    .get(`/user/${ productList?.[0]?.userId}/address`)
    .then((res)=>{
      setAddress(res?.data?.data?.inforUser?.[0]?.Addresses[0])
     setIdAddress(res?.data?.data?.inforUser?.[0]?.Addresses?.[0]?.id);
      })
  },[productList])
  // Total quantity
  const totalQuantity = productList?.reduce(
    (total: number, item: { quantity: number }) => {
      return total + item.quantity;
    },
    0
  );
  const handleChangQuantity = async (id: number, quantity: any) => {
    await BaseAxios.put(`/cart/${id}`, { quantity: quantity })
    // tạo một bản sao của productList để rerender lại 
    const updatedProductList = productList?.map((item: any) =>
      item?.id === id ? { ...item, quantity: quantity } : item
    );
    setProductList(updatedProductList);
  };
  // Total
  let totalResult: number = 0;
  totalResult = productList?.reduce(
    (total: number, item: any) => {
      return Number(total + item.quantity * item.Product.price)
    }, 0)


  // Paymet
  const handleCheckOut = async () => {
    if (productList?.length==0) {
      alert("Vui lòng thêm sản phẩm vào giỏ hàng.");
      navigate("/shop");
    }
     await BaseAxios.post("/orders", {addressId:idAddress})
     .then(res=>console.log(res))
     .catch(err=>console.log(err))
      navigate("/");
    };
  if (productList?.length == 0) {
    dispatch(decreaseCart())
  }
  // Xoá sản phẩm trong cart
  async function handleDelete(id: any) {
    const newCart = productList?.filter((item: any) => item.id !== id);
    await BaseAxios.delete(`/cart/${id}`)
    setProductList(newCart);
  }
  return (
    <div className={styles.cartTable}>
      <table>
        <thead>
          <tr className={styles.cartTableThead}>
            <th>PRODUCT</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {productList?.map((item: any, index: number) => {
            return (
              <tr key={item.id} className={styles.cartTableTbody}>
                <td className={styles.cartTableTbodyItem1}>
                  <span>
                    <img
                      className={styles.imgProductTable}
                      src={item?.Product?.Images?.[0].imgSrc}
                      alt=""
                    />
                  </span>
                  <p>
                    <Link to={`/product/${item?.id}`}>
                      <span>{item?.Product?.name}</span>
                    </Link>
                    <span>{item?.Product?.price} VND</span>
                  </p>
                </td>
                <td className={styles.cartTableTbodyItem2}>
                  <input
                    onChange={(event) =>
                      handleChangQuantity(item?.id, event.target.value)
                    }
                    type="number"
                    min="1"
                    value={item?.quantity}
                  />
                  <p onClick={() => handleDelete(item?.id)}>REMOVE</p>
                </td>
                <td className={styles.cartTableTbodyItem3}>
                  <span
                    style={
                      totalQuantity >= 3
                        ? { textDecoration: "line-through" }
                        : {}
                    }
                  >
                    {Number(item?.quantity * item?.Product?.price).toLocaleString()} VND
                  </span>
                  <span
                    style={{ color: "red", marginLeft: "10px" }}>
                    {totalQuantity >= 3
                      ? `${Number(item?.quantity) * Number(item?.Product?.price) * 0.85
                      } VND`
                      : ""}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.discount}>
        <div className={styles.discountItem1}>
          {/* <p>Add Order Note or Gift Note:</p>
          <textarea
            name="discount"
            id="discount"
            placeholder="Leave a gift note here"
          ></textarea> */}
          <p>Address:</p>
          <p>{address?.address}</p>
          <p>Phone:</p>
          <p>{address?.phone}</p>
          <Link to={"/auth/account"}><button className={styles.buttonEditAdress}>EDIT</button></Link>
        </div>
        <div className={styles.discountItem2}>
          <p><span>PAYMENT METHOD: Cash on delivery</span></p>
        {  productList?.length>0 && <p><span style={{ marginRight: "38px" }}>SHIPPING FEE:</span> 25.000</p>}
          <p>
            <span style={{ marginRight: "90px" }}>TOTAL:</span>
            {Number(totalQuantity) >= 3
              ? Number(totalResult * 0.85).toLocaleString()
              : Number(totalResult)?.toLocaleString()}{" "}
            VND
          </p>
          <button onClick={handleCheckOut}>CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};
export default CartTable;
