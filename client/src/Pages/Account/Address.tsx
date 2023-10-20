import { useEffect, useState } from "react";
import styles from "../../User.module.css";
import axios from "axios";
import BaseAxios from "../../api/axiosClient";
const Address = () => {
  const [userr, setUserr] = useState<any>();
  const [idAddress, setIdAddress] = useState<any>();
  const userLoginJSON = localStorage.getItem("username");
  const userLogin: any = userLoginJSON
    ? JSON.parse(userLoginJSON)
    : null;
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    BaseAxios.get(`http://localhost:8000/user/${userLogin.id}/address`)
      .then((res) => {  setUserr(res.data.data) })
      .catch((err) => { console.log(err) })
  }, [])
  const addressUser = userr?.inforUser?.[0].Addresses
  const addresss = addressUser?.[0]
  useEffect(() => {
    if (addressUser?.length == 1) {
      setAddress(addresss?.address);
      setPhone(addresss?.phone);
      setIdAddress(addresss?.id)
    }
  }, [addresss]);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (addressUser?.length == 1) {
      await BaseAxios.put(`http://localhost:8000/user/${userLogin.id}/address/${idAddress}`,
        { phone: phone, address: address, idUser: userLogin?.id, idAddress: idAddress })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    } else {
      await BaseAxios.post(`http://localhost:8000/user/${userLogin.id}/address/`, { phone: phone, address: address })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
  }
  return (
    <div className={styles.inforContainerSubmited}>
      <h4>ADDRESS</h4>
      <form action="" className="formAddress">
        <div className={styles.inputGroupAddress}>
          <label>Address:</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            className={styles.addressSubmited}
          />
          <label>Phone:</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            className={styles.phoneSubmited}
          />
          <input onClick={handleSubmit} type="submit" value={addressUser?.length == 1 ? "EDIT" : "CREATE"} />
        </div>
      </form>
    </div>
  );
};

export default Address;
