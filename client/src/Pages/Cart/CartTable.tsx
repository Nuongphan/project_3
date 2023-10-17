import { useEffect, useState } from "react";
import styles from "../../User.module.css";
import axios from "axios";
import { decreaseCart } from "../../redux/Action/CartAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { IOrder, IProduct } from "../../redux/Type";

const CartTable = () => {
  const [productList, setProductList] = useState<any>();
  const navigate = useNavigate();
  const cartCount = useSelector((state: any) => state.cart.count);
  const dispatch = useDispatch();
  const idUser = localStorage.getItem("auth");
  const [userr, setUserr] = useState<any | undefined>();
  const [orderList, setOrderList] = useState<any | undefined>();
  useEffect(() => {}, [cartCount]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/${idUser}`)
      .then((res) => setUserr(res.data));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8080/proucts")
      .then((res) => setProductList(res.data));
  }, []);
  //Get Order
  useEffect(() => {
    axios
      .get("http://localhost:8080/orders")
      .then((res) => setOrderList(res.data));
  }, []);
  // Total quantity
  const  totalQuantity = userr?.cart?.reduce(
    (total: number, item: { quantity: number }) => {
      return total + item.quantity;
    },
    0
  );
  useEffect(() => {}, [userr]);
  const handleChangQuantity = (id: number, quantity: any) => {
    const updateCart = userr?.cart?.map((item: any) => {
      if (item?.id === id) {
        return {
          ...item,
          quantity: Number(quantity),
        };
      }
      return item;
    });
    setUserr({
      ...userr,
      cart: updateCart,
    });
  };
  // Total
  let shipping: string = "";
  let totalResult: number = 0;
  if (totalQuantity >= 3) {
    totalResult = userr?.cart?.reduce(
      (total: number, item: { quantity: number; price: number }) => {
        return Number(total + item.quantity * item.price) * 0.85;
      },
      0
    );
    shipping = "0";
  } else {
    totalResult = userr?.cart?.reduce(
      (total: number, item: { quantity: number; price: number }) => {
        return Number(total + item.quantity * item.price) * 0.85;
      },
      0
    );
    shipping = Number(25000).toLocaleString();
  }

  // Paymet
  const handleCheckOut = async () => {
    if (cartCount == 0) {
      alert("Vui lòng thêm sản phẩm vào giỏ hàng.");
      navigate("/shop");
    }
    if (cartCount > 0) {
      productList?.map((itemA: any) => {
        const productPayment = userr?.cart?.find(
          (itemB: any) => itemA.id == itemB.id
        );
        if (productPayment) {
          const updateQuantity = itemA.quantity - productPayment.quantity;
          itemA.bestsellers += productPayment.quantity;
          const updateProduct = {
            ...itemA,
            quantity: updateQuantity,
            bestsellers: itemA.bestsellers,
          };
          axios.patch(
            `http://localhost:8080/proucts/${updateProduct.id}`,
            updateProduct
          );
        }
        return itemA;
      });
    }
    const id = "ORDER_" + Math.floor(Math.random() * 100);
    const order:any = {
      id: id,
      idUser: userr?.id,
      status: "Pending",
      address: userr?.address,
      phoneNumber: userr?.phone,
      paymentMethod: "Code",
      detail: userr?.cart,
      date: new Date().toLocaleDateString(),
      totalPrice: totalResult,
      totalQuantity: totalQuantity,
      shipping: shipping,
    };
    axios.post("http://localhost:8080/orders", order);
    setUserr((pre: any) => ({ ...pre, cart: [] }));
    axios.patch(`http://localhost:8080/users/${idUser}`, userr);
    navigate("/");
  };
  async function handleDelete(id: string) {
    const newCart = userr?.cart.filter((item: any) => item.id !== id);
    const updateUser = { ...userr, cart: newCart };
    await axios.patch(`http://localhost:8080/users/${idUser}`, updateUser);
    setUserr(updateUser);
  }
  if (userr?.cart?.length == 0) {
    dispatch(decreaseCart());
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
          {userr?.cart?.map((item: any, index: number) => {
            return (
              <tr key={item.id} className={styles.cartTableTbody}>
                <td className={styles.cartTableTbodyItem1}>
                  <span>
                    <img
                      className={styles.imgProductTable}
                      src={item?.image[0]}
                      alt=""
                    />
                  </span>
                  <p>
                    <Link to={`/product/${item?.id}`}>
                      <span>{item?.name}</span>
                    </Link>
                    <span>{item?.price} VND</span>
                  </p>
                </td>
                <td className={styles.cartTableTbodyItem2}>
                  <input
                    onChange={(event) =>
                      handleChangQuantity(item.id, event.target.value)
                    }
                    type="number"
                    min="1"
                    value={userr?.cart[index]?.quantity}
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
                    {Number(item?.quantity * item?.price).toLocaleString()} VND
                  </span>
                  <span style={{ color: "red", marginRight: "10px" }}>
                    {totalQuantity >= 3
                      ? `${Number(
                          item?.quantity * item?.price * 0.85
                        ).toLocaleString()} VND`
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
          <p>Add Order Note or Gift Note:</p>
          <textarea
            name="discount"
            id="discount"
            placeholder="Leave a gift note here"
          ></textarea>
        </div>
        <div className={styles.discountItem2}>
          <p>
            <span style={{ marginRight: "5px" }}>TOTAL:</span>
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
