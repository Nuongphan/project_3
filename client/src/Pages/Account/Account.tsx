import { useEffect, useState } from "react";
import styles from "../../User.module.css";
import axios from "axios";
// import { IUser } from "../../redux/Type";
const Account = () => {
  const idUser = localStorage.getItem("auth");
  const [userr, setUserr] = useState<any>();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/${idUser}`)
      .then((res) => setUserr(res.data));
  }, []);
  console.log("user", userr);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  useEffect(() => {
    if (userr) {
      setFirstName(userr?.firstName);
      setLastName(userr?.lastName);
      setAddress(userr?.address);
      setPhone(userr?.phone);
      setDob(userr?.dob);
    }
  }, [userr]);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (userr) {
      const updateUser = {
        ...userr,
        firstName: firstName,
        lastName: lastName,
        address: address,
        phone: phone,
        dob: dob,
      };
      try {
        await axios.patch(`http://localhost:8080/users/${idUser}`, updateUser);
        alert("Cập nhật thông tin thành công.")
      } catch (error) {
        console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      }
    }
  }
  return (
    <div className={styles.inforContainerSubmited}>
      <h4>INFORMATION</h4>
      <form action="" className="formAddress">
        <div className={styles.inputGroupAddress}>
          <label>Email:</label>
          <input
            disabled
            value={userr?.email}
            type="email"
            className={styles.emailSubmited}
          />
          <label> First name:</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            className={styles.firstNameSubmited}
          />
          <label> Last name:</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            className={styles.lastNameSubmited}
          />
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
          <label>Ngày sinh:</label>
          <input
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            type="date"
            className={styles.phoneSubmited}
          />
          <input onClick={handleSubmit} type="submit" value="EDIT" />
        </div>
      </form>
    </div>
  );
};

export default Account;
